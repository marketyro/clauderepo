import sys, numpy as np
from PIL import Image, ImageDraw, ImageFilter
src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('RGB'); W,H = im.size
a = np.asarray(im).astype(np.float32)
mn = a.min(axis=2)
mask = Image.fromarray(((mn >= 236)*255).astype(np.uint8)).copy()
# fond = zone quasi blanche connectée aux bords
for x in range(0, W, 40):
    for y in (0, H-1):
        if mask.getpixel((x,y)) == 255: ImageDraw.floodfill(mask, (x,y), 128)
for y in range(0, H, 40):
    for x in (0, W-1):
        if mask.getpixel((x,y)) == 255: ImageDraw.floodfill(mask, (x,y), 128)
m = np.array(mask)
# poches blanches fermées (intérieur des lettres) : on les retire si elles sont grandes
holes = []
work = mask.copy()
ys, xs = np.nonzero(m == 255)
done = np.zeros_like(m, dtype=bool)
for y, x in zip(ys[::7], xs[::7]):
    if done[y, x] or np.asarray(work)[y, x] != 255: continue
    ImageDraw.floodfill(work, (int(x), int(y)), 64)
    w = np.array(work); comp = w == 64
    n = comp.sum(); done |= comp
    if n > int(sys.argv[3]) if len(sys.argv) > 3 else 1500: holes.append((n, x, y)); m[comp] = 128
    w[comp] = 32; work = Image.fromarray(w).copy()
print('poches retirées', sorted(holes, reverse=True)[:20])
bg = m == 128
band = np.asarray(Image.fromarray((bg*255).astype(np.uint8)).filter(ImageFilter.MaxFilter(5))) > 0
band &= ~bg
alpha = np.full((H,W), 255.0)
alpha[bg] = 0
# color-to-alpha (blanc) sur la bordure anti-crénelée
al = (255 - mn) / 255.0
al = np.clip(al, 1e-3, 1)
fg = (a - (1 - al[...,None]) * 255) / al[...,None]
rgb = a.copy()
rgb[band] = np.clip(fg[band], 0, 255)
alpha[band] = (al[band] * 255)
outim = Image.fromarray(np.dstack([rgb, alpha]).astype(np.uint8), 'RGBA')
outim = outim.crop(outim.getbbox())
outim.save(out); print(outim.size)
