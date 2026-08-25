# Team photos

Drop headshots here, then uncomment the matching `photo:` line in
`src/content/site.ts`. Square images crop best (they're shown in a circle).

**Then run `npm run optimize:images`.** A headshot straight from a phone or a
camera is several thousand pixels wide, and this site serves it at exactly that
size — the static export has no image optimization server, so `next/image`
cannot resize anything. One 2644x2644 file was being downloaded to fill a 48px
circle. The command resizes to the 384px budget in place, keeps the filename, and
strips EXIF (including any GPS coordinates a camera recorded). CI rejects an
oversized image, so this is not optional. See
[CONTRIBUTING.md](../../CONTRIBUTING.md) for the full budget table.

Status (founder + Summer 2026 researchers):

- `yorke.jpg` — Yorke E Rhodes III (founder) ✅
- `carolina.jpg` — Carolina de Almeida Pernambuco Moron ✅
- `melanie.jpg` — Melanie MacKew ✅
- `carlos.jpg` — Carlos D. Ruiz ✅
- `india.jpg` — India Clarke ✅
- `yago.jpg` — Yago Rocha ✅
- `christine.jpg` — Christine Lumen ✅
- `alana.jpg` — Alana Robertson ✅
- `alex.jpg` — Alex Du (staff) ✅
- `hannah.jpg` — Hannah Zhao (staff/collaborator) ✅
- `kirsten.jpeg` — Kirsten Co (collaborator) ✅
- `alexa.jpeg` — Alexa Shamie (Fall 2025) ✅
- `mohagani.jpg` — Mohagani Townsend (Fall 2025) ✅
- `amanda.jpg` — Amanda Lindsey (Fall 2025) ✅
- `taylor.jpg` — Taylor Badt (Fall 2025) ✅
- `vedant.png` — Vedant Jain (Fall 2025) ✅
- `grace.jpg` — Grace Driscoll (Fall 2025) ✅
- `pegi.jpg` — Pegi Bracaj (Fall 2025) — still needed; her card falls back to
  initials until a headshot is added, then uncomment `photo:` in site.ts
- `adeline.jpg` — Adeline Daab (collaborator) ✅

`.png` works too — just match the extension in the `photo:` path.
