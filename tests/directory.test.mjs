import {test} from 'node:test';import assert from 'node:assert/strict';
import {places,buildings,sources} from '../dist/data.mjs';
import {findPlaces,distance,floorName,inCampus,proximityHelp} from '../dist/core.mjs';
test('room aliases and building codes match without punctuation sensitivity',()=>{
 assert.equal(findPlaces(places,buildings,{query:'arts-127'})[0].id,'arts127');
 assert.equal(findPlaces(places,buildings,{query:'CPSC UG04'})[0].id,'computerUG04');
 assert.ok(findPlaces(places,buildings,{query:'R30'}).every(p=>p.building==='R30'));
});
test('the poster room is searchable by booking label and room number',()=>{
 for(const query of ['148','Room 148','GSR 01','GSR01','148号房']){
  const result=findPlaces(places,buildings,{query});
  assert.deepEqual(result.map(({id,building,floor,source})=>[id,building,floor,source]),[
   ['library148','R30','1','studyRooms']
  ]);
 }
});
test('unknown floors are not derived from room codes',()=>{
 for(const id of ['arts127','strathconaG19','computerUG04','poyntingS02']) assert.equal(places.find(p=>p.id===id).floor,null);
 assert.equal(floorName(null,true),'Floor to confirm');
});
test('known floors and facilities always have a source',()=>{
 for(const p of places){assert.ok(buildings.some(b=>b.id===p.building));if(p.floor!==null||p.type==='toilet')assert.ok(sources[p.source]);}
 assert.equal(new Set(places.map(p=>p.id)).size,places.length);
});
test('nearby toilet ranking changes with origin and applies facility needs',()=>{
 const tlb=buildings.find(b=>b.id==='R32'),lib=buildings.find(b=>b.id==='R30');
 assert.equal(findPlaces(places,buildings,{category:'toilet',origin:tlb})[0].building,'R32');
 assert.equal(findPlaces(places,buildings,{category:'toilet',origin:lib})[0].building,'R30');
 assert.ok(findPlaces(places,buildings,{category:'toilet',accessible:true}).every(p=>p.accessible));
 assert.equal(findPlaces(places,buildings,{category:'toilet',accessible:true,neutral:true}).length,0);
});
test('outside campus and missing locations do not produce a misleading nearest result',()=>{
 assert.equal(inCampus({lat:51.5,lon:-.1}),false);assert.equal(inCampus({lat:NaN,lon:0}),false);
 assert.ok(findPlaces(places,buildings,{origin:{lat:51.5,lon:-.1}}).every(p=>p.metres===null));
 assert.ok(findPlaces(places,buildings).every(p=>p.metres===null));
});
test('arrival prompts require sufficiently accurate position, not just a broad GPS fix',()=>{
 const b=buildings[0];assert.equal(distance(b,b),0);assert.equal(proximityHelp(b,b,15),true);assert.equal(proximityHelp(b,b,100),false);
 assert.equal(proximityHelp(buildings.find(b=>b.id==='Y9'),b,10),false);
});
