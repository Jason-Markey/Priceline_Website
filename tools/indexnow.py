#!/usr/bin/env python3
"""Tell Bing (and the other IndexNow search engines) which pages changed, so new and updated pages are
recrawled within hours instead of weeks. Bing's index feeds ChatGPT search, Copilot and DuckDuckGo.

    python3 tools/indexnow.py --since HEAD~1     # pages whose dist/ HTML changed in the last commit
    python3 tools/indexnow.py https://pricelinepacificfair.com.au/some-page/ ...

Runs from GitHub Actions after a push to main (see .github/workflows/indexnow.yml and scheduled-rebuild.yml).
The site deploys by a cPanel cron that pulls every 5 minutes, so the workflow waits before calling this, and
this script also waits until the key file is live. It never fails the workflow: problems are printed only.
No account is needed: the key file in public/ proves we own the site.
"""
import json, subprocess, sys, time, urllib.error, urllib.request

SITE = 'https://pricelinepacificfair.com.au'
HOST = 'pricelinepacificfair.com.au'
KEY = 'd453aba426cec5f9df251eb8c387754c'
KEY_URL = f'{SITE}/{KEY}.txt'
ENDPOINT = 'https://api.indexnow.org/indexnow'
SKIP = ('/404/', '/search/')


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


def key_is_live(tries=6, wait=60):
    for i in range(tries):
        try:
            with urllib.request.urlopen(KEY_URL, timeout=20) as r:
                if r.status == 200 and r.read().decode().strip() == KEY:
                    return True
        except Exception as e:  # not deployed yet, or a network hiccup
            print(f'key file not reachable yet ({e}); attempt {i + 1}/{tries}')
        time.sleep(wait)
    return False


def main(argv):
    if argv[:1] == ['--since']:
        urls = changed_urls(argv[1] if len(argv) > 1 else 'HEAD~1')
    else:
        urls = [u for u in argv if u.startswith(SITE)]
    if not urls:
        print('IndexNow: no changed pages to submit')
        return 0
    if not key_is_live():
        print('IndexNow: key file is not live, skipping this time')
        return 0
    body = json.dumps({'host': HOST, 'key': KEY, 'keyLocation': KEY_URL, 'urlList': urls[:10000]}).encode()
    req = urllib.request.Request(ENDPOINT, data=body, method='POST',
                                 headers={'Content-Type': 'application/json; charset=utf-8'})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            print(f'IndexNow: submitted {len(urls)} URL(s), HTTP {r.status}')
    except urllib.error.HTTPError as e:
        print(f'IndexNow: HTTP {e.code} {e.reason}: {e.read()[:300]!r}')
    except Exception as e:
        print(f'IndexNow: request failed: {e}')
    for u in urls[:50]:
        print('  ', u)
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
