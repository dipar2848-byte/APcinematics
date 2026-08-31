# AP Cinematic — one-page site

A premium, cinematic single-page site for **AP Cinematic** (social-media video
creator). Pure static HTML/CSS/JS — **no backend, no build step**. Booking goes
straight to WhatsApp.

## Everything is edited in ONE place: `js/config.js`

Business name, WhatsApp number, Instagram, email, city list, all copy and image
paths live in that single config object. Change it once and every section
updates automatically (e.g. the WhatsApp number is shared by the booking form
and the footer).

### Change the WhatsApp number
`js/config.js` → `contact.whatsapp`. Full international format, digits only
(no `+`, spaces or dashes), e.g. `919876543210`.

### Swap images (keep the same filenames — nothing else to change)
| File | Where it shows |
|------|----------------|
| `assets/poster.jpg` | The poster / campaign section |
| `assets/profile.jpg` | About portrait |

> Both are placeholders right now — just overwrite them.

### Service cities (booking dropdown)
`js/config.js` → `booking.cities`.

### Logo
No logo image is supplied, so the text wordmark (`brand.name`) is used. If you
get a logo later, set `brand.logo` to its path.

## Colour system
Derived from the poster: deep navy/indigo base, electric cyan/blue, magenta/
crimson, warm gold, white. The atmospheric light spills are recreated in pure
CSS (layered radial gradients + blurred blobs + grain) — the poster image is
**not** used as the background.

## Run locally
```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Structure
```
index.html      markup
css/style.css   all styles + CSS atmosphere
js/config.js    << EDIT THIS — all content, links, images, cities
js/app.js       binding, animations, booking -> WhatsApp
assets/         poster.jpg, profile.jpg (replace these)
```
