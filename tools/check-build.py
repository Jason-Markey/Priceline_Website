#!/usr/bin/env python3
"""Build-time checks for dist/. Run after `npm run build`:  python3 tools/check-build.py
Fails (exit 1) on: missing/duplicate H1, duplicate <title>, broken internal links, blocked words,
medicine names that can't be advertised (MEDICINES), missing meta description, title > 60 chars,
description outside 120–165 chars (warning only).
"""
import re, sys, pathlib, html

DIST = pathlib.Path('dist')
# Words that must never appear in public copy (old booking links; removed pages; claims the Code doesn't allow)
BLOCKED = [
    'healthengine', 'servicebookings', 'audiology-services', 'wp-content', 'wp-admin',
    'testimonial', 'guaranteed', 'miracle', 'clinically proven', 'dermatologist recommended', 'dermatologist-recommended',
]
# Medicines the public may not be advertised: Schedule 4 and 8, and Schedule 3 (the site names none, rather than relying
# on Appendix H), plus product types and narrow classes that point to them. Checked in everything published: text,
# titles, descriptions, alt text and structured data (URLs excluded). Pharmacy Medicines and general sale medicines
# are fine to name; broad words like "antibiotics" stay allowed for safety warnings.
MEDICINES = [
    # Contraception, including emergency contraception
    'levonorgestrel', 'ulipristal', 'postinor', 'ellaone', 'morning-after pill', 'morning after pill', 'emergency contraceptive pill',
    'yasmin', 'levlen', 'microgynon', 'slinda', 'noriday', 'microlut', 'implanon', 'depo-provera', 'nuvaring', 'mirena', 'kyleena',
    'vaginal ring', 'contraceptive injection', 'mini-pill', 'progestogen-only pill', 'drospirenone', 'desogestrel', 'norethisterone',
    'cyproterone', 'etonogestrel', 'medroxyprogesterone', 'ethinylestradiol',
    # Weight
    'ozempic', 'wegovy', 'mounjaro', 'saxenda', 'zepbound', 'trulicity', 'semaglutide', 'tirzepatide', 'liraglutide', 'dulaglutide', 'glp-1',
    'weight-loss injection', 'weight loss injection', 'weight-loss medicine', 'weight loss medicine', 'weight-loss medication', 'weight loss medication',
    'orlistat', 'xenical', 'phentermine', 'duromine', 'contrave',
    # Pain, migraine, sleep and nausea
    'codeine', 'panadeine', 'mersyndol', 'tramadol', 'tapentadol', 'oxycodone', 'endone', 'morphine', 'fentanyl', 'methadone', 'buprenorphine',
    'celecoxib', 'meloxicam', 'naproxen', 'mefenamic', 'modified-release paracetamol', 'slow-release paracetamol', 'panadol osteo', 'osteomol',
    'triptan', 'sumatriptan', 'rizatriptan', 'zolmitriptan', 'naratriptan', 'eletriptan', 'migraine-specific',
    'melatonin', 'circadin', 'doxylamine', 'restavit', 'promethazine', 'phenergan', 'diphenhydramine', 'dexchlorpheniramine', 'pheniramine',
    'cyproheptadine', 'zolpidem', 'temazepam', 'diazepam', 'valium', 'alprazolam', 'xanax', 'benzodiazepine',
    'prochlorperazine', 'stemetil', 'metoclopramide', 'maxolon', 'ondansetron', 'zofran', 'domperidone',
    # Reflux
    'esomeprazole', 'omeprazole', 'pantoprazole', 'rabeprazole', 'lansoprazole', 'nexium', 'somac', 'losec', 'pariet',
    'proton pump inhibitor', 'ppi', 'famotidine', 'ranitidine', 'nizatidine', 'cimetidine', 'h2 blocker',
    # Infections
    'amoxicillin', 'cefalexin', 'cephalexin', 'doxycycline', 'minocycline', 'tetracycline', 'quinolone', 'azithromycin', 'clarithromycin',
    'erythromycin', 'roxithromycin', 'trimethoprim', 'nitrofurantoin', 'ciprofloxacin', 'metronidazole', 'tinidazole', 'clindamycin',
    'flucloxacillin', 'penicillin', 'mupirocin', 'chloramphenicol', 'chlorsig', 'fluconazole', 'diflucan', 'itraconazole', 'nystatin',
    'antifungal tablet', 'antibiotic tablet', 'valaciclovir', 'famciclovir', 'oseltamivir', 'tamiflu', 'zanamivir',
    'paxlovid', 'molnupiravir', 'ivermectin', 'malaria tablet', 'antimalarial', 'malarone', 'atovaquone',
    # Skin and hair
    'hydrocortisone', 'cinchocaine', 'betamethasone', 'mometasone cream', 'clobetasol', 'methylprednisolone', 'advantan', 'elocon', 'kenalog',
    'triamcinolone paste', 'prednisolone', 'prednisone', 'tretinoin', 'isotretinoin', 'roaccutane', 'oratane', 'adapalene', 'differin',
    'epiduo', 'tazarotene', 'prescription retinoid', 'hydroquinone', 'pimecrolimus', 'tacrolimus',
    'finasteride', 'dutasteride', 'propecia', 'spironolactone',
    # Breathing and allergy
    'salbutamol', 'terbutaline', 'ventolin', 'asmol', 'airomir', 'bricanyl', 'symbicort', 'seretide', 'montelukast', 'singulair',
    'pseudoephedrine', 'sudafed', 'adrenaline autoinjector', 'adrenaline auto-injector', 'epipen', 'anapen', 'allergen immunotherapy',
    'naloxone', 'nyxoid',
    # Heart, diabetes and other regular medicines
    'warfarin', 'apixaban', 'rivaroxaban', 'dabigatran', 'clopidogrel', 'atorvastatin', 'rosuvastatin', 'simvastatin', 'statin',
    'ezetimibe', 'perindopril', 'ramipril', 'candesartan', 'irbesartan', 'telmisartan', 'amlodipine', 'metoprolol', 'bisoprolol', 'atenolol',
    'beta blocker', 'metformin', 'gliclazide', 'sitagliptin', 'empagliflozin', 'dapagliflozin', 'jardiance', 'forxiga',
    'levothyroxine', 'thyroxine', 'allopurinol', 'colchicine', 'bisphosphonate', 'alendronate', 'denosumab', 'prolia',
    'sertraline', 'escitalopram', 'fluoxetine', 'venlafaxine', 'desvenlafaxine', 'duloxetine', 'mirtazapine', 'amitriptyline', 'ssri',
    'quetiapine', 'pregabalin', 'gabapentin', 'methylphenidate', 'ritalin', 'dexamfetamine', 'lisdexamfetamine', 'vyvanse',
    # Smoking and vaping (vapes can't be advertised at all)
    'champix', 'varenicline', 'zyban', 'bupropion', 'cytisine', 'nicotine vape', 'nicotine pouch',
    # Men's health and cannabis
    'viagra', 'cialis', 'levitra', 'sildenafil', 'tadalafil', 'testosterone', 'medicinal cannabis', 'cannabidiol', 'cbd oil',
    # Vaccine brands and product types (vaccinations are described by disease only)
    'shingrix', 'zostavax', 'gardasil', 'prevenar', 'pneumovax', 'vaxneuvance', 'capvaxive', 'boostrix', 'adacel', 'infanrix', 'dtpa', 'tdap',
    'comirnaty', 'spikevax', 'nuvaxovid', 'arexvy', 'abrysvo', 'mresvia', 'beyfortus', 'nirsevimab', 'fluad', 'fluarix', 'vaxigrip',
    'afluria', 'influvac', 'flucelvax', 'efluelda', 'adjuvanted', 'qdenga', 'bexsero', 'trumenba', 'nimenrix', 'menquadfi', 'menveo',
    'priorix', 'proquad', 'varivax', 'varilrix', 'engerix', 'h-b-vax', 'havrix', 'vaqta', 'twinrix', 'typhim', 'vivotif', 'vivaxim',
    'dukoral', 'imojev', 'jespect', 'ixiaro', 'rabipur', 'verorab', 'stamaril',
    # Cosmetic injectables
    'anti-wrinkle injection', 'botox', 'dysport',
]
# Names whose schedule depends on the form or pack: allowed only in their pharmacy form, so a warning to check the context
MEDICINES_REVIEW = ['insulin', 'aciclovir', 'acyclovir', 'diclofenac', 'hyoscine', 'minoxidil', 'amorolfine', 'econazole', 'bifonazole', 'tranexamic']
TITLE_RE = re.compile(r'<title>(.*?)</title>', re.S)
H1_RE = re.compile(r'<h1[^>]*>', re.I)
DESC_RE = re.compile(r'<meta name="description" content="([^"]*)"')
HREF_RE = re.compile(r'href="([^"#?]+)')
STRIP_RE = re.compile(r'<script.*?</script>|<style.*?</style>|<[^>]+>', re.S)
ATTR_RE = re.compile(r'\s(?:alt|title|aria-label|content)="([^"]*)"')
LD_RE = re.compile(r'<script type="application/ld\+json">(.*?)</script>', re.S)
URL_RE = re.compile(r'https?://\S+')


