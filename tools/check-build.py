#!/usr/bin/env python3
"""Build-time checks for dist/. Run after `npm run build`:  python3 tools/check-build.py
Fails (exit 1) on: missing/duplicate H1, duplicate <title>, broken internal links, blocked words,
missing meta description, title > 60 chars, description outside 120–165 chars (warning only).
"""
import re, sys, pathlib, html

DIST = pathlib.Path('dist')
# Words that must never appear in public copy (TGA: prescription-only medicines/brands; old booking links; removed pages)
BLOCKED = [
    'ozempic', 'wegovy', 'mounjaro', 'saxenda', 'zepbound', 'semaglutide', 'tirzepatide', 'liraglutide',
    'viagra', 'cialis', 'valium', 'xanax', 'endone', 'amoxicillin', 'trimethoprim', 'nitrofurantoin',
    'champix', 'varenicline', 'zyban', 'bupropion', 'yasmin', 'levlen', 'microgynon', 'implanon', 'depo-provera',
    'nuvaring', 'shingrix', 'gardasil', 'prevenar', 'boostrix', 'comirnaty', 'spikevax', 'arexvy', 'abrysvo',
    'fluad', 'fluarix', 'vaxigrip', 'afluria', 'ellaone', 'postinor', 'levonorgestrel', 'ulipristal',
    'healthengine', 'servicebookings', 'audiology-services', 'wp-content', 'wp-admin',
    'testimonial', 'guaranteed', 'miracle', 'clinically proven',
]
TITLE_RE = re.compile(r'<title>(.*?)</title>', re.S)
H1_RE = re.compile(r'<h1[^>]*>', re.I)
DESC_RE = re.compile(r'<meta name="description" content="([^"]*)"')
HREF_RE = re.compile(r'href="([^"#?]+)')
STRIP_RE = re.compile(r'<script.*?</script>|<style.*?</style>|<[^>]+>', re.S)

pages = sorted(p for p in DIST.rglob('index.html') if 'pagefind' not in p.parts)
errors, warnings = [], []
titles = {}
routes = {('/' + str(p.parent.relative_to(DIST)).replace('\\', '/') + '/').replace('//', '/') for p in pages}
routes.add('/')
files = {('/' + str(p.relative_to(DIST)).replace('\\', '/')) for p in DIST.rglob('*') if p.is_file()}

for p in pages:
    route = ('/' + str(p.parent.relative_to(DIST)).replace('\\', '/') + '/').replace('//', '/')
    if route == '/./': route = '/'
    src = p.read_text(encoding='utf-8')
    # title
    m = TITLE_RE.search(src)
    title = html.unescape(m.group(1).strip()) if m else ''
    if not title: errors.append(f'{route}: no <title>')
    elif len(title) > 60 and route not in ('/search/', '/404/'): warnings.append(f'{route}: title {len(title)} chars: {title}')
    if title in titles and route not in ('/404/',): errors.append(f'{route}: duplicate title with {titles[title]}: {title}')
    titles.setdefault(title, route)
    # description
    d = DESC_RE.search(src)
    if not d or not d.group(1).strip(): errors.append(f'{route}: no meta description')
    elif not (120 <= len(html.unescape(d.group(1))) <= 165) and route not in ('/search/', '/404/'):
        warnings.append(f'{route}: description {len(html.unescape(d.group(1)))} chars')
    # h1
    n = len(H1_RE.findall(src))
    if n != 1: errors.append(f'{route}: {n} <h1> elements')
    # links
    for href in HREF_RE.findall(src):
        if href.startswith('/') and not href.startswith('//'):
            if href.startswith('/_astro/') or href in files: continue
            target = href if href.endswith('/') else href + '/'
            if target not in routes and href not in files:
                errors.append(f'{route}: broken internal link {href}')
    # blocked words (visible text only)
    text = ' ' + STRIP_RE.sub(' ', src).lower() + ' '
    for w in BLOCKED:
        if re.search(r'(?<![a-z0-9])' + re.escape(w) + r'(?![a-z0-9])', text):
            errors.append(f'{route}: blocked word "{w}"')

print(f'{len(pages)} pages checked')
for w in warnings: print('WARN', w)
for e in errors: print('ERROR', e)
sys.exit(1 if errors else 0)
