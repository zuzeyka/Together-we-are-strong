# Together We Made Power: design system

Written 2026-11-10. The rules for every page of the site: colours, type, layout, components, imagery, motion, accessibility and speed budgets. The phases that apply it are in `REDESIGN_PLAN.md`.


## Concept: "Warm hands, clear ledger"
- Warm paper and deep ink, the logo's blue as the trustworthy main colour, and sunflower yellow only where the user should act (Donate).
- Real, consented photos of people doing things, not suffering.
- Numbers are always dated and sourced.
- Calm motion, generous whitespace, one font.

**One name everywhere:** "Together We Made Power" (TWMP), the name in the logo and domain. Confirm with the user before writing it into copy.

## Colour tokens (CSS variables; Tailwind reads them)

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#FBF8F2` warm paper | `#0B1622` deep navy | page |
| `--surface` | `#FFFFFF` | `#13233A` | cards, header, sheets |
| `--sunk` | `#F2EDE3` | `#08111B` | footer, alternating sections |
| `--tint` | `#E8F1FA` | `#102B47` | highlight sections (impact, trust) |
| `--text` | `#0E1B2C` | `#F4F1EA` | body and headings |
| `--muted` | `#4A5568` | `#A9B4C2` | secondary text, captions |
| `--primary` | `#0B5FA5` | `#6CB4F5` | links, secondary buttons, icons, focus |
| `--primary-hover` | `#084A82` | `#94C9F8` | hover/pressed |
| `--on-primary` | `#FFFFFF` | `#0B1622` | text on a primary fill |
| `--accent` | `#FFD43B` | `#FFD43B` | Donate fill, progress bars, highlights (fill only) |
| `--on-accent` | `#0E1B2C` | `#0E1B2C` | text on the accent |
| `--success` | `#1F7A4D` | `#4CC38A` | goal reached, "Copied" |
| `--danger` | `#B42318` | `#FF8A80` | errors |
| `--border` | `#E2DCD0` | `#22354F` | dividers (decorative) |
| `--input-border` | `#7A8597` | `#5B6B80` | form fields (needs ≥ 3:1) |

**Contrast (computed):**
- Text: light 16.4 / dark 16.2.
- Muted: 7.1 / 8.7.
- Primary text: 6.2 / 8.2.
- Ink on accent: 12.2.
- On-primary on primary: 6.6 / 8.2.
- Success and danger: ≥ 5.0.
- All text pairs pass AA (4.5) in both modes, on bg, surface and tint.

**Rules:**
- Yellow is never text or thin lines on light backgrounds (1.34:1), only fills with ink text.
- Never use the flag pair as big blocks of blue next to yellow.
- One accent action per screen.
- The logo keeps its own colours (`#1c9bd7` / `#fae81b`). On dark, use the logo on a light chip or a light variant.
- Delete the old tokens and every hard-coded colour (`blue-500`, `purple-600`, `pink-500`, gradients, `#646cff` glow).

## Typography
- **Font:** Onest (variable, 400–700), self-hosted WOFF2, Latin plus Cyrillic subsets (`unicode-range`), `font-display: swap`, a metric-matched fallback (`size-adjust` on Arial) so text doesn't jump.
- Preload only the Cyrillic or Latin file matching the default language.
- **Remove** Rubik (Google link), Poppins and Montserrat.

**Scale** (mobile → desktop, fluid `clamp`):

| Style | Size | Weight | Line height |
|---|---|---|---|
| Display | 36 → 56 px | 700 | 1.1 |
| H1 | 30 → 44 | 700 | 1.15 |
| H2 | 24 → 32 | 650 | 1.2 |
| H3 | 20 → 22 | 600 | 1.3 |
| Body | 17 | 400 | 1.6 |
| Small | 15 | 400 | 1.5 |
| Caption | 13 | 500 | 1.4 |
| Numbers (stats, amounts) | — | 700 | `tabular-nums` |

- Line length is at most 68 characters.
- Ukrainian text runs about 15% longer, so never fix widths to the English text.
- Sentence case for headings; no ALL CAPS paragraphs.

## Layout and spacing
- Spacing on a 4 px scale (4, 8, 12, 16, 24, 32, 48, 64, 96).
- Section padding: 64 px on mobile, 96 px on desktop.
- Container max 1200 px, text column max 720 px. 4/8/12-column grid at 360/768/1200 px.
- Radius: 8 px for inputs and buttons, 16 px for cards, full for pills and avatars. No other values.
- Shadow:
  - Light: one soft card shadow (`0 1px 2px rgb(14 27 44 / .06), 0 8px 24px rgb(14 27 44 / .06)`).
  - Dark: borders instead of shadows.
- Images: 16 px radius, `object-fit: cover`, fixed aspect ratios (3:2 cards, 16:9 hero, 1:1 team).

## Components
- **Buttons:**
  - Primary "Donate" = accent fill with ink text, 48 px tall.
  - Secondary = primary outline or filled primary.
  - Tertiary = text link with underline on hover.
  - Real `<a>`/`<button>` elements, never a link inside a Button.
  - At least 44×44 px touch targets (WCAG 2.5.8 needs 24).
