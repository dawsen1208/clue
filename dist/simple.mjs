// Clue · Simple — a plain comparison variant of the main prototype.
// Same directory, same campus map, same walking network; no extra features.
import {places} from './data.mjs?v=room-148';
import {findPlaces,floorName,distance} from './core.mjs';
import {withSampleDestinations,scenarioOrigin,walkMinutes} from './concept.mjs?v=start-first';
import {originPoints,walkingRoute} from './campus-routing.mjs?v=start-first';
import {floorPlan,escapeText as e} from './map-first.mjs?v=locate-map';
import {buildings} from './data.mjs?v=room-148';
import {sampleFacilities,facilityTypes,facilityGlyph,facilityOrder,facilitiesIn} from './facilities.mjs?v=fac-1';

const directory=[...withSampleDestinations(places,originPoints),...sampleFacilities()];
const CROP={x:786,y:47,w:946,h:1037};          // same crop as the main map (legend excluded)
const METRES_PER_UNIT=1.45;                    // from the map↔geo alignment in core.mjs
const me={...(originPoints.find(o=>o.id==='green')||scenarioOrigin)}; // same default start as the main prototype
const state={dest:null,route:null,tab:'directions',open:false,heading:35,compass:false,bldg:null,steps:{1:true,2:false}};
const view={x:0,y:0,w:420};
const bOf=p=>originPoints.find(b=>b.id===p.building);

const app=document.getElementById('app');
app.innerHTML=`
<div class="s-map" id="map" aria-label="Campus map">
 <svg id="svg" role="img" aria-label="Campus map">
  <defs><clipPath id="crop"><rect x="${CROP.x}" y="${CROP.y}" width="${CROP.w}" height="${CROP.h}"/></clipPath></defs>
  <image href="assets/campus-map.webp" width="1786" height="1263" clip-path="url(#crop)"/>
  <g id="routeLayer"></g><g id="pinLayer"></g>
  <g id="meMarker" aria-label="Your location">
   <circle class="s-me-ring" r="34"/>
   <g id="meHeading"><path class="s-me-cone" d="M0 0 L-30 -70 A76 76 0 0 1 30 -70 Z"/></g>
   <circle class="s-me-dot" r="12"/>
  </g>
 </svg>
 <div class="s-legend" id="legend" aria-label="Map key">${facilityOrder.map(t=>`<span><svg viewBox="-10 -10 20 20" aria-hidden="true"><circle r="9" fill="${facilityTypes[t].color}"/><g style="color:${facilityTypes[t].color}">${facilityGlyph[t]}</g></svg>${facilityTypes[t].en}</span>`).join('')}<em class="s-sim">Simulated data · 模拟数据</em></div>
 <ol class="s-results" id="results" hidden></ol>
 <button class="s-locate" id="locate" type="button" aria-label="Centre on my location"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" fill="#1a73e8"/><circle cx="12" cy="12" r="8" fill="none" stroke="#1a73e8" stroke-width="2"/><path d="M12 1v4M12 19v4M1 12h4M19 12h4" stroke="#1a73e8" stroke-width="2"/></svg></button>
</div>
<form class="s-search" id="searchForm" role="search">
 <label><svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/></svg>
  <input id="q" type="search" placeholder="Search room, building or toilet" autocomplete="off" aria-label="Search room, building or toilet">
  <button class="s-clear" id="clear" type="button" aria-label="Clear" hidden>×</button>
 </label>
</form>
<section class="s-panel" id="panel">
 <div class="s-tabs" role="tablist">
  <button role="tab" data-tab="directions" aria-selected="true">Directions</button>
  <button role="tab" data-tab="floor" aria-selected="false">Floor</button>
  <button role="tab" data-tab="nearby" aria-selected="false">Nearby</button>
 </div>
 <div class="s-body" id="body" role="tabpanel"></div>
</section>`;

const $=id=>document.getElementById(id);
const svg=$('svg'),mapEl=$('map'),q=$('q'),results=$('results'),panel=$('panel'),body=$('body');

