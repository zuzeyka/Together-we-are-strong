#!/usr/bin/env python3
"""Make the site's share images, icons and sitemap (Open Graph, favicon, PWA icons, sitemap.xml).

Outputs (all in public/):
  og/default.png, og/home-en.png, og/home-uk.png, og/donate-en.png, og/donate-uk.png  1200x630
  icons/icon.svg            the logo as pure vectors (only with --svg; see below)
  icons/favicon.ico         16, 32, 48
  icons/apple-touch-icon.png  180, logo on white with padding
  icons/icon-192.png, icons/icon-512.png  logo on white inside the maskable safe zone
  sitemap.xml               every indexable route in en and uk, with hreflang alternates;
                            campaign ids are read from src/content/campaigns.ts, so re-run after adding one

Design (DESIGN_SYSTEM.md): warm paper #FBF8F2, ink #0E1B2C, muted #4A5568, primary #0B5FA5,
a sunflower #FFD43B bar, Onest from public/fonts. FreeType reads the WOFF2 files directly
(Latin and Cyrillic are separate subsets, so text is drawn in runs per script); if a font can't
be loaded the script falls back to DejaVu Sans and says so.

--svg rebuilds icons/icon.svg from the original logo (~/Archive/twmp-media-originals-2026-11-10/logo.svg):
its only raster, a 4501 px PNG of the blue-to-yellow ring, is redrawn as an SVG gradient ring in the
same coordinates, Illustrator ids are dropped, numbers are rounded to 0.1 and the view box is cropped
to the ring.

Needs Pillow and rsvg-convert. Run: python3 scripts/make_og.py [--svg [LOGO.svg]]
"""
import re
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
PUB = ROOT / "public"
ICON_SVG = PUB / "icons" / "icon.svg"
FONTS = PUB / "fonts"

PAPER, INK, MUTED, PRIMARY, ACCENT = "#FBF8F2", "#0E1B2C", "#4A5568", "#0B5FA5", "#FFD43B"
W, H, PAD = 1200, 630, 72

OG = {
    "default": ("Together We Made Power", "«Разом ми сила» · Ukrainian charity fund since 2022", "Charity fund · Благодійний фонд"),
    "home-en": ("Together We Made Power", "We help displaced families, children, hospitals, defenders and animals.", "Ukrainian charity fund · since 2022"),
    "home-uk": ("Разом ми сила", "Допомагаємо переселенцям, дітям, лікарням, захисникам і тваринам.", "Український благодійний фонд · з 2022 року"),
    "donate-en": ("Support the fund", "Bank transfer in hryvnias or euros, or PayPal. Every gift goes to our projects.", "Together We Made Power"),
    "donate-uk": ("Підтримати фонд", "Переказ у гривнях чи євро або внесок через PayPal. Усе йде на проєкти фонду.", "Разом ми сила"),
}


# ---------- logo ----------

def clean_svg(src: str) -> str:
    """The original logo minus its embedded raster, as compact vectors."""
    ring = ('<g transform="matrix(.24 .11 -.11 .24 497.45 0)">'
            '<circle cx="2250.5" cy="2250.5" r="1865" fill="none" stroke="url(#r)" stroke-width="599"/>'
            '<circle cx="2250.5" cy="2250.5" r="2144" fill="none" stroke="#030304" stroke-width="41"/>'
            '<circle cx="2250.5" cy="2250.5" r="1586" fill="none" stroke="#030304" stroke-width="41"/></g>')
    grad = ('<linearGradient id="r" gradientUnits="userSpaceOnUse" x1="0" y1="86" x2="0" y2="4415">'
            '<stop offset=".37" stop-color="#2195d2"/><stop offset=".42" stop-color="#1e9dc7"/>'
            '<stop offset=".72" stop-color="#f2e83b"/></linearGradient>')
    s = re.sub(r' (id|data-name)="[^"]*"', "", src)
    s = re.sub(r"<image\b[^>]*/>", ring, s, flags=re.S)
    s = s.replace("<defs>", "<defs>" + grad, 1)
    s = s.replace(' xmlns:xlink="http://www.w3.org/1999/xlink"', "")
    if "<g><g>" in s and s.rstrip().endswith("</g></g></svg>"):  # the two empty Illustrator layers
        s = s.replace("<g><g>", "", 1)
        s = s.rstrip()[: -len("</g></g></svg>")] + "</svg>"
    # Crop to the ring: centre (790.0, 787.7), outer radius 571.4 (from the raster's transform).
    s = re.sub(r'viewBox="[^"]*"', 'viewBox="212 210 1156 1156"', s, count=1)

    num = r"-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?"

    def fmt(x: str) -> str:
        t = f"{round(float(x), 1):.1f}".rstrip("0").rstrip(".")
        t = "0" if t in ("-0", "") else t
        return t[1:] if t.startswith("0.") else ("-" + t[2:] if t.startswith("-0.") else t)

    def path(d: str) -> str:
        out, prev = "", ""
        for tok in re.findall(r"[A-Za-z]|" + num, d):
            if tok.isalpha():
                out, prev = out + tok, tok
                continue
            t = fmt(tok)
            if prev and not prev.isalpha() and not (t.startswith("-") or (t.startswith(".") and "." in prev)):
                out += " "
            out, prev = out + t, t
        return out

    s = re.sub(r' d="([^"]+)"', lambda m: ' d="' + path(m.group(1)) + '"', s)
    s = re.sub(r">\s+<", "><", re.sub(r"\s+/>", "/>", s))
    return s


