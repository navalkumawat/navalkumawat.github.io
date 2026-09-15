# navalkumawat.github.io

Personal portfolio for **Naval Kishor Kumawat** — VP of Technology at BlueNotary LLC.

Live at **https://navalkumawat.github.io**

---

## What this is

A single-page, dependency-free static site. No build step, no framework, no `node_modules`.
Three files do all the work:

```
index.html                         markup + content + SEO/JSON-LD
assets/css/styles.css              design tokens, layout, components, responsive, print
assets/js/main.js                  theme toggle, scroll reveal, counters, nav, mobile menu
assets/img/og.png                  social share card (1200×630)
assets/Naval-Kishor-Kumawat-Resume.pdf
404.html  robots.txt  sitemap.xml  .nojekyll
```

Features: dark/light theme with saved preference, scroll-reveal animations, animated
stat counters, scroll progress bar, active-section nav highlighting, cursor spotlight on
cards, full keyboard accessibility, `prefers-reduced-motion` support, print stylesheet,
Open Graph + Twitter cards, and Schema.org `Person` structured data.

---

## Publishing to GitHub Pages

The repo is initialised locally with `origin` already pointing at
`https://github.com/navalkumawat/navalkumawat.github.io.git`.

### Step 1 — rename the GitHub account to `navalkumawat`

A user site only serves from the root domain when the repo is named
`<username>.github.io`, so the account name has to match.

github.com → avatar → **Settings** → **Account** → *Change username* → `navalkumawat`

GitHub redirects the old `naval240221` repo URLs and git operations, so nothing
breaks immediately. Update other clones when convenient:

```bash
git -C ~/workspace/divyanav remote set-url origin git@github.com:navalkumawat/divyanav.git
```

> Renaming frees `naval240221` for anyone else to claim. That only matters if an
> old link to it is published somewhere you do not control.

### Step 2 — create the repository

https://github.com/new

- Owner: **navalkumawat**
- Repository name: **`navalkumawat.github.io`** (must match exactly)
- Visibility: **Public** — a free account cannot serve Pages from a private user site
- Do **not** tick *Add a README*, *.gitignore* or *licence* — this repo already has them

### Step 3 — create a personal access token

None of the SSH keys on this machine authenticate to GitHub, so push over HTTPS.

https://github.com/settings/tokens → **Generate new token (classic)**

- Note: `portfolio push`
- Expiration: your call — 90 days is a reasonable default
- Scope: tick **`repo`** only

Copy the token now; GitHub shows it once.

### Step 4 — push

```bash
cd ~/workspace/navalkumawat.github.io
git push -u origin main
```

When prompted:

- **Username:** `navalkumawat`
- **Password:** paste the **token** (not your GitHub password)

macOS keychain stores it, so later pushes need no credentials.

### Step 5 — turn on Pages

Repo → **Settings** → **Pages** → *Build and deployment*:

- Source: **Deploy from a branch**
- Branch: **main**, folder: **/ (root)** → **Save**

Live at **https://navalkumawat.github.io** in a minute or two. The *Actions* tab
shows the deploy running if you want to watch it.

### Verifying

```bash
curl -sI https://navalkumawat.github.io | head -1          # expect HTTP/2 200
```

If you get a 404, give it another minute — the first deploy is the slow one.

---

## Editing

Everything is plain HTML. To change content, open `index.html` and edit the text — the
sections are marked with comment banners (`HERO`, `ABOUT`, `EXPERIENCE`, `WORK`,
`SKILLS`, `EDUCATION`, `CONTACT`).

Common edits:

| I want to… | Where |
|---|---|
| Change a colour | `assets/css/styles.css` → the `:root` block (and `[data-theme='light']`) |
| Add a job | copy an `<li class="job">` block in the `EXPERIENCE` section |
| Add a project | copy an `<article class="card">` block in the `WORK` section |
| Update the résumé PDF | replace `assets/Naval-Kishor-Kumawat-Resume.pdf`, same filename |
| Change years of experience | it is computed automatically from `CAREER_START` in `assets/js/main.js` |

Preview locally by opening `index.html` in a browser, or:

```bash
python3 -m http.server 8000     # then visit http://localhost:8000
```

Ship a change:

```bash
git add -A && git commit -m "Update experience section" && git push
```

Pages redeploys automatically.

---

## Custom domain (optional)

1. Create a file named `CNAME` in the repo root containing just your domain, e.g. `naval.dev`
2. At your DNS provider, point the apex record at GitHub's Pages IPs (`185.199.108–111.153`),
   or `CNAME` a subdomain to `navalkumawat.github.io`
3. Repo → Settings → Pages → Custom domain → enter it → tick **Enforce HTTPS**
4. Update the absolute URLs in `index.html` (`og:url`, `canonical`, `og:image`), `robots.txt` and `sitemap.xml`

---

## Regenerating the social card

`assets/img/og.png` was rendered from HTML with headless Chrome. To redo it after a
content change, re-render any 1200×630 page:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --window-size=1200,630 --virtual-time-budget=6000 \
  --screenshot=assets/img/og.png file:///path/to/card.html
```