def find_words(words, text, plurals=False):
    end = r'(?:s|es)?(?![a-z0-9])' if plurals else r'(?![a-z0-9])'
    return [w for w in words if re.search(r'(?<![a-z0-9])' + re.escape(w) + end, text)]


def check_medicines(where, text):
    text = ' ' + URL_RE.sub(' ', html.unescape(text)).lower() + ' '
    # Plurals count too ("triptans", "autoinjectors")
    for w in find_words(MEDICINES, text, plurals=True): errors.append(f'{where}: medicine that can\'t be advertised "{w}"')
    for w in find_words(MEDICINES_REVIEW, text, plurals=True): warnings.append(f'{where}: check "{w}" is only named in its pharmacy form')

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
    for w in find_words(BLOCKED, text):
        errors.append(f'{route}: blocked word "{w}"')
    # medicines: visible text plus titles, descriptions, alt text and structured data
    check_medicines(route, ' '.join([text, *ATTR_RE.findall(src), *LD_RE.findall(src)]))

for extra in ('llms.txt', 'rss.xml'):
    if (DIST / extra).exists():
        check_medicines('/' + extra, STRIP_RE.sub(' ', (DIST / extra).read_text(encoding='utf-8')))

print(f'{len(pages)} pages checked')
for w in warnings: print('WARN', w)
for e in errors: print('ERROR', e)
sys.exit(1 if errors else 0)
