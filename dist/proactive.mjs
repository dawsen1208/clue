// Proactive clues, driven by a simulated position (or the device location when it is on campus).
// Everything here is a design demonstration: the position and floor events are scenario data.
import {geoToMap,mapToGeo,inCampus} from './core.mjs';

const KINDS=[
 ['entrance','走近建筑时显示入口照片','Entrance photo near the building'],
 ['offroute','偏离路线提醒','Off-route alert'],
 ['floor','走错楼层提醒','Wrong-floor alert']
];
// Demo destination used when the walk starts without directions open.
const DEMO_PLACE='library148';
const NEAR=40,OFF=45;

const gap=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
function along(points,dist){
 let left=dist;
 for(let i=1;i<points.length;i++){const a=points[i-1],b=points[i],d=gap(a,b);if(left<=d){const k=d?left/d:0;return {x:a.x+(b.x-a.x)*k,y:a.y+(b.y-a.y)*k};}left-=d;}
 return {...points.at(-1)};
}
function length(points){let s=0;for(let i=1;i<points.length;i++)s+=gap(points[i-1],points[i]);return s;}
function toSegment(p,a,b){const dx=b.x-a.x,dy=b.y-a.y,l=dx*dx+dy*dy;const k=l?Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.y-a.y)*dy)/l)):0;return Math.hypot(p.x-a.x-k*dx,p.y-a.y-k*dy);}
function offRoute(p,points){let m=Infinity;for(let i=1;i<points.length;i++)m=Math.min(m,toSegment(p,points[i-1],points[i]));return m;}