def render_logo(size: int) -> Image.Image:
    with tempfile.NamedTemporaryFile(suffix=".png") as f:
        subprocess.run(["rsvg-convert", "-w", str(size), "-h", str(size), str(ICON_SVG), "-o", f.name], check=True)
        return Image.open(f.name).convert("RGBA").copy()


# ---------- text ----------

def load_font(name: str, size: int, weight: int):
    try:
        f = ImageFont.truetype(str(FONTS / name), size)
        try:
            f.set_variation_by_axes([weight])
        except Exception:
            pass
        return f
    except OSError:
        print(f"! can't read {name}; falling back to DejaVu Sans", file=sys.stderr)
        bold = "-Bold" if weight >= 600 else ""
        for p in (f"/usr/share/fonts/TTF/DejaVuSans{bold}.ttf", f"/usr/share/fonts/truetype/dejavu/DejaVuSans{bold}.ttf"):
            if Path(p).exists():
                return ImageFont.truetype(p, size)
        return ImageFont.load_default(size)


class Face:
    """Onest at one size and weight: the Latin subset, with the Cyrillic one for Cyrillic letters."""

    def __init__(self, size: int, weight: int):
        self.lat = load_font("onest-latin.woff2", size, weight)
        self.cyr = load_font("onest-cyrillic.woff2", size, weight)
        self.size = size

    def runs(self, text: str):
        out = []
        for ch in text:
            f = self.cyr if 0x0400 <= ord(ch) <= 0x052F else self.lat
            if out and out[-1][0] is f:
                out[-1][1] += ch
            else:
                out.append([f, ch])
        return out

    def width(self, text: str) -> float:
        return sum(f.getlength(t) for f, t in self.runs(text))

    def draw(self, d: ImageDraw.ImageDraw, xy, text: str, fill: str):
        x, y = xy
        for f, t in self.runs(text):
            d.text((x, y), t, font=f, fill=fill)
            x += f.getlength(t)


def wrap(face: Face, text: str, width: int):
    lines, line = [], ""
    for word in text.split():
        trial = f"{line} {word}".strip()
        if line and face.width(trial) > width:
            lines.append(line)
            line = word
        else:
            line = trial
    return lines + [line] if line else lines


# ---------- images ----------

