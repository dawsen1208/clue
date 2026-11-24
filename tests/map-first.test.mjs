import {test} from 'node:test';
import assert from 'node:assert/strict';
import {buildings,places} from '../dist/data.mjs';
import {originPoints,walkingRoute,initialGuideStage,closestToilet,accessMatch} from '../dist/campus-routing.mjs';
import {floorPlan,profileName} from '../dist/map-first.mjs';

test('every original building and each new landmark has a unique map point',()=>{
 const ids=new Set(originPoints.map(p=>p.id));
 assert.equal(ids.size,originPoints.length);
 for(const id of [...buildings.map(b=>b.id),'station','north','south'])assert(ids.has(id));
});

test('same-building guidance starts at floor; other journeys start outside',()=>{
 const room=places.find(p=>p.id==='library404');
 assert.equal(initialGuideStage({id:'R30'},room,true),2);
 assert.equal(initialGuideStage({id:'R30'},room,false),1);
 assert.equal(initialGuideStage({id:'station'},room,true),0);
});

test('step-free nearest results exclude unconfigured start points and non-adapted toilets',()=>{
 const origin=originPoints.find(p=>p.id==='station');
 const result=closestToilet(places,origin,{stepFree:true,adapted:true});
 assert.equal(result?.accessible,true);
 assert(accessMatch(result,origin));
 assert(walkingRoute(origin,buildings.find(b=>b.id===result.building),true).points.length>2);
 assert.equal(closestToilet(places,originPoints.find(p=>p.id==='R16'),{stepFree:true,adapted:true}),null);
});

test('illustrative floor geometry is stable and varies by building and floor',()=>{
 const first=floorPlan('R30','G',true);
 assert.equal(first,floorPlan('R30','G',true));
 assert.notEqual(first,floorPlan('R30','1',true));
 assert.notEqual(first,floorPlan('R32','G',true));
 assert.deepEqual(profileName('  Demo   User '),{id:'demo user',name:'Demo User'});
});
