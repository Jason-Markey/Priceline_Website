#!/usr/bin/env python3
"""SEO + AI-crawlability audit of the built site in dist/.
Covers the 20-point checklist (sitemap, robots, noindex, canonical, titles, descriptions,
one H1, heading order, alt text, schema, internal links, broken links, image weight,
mobile/CWV (via Lighthouse separately), HTTPS, slugs, og:image, Search Console, llms.txt)
plus AI-crawler readiness. Prints a report; exit code 1 if any FAIL.
"""
import glob, json, os, re, sys
from collections import Counter, defaultdict
from bs4 import BeautifulSoup

ROOT = 'dist'
SITE = 'https://pricelinepacificfair.com.au'
pages = sorted(glob.glob(f'{ROOT}/**/index.html', recursive=True))
fails, warns, info = [], [], []

def url_of(p):
    rel = os.path.relpath(os.path.dirname(p), ROOT).replace('\\', '/')
    return '/' if rel == '.' else f'/{rel}/'

# 1 sitemap, 2 robots, 19 verification, 20 llms.txt, 16 https
for f, label in [('sitemap-index.xml', '1 sitemap'), ('robots.txt', '2 robots.txt'),
                 ('googlee1e8a4de870e1a5f.html', '19 Search Console verification'), ('llms.txt', '20 llms.txt'),
                 ('.htaccess', '16 HTTPS/canonical-host rules'), ('rss.xml', 'RSS feed')]:
    (info if os.path.exists(f'{ROOT}/{f}') else fails).append(f'{label}: {"present" if os.path.exists(f"{ROOT}/{f}") else "MISSING"}')