def og(name: str, title: str, lead: str, eyebrow: str, logo: Image.Image):
    im = Image.new("RGB", (W, H), PAPER)
    d = ImageDraw.Draw(im)
    logo_d = logo.width
    im.paste(logo, (W - PAD - logo_d, (H - logo_d) // 2), logo)
    col = W - 2 * PAD - logo_d - 56

    eb, hd, ld, site = Face(28, 600), Face(72, 700), Face(32, 400), Face(26, 600)
    head = wrap(hd, title, col)
    if len(head) > 2:  # long headline: one size down
        hd = Face(60, 700)
        head = wrap(hd, title, col)
    body = wrap(ld, lead, col)[:3]
    hl, ll = round(hd.size * 1.1), round(ld.size * 1.4)
    block = 12 + 28 + eb.size + 24 + len(head) * hl + 24 + len(body) * ll
    y = max(PAD - 8, (H - 40 - block) // 2)

    d.rounded_rectangle((PAD, y, PAD + 96, y + 12), radius=6, fill=ACCENT)
    y += 12 + 28
    eb.draw(d, (PAD, y), eyebrow, MUTED)
    y += eb.size + 24
    for line in head:
        hd.draw(d, (PAD, y), line, INK)
        y += hl
    y += 24
    for line in body:
        ld.draw(d, (PAD, y), line, MUTED)
        y += ll
    site.draw(d, (PAD, H - PAD + 8 - site.size), "twmp.com.ua", PRIMARY)
    out = PUB / "og" / f"{name}.png"
    im.save(out, optimize=True)
    print(f"{out.relative_to(ROOT)}  {out.stat().st_size // 1024} KB")


def on_white(size: int, logo_share: float) -> Image.Image:
    bg = Image.new("RGBA", (size, size), "#FFFFFF")
    ld = round(size * logo_share)
    logo = render_logo(ld)
    bg.paste(logo, ((size - ld) // 2, (size - ld) // 2), logo)
    return bg.convert("RGB")


def icons():
    out = PUB / "icons"
    # favicon: the logo edge to edge (it is already a disc), transparent outside it.
    frames = [render_logo(s) for s in (48, 32, 16)]
    frames[0].save(out / "favicon.ico", sizes=[(48, 48), (32, 32), (16, 16)], append_images=frames[1:])
    on_white(180, 0.88).save(out / "apple-touch-icon.png", optimize=True)
    # Maskable safe zone is a centred circle of 80 % diameter; the round logo sits at 76 %.
    for s in (192, 512):
        on_white(s, 0.76).save(out / f"icon-{s}.png", optimize=True)
    for f in sorted(out.iterdir()):
        print(f"{f.relative_to(ROOT)}  {f.stat().st_size // 1024} KB")


SITE = "https://www.twmp.com.ua"
LANGS = ("en", "uk")


def sitemap():
    ids = re.findall(r'\{ id: "([^"]+)"', (ROOT / "src" / "content" / "campaigns.ts").read_text())
    # /donate/thanks is left out on purpose: it is a post-donation page and carries noindex.
    paths = ["", "/campaigns", *[f"/campaigns/{i}" for i in ids], "/donate", "/about", "/help", "/volunteer"]
    today = __import__("datetime").date.today().isoformat()
    rows = []
    for p in paths:
        alts = "".join(f'\n    <xhtml:link rel="alternate" hreflang="{l}" href="{SITE}/{l}{p}"/>' for l in LANGS)
        alts += f'\n    <xhtml:link rel="alternate" hreflang="x-default" href="{SITE}/en{p}"/>'
        for l in LANGS:
            pri = "1.0" if p == "" else "0.9" if p == "/donate" else "0.6" if p.startswith("/campaigns/") else "0.8"
            rows.append(f"  <url>\n    <loc>{SITE}/{l}{p}</loc>\n    <lastmod>{today}</lastmod>\n    <priority>{pri}</priority>{alts}\n  </url>")
    xml = ('<?xml version="1.0" encoding="UTF-8"?>\n'
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
           + "\n".join(rows) + "\n</urlset>\n")
    (PUB / "sitemap.xml").write_text(xml)
    print(f"public/sitemap.xml  {len(rows)} URLs")


def main():
    if "--svg" in sys.argv:
        i = sys.argv.index("--svg")
        src = Path(sys.argv[i + 1]) if len(sys.argv) > i + 1 else Path.home() / "Archive" / "twmp-media-originals-2026-11-10" / "logo.svg"
        ICON_SVG.parent.mkdir(parents=True, exist_ok=True)
        ICON_SVG.write_text(clean_svg(src.read_text()))
    (PUB / "og").mkdir(parents=True, exist_ok=True)
    icons()
    logo = render_logo(360)
    for name, (title, lead, eyebrow) in OG.items():
        og(name, title, lead, eyebrow, logo)
    sitemap()


if __name__ == "__main__":
    main()
