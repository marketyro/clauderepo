const { chromium } = require('playwright'); const path=require('path');
(async()=>{
  const b=await chromium.launch();
  for(const name of process.argv.slice(2)){
    const pg=await b.newPage({viewport:{width:719,height:322},deviceScaleFactor:2244/718});
    await pg.goto('file://'+path.resolve(__dirname,name+'.html')); await pg.evaluate(()=>document.fonts.ready); await pg.waitForTimeout(300);
    await pg.screenshot({path:`${name}.png`,clip:{x:0,y:0,width:718.11,height:321.28}});
    await pg.pdf({path:`${name}.pdf`,width:'190mm',height:'85mm',printBackground:true,margin:{top:0,right:0,bottom:0,left:0},pageRanges:'1'});
    await pg.close();
  }
  await b.close();
})();
