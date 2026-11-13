// Fictional aggregate search counts for design testing. No queries are tracked.
const counts={arts127:[184,690],library404:[172,730],tlbWC:[146,450],poyntingS02:[131,510],strathconaG19:[118,620],computerUG04:[103,395],libraryWC:[92,440],munrowLT:[87,380],tlbAccessWC:[75,310],hackettG29:[64,285],library143:[53,350],library403:[48,320],libraryAccessWC:[42,200],astonLT:[36,190]};
export function popularPlaces(records,period='7'){
 const slot=period==='30'?1:0;
 return records.filter(p=>Object.hasOwn(counts,p.id)).map(p=>({...p,lookupCount:counts[p.id][slot]})).sort((a,b)=>b.lookupCount-a.lookupCount||a.id.localeCompare(b.id)).slice(0,10).map((p,i)=>({...p,rank:i+1,popularityDemo:true}));
}
export function isPopularContext({mode,view,query,category,accessible,neutral}){return mode==='concept'&&view==='find'&&!query.trim()&&category==='all'&&!accessible&&!neutral;}
