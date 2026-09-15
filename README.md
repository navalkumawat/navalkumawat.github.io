# navalkumawat.github.io

My portfolio. Static HTML, no build step, no dependencies.

```
index.html              the page
writing/                case studies
assets/css/styles.css   everything visual
assets/js/main.js       theme, nav, scroll behaviour
assets/img/             og cards, profile photo
```

## Local

```bash
python3 -m http.server 8000
```

## Deploy

Push to `main`. GitHub Pages redeploys on its own.

```bash
git add -A && git commit -m "..." && git push
```

## Notes to self

- Years of experience come from `CAREER_START` in `main.js`, not the markup.
- New case study: copy an existing file in `writing/`, swap the `<head>` and the body,
  link it from its card in `index.html`, add it to `sitemap.xml`.
- Don't put `class="reveal"` on a long article body — the observer wants 12% of the
  element in view, which never happens on a phone, and the text stays invisible.
- OG cards are screenshots of a 1200×630 HTML page:
  `chrome --headless --window-size=1200,630 --screenshot=out.png file://card.html`
