const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path=require('path');
(async()=>{
  const mode=process.argv[2]||'video';
  const b=await chromium.launch(); const pg=await b.newPage({viewport:{width:1800,height:90},deviceScaleFactor:2});
  await pg.goto('file://'+path.resolve(__dirname,process.env.PAGE||'led.html')); await pg.evaluate(()=>document.fonts.ready);
  await pg.waitForTimeout(300);
  if(mode==='stills'){
    for(const t of [9.5]){ await pg.evaluate(t=>setTime(t),t); await pg.screenshot({path:`still_${t}.png`}); }
  } else {
    const FPS=25, N=30*FPS;
    const ff=spawn('ffmpeg',['-y','-f','image2pipe','-framerate',String(FPS),'-i','-','-vf','scale=1800:90:flags=lanczos','-c:v','libx264','-preset','slow','-crf','8','-profile:v','high','-tune','animation','-pix_fmt','yuv420p','-r',String(FPS),'-movflags','+faststart','BabyEveil_LED_1800x90_30s.mp4'],{stdio:['pipe','inherit','inherit']});
    for(let f=0;f<N;f++){ await pg.evaluate(t=>setTime(t),f/FPS); const buf=await pg.screenshot({type:'png'}); if(!ff.stdin.write(buf)) await new Promise(r=>ff.stdin.once('drain',r)); }
    ff.stdin.end(); await new Promise(r=>ff.on('close',r));
  }
  await b.close();
})();
