import sys, numpy as np
from PIL import Image
white = Image.open(sys.argv[1]).convert('RGBA')
white = white.crop(white.getbbox())
white.save('logo_blanc.png')
a = np.asarray(white)[...,3]
rows = np.nonzero((a > 20).any(axis=1))[0]
gaps = [(rows[i], rows[i+1]) for i in range(len(rows)-1) if rows[i+1]-rows[i] > 5]
print('trous entre lignes', gaps)
word_bottom, base_top = gaps[0]
base = white.crop((0, base_top, white.width, white.height))
base = base.crop(base.getbbox())
# baseline recolorée en gris foncé (alpha conservé)
arr = np.array(base); arr[..., :3] = (51, 51, 51); base = Image.fromarray(arr, 'RGBA')
word = Image.open('word.png'); tree = Image.open('illus.png')
k = word.width / white.width                     # échelle entre le logo blanc et le logo couleur
base = base.resize((round(base.width*k), round(base.height*k)), Image.LANCZOS)
gap = round((base_top - word_bottom) * k)
blockH = word.height + gap + base.height
tree = tree.resize((round(tree.width*blockH/tree.height), blockH), Image.LANCZOS)
sep = round(117 * blockH / 497)
out = Image.new('RGBA', (tree.width + sep + max(word.width, base.width), blockH), (0,0,0,0))
out.alpha_composite(tree, (0, 0))
out.alpha_composite(word, (tree.width + sep, 0))
out.alpha_composite(base, (tree.width + sep, word.height + gap))
out.save('logo_baseline.png'); print(out.size)
bg = Image.new('RGBA', out.size, (255,249,242,255)); bg.alpha_composite(out); bg.convert('RGB').resize((out.width//2, out.height//2)).save('logo_baseline_preview.png')
