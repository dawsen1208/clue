import {test} from 'node:test';
import assert from 'node:assert/strict';
import {guestAccount,saveGuest} from '../dist/guest-account.mjs';

test('a browser guest retains its identity and bookmarks across reloads',()=>{
 const data=new Map();const storage={getItem:k=>data.get(k),setItem:(k,v)=>data.set(k,v)};
 storage.setItem('clue:saved','["arts127"]');
 storage.setItem('clue:profiles:v1:active','previous');
 storage.setItem('clue:profiles:v1','[{"id":"previous","saved":["library404"]},{"id":"other","saved":["private"]}]');
 const guest=guestAccount(storage,()=> 'guest-1');
 assert.deepEqual(guest,{id:'guest-1',saved:['library404','arts127']});
 assert(saveGuest(storage,guest));
 guest.saved.pop();
 assert(saveGuest(storage,guest));
 assert.deepEqual(guestAccount(storage,()=> 'unexpected'),{id:'guest-1',saved:['library404']});
 assert.deepEqual(guestAccount(null,()=> 'new-device'),{id:'new-device',saved:[]});
});
