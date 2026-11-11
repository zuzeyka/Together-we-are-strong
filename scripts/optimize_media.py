#!/usr/bin/env python3
"""Make web-sized copies of the site's photos and videos (Phase 0 of REDESIGN_PLAN.md).

Input:  a folder with the original media (default ~/Archive/twmp-media-originals-2026-11-10,
        laid out like the old public/: /DSC_3580.jpg, /projects/<Campaign>/3.jpg, video0.mp4, ...).
Output: public/media/<same path without extension>-<width>.{avif,webp} for images,
        public/media/<path>.mp4 (720p H.264) + <path>-poster.webp for videos,
        and src/media-manifest.json:
          "images": { "/DSC_3580.jpg": {"w": 1600, "h": 1068, "widths": [480, 960, 1600]} },
          "videos": { "/projects/X/video0.mp4": {"w": 1280, "h": 720, "poster": "..."} },
          "galleries": { "Grooming": {"images": [...original paths in order], "videos": [...]} }
Galleries are counted from the files on disk, so a wrong count in the translations can't break them.
Needs Pillow with AVIF/WebP and ffmpeg. Safe to re-run: existing outputs are skipped.
Run: python3 scripts/optimize_media.py [ORIGINALS_DIR]
"""
import io
import json
import re
import subprocess
import sys
from concurrent.futures import ProcessPoolExecutor
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = Path(sys.argv[1]) if len(sys.argv) > 1 else Path.home() / "Archive" / "twmp-media-originals-2026-11-10"
OUT = ROOT / "public" / "media"
MANIFEST = ROOT / "src" / "media-manifest.json"
WIDTHS = (480, 960, 1600)
IMAGE_EXT = {".jpg", ".jpeg", ".png", ".webp"}
VIDEO_EXT = {".mp4", ".mov"}
HERO_VIDEO = "/mainVideo.mp4"  # background clip: shortened to 15 s, no sound


def rel(p: Path) -> str:
    return "/" + p.relative_to(SRC).as_posix()


def out_base(r: str) -> Path:
    return OUT / r.lstrip("/").rsplit(".", 1)[0]


ROTATE = {2: [Image.Transpose.FLIP_LEFT_RIGHT], 3: [Image.Transpose.ROTATE_180], 4: [Image.Transpose.FLIP_TOP_BOTTOM],
          5: [Image.Transpose.TRANSPOSE], 6: [Image.Transpose.ROTATE_270], 7: [Image.Transpose.TRANSVERSE],
          8: [Image.Transpose.ROTATE_90]}


def upright(im: Image.Image) -> Image.Image:
    """Apply the EXIF orientation (phone photos). Reads only that tag: ImageOps.exif_transpose
    re-serialises all EXIF and crashes on some originals with broken values."""
    try:
        orientation = im.getexif().get(0x0112, 1)
    except Exception:
        orientation = 1
    for t in ROTATE.get(orientation, []):
        im = im.transpose(t)
    return im


def image_job(path: str):
    p = SRC / path.lstrip("/")
    im = upright(Image.open(p))
    im = im.convert("RGBA" if im.mode in ("RGBA", "LA", "P") and "transparency" in im.info or im.mode in ("RGBA", "LA") else "RGB")
    im.info = {}  # drop EXIF/XMP (and exif=b"" on save): some originals have broken EXIF, and photos may hold GPS positions
    w, h = im.size
    widths = sorted({min(x, w) for x in WIDTHS if x <= w} | {min(w, WIDTHS[-1])})
    base = out_base(path)
    base.parent.mkdir(parents=True, exist_ok=True)
    for tw in widths:
        th = round(h * tw / w)
        small = im.resize((tw, th), Image.LANCZOS) if tw != w else im
        for ext, kw in ((".webp", {"quality": 78, "method": 6, "exif": b""}), (".avif", {"quality": 55, "speed": 6, "exif": b""})):
            target = base.with_name(f"{base.name}-{tw}{ext}")
            if not target.exists():
                small.save(target, **kw)
    top = widths[-1]
    return path, {"w": top, "h": round(h * top / w), "widths": widths}