/* ---------- map view (pan / zoom) ---------- */
function aspect(){const r=mapEl.getBoundingClientRect();return r.height/Math.max(1,r.width);}
function applyView(){
 view.w=Math.max(180,Math.min(CROP.w,view.w));
 const h=view.w*aspect();
 view.x=Math.max(CROP.x,Math.min(CROP.x+CROP.w-view.w,view.x));
 view.y=h>=CROP.h?CROP.y-(h-CROP.h)/2:Math.max(CROP.y,Math.min(CROP.y+CROP.h-h,view.y));
 svg.setAttribute('viewBox',`${view.x} ${view.y} ${view.w} ${h}`);
 // keep markers a constant on-screen size
 const k=view.w/420;
 $('meMarker').setAttribute('transform',`translate(${me.x} ${me.y}) scale(${k})`);
 svg.querySelectorAll('.s-pin').forEach(g=>g.setAttribute('transform',`translate(${g.dataset.x} ${g.dataset.y}) scale(${k})`));
 svg.querySelectorAll('.s-route,.s-route-halo').forEach(l=>l.style.strokeWidth=(l.classList.contains('s-route')?7:12)*k);
}
function centreOn(points,pad=1.5){
 const xs=points.map(p=>p.x),ys=points.map(p=>p.y),cx=(Math.min(...xs)+Math.max(...xs))/2,cy=(Math.min(...ys)+Math.max(...ys))/2;
 const a=aspect(),span=Math.max(Math.max(...xs)-Math.min(...xs),(Math.max(...ys)-Math.min(...ys))/a);
 view.w=Math.max(300,span*pad);view.x=cx-view.w/2;view.y=cy-view.w*a/2;applyView();
}
const pointers=new Map();let pinchStart=null;
function toMap(dx,dy){const r=mapEl.getBoundingClientRect();return [dx*view.w/r.width,dy*view.w/r.width];}
let tap=null;
mapEl.addEventListener('pointerdown',ev=>{if(ev.target.closest('button,.s-results'))return;tap=pointers.size?null:{x:ev.clientX,y:ev.clientY};mapEl.setPointerCapture(ev.pointerId);pointers.set(ev.pointerId,{x:ev.clientX,y:ev.clientY});if(pointers.size===2){const [a,b]=[...pointers.values()];pinchStart={d:Math.hypot(a.x-b.x,a.y-b.y),w:view.w};}});
mapEl.addEventListener('pointermove',ev=>{
 const prev=pointers.get(ev.pointerId);if(!prev)return;
 if(pointers.size===1){const [dx,dy]=toMap(ev.clientX-prev.x,ev.clientY-prev.y);view.x-=dx;view.y-=dy;}
 pointers.set(ev.pointerId,{x:ev.clientX,y:ev.clientY});
 if(pointers.size===2&&pinchStart){const [a,b]=[...pointers.values()];zoomAt((a.x+b.x)/2,(a.y+b.y)/2,pinchStart.w*pinchStart.d/Math.max(1,Math.hypot(a.x-b.x,a.y-b.y)));}
 applyView();
});
['pointerup','pointercancel'].forEach(t=>mapEl.addEventListener(t,ev=>{
 if(t==='pointerup'&&tap&&pointers.size===1&&Math.hypot(ev.clientX-tap.x,ev.clientY-tap.y)<6){
  const pin=document.elementsFromPoint(ev.clientX,ev.clientY).map(n=>n.closest?.('.s-pin')).find(Boolean);
  if(pin)openBuilding(pin.dataset.id);
 }
 tap=null;pointers.delete(ev.pointerId);if(pointers.size<2)pinchStart=null;}));
function zoomAt(clientX,clientY,newW){
 const r=mapEl.getBoundingClientRect(),fx=(clientX-r.left)/r.width,fy=(clientY-r.top)/r.height,a=aspect();
 const mx=view.x+fx*view.w,my=view.y+fy*view.w*a;
 view.w=Math.max(180,Math.min(CROP.w,newW));view.x=mx-fx*view.w;view.y=my-fy*view.w*a;
}
mapEl.addEventListener('wheel',ev=>{ev.preventDefault();zoomAt(ev.clientX,ev.clientY,view.w*Math.exp(ev.deltaY*0.0015));applyView();},{passive:false});
addEventListener('resize',applyView);