robots = open(f'{ROOT}/robots.txt').read()
for bot in ['GPTBot', 'OAI-SearchBot', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended', 'Applebot', 'Bingbot']:
    if bot not in robots: warns.append(f'robots.txt: no explicit entry for {bot}')
if 'Sitemap:' not in robots: fails.append('robots.txt: no Sitemap: line')
ht = open(f'{ROOT}/.htaccess').read()
if 'https://pricelinepacificfair.com.au' not in ht: fails.append('.htaccess: no https canonical-host redirect')
sm = open(f'{ROOT}/sitemap-0.xml').read()
sm_urls = set(re.findall(r'<loc>([^<]+)</loc>', sm))
sm_paths = {u.replace(SITE, '') for u in sm_urls}
if any(not u.startswith('https://') for u in sm_urls): fails.append('sitemap: non-https URL')

# per-page checks
titles, descs = Counter(), Counter()
img_alt_missing, inlinks = [], Counter()
noindex_pages = []
for p in pages:
    u = url_of(p)
    html = open(p, encoding='utf-8').read()
    s = BeautifulSoup(html, 'html.parser')
    robots_meta = s.find('meta', attrs={'name': 'robots'})
    is_noindex = robots_meta and 'noindex' in (robots_meta.get('content') or '')
    if is_noindex: noindex_pages.append(u)
    # 4 canonical
    can = s.find('link', rel='canonical')
    if not can: fails.append(f'4 canonical missing: {u}')
    elif can.get('href') != SITE + u and not is_noindex: fails.append(f'4 canonical mismatch {u}: {can.get("href")}')
    # 5 title / 6 description
    t = (s.title.string or '').strip() if s.title else ''
    if not t: fails.append(f'5 no title: {u}')
    else:
        titles[t] += 1
        if len(t) > 65: warns.append(f'5 title {len(t)} chars (>65) {u}: {t}')
    d = s.find('meta', attrs={'name': 'description'})
    dc = (d.get('content') or '').strip() if d else ''
    if not dc: fails.append(f'6 no meta description: {u}')
    else:
        descs[dc] += 1
        if not (70 <= len(dc) <= 160): warns.append(f'6 description {len(dc)} chars {u}')
    # 7 one H1, 8 heading order
    h1 = s.find_all('h1')
    if len(h1) != 1: fails.append(f'7 {len(h1)} H1s: {u}')
    levels = [int(h.name[1]) for h in s.find_all(re.compile('^h[1-6]$'))]
    prev = 0
    for lv in levels:
        if lv > prev + 1 and prev: warns.append(f'8 heading jump h{prev}->h{lv}: {u}'); break
        prev = lv
    # 9 alt text
    for im in s.find_all('img'):
        if im.get('alt') is None: img_alt_missing.append((u, im.get('src', '')[:60]))
    # 10 schema
    ld = s.find_all('script', type='application/ld+json')
    if not ld: fails.append(f'10 no JSON-LD: {u}')
    else:
        try:
            for b in ld: json.loads(b.string if b.string is not None else b.get_text())
        except Exception as e: fails.append(f'10 invalid JSON-LD {u}: {e}')
    # 11 internal links
    for a in s.find_all('a', href=True):
        h = a['href']
        if h.startswith('/') and not h.startswith('//'):
            inlinks[h.split('#')[0].split('?')[0]] += 1
    # 17 slugs
    if re.search(r'[A-Z_ ]|%20', u): fails.append(f'17 messy slug: {u}')
    if not u.endswith('/'): fails.append(f'17 no trailing slash: {u}')
    # 18 og:image
    og = s.find('meta', property='og:image')
    if not og or not og.get('content', '').startswith('https://'): fails.append(f'18 og:image missing/not absolute: {u}')
    tw = s.find('meta', attrs={'name': 'twitter:card'})
    if not tw: warns.append(f'18 no twitter:card: {u}')
    # 15 mobile viewport
    if not s.find('meta', attrs={'name': 'viewport'}): fails.append(f'15 no viewport meta: {u}')
    # 16 mixed content
    if re.search(r'(src|href)="http://(?!localhost)', html): fails.append(f'16 http:// asset/link on {u}')
    # sitemap membership
    if not is_noindex and u not in sm_paths and u not in ('/404/', '/search/'):
        warns.append(f'1 indexable page not in sitemap: {u}')
    if is_noindex and u in sm_paths: fails.append(f'3 noindex page listed in sitemap: {u}')

# 3 noindex summary
info.append(f'3 noindex pages (expected: search, 404, thin categories): {", ".join(noindex_pages) or "none"}')
# 5/6 duplicates
for t, n in titles.items():
    if n > 1: fails.append(f'5 duplicate title x{n}: {t}')
for d, n in descs.items():
    if n > 1: fails.append(f'6 duplicate description x{n}: {d[:60]}')
# 9
if img_alt_missing: fails.append(f'9 images without alt attribute: {len(img_alt_missing)} e.g. {img_alt_missing[:3]}')
else: info.append('9 alt text: every <img> has an alt attribute')
# 11 orphan pages (indexable pages with <2 inbound internal links)
orphans = [u for u in sm_paths if inlinks.get(u, 0) < 2]
if orphans: warns.append(f'11 pages with <2 internal inbound links: {sorted(orphans)}')
else: info.append('11 internal links: every sitemap page has >=2 inbound links')
# 12 broken links: covered by check-build.py (run separately)
# 13 image weight
big = []
for f in glob.glob(f'{ROOT}/_astro/*'):
    if re.search(r'\.(jpe?g|png|webp|avif)$', f):
        kb = os.path.getsize(f) / 1024
        if kb > 300: big.append((os.path.basename(f), round(kb)))
if big: warns.append(f'13 images over 300 KB: {big}')
else: info.append('13 image weight: no served image over 300 KB')
# AI crawlability
idx = open(f'{ROOT}/index.html', encoding='utf-8').read()
s = BeautifulSoup(idx, 'html.parser')
body_text = len(s.get_text(' ', strip=True))
info.append(f'AI: static HTML, home page has {body_text} chars of text without JS')
llms = open(f'{ROOT}/llms.txt').read()
info.append(f'AI: llms.txt {len(llms)} chars, {llms.count(SITE)} absolute links')
types = Counter()
for p in pages:
    for b in BeautifulSoup(open(p, encoding='utf-8').read(), 'html.parser').find_all('script', type='application/ld+json'):
        try:
            data = json.loads(b.string if b.string is not None else b.get_text())
            graph = data.get('@graph', [data]) if isinstance(data, dict) else data
            for n in graph:
                t = n.get('@type'); types[t if isinstance(t, str) else '/'.join(t)] += 1
        except Exception: pass
info.append(f'10 schema types across site: {dict(types)}')
info.append(f'pages checked: {len(pages)}; sitemap URLs: {len(sm_paths)}')

print('=== FAIL ===' if fails else '=== FAIL: none ===')
for x in fails: print(' -', x)
print('=== WARN ===' if warns else '=== WARN: none ===')
for x in warns: print(' -', x)
print('=== INFO ===')
for x in info: print(' -', x)
sys.exit(1 if fails else 0)
