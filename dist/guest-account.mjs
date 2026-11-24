const key='clue:guest-account:v1';
const profileKey='clue:profiles:v1';
const read=(storage,key,fallback)=>{try{return JSON.parse(storage.getItem(key))??fallback;}catch{return fallback;}};
const ids=value=>Array.isArray(value)?value.filter(id=>typeof id==='string'&&id.length>0):[];

export function guestAccount(storage,makeId=()=>globalThis.crypto?.randomUUID?.()??`guest-${Date.now()}`){
 const account=read(storage,key,null);
 if(typeof account?.id==='string'&&account.id&&Array.isArray(account.saved))return {id:account.id,saved:[...new Set(ids(account.saved))]};
 let active=null;
 try{active=storage.getItem(profileKey+':active');}catch{}
 const profiles=read(storage,profileKey,[]);
 const prior=Array.isArray(profiles)&&active?profiles.find(p=>p?.id===active):null;
 return {id:makeId(),saved:[...new Set([...ids(prior?.saved),...ids(read(storage,'clue:saved',[])),...ids(read(storage,'campus-find:saved',[]))])]};
}

export function saveGuest(storage,account){
 try{storage.setItem(key,JSON.stringify({id:account.id,saved:ids(account.saved)}));return true;}catch{return false;}
}
