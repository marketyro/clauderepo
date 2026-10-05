// Builds index.html (fonts inlined) and renders each slide to png/ at 1920×1080.
const fs=require('fs'),path=require('path');
const {chromium}=require('/opt/node-tools/node_modules/playwright');
const fonts=process.argv[2];
const html=fs.readFileSync(path.join(__dirname,'src.html'),'utf8').replace('/*FONTS*/',fs.readFileSync(fonts,'utf8'));
fs.writeFileSync(path.join(__dirname,'index.html'),html);
const names=['01-annecy','02-escuela','03-alojamiento','04-lago','05-montana','06-castillos','07-excursiones','08-resumen'];
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'}).catch(()=>chromium.launch());
  const p=await b.newPage({viewport:{width:1920,height:1080}});
  await p.setContent('<!doctype html><html class="export"><head><meta charset="utf-8"></head><body>'+html+'</body></html>');
  await p.evaluate(()=>document.fonts.ready);
  fs.mkdirSync(path.join(__dirname,'png'),{recursive:true});
  const s=await p.$$('.slide');
  for(let i=0;i<s.length;i++) await s[i].screenshot({path:path.join(__dirname,'png',names[i]+'.png')});
  // overflow check
  console.log(await p.evaluate(()=>[...document.querySelectorAll('.slide *')].filter(e=>{const r=e.getBoundingClientRect(),q=e.closest('.slide').getBoundingClientRect();return r.width&&(r.right>q.right+1||r.bottom>q.bottom+1)&&!e.closest('svg')&&!e.classList.contains('big')}).map(e=>e.className+':'+e.textContent.slice(0,30))));
  await b.close();
})();
