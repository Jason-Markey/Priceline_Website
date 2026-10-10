#!/usr/bin/env python3
"""Source-level checks for src/content/articles/*.md (run before or without a build):
    python3 tools/check-articles.py

Fails (exit 1) on anything that would break a scheduled publish or the house rules:
- frontmatter: required fields, valid category / relatedServices, description <= 165 chars
- duplicate title or seoTitle; seoTitle > 60 chars
- body H1 (the page title is the H1), skipped heading levels
- internal links to pages that don't exist, or to an article that goes live AFTER this one
  (the weekly rebuild would fail check-build and nothing would publish)
- blocked words (same list as check-build.py)
Warnings: description outside 120-165, em dashes, no references, shop links outside priceline.com.au/c/.
"""
import pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
ART = ROOT / 'src/content/articles'
PAGES = ROOT / 'src/pages'

sys.path.insert(0, str(ROOT / 'tools'))
BLOCKED = re.search(r'BLOCKED = \[(.*?)\]', (ROOT / 'tools/check-build.py').read_text(), re.S).group(1)
BLOCKED = re.findall(r"'([^']+)'", BLOCKED)

cats = re.findall(r"^\s*'([\w-]+)': \{ name:", (ROOT / 'src/data/categories.ts').read_text(), re.M)
services = re.findall(r"^\s*slug: '([\w-]+)'", (ROOT / 'src/data/services.ts').read_text(), re.M)
static_pages = {p.stem for p in PAGES.glob('*.astro') if not p.stem.startswith('[')} - {'index', '404'}

def fm_and_body(text):
    m = re.match(r'^---\n(.*?)\n---\n(.*)$', text, re.S)
    return (m.group(1), m.group(2)) if m else ('', text)

def field(fm, name):
    m = re.search(rf'^{name}:\s*(.*)$', fm, re.M)
    if not m: return None
    v = m.group(1).strip()
    if v.startswith('"') and v.endswith('"'): v = v[1:-1]
    return v

articles = {}
for f in sorted(ART.glob('*.md')):
    fm, body = fm_and_body(f.read_text(encoding='utf-8'))
    articles[f.stem] = {
        'fm': fm, 'body': body,
        'date': field(fm, 'publishDate'), 'draft': field(fm, 'draft') == 'true',
        'title': field(fm, 'title'), 'seo': field(fm, 'seoTitle'), 'desc': field(fm, 'description') or '',
        'cat': field(fm, 'category'),
    }

errors, warnings = [], []
seen_titles, seen_seo = {}, {}
only = set(sys.argv[1:])
for slug, a in articles.items():
    fm, body = a['fm'], a['body']
    where = f'{slug}.md'
    for k in ('title', 'description', 'publishDate', 'modifiedDate', 'category'):
        if field(fm, k) is None: errors.append(f'{where}: missing {k}')
    if a['cat'] not in cats: errors.append(f'{where}: unknown category {a["cat"]}')
    rs = re.search(r'^relatedServices:\s*\[(.*?)\]', fm, re.M)
    for s in re.findall(r'"([\w-]+)"', rs.group(1) if rs else ''):
        if s not in services: errors.append(f'{where}: unknown relatedService {s}')
    if len(a['desc']) > 165: errors.append(f'{where}: description {len(a["desc"])} chars (max 165)')
    elif not 120 <= len(a['desc']) <= 165: warnings.append(f'{where}: description {len(a["desc"])} chars')
    if a['seo'] and len(a['seo']) > 60: errors.append(f'{where}: seoTitle {len(a["seo"])} chars: {a["seo"]}')
    for key, seen in (('title', seen_titles), ('seo', seen_seo)):
        v = a[key]
        if v and v in seen: errors.append(f'{where}: duplicate {key} with {seen[v]}: {v}')
        if v: seen.setdefault(v, where)
    if re.search(r'^# ', body, re.M): errors.append(f'{where}: H1 in body')
    prev = 1
    for h in re.findall(r'^(#{2,6}) ', body, re.M):
        if len(h) > prev + 1: errors.append(f'{where}: heading jumps to {"#" * len(h)}'); break
        prev = len(h)
    if '—' in body or '—' in a['desc']: warnings.append(f'{where}: em dash')
    if 'references:' not in fm or not re.search(r'url:\s*"https?://', fm): warnings.append(f'{where}: no references')
    text = (a['title'] or '') + ' ' + a['desc'] + ' ' + re.sub(r'\]\([^)]*\)', ']', body)
    low = ' ' + text.lower() + ' '
    for w in BLOCKED:
        if re.search(r'[^a-z]' + re.escape(w) + r'[^a-z]', low): errors.append(f'{where}: blocked word "{w}"')
    for href in re.findall(r'\]\((/[^)#?\s]*)', body):
        target = href.strip('/').split('/')[0]
        if href == '/': continue
        if target in articles:
            t = articles[target]
            if t['draft']: errors.append(f'{where}: links to draft article /{target}/')
            elif not a['draft'] and t['date'] > a['date']:
                errors.append(f'{where} ({a["date"]}): links to /{target}/ which goes live {t["date"]}')
        elif target not in services and target not in static_pages and not href.startswith('/category/'):
            errors.append(f'{where}: broken internal link {href}')
    for url in re.findall(r'\]\((https?://[^)\s]+)', body):
        if 'priceline.com.au' in url and '/c/' not in url: warnings.append(f'{where}: shop link not a /c/ range page: {url}')

if only:
    errors = [e for e in errors if e.split(':')[0].split(' ')[0].replace('.md', '') in only]
    warnings = [w for w in warnings if w.split(':')[0].replace('.md', '') in only]
for w in warnings: print('WARN ', w)
for e in errors: print('ERROR', e)
print(f'{len(articles)} articles checked, {len(errors)} errors, {len(warnings)} warnings')
sys.exit(1 if errors else 0)
