import {planGeometry} from './campus-routing.mjs';

export const escapeText=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function locateRouteMap({route,origin,destination,en,stepFree=false}){
 const t=(zh,eng)=>en?eng:zh,e=escapeText;
 if(!route||route.points.length<2)return `<p class="route-map-status">${t('没有可显示的步行路线。请检查出发点或路线偏好。','No walking route to show. Check your starting point or route preference.')}</p>`;
 const points=route.points,start=points[0],end=points.at(-1);
 const fit=(values,min,max,minimum)=>{
  const low=Math.min(...values),high=Math.max(...values);
  const span=Math.min(max-min,Math.max(minimum,high-low+100));
  return [Math.max(min,Math.min(max-span,(low+high-span)/2)),span];
 };
 const [x,w]=fit(points.map(p=>p.x),786,1732,355),[y,h]=fit(points.map(p=>p.y),47,1084,245);
 const originName=en?origin.name:origin.zh,destinationName=en?destination.name:destination.zh;
 const title=t('步行路线 · 演示','Walking route · demo');
 return `<figure class="locate-route-map"><figcaption><strong>${title}</strong><span>${t('示意步道网络内的最短路线','Shortest route in the illustrative walking network')}${stepFree?' · '+t('无台阶演示','step-free demo'):''}</span></figcaption><svg viewBox="${x} ${y} ${w} ${h}" role="img" aria-label="${e(title+' / '+originName+' → '+destinationName)}"><image href="assets/campus-map.webp" width="1786" height="1263"/><polyline class="locate-route-halo" points="${points.map(p=>p.x+','+p.y).join(' ')}"/><polyline class="locate-route-line" points="${points.map(p=>p.x+','+p.y).join(' ')}"/><circle class="locate-route-start" cx="${start.x}" cy="${start.y}" r="9"/><circle class="locate-route-end" cx="${end.x}" cy="${end.y}" r="9"/></svg><ol class="locate-route-endpoints"><li><span>${t('起点','Start')}</span><strong>${e(originName)}</strong></li><li><span>${t('终点建筑','Destination building')}</span><strong>${e(destinationName)}</strong></li></ol></figure>`;
}
export function levelsFor(building,places){
 const extra={R30:['LG','G','1','2','3','4'],R32:['G','UG','1','2'],R16:['G','1','2'],R13:['LG','G','1','2'],R25:['G']}[building]||['G','1'];
 return [...new Set([...extra,...places.map(p=>p.floor).filter(Boolean)])];
}
export function floorPlan(building,level,en,{stepFree=false,target=false}={}){
 const t=(zh,eng)=>en?eng:zh,e=escapeText,{rooms,corridor,bend,flip,seed}=planGeometry(building,level);
 const width=350/rooms;
 const blocks=Array.from({length:rooms},(_,i)=>{
  const x=36+i*width,y=27+(seed+i*17)%15,h=corridor-y-22;
  const lowerHeight=30+(seed+i*7)%21;
  return '<rect x="'+x+'" y="'+y+'" width="'+(width-7)+'" height="'+h+'"/><rect x="'+(x+5)+'" y="'+(corridor+16)+'" width="'+(width-12)+'" height="'+lowerHeight+'"/>';
 }).join('');
 const x=flip?46:374,dx=flip?375:47;
 return `<figure class="route-floor-plan"><svg viewBox="0 0 420 224" role="img" aria-label="${e(t('演示楼层图','Illustrative floor plan')+' '+level)}"><path class="plan-shell" d="M19 15H401V194H${bend}V205H19Z"/><g class="plan-rooms">${blocks}</g><path class="plan-corridor" d="M35 ${corridor}H386"/><circle class="plan-origin" cx="${x}" cy="${corridor}" r="7"/>${target?`<path class="plan-thread" d="M${x} ${corridor}H${dx}"/><circle class="plan-target" cx="${dx}" cy="${corridor}" r="7"/>`:''}<text x="${x}" y="187" text-anchor="${flip?'start':'end'}">${stepFree?t('电梯口','Lift landing'):level==='G'?t('入口','Entrance'):t('楼梯口','Stair landing')}</text><text x="210" y="217" text-anchor="middle">${e(level)} · ${t('演示布局','Illustrative layout')}</text></svg></figure>`;
}
export const profileKey='clue:profiles:v1';
export function profileName(raw){
 const name=String(raw??'').normalize('NFKC').trim().replace(/\s+/g,' ').slice(0,40);
 return name?{id:name.toLowerCase(),name}:null;
}
export function restoreProfiles(raw){
 try{const parsed=JSON.parse(raw);return Array.isArray(parsed)?parsed.filter(p=>p&&typeof p.id==='string'&&typeof p.name==='string'&&Array.isArray(p.saved)&&Array.isArray(p.routes)):[];}catch{return [];}
}

