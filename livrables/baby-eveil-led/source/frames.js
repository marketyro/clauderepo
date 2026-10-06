const { chromium } = require('playwright'); const path=require('path'); const fs=require('fs');
(async()=>{
  fs.mkdirSync('frames',{recursive:true});
  const b=await chromium.launch(); const pg=await b.newPage({viewport:{width:1800,height:90},deviceScaleFactor:2});
  await pg.goto('file://'+path.resolve(__dirname,'led.html')); await pg.evaluate(()=>document.fonts.ready); await pg.waitForTimeout(300);
  for(let f=0;f<750;f++){ await pg.evaluate(t=>setTime(t),f/25); await pg.screenshot({path:`frames/f${String(f).padStart(4,'0')}.png`}); }
  await b.close();
})();