/* ---------- pins, route, heading ---------- */
function drawPins(){
 const ids=new Set(buildings.map(b=>b.id));if(state.dest)ids.add(state.dest.building);
 $('pinLayer').innerHTML=[...ids].map(id=>{const b=originPoints.find(p=>p.id===id);const dest=state.dest?.building===id;
  const fac=facilitiesIn(directory,id),sel=state.bldg===id;
  const badges=fac.map((t,i)=>`<g class="s-badge" transform="translate(${(dest?15:11)+9+i*19} 21)" style="color:${facilityTypes[t].color}"><circle r="9" fill="${facilityTypes[t].color}"/>${facilityGlyph[t]}</g>`).join('');
  return `<g class="s-pin${dest?' is-dest':''}${sel?' is-sel':''}" data-id="${e(id)}" data-x="${b.x}" data-y="${b.y}" role="button" aria-label="${e(b.name+': '+fac.map(t=>facilityTypes[t].en).join(', '))}"><rect class="s-hit" x="-14" y="-14" width="${(dest?15:11)+Math.max(40,fac.length*19)+14}" height="46" fill="transparent"/><circle r="${dest?11:7}"/><text x="${dest?15:11}" y="5">${e(dest?b.name:b.id)}</text>${badges}</g>`;}).join('');
}
function drawRoute(){
 const pts=state.route?.points;
 $('routeLayer').innerHTML=pts&&pts.length>1?(()=>{const s=pts.map(p=>p.x+','+p.y).join(' ');return `<polyline class="s-route-halo" points="${s}"/><polyline class="s-route" points="${s}"/>`;})():'';
}
function setHeading(deg){state.heading=deg;$('meHeading').setAttribute('transform',`rotate(${deg})`);}
function headingToRoute(){
 const pts=state.route?.points;if(!pts||pts.length<2||state.compass)return;
 const n=pts.find(p=>Math.hypot(p.x-me.x,p.y-me.y)>25)||pts.at(-1);
 setHeading(Math.atan2(n.x-me.x,-(n.y-me.y))*180/Math.PI);
}
// Real compass where the device offers one (the position itself stays simulated).
function onOrient(ev){
 const h=typeof ev.webkitCompassHeading==='number'?ev.webkitCompassHeading:(ev.absolute&&ev.alpha!=null?360-ev.alpha:null);
 if(h==null)return;state.compass=true;setHeading(h);
}
addEventListener('deviceorientationabsolute',onOrient);
$('locate').addEventListener('click',async()=>{
 try{if(typeof DeviceOrientationEvent?.requestPermission==='function'&&(await DeviceOrientationEvent.requestPermission())==='granted')addEventListener('deviceorientation',onOrient);}catch{}
 view.w=Math.min(view.w,420);view.x=me.x-view.w/2;view.y=me.y-view.w*aspect()/2;applyView();
});

/* ---------- search ---------- */
function search(text){
 const t=text.trim();$('clear').hidden=!t;
 if(!t){results.hidden=true;results.innerHTML='';return;}
 const hits=findPlaces(directory,originPoints,{query:t}).sort((a,b)=>(a.sample?1:0)-(b.sample?1:0)).slice(0,8);
 results.innerHTML=hits.length?hits.map(p=>`<li><button type="button" data-id="${e(p.id)}">${e(p.name)}<small>${e(bOf(p).name)} · ${e(floorName(p.floor,true))}</small></button></li>`).join(''):'<li class="s-empty">No matches. Try a room number, e.g. 148.</li>';
 results.hidden=false;
}
q.addEventListener('input',()=>search(q.value));
q.addEventListener('focus',()=>{if(q.value.trim())search(q.value);});
$('searchForm').addEventListener('submit',ev=>{ev.preventDefault();const first=results.querySelector('button[data-id]');if(first)choose(first.dataset.id);});
results.addEventListener('click',ev=>{const b=ev.target.closest('button[data-id]');if(b)choose(b.dataset.id);});
$('clear').addEventListener('click',()=>{q.value='';search('');state.dest=null;state.route=null;drawPins();drawRoute();renderPanel();q.focus();});

