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

The repo is already initialised locally with a first commit. To go live:

**1. Create the repo on GitHub**

Go to https://github.com/new and create a repository named exactly:

```
navalkumawat.github.io
```

Make it **Public**. Do **not** add a README, .gitignore or licence — this repo already has them.

**2. Push from this folder**

```bash
cd ~/workspace/navalkumawat.github.io
git remote add origin https://github.com/navalkumawat/navalkumawat.github.io.git
git push -u origin main
```

**3. Turn on Pages**

Repo → **Settings** → **Pages** → under *Build and deployment*:

- Source: **Deploy from a branch**
- Branch: **main**, folder: **/ (root)** → **Save**

The site is live at **https://navalkumawat.github.io** within a minute or two.
Because the repo is named `<username>.github.io`, it serves from the root domain —
no project-path prefix to worry about.

> A `<username>.github.io` repo must be **public** for Pages to work on a free account.

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