def video_job(path: str):
    p = SRC / path.lstrip("/")
    base = out_base(path)
    base.parent.mkdir(parents=True, exist_ok=True)
    mp4, poster = base.with_suffix(".mp4"), base.with_name(base.name + "-poster.webp")
    hero = path == HERO_VIDEO
    if not mp4.exists():
        cmd = ["ffmpeg", "-loglevel", "error", "-y", "-i", str(p)]
        if hero:
            cmd += ["-t", "15", "-an"]
        else:
            cmd += ["-c:a", "aac", "-b:a", "96k"]
        cmd += ["-vf", "scale=-2:'min(720,ih)'", "-c:v", "libx264", "-preset", "medium", "-crf", "30" if hero else "28",
                "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(mp4)]
        subprocess.run(cmd, check=True)
    if not poster.exists():
        jpg = subprocess.run(["ffmpeg", "-loglevel", "error", "-ss", "1", "-i", str(mp4), "-frames:v", "1", "-f", "image2pipe",
                              "-vcodec", "png", "-"], check=True, capture_output=True).stdout
        Image.open(io.BytesIO(jpg)).convert("RGB").save(poster, quality=75)
    probe = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height",
                            "-of", "json", str(mp4)], check=True, capture_output=True, text=True).stdout
    size = json.loads(probe)["streams"][0]
    return path, {"w": int(size["width"]), "h": int(size["height"]), "poster": "/" + poster.relative_to(ROOT / "public").as_posix()}


def logo():
    """The full logo (ring, hands, text) rendered from logo.svg with rsvg-convert at web sizes."""
    svg = SRC / "logo.svg"
    if not svg.exists():
        return {}
    OUT.mkdir(parents=True, exist_ok=True)
    for size in (64, 192, 512):
        png = subprocess.run(["rsvg-convert", "-w", str(size), "-h", str(size), str(svg)], check=True, capture_output=True).stdout
        im = Image.open(io.BytesIO(png)).convert("RGBA")
        im.save(OUT / f"logo-{size}.png", optimize=True)
        im.save(OUT / f"logo-{size}.webp", quality=90)
    return {"/logo.svg": {"w": 512, "h": 512, "widths": [64, 192, 512], "logo": True}}


def main():
    files = sorted(p for p in SRC.rglob("*") if p.is_file())
    images = [rel(p) for p in files if p.suffix.lower() in IMAGE_EXT]
    videos = [rel(p) for p in files if p.suffix.lower() in VIDEO_EXT]
    manifest = {"images": {}, "videos": {}, "galleries": {}}
    with ProcessPoolExecutor() as pool:
        for path, info in pool.map(image_job, images):
            manifest["images"][path] = info
    for v in videos:
        path, info = video_job(v)
        manifest["videos"][path] = info
        print("video", path, info, flush=True)
    manifest["images"].update(logo())

    def num(path):
        m = re.search(r"(\d+)\.\w+$", path)
        return int(m.group(1)) if m else 0
    for d in sorted((SRC / "projects").iterdir()):
        if d.is_dir():
            pre = f"/projects/{d.name}/"
            manifest["galleries"][d.name] = {
                "images": sorted((i for i in manifest["images"] if i.startswith(pre)), key=num),
                "videos": sorted((v for v in manifest["videos"] if v.startswith(pre)), key=num),
            }
    MANIFEST.write_text(json.dumps(manifest, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    size = sum(f.stat().st_size for f in OUT.rglob("*") if f.is_file())
    print(f"{len(images)} images, {len(videos)} videos -> {OUT} ({size / 1e6:.1f} MB); manifest {MANIFEST}")


if __name__ == "__main__":
    main()
