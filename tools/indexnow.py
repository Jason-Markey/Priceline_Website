#!/usr/bin/env python3
"""Tell Bing (and the other IndexNow search engines) which pages changed, so new and updated pages are
recrawled within hours instead of weeks. Bing's index feeds ChatGPT search, Copilot and DuckDuckGo.

    python3 tools/indexnow.py --since HEAD~1     # pages whose dist/ HTML changed in the last commit
    python3 tools/indexnow.py --all              # every URL in the sitemap (first submission, or a refresh)
    python3 tools/indexnow.py https://pricelinepacificfair.com.au/some-page/ ...

Runs from GitHub Actions after a push to main (see .github/workflows/indexnow.yml and scheduled-rebuild.yml).
The site deploys by a cPanel cron that pulls every 5 minutes, so the workflow waits before calling this, and
this script also checks the key file is live first. It never fails the workflow: results are printed and also
written as GitHub annotations (::notice / ::warning), which show on the run's summary page.
No account is needed: the key file in public/ proves we own the site.
"""
import json, re, subprocess, sys, time, urllib.error, urllib.request

SITE = 'https://pricelinepacificfair.com.au'
HOST = 'pricelinepacificfair.com.au'
KEY = 'd453aba426cec5f9df251eb8c387754c'
KEY_URL = f'{SITE}/{KEY}.txt'
ENDPOINT = 'https://api.indexnow.org/indexnow'
SKIP = ('/404/', '/search/')
# Shared hosting firewalls often reject Python's default user agent, so identify ourselves plainly.
UA = 'Mozilla/5.0 (compatible; PricelinePacificFair-IndexNow/1.0; +https://pricelinepacificfair.com.au/)'


def note(level, msg):
    print(f'::{level} title=IndexNow::{msg}')


def changed_urls(since):
    out = subprocess.run(['git', 'diff', '--name-only', since, 'HEAD', '--', 'dist'],
                         capture_output=True, text=True, check=True).stdout.split()
    urls = []
    for f in out:
        if not f.endswith('index.html') or '/pagefind/' in f or '/_astro/' in f:
            continue
        path = '/' + f[len('dist/'):-len('index.html')]
        if path in SKIP:
            continue
        urls.append(SITE + path)
    return sorted(set(urls))


def sitemap_urls():
    xml = open('dist/sitemap-0.xml', encoding='utf-8').read()
    return sorted(u for u in re.findall(r'<loc>([^<]+)</loc>', xml) if not any(s in u for s in SKIP))


def key_is_live(tries=3, wait=60):
    last = ''
    for i in range(tries):
        try:
            req = urllib.request.Request(KEY_URL, headers={'User-Agent': UA})
            with urllib.request.urlopen(req, timeout=20) as r:
                if r.status == 200 and r.read().decode().strip() == KEY:
                    return True, ''
                last = f'HTTP {r.status}, unexpected content'
        except Exception as e:  # not deployed yet, a firewall, or a network hiccup
            last = str(e)
        print(f'key file check {i + 1}/{tries}: {last}')
        if i + 1 < tries:
            time.sleep(wait)
    return False, last


def main(argv):
    if argv[:1] == ['--since']:
        urls = changed_urls(argv[1] if len(argv) > 1 else 'HEAD~1')
    elif argv[:1] == ['--all']:
        urls = sitemap_urls()
    else:
        urls = [u for u in argv if u.startswith(SITE)]
    if not urls:
        print('IndexNow: no changed pages to submit')
        return 0
    live, why = key_is_live()
    if not live:
        # The search engines fetch the key file themselves (from their own servers), so a failed check from
        # GitHub's network isn't a reason to skip: submit anyway and flag it.
        note('warning', f'Could not read the key file from GitHub ({why}); submitting anyway.')
    body = json.dumps({'host': HOST, 'key': KEY, 'keyLocation': KEY_URL, 'urlList': urls[:10000]}).encode()
    req = urllib.request.Request(ENDPOINT, data=body, method='POST',
                                 headers={'Content-Type': 'application/json; charset=utf-8', 'User-Agent': UA})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            note('notice', f'Submitted {len(urls)} URL(s): HTTP {r.status} (200 or 202 means accepted).')
    except urllib.error.HTTPError as e:
        note('warning', f'HTTP {e.code} {e.reason}: {e.read()[:200]!r}')
    except Exception as e:
        note('warning', f'Request failed: {e}')
    for u in urls[:50]:
        print('  ', u)
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
