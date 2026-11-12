// Design-only assumptions. Never write these values back to the sourced directory.
export const scenarioFloors={arts127:'1',strathconaG19:'G',poyntingS02:'G',computerUG04:'UG',munrowLT:'G',astonLT:'G',hackettG29:'G'};
export function conceptPlaces(records){return records.map(p=>({...p,floor:p.floor??scenarioFloors[p.id]??null,scenario:true,originalFloor:p.floor,availability:'scenario-available'}));}
export const scenarioOrigin={lat:52.45045,lon:-1.9310,x:1320,y:738,name:'Green Heart',zh:'Green Heart',mode:'scenario'};
export function walkMinutes(metres,floor){return Math.max(1,Math.ceil(Math.max(0,metres||0)*1.3/75+(floor==='4'?2:floor==='1'?1:.5)));}
export const isDemo=mode=>mode==='concept';
