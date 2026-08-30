# Cinematic Videographer — One-Page Site

A minimal, premium, mobile-first single-page site for a videographer.
Pure static HTML/CSS/JS — **no backend, no build step**. The booking form
sends everything straight to WhatsApp.

## Edit everything in one place

All changeable content and assets live in **`js/config.js`**.
Change a value there and it updates everywhere automatically (e.g. the
WhatsApp number is used by both the booking form and the footer).

### Swap the images
Replace these two files (keep the same names) — nothing else to change:

| File | Used in | Recommended |
|------|---------|-------------|
| `assets/hero-poster.jpg` | Full-screen hero | Tall / portrait-friendly, clean (no text) |
| `assets/profile.jpg` | About section | Portrait, ~4:5 |

> The current images are placeholders. Just overwrite them.

### Change the WhatsApp number
In `js/config.js` → `contact.whatsapp`. Use full international format,
digits only (no `+`, spaces or dashes). e.g. `919876543210`.

### Cities
`js/config.js` → `booking.cities`.

### No logo?
Leave `brand.logo` as `null` — the site uses the text wordmark
(`brand.name`). If you get a logo later, set `brand.logo` to its path.

## Run locally
Any static server works:

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Structure
```
index.html        markup
css/style.css     all styles
js/config.js      << EDIT THIS — all content & assets
js/app.js         binding, animations, booking -> WhatsApp
assets/           images (replace the placeholders)
```