- **Header:** sticky, surface colour, with the logo, 5 links, the EN/УК switch (one segmented control, the current language marked) and the Donate button. On mobile: a menu sheet, plus a sticky bottom "Donate" bar that never hides the focused element.
- **Campaign card:**
  - 3:2 photo, status chip (Active / Completed + date), title, a 2-line summary always visible (no hover-only text), and a progress bar (accent on sunk) with "₴x of ₴y".
  - One card per row on mobile, 2 on tablet, 3 on desktop.
- **Stat:** big tabular number, label, and "as of <month year>, source".
- **Payment detail row:** label, value in mono, a copy button with "Copied ✓" (success), and an optional QR.
- **Trust block:** legal name, EDRPOU, registration, "Reports" link, last-updated date.
- **Story:** a consented photo, name or role, a short quote, and the outcome.
- **Footer:**
  - contacts (email, Instagram, other socials)
  - legal details
  - reports
  - privacy
  - the language switch
- **Focus:** a 2 px `--primary` ring with 2 px offset everywhere, never removed, and never hidden under the sticky header (`scroll-margin-top`).

## Imagery
- Documentary, consented photos of volunteers, recipients and partners in action, with dignity (Dóchas code). No shock or pity images, no stock photos.
- Each photo has a real alt text in both languages.
- Delivery: AVIF, then WebP, then JPEG fallback via `<picture>`, `srcset` 480/960/1600 px, explicit width and height.
- `loading="lazy"` everywhere except the hero image (`fetchpriority="high"`).

## Motion
- At most two motions: a 200 ms fade/slide when sections enter (once), and hover/press feedback.
- No marquees or autoplay carousels.
- Respect `prefers-reduced-motion`: no motion at all.
- **Background video replaced:** a still hero photo, plus an optional short 720p H.264/WebM clip (10–15 s, under 3 MB, muted, poster, `preload="none"`) that only plays on fast connections.

## Accessibility and performance rules
- WCAG 2.2 AA:
  - contrast as above
  - every control keyboard-reachable, with a skip link
  - `<html lang>` follows the language, and the language lives in the URL (`/en`, `/uk`)
  - forms have labels
- **Budgets per page:**
  - LCP ≤ 2.5 s on mobile 4G (Core Web Vitals at the 75th percentile)
  - CLS ≤ 0.1, INP ≤ 200 ms
  - first view under 1.5 MB, JS under 150 KB gzip
  - no single image over 300 KB, no video over 5 MB
- Pages load only the current language's strings.


## Strict rules (v2, 2026-11-11)
These rules are enforced by `npm run check:design` (`scripts/check-design.mjs`), which fails the build on a violation.

### 1. Text and background: only these pairs
| Text | On | Ratio (light / dark) |
|---|---|---|
| `text-ink` | `bg-bg`, `bg-surface`, `bg-sunk`, `bg-tint` | 16.4 / 16.2 |
| `text-muted` | same | 7.1 / 8.7 |
| `text-primary` (links, small accents) | same | 6.2 / 8.2 |
| `text-accent-on` (dark ink) | `bg-accent` (yellow) | 12.2 |
| `text-primary-on` | `bg-primary` | 6.6 / 8.2 |
| `text-white` | **only** inside `.on-photo` (a photo or the navy brand band) | ≥ 7 |

**Banned anywhere:**
- `text-white` outside `.on-photo`
- `text-accent` (yellow text) and `text-black`
- Tailwind palette colours (`gray-*`, `blue-*`, `red-*`, …), hex colours in classes, and gradients
- the old aliases `secondary*`, `typography*`, `background`

### 2. Yellow
- Yellow is used for **one** button per screen (Donate), progress fills, and the selected-state chip.
- Never as text, a thin line, or a section background.

### 3. The logo
- Always the full mark (ring, hands, text) from `/media/logo-*.png`, on a light surface or a white disc in dark mode, and never smaller than 40 px.
- Next to it, the wordmark "Together We Made Power" in `text-ink`.

### 4. Layout
- Every section is `py-16 md:py-24`, its content in `max-w-container mx-auto px-4 md:px-6`.
- Sections alternate `bg-bg` and `bg-sunk`, with one `bg-tint` for impact.
- Card grids: 1 column under 640 px, 2 from 640 px, 3 from 1024 px.

### 5. Information is never hover-only
- Summaries, roles and descriptions are always visible.
- Hover only changes shadow or colour.

### 6. Copy
- **Headings:** 2–6 words. **Paragraphs:** at most 3 sentences.
- **Buttons:** verbs ("Donate", "See all campaigns", "Copy IBAN").
- Every number says what it counts.

### 7. Media
- Every image goes through `<Picture>` with `sizes`.
- Only the first visible image is `priority`.
- No autoplay video, no carousel that moves by itself.

### 8. Links and pages
- Language in the URL (`/en/…`, `/uk/…`).
- Internal links stay in the same tab.
- External links get `rel="noopener"` and an icon.
