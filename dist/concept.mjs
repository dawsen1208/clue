// Design-only assumptions. Never write these values back to the sourced directory.
export const scenarioFloors={arts127:'1',strathconaG19:'G',poyntingS02:'G',computerUG04:'UG',munrowLT:'G',astonLT:'G',hackettG29:'G',guild149:'1'};
export function conceptPlaces(records){return records.map(p=>({...p,floor:p.floor??scenarioFloors[p.id]??null,scenario:true,originalFloor:p.floor,availability:'scenario-available'}));}
export function withSampleDestinations(records, points){
 const existing=conceptPlaces(records);
 const samples=[];
 for(const {id:building,kind} of points){
  if(kind==='landmark')continue;
  const count=type=>existing.filter(place=>place.building===building&&place.type===type).length;
  const add=(id,type,name,zh,aliases,floor)=>samples.push({id:`sample-${building.toLowerCase()}-${id}`,type,building,name,zh,aliases,floor,source:null,accessible:false,genderNeutral:false,scenario:true,sample:true,originalFloor:null,availability:'scenario-available',note:['这是为体验流程而添加的示例。实际教室、厕所或楼层待核实。','This entry is a sample for testing the flow. The actual room, toilet and floor are unverified.']});
  if(count('room')<1)add('room-g','room','Sample room · G01','示例教室 · G01','教室 房间 room classroom G01','G');
  if(count('room')<2)add('room-1','room','Sample room · 101','示例教室 · 101','教室 房间 room classroom 101','1');
  if(count('toilet')<1)add('toilet','toilet','Sample toilet · Ground floor','示例厕所 · 地面层','厕所 卫生间 toilet bathroom loo WC','G');
 }
 return [...existing,...samples];
}
export const scenarioOrigin={lat:52.45045,lon:-1.9310,x:1320,y:738,name:'Green Heart',zh:'Green Heart',mode:'scenario'};
export function walkMinutes(metres,floor){return Math.max(1,Math.ceil(Math.max(0,metres||0)*1.3/75+(floor==='4'?2:floor==='1'?1:.5)));}
export const isDemo=mode=>mode==='concept';
