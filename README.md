# Roshani Enterprises, website

A static one-page site for Roshani Enterprises, cement pavers and precast at Sancoale, South Goa. No build step: open `index.html`.

```
index.html              the page
assets/css/styles.css   tokens, layout, components (Hallmark stamp on line 1)
assets/js/main.js       menu, photograph slots, WhatsApp enquiry
assets/img/             five stand-in photographs (credited in the footer)
RESEARCH.md             what the business does, from public listings, with sources
.claude/skills/         design skills used to make the page (see INSTALLED.md; the skill bodies are gitignored)
```

## Design system

Built with Hallmark v2.0.0 on the **Formwork** theme, in the editorial genre: concrete paper, near-black ink, Oswald capitals over Archivo, square cast edges, hard shadows, one safety orange signal, black and white photographs. The theme's tokens live in `:root`; no colour or font is used outside them.

- Container 1440px, 64px gutters, 12-column rhythm.
- Type: display 84px down to 14px labels, all from the token scale.
- Accent under 5% of any screen: the primary button, the focus ring, the pressed state.
- Motion is a press on the button and a colour step on hover. Nothing animates on scroll.
- Photographs are greyscale via a CSS filter on the image, so swapping in colour files needs no editing.

## Editing points

| What | Where |
| --- | --- |
| WhatsApp number for enquiries | `SITE.whatsapp` at the top of `assets/js/main.js` (country code, digits only). Empty, the form opens WhatsApp's share sheet. |
| Product lines, specs, copy | `#range` rows in `index.html` |
| Facts about the yard | `.facts` list in `#yard` |
| Address, hours, listing link | `.facts--tight` in `#enquiry` |
| Photographs | replace files in `assets/img/`, or call `hallmarkSlots({ hero: 'your.jpg' })`; each `data-slot` also carries `data-alt` describing the picture that belongs there |
| Credits | `data-credits` paragraph in the footer |

The five photographs are Wikimedia Commons stand-ins, not the company's products. Replace them with the yard's own photos and update or remove the credit line for any file that leaves the page.

## Verification

Checked in a real browser at 320, 375, 390, 1280, 1440 and 1920 wide:

- hero headline, sentence and both actions inside the first screen at 1280 x 800 and 1920 x 1080
- no horizontal overflow at any of those widths
- all five images load; none broken
- hero text contrast sampled against the treated photograph and overlay: 5.76:1 at the worst point
- split section text and picture balance within 1px; photographs are 29% of the page below the hero
- menu opens, closes on a link, and reports `aria-expanded` correctly
- enquiry form composes the message and opens the WhatsApp URL with the fields encoded
- keyboard focus ring visible on every control, including on the dark panels

Not run: Hallmark's `sloplint` and its render tier, because Node is not installed on this machine. The floors were walked by hand against `gates.md` instead. `prefers-reduced-motion` is honoured by the only transition on the page.
