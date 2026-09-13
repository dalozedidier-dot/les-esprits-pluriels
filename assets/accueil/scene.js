/* A particle assembly of the supplied logo, followed by interactive dispersion. */
(() => {
 'use strict';
 const canvas=document.querySelector('#scene'),ctx=canvas.getContext('2d');
 const logo=document.querySelector('#logo'),emblem=document.querySelector('.emblem');
 const motion=document.querySelector('.motion'),replay=document.querySelector('.replay');
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 if(['127.0.0.1','localhost'].includes(location.hostname)||location.protocol==='file:')document.querySelector('.enter').href='https://www.les-esprits-pluriels.be/';
 if(!ctx){document.querySelector('.controls').hidden=true;return;}
 const TAU=Math.PI*2,colors=['#60b5bb','#b9dcc0','#e7ba79','#e99c81'];
 const imageLayer=document.createElement('canvas'),imageCtx=imageLayer.getContext('2d');
 const pointer={x:-9999,y:-9999,active:false};
 let width=0,height=0,box,dpr=1,samples=[],stars=[],elapsed=0,last=0,frameId=0,paused=false,running=false,ready=false,interaction=0,parallaxX=0,parallaxY=0;
 const clamp=v=>Math.max(0,Math.min(1,v));
 const smooth=v=>{v=clamp(v);return v*v*(3-2*v);};
 function measure(){
  width=innerWidth;height=innerHeight;dpr=Math.min(devicePixelRatio||1,1.75);
  canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
  box=emblem.getBoundingClientRect();const size=Math.ceil(box.width*dpr);
  if(imageLayer.width!==size){imageLayer.width=size;imageLayer.height=size;}
  stars=Array.from({length:width<600?70:140},(_,i)=>({x:Math.random()*width,y:Math.random()*height,size:.35+Math.random()*1.1,phase:Math.random()*TAU,speed:.08+Math.random()*.16,color:colors[i%4]}));
  if(ready&&(!running||paused||reduce.matches))render();
 }
 function sampleLogo(){
  const sample=document.createElement('canvas'),n=156;sample.width=n;sample.height=n;
  const sc=sample.getContext('2d',{willReadFrequently:true});sc.drawImage(logo,0,0,n,n);
  const pixels=sc.getImageData(0,0,n,n).data;
  for(let y=0;y<n;y+=2)for(let x=0;x<n;x+=2){const i=(y*n+x)*4;if(pixels[i+3]<150)continue;
   samples.push({x:x/n,y:y/n,color:`rgb(${pixels[i]},${pixels[i+1]},${pixels[i+2]})`,a:Math.random()*TAU,r:.6+Math.random()*.6,delay:Math.random()*.55,size:.7+Math.random()*1.1,phase:Math.random()*TAU});}
 }
 function atmosphere(time,cx,cy){
  const presence=.4+.6*smooth(elapsed/2),radius=Math.max(box.width*.77,Math.min(width*.32,470));
  ctx.save();ctx.translate(cx+parallaxX*.35,cy+parallaxY*.35);ctx.rotate(-.19+Math.sin(time*.13)*.07);ctx.globalCompositeOperation='multiply';
  for(let group=0;group<2;group++){
   const gradient=ctx.createLinearGradient(-radius,0,radius,0);gradient.addColorStop(0,group?'#75a982':'#358d8b');gradient.addColorStop(.5,'#7ba887');gradient.addColorStop(1,group?'#edaa7e':'#dfbd80');ctx.strokeStyle=gradient;
   for(let j=0;j<21;j++){const r=radius+j*3.2;ctx.beginPath();
    for(let k=0;k<=110;k++){const a=k/110*TAU,wave=Math.sin(a*3+time*.34+j*.14+group*2)*(12+group*8),x=Math.cos(a)*(r+wave),y=Math.sin(a)*(r*(.49+group*.075)+wave)+Math.sin(a*2+time*.21)*14;if(!k)ctx.moveTo(x,y);else ctx.lineTo(x,y);}
    ctx.closePath();ctx.globalAlpha=(.016+Math.sin(j/21*Math.PI)*.035)*presence;ctx.lineWidth=.65;ctx.stroke();}
   const a=time*(group?-.17:.14)+group*Math.PI,px=Math.cos(a)*(radius+28),py=Math.sin(a)*radius*.54;
   const light=ctx.createRadialGradient(px,py,0,px,py,30);light.addColorStop(0,group?'#eac8a199':'#9ddccd99');light.addColorStop(1,'#8fcbbb00');ctx.globalAlpha=.65*presence;ctx.fillStyle=light;ctx.fillRect(px-30,py-30,60,60);
  }ctx.restore();
  for(const star of stars){const sy=(star.y-time*(2+star.speed*10)+height*100)%height;ctx.globalAlpha=(.14+.2*(.5+.5*Math.sin(time*star.speed+star.phase)))*presence;ctx.fillStyle=star.color;ctx.beginPath();ctx.arc(star.x+Math.sin(time*.13+star.phase)*12,sy,star.size,0,TAU);ctx.fill();}ctx.globalAlpha=1;
 }
 function drawLogo(time,cx,cy){
  const material=smooth((elapsed-4.15)/1.2),mx=pointer.x-box.left,my=pointer.y-box.top;
  const near=pointer.active&&mx>0&&mx<box.width&&my>0&&my<box.height&&elapsed>5.6;
  interaction+=((near?1:0)-interaction)*.08;
  const hole=Math.min(64,box.width*.16),breath=elapsed>5.6?Math.sin((elapsed-5.6)*.7)*2:0;
  if(material>0){const s=imageLayer.width;imageCtx.clearRect(0,0,s,s);imageCtx.globalCompositeOperation='source-over';imageCtx.drawImage(logo,0,0,s,s);
   if(interaction>.01){imageCtx.globalCompositeOperation='destination-out';const x=(mx-parallaxX)/box.width*s,y=(my-parallaxY-breath)/box.width*s,r=hole/box.width*s,mask=imageCtx.createRadialGradient(x,y,0,x,y,r);mask.addColorStop(0,`rgba(0,0,0,${interaction*.92})`);mask.addColorStop(.5,`rgba(0,0,0,${interaction*.8})`);mask.addColorStop(1,'rgba(0,0,0,0)');imageCtx.fillStyle=mask;imageCtx.fillRect(x-r,y-r,r*2,r*2);}
   ctx.globalAlpha=material;ctx.drawImage(imageLayer,box.left+parallaxX,box.top+parallaxY+breath,box.width,box.height);ctx.globalAlpha=1;}
  const intro=elapsed<5.6;
  if(intro||interaction>.01){ctx.save();for(const p of samples){const tx=box.left+p.x*box.width+parallaxX,ty=box.top+p.y*box.height+parallaxY+breath;let x=tx,y=ty,alpha=1-material,size=p.size;
    if(intro){const progress=smooth((elapsed-.35-p.delay)/3.8),spread=1-progress,a=p.a+progress*.12,r=Math.min(width,height)*.62*p.r*spread;x+=Math.cos(a)*r;y+=Math.sin(a)*r*.64;alpha*=smooth(elapsed/.6)*(.55+.45*progress);size+=(1-progress)*1.3;
     if(elapsed<4.1){ctx.globalAlpha=alpha*.18;ctx.strokeStyle=p.color;ctx.lineWidth=.65;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+Math.sin(a)*spread*12,y-Math.cos(a)*spread*12);ctx.stroke();}}
    else{const dx=tx-pointer.x,dy=ty-pointer.y,d=Math.sqrt(dx*dx+dy*dy);if(d>hole*1.45)continue;const strength=Math.pow(Math.max(0,1-d/(hole*1.45)),2)*interaction;x+=dx/Math.max(1,d)*strength*65+Math.sin(time*2+p.phase)*strength*9;y+=dy/Math.max(1,d)*strength*65+Math.cos(time*2+p.phase)*strength*9;alpha=strength;}
    ctx.globalAlpha=alpha;ctx.fillStyle=p.color;ctx.fillRect(x-size/2,y-size/2,size,size);
   }ctx.restore();}
  const pulse=(elapsed-4.1)/1.7;if(pulse>0&&pulse<1){ctx.save();ctx.globalAlpha=Math.sin(pulse*Math.PI)*.17;ctx.strokeStyle='#c3e2c7';ctx.lineWidth=.8;ctx.beginPath();ctx.ellipse(cx,cy,box.width*(.38+pulse*.48),box.width*(.32+pulse*.4),-.2,0,TAU);ctx.stroke();ctx.restore();}
 }
 function render(){ctx.clearRect(0,0,width,height);const cx=box.left+box.width/2,cy=box.top+box.height/2;if(reduce.matches){ctx.drawImage(logo,box.left,box.top,box.width,box.height);return;}const tx=pointer.active?(pointer.x/width-.5)*10:0,ty=pointer.active?(pointer.y/height-.5)*8:0;parallaxX+=(tx-parallaxX)*.025;parallaxY+=(ty-parallaxY)*.025;atmosphere(elapsed,cx,cy);drawLogo(elapsed,cx,cy);}
 function tick(now){if(!running)return;if(last)elapsed+=Math.min((now-last)/1000,.05);last=now;render();frameId=requestAnimationFrame(tick);}
 function stop(){running=false;cancelAnimationFrame(frameId);last=0;}
 function start(){if(!ready||running||paused||reduce.matches||document.hidden)return;running=true;last=0;frameId=requestAnimationFrame(tick);}
 function updatePause(){document.body.classList.toggle('paused',paused);motion.setAttribute('aria-pressed',String(paused));motion.setAttribute('aria-label',paused?'Reprendre les animations':'Mettre les animations en pause');}
 motion.addEventListener('click',()=>{paused=!paused;updatePause();if(paused){stop();elapsed=Math.max(elapsed,5.7);render();}else start();});
 replay.addEventListener('click',()=>{if(!ready||reduce.matches)return;stop();elapsed=0;interaction=0;paused=false;updatePause();document.body.classList.remove('playing');void document.body.offsetWidth;document.body.classList.add('playing');start();});
 window.addEventListener('pointermove',e=>{pointer.x=e.clientX;pointer.y=e.clientY;pointer.active=true;},{passive:true});
 document.addEventListener('pointerleave',()=>{pointer.active=false;});
 window.addEventListener('pointerup',e=>{if(e.pointerType==='touch')pointer.active=false;},{passive:true});
 window.addEventListener('resize',measure,{passive:true});
 window.addEventListener('scroll',()=>{box=emblem.getBoundingClientRect();if(!running&&ready)render();},{passive:true});
 document.addEventListener('visibilitychange',()=>document.hidden?stop():start());
 reduce.addEventListener('change',()=>{if(reduce.matches){stop();elapsed=5.7;document.body.classList.remove('playing');render();}else start();});
 async function init(){try{await logo.decode();measure();try{sampleLogo();}catch{elapsed=5.7;}ready=true;document.body.classList.add('rendering');if(!reduce.matches&&samples.length)document.body.classList.add('playing');if(reduce.matches){elapsed=5.7;render();}else start();document.fonts.ready.then(measure);}catch{document.querySelector('.controls').hidden=true;}}
 init();
})();
