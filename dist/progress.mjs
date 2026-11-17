export const progressKey='clue:trail-draft:v1';
export function trailDraft(state,now=Date.now()){
 if(!state.guide)return null;
 const o=state.origin;
 return {version:1,placeId:state.guide.id,stage:state.stage,mode:state.mode,stepFree:!!state.stepFree,reminders:!!state.reminders,muted:!!state.muted,recovery:!!state.recovery,origin:o?{name:String(o.name||'Reference'),zh:String(o.zh||'参考点'),lat:o.lat,lon:o.lon,...(Number.isFinite(o.x)&&Number.isFinite(o.y)?{x:o.x,y:o.y}:{})}:null,savedAt:now};
}
export function readDraft(raw,knownIds,now=Date.now()){
 try{const p=JSON.parse(raw);if(!p||p.version!==1||!knownIds.includes(p.placeId)||!Number.isInteger(p.stage)||p.stage<0||p.stage>4||!['concept','evidence'].includes(p.mode)||!Number.isFinite(p.savedAt)||now-p.savedAt>7*86400000||p.savedAt>now+60000)return null;
 if(p.mode==='evidence'&&p.stage>2)return null;
 if(p.origin&&(!Number.isFinite(p.origin.lat)||!Number.isFinite(p.origin.lon)||p.origin.lat<52.44||p.origin.lat>52.47||p.origin.lon< -1.95||p.origin.lon> -1.91||typeof p.origin.name!=='string'||typeof p.origin.zh!=='string'))return null;
 if(p.origin&&(('x' in p.origin)&&(!Number.isFinite(p.origin.x)||!Number.isFinite(p.origin.y)||p.origin.x<0||p.origin.x>1786||p.origin.y<0||p.origin.y>1263)))return null;
 return p;}catch{return null;}
}