export function setupProactive(ctx){
 const {en,esc,icon,toast}=ctx,t=(zh,eng)=>en?eng:zh,$=s=>document.querySelector(s);
 const enabled=Object.fromEntries(KINDS.map(([k])=>[k,true]));
 const sim={on:false,paused:false,walking:false,dist:0,pos:null,offset:0,real:false,watch:null,fired:new Set(),snoozed:{},key:null,last:0,frame:null};

 /* ---------- panel ---------- */
 const toggle=document.createElement('button');
 toggle.type='button';toggle.id='simToggle';toggle.className='sim-toggle';toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-controls','simPanel');
 toggle.innerHTML=`${icon('bell')}<span>${t('主动提醒演示','Proactive demo')}</span>`;
 const panel=document.createElement('section');
 panel.id='simPanel';panel.className='sim-panel';panel.hidden=true;panel.setAttribute('aria-label',t('主动提醒演示控制','Proactive demo controls'));
 panel.innerHTML=`<header><strong>${t('主动提醒演示','Proactive demo')}</strong><small>${t('模拟位置','Simulated position')}</small><button type="button" class="sim-close" aria-label="${t('结束演示','Stop demo')}">×</button></header>
 <p class="sim-hint">${t('蓝点是模拟位置。','The blue dot is the simulated position.')}</p>
 <div class="sim-row"><button type="button" class="primary" data-sim="walk"></button><button type="button" data-sim="off">${t('偏离路线','Step off route')}</button><button type="button" data-sim="reset">${t('回到起点','Back to start')}</button></div>
 <div class="sim-row"><button type="button" data-sim="floorWrong"></button><button type="button" data-sim="floorRight"></button></div>
 <label class="sim-check"><input type="checkbox" id="simReal"> ${t('有条件时使用设备定位（不在校内则继续模拟）','Use device location when available (falls back to simulation off campus)')}</label>
 <fieldset class="sim-kinds"><legend>${t('提醒类型','Prompts')}</legend>${KINDS.map(([k,zh,eng])=>`<label><input type="checkbox" data-kind="${k}" checked> ${t(zh,eng)}</label>`).join('')}</fieldset>
 <div class="sim-row"><button type="button" data-sim="pause"></button><span class="sim-status" id="simStatus" role="status"></span></div>`;
 document.body.append(toggle,panel);
 // The panel can be folded away while the demo keeps running; × stops the demo.
 const show_=v=>{panel.hidden=!v;toggle.setAttribute('aria-expanded',String(v));toggle.classList.toggle('is-running',sim.on);};
 const open=v=>{sim.on=v;show_(v);if(v){start();sync();}else stop();toggle.classList.toggle('is-running',sim.on);};
 toggle.onclick=()=>{if(!sim.on)open(true);else show_(panel.hidden);};
 panel.querySelector('.sim-close').onclick=()=>open(false);
 panel.addEventListener('change',e=>{
  const k=e.target.dataset.kind;if(k){enabled[k]=e.target.checked;if(!e.target.checked&&sim.key===k)hide();sync();return;}
  if(e.target.id==='simReal')useReal(e.target.checked);
 });
 panel.addEventListener('click',e=>{const b=e.target.closest('[data-sim]');if(!b)return;actions[b.dataset.sim]?.();sync();});

 const actions={
  walk(){if(!ctx.getGuide()){const p=ctx.place(DEMO_PLACE);if(p)ctx.startGuide(p);}sim.walking=!sim.walking;sim.paused=false;},
  off(){if(!route())return note(t('先开始导航，才能偏离路线。','Start directions first to step off the route.'));sim.offset=sim.offset?0:110;place();check(true);},
  reset(){sim.dist=0;sim.offset=0;sim.walking=false;sim.fired.delete('entrance');sim.fired.delete('offroute');place();},
  floorWrong(){floorEvent(false);},
  floorRight(){floorEvent(true);},
  pause(){sim.paused=!sim.paused;if(sim.paused){sim.walking=false;hide();}}
 };

 /* ---------- position ---------- */
 const route=()=>{const g=ctx.getGuide();const r=g&&ctx.getStage()<2?ctx.route(g):null;return r&&r.points.length>1?r:null;};
 function position(){
  if(sim.real&&sim.realPos)return sim.realPos;
  const r=route();if(!r)return null;
  const p=along(r.points,sim.dist);
  if(!sim.offset)return p;
  // Step sideways from the route, perpendicular to the current segment.
  const q=along(r.points,Math.min(length(r.points),sim.dist+5)),dx=q.x-p.x,dy=q.y-p.y,l=Math.hypot(dx,dy)||1;
  const left={x:p.x-dy/l*sim.offset,y:p.y+dx/l*sim.offset},right={x:p.x+dy/l*sim.offset,y:p.y-dx/l*sim.offset};
  return offRoute(left,r.points)>=offRoute(right,r.points)?left:right; // step to the side away from the rest of the route
 }
 function place(){
  const svg=ctx.svg();if(!svg)return;
  let g=svg.querySelector('#simMarker');
  sim.pos=sim.on?position():null;
  if(!sim.pos){g?.remove();return;}
  if(!g){g=document.createElementNS('http://www.w3.org/2000/svg','g');g.id='simMarker';g.setAttribute('aria-hidden','true');g.innerHTML='<circle class="sim-halo" r="22"/><circle class="sim-dot" r="9"/>';svg.append(g);}
  g.setAttribute('transform',`translate(${sim.pos.x} ${sim.pos.y})`);
 }
 function useReal(on){
  sim.real=on;
  if(sim.watch!==null){navigator.geolocation?.clearWatch(sim.watch);sim.watch=null;}
  sim.realPos=null;
  if(!on)return;
  if(!navigator.geolocation){sim.real=false;$('#simReal').checked=false;return note(t('此设备不支持定位，继续使用模拟位置。','This device has no location service; staying with the simulated position.'));}
  sim.watch=navigator.geolocation.watchPosition(p=>{
   const geo={lat:p.coords.latitude,lon:p.coords.longitude};
   if(!inCampus(geo)){sim.realPos=null;note(t('你不在主校园内，继续使用模拟位置。','You are not on the main campus, so the simulated position is used.'));return;}
   sim.realPos=geoToMap(geo);note(t('正在使用设备定位。','Using device location.'));place();check();
  },()=>{sim.real=false;$('#simReal').checked=false;note(t('没有获得定位权限，继续使用模拟位置。','Location permission was not given; staying with the simulated position.'));},{enableHighAccuracy:true,maximumAge:5000});
 }

 /* ---------- loop ---------- */
 function start(){if(sim.frame)return;sim.last=performance.now();const tick=now=>{const dt=Math.min(.25,(now-sim.last)/1000);sim.last=now;step(dt);sim.frame=requestAnimationFrame(tick);};sim.frame=requestAnimationFrame(tick);}
 function stop(){cancelAnimationFrame(sim.frame);sim.frame=null;sim.walking=false;hide();place();}
 let shown=0;
 function step(dt){
  const r=route();
  if(sim.walking&&r&&!sim.real){const total=length(r.points);sim.dist=Math.min(total,sim.dist+total/22*dt);if(sim.dist>=total)sim.walking=false;}
  place();check();
  if((shown+=dt)>.5){shown=0;sync();}
 }

 /* ---------- triggers ---------- */
 function check(force=false){
  if(!sim.on||sim.paused||ctx.isMuted())return;
  const g=ctx.getGuide(),stage=ctx.getStage();
  const r=route();
  if(g&&r&&sim.pos&&stage<2){
   const b=ctx.building(g);
   if(gap(sim.pos,b)<NEAR)fire('entrance');
   if(offRoute(sim.pos,r.points)>OFF)fire('offroute',force);
  }
 }
 function floorEvent(right){
  const g=ctx.getGuide();if(!g)return note(t('先开始导航。','Start directions first.'));
  if(ctx.getStage()<2)ctx.setStage(2);
  if(right){note(t('到达正确楼层。','Correct floor reached.'));if(sim.key==='floor')hide();return;}
  fire('floor',true);
 }
 function fire(kind,force=false){
  if(!enabled[kind]||sim.paused||ctx.isMuted())return;
  if(!force&&(sim.fired.has(kind)||(sim.snoozed[kind]||0)>Date.now()))return;
  if(ctx.prompt.hidden)sim.key=null;
 if(sim.key&&sim.key!==kind&&!force)return;
  sim.fired.add(kind);show(kind);
 }
 function card(kind,body,buttons){
  const el=ctx.prompt;sim.key=kind;el.hidden=false;el.classList.add('sim-card');
  el.innerHTML=`<div class="prompt-mark">${icon('bell')}</div><div><p class="eyebrow">${t('主动提醒 · 模拟','PROACTIVE CLUE · SIMULATED')}</p>${body}<div class="prompt-actions">${buttons.map(([id,label,cls])=>`<button type="button" data-act="${id}" class="${cls||'text-button'}">${label}</button>`).join('')}<button type="button" data-act="snooze" class="text-button">${t('稍后再说','Later')}</button><button type="button" data-act="mute" class="text-button">${t('不再提醒这一类','Mute this kind')}</button></div></div>`;
  el.querySelectorAll('[data-act]').forEach(b=>b.onclick=()=>act(kind,b.dataset.act));
  if(matchMedia('(max-width:800px)').matches)show_(false); // phones: fold the panel so the prompt is readable
 }
 function show(kind){
  const g=ctx.getGuide();
  if(kind==='entrance'){const b=ctx.building(g),photo=ctx.photo(b.id);
   card(kind,`<h2>${t('快到了：找这个入口','Almost there: look for this entrance')}</h2>${photo?`<img class="sim-photo" src="assets/buildings/${esc(photo.filename)}" alt="${esc(en?photo.en:photo.zh)}">`:''}<p>${esc(ctx.placeName(b))}${photo?' · '+esc(en?photo.en:photo.zh):''}</p><p class="small">${t('距离入口约 60 米时触发（模拟位置）。','Shown about 60 m from the entrance (simulated position).')}</p>`,[['next',t('看到了，下一步找楼层','I see it. Next: the floor'),'primary']]);}
  if(kind==='offroute')card(kind,`<h2>${t('好像偏离了路线','You seem to be off the route')}</h2><p>${t(`前往 ${esc(ctx.placeName(ctx.building(g)))} 的路线在你附近约 ${Math.round(OFF*1.45)} 米外。`,`The route to ${esc(ctx.placeName(ctx.building(g)))} is more than ${Math.round(OFF*1.45)} m away.`)}</p>`,[['reroute',t('从这里重新规划','Reroute from here'),'primary'],['back',t('回到路线上','Back on the route')]]);
  if(kind==='floor'){const wrong=String(g.floor)==='G'?'1':'G';
   card(kind,`<h2>${t('楼层不对','Wrong floor')}</h2><p>${t(`你在 ${wrong} 层，${esc(ctx.placeName(g))} 在 ${esc(ctx.floorLabel(g))}。`,`You are on floor ${wrong}. ${esc(ctx.placeName(g))} is on ${esc(ctx.floorLabel(g))}.`)}</p><p>${wrong==='G'?t('请上楼一层。','Go up one level.'):t('请下楼回到地面层。','Go down to the ground floor.')}</p>`,[['floorOk',t('我已经换到正确楼层','I am on the right floor now'),'primary']]);}
  sync();
 }
 function hide(){if(sim.key){ctx.prompt.hidden=true;ctx.prompt.classList.remove('sim-card');sim.key=null;}}
 function act(kind,a){
  const g=ctx.getGuide();hide();
  if(a==='snooze'){sim.snoozed[kind]=Date.now()+30000;sim.fired.delete(kind);toast(t('30 秒后再提醒。','Reminding again in 30 seconds.'));}
  if(a==='mute'){enabled[kind]=false;const box=panel.querySelector(`[data-kind="${kind}"]`);if(box)box.checked=false;toast(t('这一类提醒已关闭，可在演示面板重新打开。','This kind of prompt is off. Turn it back on in the demo panel.'));}
  if(a==='next'&&g)ctx.setStage(2);
  if(a==='reroute'&&sim.pos){sim.offset=0;sim.dist=0;sim.fired.delete('offroute');sim.fired.delete('entrance');ctx.rerouteFrom({id:'sim-position',name:'Your position',zh:'当前位置',x:sim.pos.x,y:sim.pos.y,...mapToGeo(sim.pos)});}
  if(a==='back'){sim.offset=0;sim.fired.delete('offroute');}
  if(a==='floorOk')note(t('楼层已确认。','Floor confirmed.'));
  sync();
 }

 /* ---------- labels ---------- */
 function note(s){const el=$('#simStatus');if(el)el.textContent=s;}
 function sync(){
  if(panel.hidden)return;
  const g=ctx.getGuide();
  const walk=panel.querySelector('[data-sim="walk"]');walk.textContent=sim.walking?t('暂停行走','Pause walk'):g?t('沿路线行走','Walk the route'):t('开始导航并行走','Start directions & walk');walk.disabled=sim.real&&!!sim.realPos;
  const floor=g?String(g.floor||'1'):'1',wrong=floor==='G'?'1':'G';
  panel.querySelector('[data-sim="floorWrong"]').textContent=t(`到达 ${wrong} 层（错）`,`Arrive on floor ${wrong} (wrong)`);
  panel.querySelector('[data-sim="floorRight"]').textContent=t(`到达 ${floor} 层`,`Arrive on floor ${floor}`);
  panel.querySelector('[data-sim="pause"]').textContent=sim.paused?t('恢复所有提醒','Resume all prompts'):t('暂停所有提醒','Pause all prompts');
  ['off','floorWrong','floorRight'].forEach(k=>panel.querySelector(`[data-sim="${k}"]`).disabled=!g);
 }
 if(new URLSearchParams(location.search).has('sim'))open(true);
 return {active:()=>sim.on,refresh:()=>{place();sync();},reset:()=>{sim.dist=0;sim.offset=0;sim.walking=false;sim.fired.clear();hide();place();sync();}};
}
