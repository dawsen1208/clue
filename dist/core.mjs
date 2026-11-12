export const normalise=s=>String(s||'').normalize('NFKC').toLowerCase().replace(/[\s_–—-]+/g,'');
export function distance(a,b){const r=Math.PI/180,dlat=(b.lat-a.lat)*r,dlon=(b.lon-a.lon)*r,v=Math.sin(dlat/2)**2+Math.cos(a.lat*r)*Math.cos(b.lat*r)*Math.sin(dlon/2)**2;return 6371000*2*Math.atan2(Math.sqrt(v),Math.sqrt(Math.max(0,1-v)));}
export const inCampus=p=>Number.isFinite(p.lat)&&Number.isFinite(p.lon)&&p.lat>=52.445&&p.lat<=52.456&&p.lon>=-1.941&&p.lon<=-1.921;
export function findPlaces(places,buildings,{query='',category='all',origin=null,accessible=false,neutral=false,saved=null}={}){
 const q=normalise(query);return places.filter(p=>{const b=buildings.find(b=>b.id===p.building);return b&&(!saved||saved.includes(p.id))&&(category==='all'||p.type===category)&&(!accessible||p.accessible===true)&&(!neutral||p.genderNeutral===true)&&(!q||normalise([p.name,p.zh,p.aliases,b.name,b.zh,b.id].join(' ')).includes(q));}).map(p=>({...p,metres:origin&&inCampus(origin)?distance(origin,buildings.find(b=>b.id===p.building)):null})).sort((a,b)=>a.metres!==null&&b.metres!==null?a.metres-b.metres:0);
}
// Campus sketch alignment only. Never used to claim a measured indoor position.
export const geoToMap=p=>({x:1282+(p.lon+1.9305)*47000,y:640-(p.lat-52.4514)*76000});
export const mapToGeo=p=>({lat:52.4514-(p.y-640)/76000,lon:-1.9305+(p.x-1282)/47000});
export const floorName=(floor,en=false)=>floor===null?(en?'Floor to confirm':'楼层待核实'):({G:en?'Ground floor · G':'地面层 · G',UG:en?'Upper ground · UG':'上地面层 · UG','1':en?'First floor · 1':'First Floor · 1','4':en?'Fourth floor · 4':'Fourth Floor · 4'}[floor]||floor);
export function proximityHelp(origin,building,accuracy=0){return inCampus(origin)&&accuracy<=60&&distance(origin,building)<70;}
