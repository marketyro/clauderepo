import numpy as np
from PIL import Image
S = 2244/718                      # px par px CSS (300 dpi)
W, H = 2244, 1004
# fond : dégradé radial (ellipse centrée à 22 % / 35 %), #FB9A45 -> #F27A12 à 60 %
y, x = np.mgrid[0:H, 0:W].astype(np.float32)
cx, cy = 0.22*W, 0.35*H
# "ellipse farthest-corner" : rayons proportionnels à la distance au coin le plus éloigné
rx, ry = max(cx, W-cx)*np.sqrt(2), max(cy, H-cy)*np.sqrt(2)
d = np.sqrt(((x-cx)/rx)**2 + ((y-cy)/ry)**2)
t = np.clip(d/0.6, 0, 1)[..., None]
c0 = np.array([0xFB,0x9A,0x45], np.float32); c1 = np.array([0xF2,0x7A,0x12], np.float32)
bg = c0*(1-t) + c1*t
# photo : zone 360 x 321 px CSS, object-fit cover, position 50 % 40 %
pw, ph = round(360*S), H
photo = Image.open('ph_equipe_hd.jpg').convert('RGB')
k = max(pw/photo.width, ph/photo.height)
rs = photo.resize((round(photo.width*k), round(photo.height*k)), Image.LANCZOS)
ox, oy = round((rs.width-pw)*0.5), round((rs.height-ph)*0.4)
p = np.asarray(rs.crop((ox, oy, ox+pw, oy+ph))).astype(np.float32)
# masque : fondu à droite (78 % -> 100 %) et en bas (0 -> 14 % de la hauteur)
mx = np.clip((1 - np.arange(pw)/pw) / 0.22, 0, 1)
my = np.clip((ph - np.arange(ph)) / (0.14*ph), 0, 1)
m = (my[:, None] * mx[None, :])[..., None]
bg[:, :pw] = p*m + bg[:, :pw]*(1-m)
Image.fromarray(bg.round().astype(np.uint8)).save('bg_p7.png')
print('ok', Image.open('bg_p7.png').size)