function choose(id){
 const p=directory.find(x=>x.id===id);if(!p)return;
 state.bldg=null;state.steps={1:true,2:false};state.dest=p;state.route=trim(walkingRoute(me,bOf(p)));
 q.value=p.name;results.hidden=true;q.blur();$('clear').hidden=false;
 drawPins();drawRoute();headingToRoute();
 state.tab='directions';state.open=true;renderPanel();
 requestAnimationFrame(fitDest);
}
function fitDest(){if(state.dest)centreOn(state.route?.points||[me,bOf(state.dest)],1.6);}
// The panel height animates; re-fit once it settles so the route stays in view.
body.addEventListener('transitionend',ev=>{if(ev.propertyName==='max-height'){applyView();fitDest();}});

/* ---------- building card (tap a pin) ---------- */
function openBuilding(id){state.bldg=id;state.tab='directions';state.open=true;drawPins();renderPanel();}
function buildingCard(id){
 const b=originPoints.find(p=>p.id===id),inside=directory.filter(p=>p.building===id);
 const groups=facilityOrder.map(t=>[t,inside.filter(p=>p.type===t)]).filter(([,l])=>l.length);
 const rooms=inside.filter(p=>p.type==='room');
 const row=p=>`<li><button type="button" data-id="${e(p.id)}"><span>${e(p.name)}${p.sample?' <em class="s-tag">simulated</em>':''}</span><small>${e(floorName(p.floor,true))}</small></button></li>`;
 return `<div class="s-sec"><div class="s-bhead"><h2>${e(b.name)}</h2><button type="button" class="s-x" data-close aria-label="Close building">×</button></div>
  ${groups.map(([t,l])=>`<p class="s-group"><svg viewBox="-10 -10 20 20" aria-hidden="true"><circle r="9" fill="${facilityTypes[t].color}"/><g style="color:${facilityTypes[t].color}">${facilityGlyph[t]}</g></svg>${facilityTypes[t].en}</p><ul class="s-list">${l.map(row).join('')}</ul>`).join('')}
  ${rooms.length?`<p class="s-group s-plain">Rooms</p><ul class="s-list">${rooms.map(row).join('')}</ul>`:''}
  <p class="s-note">Simulated data (模拟数据): café, printing, study and lift entries, and toilets marked “simulated”, are placeholders for this design demo. Their locations and floors are not real.</p></div>`;
}

/* ---------- bottom panel ---------- */
panel.querySelector('.s-tabs').addEventListener('click',ev=>{
 const b=ev.target.closest('button[data-tab]');if(!b)return;
 state.open=!(state.open&&state.tab===b.dataset.tab);state.tab=b.dataset.tab;renderPanel();
});
body.addEventListener('click',ev=>{
 if(ev.target.closest('[data-close]')){state.bldg=null;drawPins();if(!state.dest)state.open=false;renderPanel();return;}
 const b=ev.target.closest('button[data-id]');if(b)choose(b.dataset.id);});
