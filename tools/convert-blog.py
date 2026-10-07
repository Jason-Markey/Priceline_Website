#!/usr/bin/env python3
"""Convert reference-content/blog/*.md (captured from the live WordPress site) into
src/content/articles/*.md with clean front-matter and body.
Run: python3 tools/convert-blog.py
"""
import re, sys, pathlib, datetime

SRC = pathlib.Path('reference-content/blog')
DST = pathlib.Path('src/content/articles')
DST.mkdir(parents=True, exist_ok=True)

CAT = {'Health Advice': 'health-advice', 'Skincare & Beauty': 'skincare-beauty'}

def parse_fm(text):
    m = re.match(r'^---\n(.*?)\n---\n', text, re.S)
    fm = {}
    for line in m.group(1).splitlines():
        k, _, v = line.partition(':')
        fm[k.strip()] = v.strip().strip('"')
    return fm, text[m.end():]

def esc(s):
    return s.replace('\\', '\\\\').replace('"', '\\"')

for f in sorted(SRC.glob('*.md')):
    fm, body = parse_fm(f.read_text(encoding='utf-8'))
    slug = fm['url'].rstrip('/').split('/')[-1]
    lines = body.split('\n')

    # Title = first H1
    title = next(l[2:].strip() for l in lines if l.startswith('# '))
    # Category from the breadcrumb list
    cat_m = re.search(r'\[(Health Advice|Skincare & Beauty)\]\(https://pricelinepacificfair\.com\.au/category/', body)
    category = CAT[cat_m.group(1)] if cat_m else 'health-advice'
    # Date
    d_m = re.search(r'\[([A-Z][a-z]+ \d{1,2}, \d{4})\]\(https://pricelinepacificfair\.com\.au/', body)
    date = datetime.datetime.strptime(d_m.group(1), '%B %d, %Y').date().isoformat() if d_m else '2026-09-24'
    # Tags
    tags = re.findall(r'\[([a-z0-9-]+)\]\(https://pricelinepacificfair\.com\.au/tag/', body)
    # Sources
    refs = []
    src_m = re.search(r'## Sources\n(.*?)(?:\n\n[^-\n]|\Z)', body, re.S)
    if src_m:
        for rm in re.finditer(r'-\s+\[(.+?)\]\((https?://[^\s)]+)\)', src_m.group(1)):
            refs.append((rm.group(1).strip(), rm.group(2).strip()))

    # Body: drop everything before the first paragraph after the meta lists
    # Find index of first non-list, non-heading, non-empty line after the H1
    start = None
    seen_h1 = False
    for i, l in enumerate(lines):
        if l.startswith('# '):
            seen_h1 = True; continue
        if not seen_h1: continue
        if l.strip() == '' or l.startswith('-   [') or l.startswith('- ['):
            continue
        start = i; break
    content = lines[start:]
    # Cut at the "Written by" / Sources / tags / prev-next / Leave a Reply
    end = len(content)
    for i, l in enumerate(content):
        if l.startswith('_Written by') or l.startswith('## Sources') or l.startswith('[first-aid]') or re.match(r'^\[[a-z0-9-]+\]\(https://pricelinepacificfair\.com\.au/tag/', l) or l.startswith('Prev post') or l.startswith('Next post') or l.startswith('### Leave a Reply'):
            end = i; break
    content = content[:end]
    # Remove the "Talk to our pharmacists at Pacific Fair" closing section (template renders a CTA instead)
    out = []
    skip = False
    for l in content:
        if l.startswith('## Talk to our pharmacists'):
            skip = True; continue
        if skip and l.startswith('## '):
            skip = False
        if not skip:
            out.append(l)
    text = '\n'.join(out).strip() + '\n'
    # Absolute self-links -> relative
    text = text.replace('https://pricelinepacificfair.com.au/', '/')
    # Normalise list markers
    text = re.sub(r'^-   ', '- ', text, flags=re.M)
    text = re.sub(r'^(\d+)\.  ', r'\1. ', text, flags=re.M)

    first_para = next((l for l in out if l.strip() and not l.startswith('#')), '')
    fm_out = [
        '---',
        f'title: "{esc(title)}"',
        f'description: "{esc(fm.get("meta_description", ""))}"',
        f'seoTitle: "{esc(fm.get("title", ""))}"',
        f'publishDate: {date}',
        f'modifiedDate: 2026-10-07',
        f'category: {category}',
        'author: "Priceline Pharmacy Pacific Fair team"',
        'reviewer: "Jason Markey"',
        'tags: [' + ', '.join(f'"{t}"' for t in tags) + ']',
        'references:',
    ]
    for n, u in refs:
        fm_out.append(f'  - name: "{esc(n)}"')
        fm_out.append(f'    url: "{u}"')
    fm_out.append('draft: false')
    fm_out.append('---')
    (DST / f'{slug}.md').write_text('\n'.join(fm_out) + '\n\n' + text, encoding='utf-8')
    print(f'{slug}: {category} {date} refs={len(refs)} tags={tags}')
