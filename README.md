# Neman Family Dentistry — concept redesign

A modern, static redesign of [nemanfamilydentistry.com](https://www.nemanfamilydentistry.com/),
built as a proof-of-concept. No build step, no backend — plain HTML, CSS, and
vanilla JS that deploys straight to GitHub Pages.

**This is an unofficial demo, not the live practice site.** External links
(booking, social) are stubbed; the forms validate and confirm but send nothing.

## Highlights

- **Dark / light mode** — toggle in the header, remembers your choice, respects
  your OS setting by default.
- **One content file** — every headline, phone number, address, service, and
  hour lives in [`content.js`](content.js). Change a value, refresh, done.
- **In-browser Edit mode** — click **Edit mode** (bottom of any page), then click
  any text to change it live. Changes persist on your device. **Export content.js**
  downloads the updated file to commit.
- **Interactive** — working contact form, a Book-a-visit modal, and real internal
  navigation across the five core pages.

## Run it locally

```bash
python3 -m http.server 8099
# then open http://127.0.0.1:8099
```

Any static server works; opening `index.html` directly also works.

## Structure

```
index.html          Home
about.html          About / Meet the team
services.html       Services
testimonials.html   Testimonials
contact.html        Contact (working demo form)
savings.html        Savings plan (teaser)
coming-soon.html    Generic stub for not-yet-built sections (?t=Title)
content.js          ← all editable copy (single source of truth)
css/styles.css      Theme + layout (CSS custom properties)
js/main.js          Hydration, theme, nav, forms, modal, Edit mode
```

## Editing content

Two ways, same source of truth:

1. **Edit the file.** Open `content.js`, change a value (e.g. a Friday closing
   time), save, refresh.
2. **Edit in the browser.** Click **Edit mode**, click the text, type. Hit
   **Export content.js** to download the updated file, then commit it.

## Deploy to GitHub Pages

1. Push this folder to a GitHub repo.
2. Repo **Settings → Pages → Build and deployment → Source: Deploy from a
   branch**, branch `main`, folder `/ (root)`.
3. The site publishes at `https://<username>.github.io/<repo>/`.

No Actions or build step required — the files are served as-is.

## Notes before going live

Hours and testimonials now match the live site. Still placeholder and worth
confirming with the practice: the dentists' bios (currently generic), the
headline stats (`10k+`, `4.9★`), the savings-plan copy, and the `hello@` email.
Real photography would replace the SVG art.