body.addEventListener('toggle',ev=>{const d=ev.target;if(d.dataset?.step)state.steps[d.dataset.step]=d.open;},true);
// Drop a first junction that lies behind the walker, so the line leaves the marker forwards.
function trim(route){
 if(!route||route.points.length<3)return route;
 const [a,b,c]=route.points,d=(u,v)=>Math.hypot(u.x-v.x,u.y-v.y);
 return d(a,c)<d(b,c)?{...route,points:[a,...route.points.slice(2)]}:route;
}
const startChoices=[...originPoints.filter(o=>o.kind==='landmark'),...buildings.map(b=>originPoints.find(o=>o.id===b.id))].filter(Boolean);
function startPicker(){return `<label class="s-from">From <select id="fromSelect" aria-label="Starting point">${startChoices.map(o=>`<option value="${e(o.id)}"${o.id===me.id?' selected':''}>${e(o.name)}</option>`).join('')}</select></label>`;}
function setStart(id){
 const o=originPoints.find(x=>x.id===id);if(!o)return;
 Object.assign(me,{id:o.id,name:o.name,x:o.x,y:o.y,lat:o.lat,lon:o.lon});
 state.compass=false;
 if(state.dest){state.route=trim(walkingRoute(me,bOf(state.dest)));drawRoute();headingToRoute();}
 renderPanel();requestAnimationFrame(()=>state.dest?fitDest():(view.x=me.x-view.w/2,view.y=me.y-view.w*aspect()/2,applyView()));
}
body.addEventListener('change',ev=>{if(ev.target.id==='fromSelect')setStart(ev.target.value);});
function metres(){return Math.round((state.route?.length||0)*METRES_PER_UNIT);}
// Minutes use the main prototype's formula (straight-line distance), so both versions agree.
const minutes=p=>walkMinutes(distance(me,bOf(p)),p.floor);
function renderPanel(){
 panel.classList.toggle('is-open',state.open);
 panel.querySelectorAll('[data-tab]').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.tab===state.tab)));
 const p=state.dest,b=p&&bOf(p);
 if(state.tab==='directions'){
  const hasLift=p&&directory.some(x=>x.building===p.building&&x.type==='lift');
  const loo=p&&directory.find(x=>x.building===p.building&&x.type==='toilet');
  body.innerHTML=state.bldg?buildingCard(state.bldg):p?`<div class="s-sec">${startPicker()}<h2>${e(p.name)}</h2><p class="s-meta">${e(b.name)} · ${e(floorName(p.floor,true))} · about ${minutes(p)} min</p>
   <details class="s-step" data-step="1"${state.steps[1]?' open':''}><summary><b>1</b><span><strong>Outdoors</strong><small>Walk to ${e(b.name)}</small></span></summary>
    <ol class="s-steps"><li>Walk to <strong>${e(b.name)}</strong>, following the blue line.</li><li>Enter the building.</li></ol></details>
   <details class="s-step" data-step="2"${state.steps[2]?' open':''}><summary><b>2</b><span><strong>Inside the building</strong><small>${e(floorName(p.floor,true))} · ${e(p.name)}</small></span></summary>
    <ol class="s-steps"><li>Take the stairs${hasLift?' or lift':''} to <strong>${e(floorName(p.floor,true))}</strong>.</li><li>Follow the room signs to <strong>${e(p.name)}</strong>.</li></ol>${loo&&p.type!=='toilet'?`<p class="s-hint">Toilet in this building: ${e(loo.name)}${loo.sample?' (simulated)':''}.</p>`:''}</details>
   <p class="s-note">Prototype: your position and the route are simulated.</p></div>`
  :`<div class="s-sec">${startPicker()}<p>Search for a room, building or toilet to see directions.</p><p class="s-note">Try “Room 148”, or tap a building to see what's inside. Your position is simulated; change it above.</p></div>`;
 }else if(state.tab==='floor'){
  body.innerHTML=p?(p.floor?`<div class="s-sec"><p class="s-meta">${e(b.name)} · ${e(floorName(p.floor,true))}</p><div class="s-plan">${floorPlan(p.building,p.floor,true,{target:true})}</div></div>`
   :`<div class="s-sec"><p>The floor for this room has not been confirmed yet.</p></div>`)
  :`<div class="s-sec"><p>Choose a destination to see its floor.</p></div>`;
 }else{
  const list=directory.filter(x=>x.type==='toilet'&&!x.sample).map(x=>({x,r:walkingRoute(me,bOf(x))})).filter(o=>o.r).sort((a,c)=>a.r.length-c.r.length).slice(0,6);
  body.innerHTML=`<div class="s-sec"><p class="s-meta">Nearest toilets</p><ul class="s-list">${list.map(({x,r})=>`<li><button type="button" data-id="${e(x.id)}"><span>${e(x.name)}<br><small>${e(bOf(x).name)}</small></span><small>~${minutes(x)} min</small></button></li>`).join('')}</ul></div>`;
 }
 requestAnimationFrame(applyView);
}

/* ---------- start ---------- */
drawPins();setHeading(state.heading);renderPanel();
view.w=420;view.x=me.x-view.w/2;view.y=me.y-view.w*aspect()/2;applyView();
const start=new URLSearchParams(location.search).get('q');if(start){q.value=start;search(start);}
