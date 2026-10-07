#!/usr/bin/env python3
"""Convert reference-content/wp-drafts/*.md (exported WordPress scheduled posts) into
src/content/articles/<slug>.md. Run: python3 tools/convert-wp-drafts.py
- Strips the closing CTA, byline, Sources list and <small> disclaimer (the template renders these)
- Parses Sources into front-matter references
- Maps WP categories to the site's category enum
- Keeps the WordPress scheduled date as publishDate (the site only publishes articles whose date has passed)
"""
import re, pathlib, html
from markdownify import markdownify as md

SRC = pathlib.Path('reference-content/wp-drafts')
DST = pathlib.Path('src/content/articles')
CAT = {
    'category-health-advice': 'health-advice',
    'category-skincare-beauty': 'skincare-beauty',
    'category-medicines-services': 'prescriptions',
    'category-vaccinations-travel': 'vaccinations',
    'category-store-news': 'skincare-beauty',
}
# per-slug overrides
CAT_OVERRIDE = {'travel-health-checklist': 'travel', 'forgot-medication-on-holiday': 'local-guides'}
RELATED = {
    'best-sunscreen-gold-coast': ['skincare-tanning'],
    'forgot-medication-on-holiday': ['prescriptions', 'help-medical'],
    'skincare-humid-weather': ['skincare-tanning', 'beauty-fragrance'],
    'travel-health-checklist': ['travel-health', 'vaccination-information'],
    'hayfever-gold-coast': ['vaccination-information'],
    'contraceptive-pill-pharmacist-queensland': ['hormonal-contraceptive-pill', 'womens-health'],
    'how-to-use-escripts': ['prescriptions', 'download-the-priceline-app'],
    'fragrance-gift-ideas': ['beauty-fragrance'],
    'first-aid-kit-checklist': ['delivery'],
    'heat-exhaustion-symptoms': ['health-station'],
    'help-elderly-parent-with-medication': ['medication-packing', 'medication-reviews'],
    'travel-sickness-tips': ['travel-health'],
    'eczema-summer': ['skincare-tanning'],
    'cold-sore-sun-trigger': ['skincare-tanning'],
    'whooping-cough-vaccine-pregnancy': ['vaccination-information', 'womens-health'],
    'shingles-vaccine-free': ['vaccination-information'],
    'normal-blood-pressure': ['health-station', 'medication-reviews'],
    'when-to-get-flu-shot-queensland': ['flu-vaccination', 'vaccination-information'],
}

def fm_val(block, key):
    m = re.search(r'^' + key + r': (.*)$', block, re.M)
    if not m: return ''
    v = m.group(1).strip()
    if v.startswith('"') and v.endswith('"'): v = v[1:-1].replace('\\"', '"')
    return v

def esc(s): return s.replace('\\', '\\\\').replace('"', '\\"')

for f in sorted(SRC.glob('*.md')):
    text = f.read_text(encoding='utf-8')
    m = re.match(r'^---\n(.*?)\n---\n', text, re.S)
    fm, body = m.group(1), text[m.end():]
    slug = fm_val(fm, 'slug') or f.stem
    title = fm_val(fm, 'title')
    status = fm_val(fm, 'status')
    date = fm_val(fm, 'scheduled_date')[:10]
    seo_title = fm_val(fm, 'seo_title')
    desc = fm_val(fm, 'meta_description') or fm_val(fm, 'excerpt')
    classes = re.findall(r'(category-[a-z-]+|tag-[a-z-]+)', fm_val(fm, 'class_list'))
    cat = CAT_OVERRIDE.get(slug) or next((CAT[c] for c in classes if c in CAT), 'health-advice')
    tags = [c[4:] for c in classes if c.startswith('tag-')]

    # references
    refs = []
    sm = re.search(r'<h2>Sources</h2>\s*<ul>(.*?)</ul>', body, re.S)
    if sm:
        for a in re.finditer(r'<a href="([^"]+)">(.*?)</a>', sm.group(1)):
            refs.append((html.unescape(re.sub('<[^>]+>', '', a.group(2))).strip(), a.group(1)))
    # cut everything from the closing CTA / byline / sources / disclaimer
    cut = len(body)
    for pat in [r'<h2>Talk to our pharmacists', r'<p><em>Written by', r'<h2>Sources</h2>', r'<p><small>This article is general']:
        mm = re.search(pat, body)
        if mm: cut = min(cut, mm.start())
    body = body[:cut]
    # absolute self-links -> relative; drop tel links wrapped text? keep.
    body = body.replace('https://pricelinepacificfair.com.au/', '/')
    # markdown
    md_body = md(body, heading_style='ATX', bullets='-', strip=['img'])
    md_body = re.sub(r'\n{3,}', '\n\n', md_body).strip() + '\n'
    # draft-only post used h3 for every heading -> promote to h2
    if '<h2>' not in body and '<h3>' in body:
        md_body = re.sub(r'^### ', '## ', md_body, flags=re.M)

    is_draft = status == 'draft'
    if not seo_title: seo_title = f'{title.split(":")[0].strip()} | Priceline Pacific Fair'
    out = ['---', f'title: "{esc(title)}"', f'description: "{esc(desc[:168])}"', f'seoTitle: "{esc(seo_title)}"',
           f'publishDate: {date}', f'modifiedDate: {date}', f'category: {cat}',
           'author: "Priceline Pharmacy Pacific Fair team"', 'reviewer: "Jason Markey"',
           'tags: [' + ', '.join(f'"{t}"' for t in tags) + ']',
           'relatedServices: [' + ', '.join(f'"{r}"' for r in RELATED.get(slug, [])) + ']',
           'references:' + ('' if refs else ' []')]
    for n, u in refs: out += [f'  - name: "{esc(n)}"', f'    url: "{u}"']
    out += [f'draft: {"true" if is_draft else "false"}', '---', '']
    (DST / f'{slug}.md').write_text('\n'.join(out) + md_body, encoding='utf-8')
    print(f'{slug}: {cat} {date} draft={is_draft} refs={len(refs)} tags={tags}')
