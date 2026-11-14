import test from 'node:test';
import assert from 'node:assert/strict';
import {journeyNext,journeyMarkup} from '../dist/journey.mjs';
test('location updates and arrival events cannot skip a human checkpoint',()=>{
 assert.equal(journeyNext(0,'gpsUpdated'),0);
 assert.equal(journeyNext(0,'entered'),0);
 assert.equal(journeyNext(1,'floorReached'),1);
 assert.equal(journeyNext(3,'found'),3);
 assert.equal(journeyNext(4,'gpsUpdated'),4);
 assert.equal(journeyNext(4,'retry'),3);
});
const common={b:{id:'R16',name:'Arts',zh:'文科楼'},en:true,origin:{name:'Green Heart',zh:'Green Heart'},floor:'First floor · 1',stepFree:false,recovery:false,reminders:true,muted:false,estimate:'~4 min'};
test('success control is offered only at final confirmation, not from location or a sign',()=>{
 const p={id:'room',type:'room',name:'Lecture Room · 127',zh:'教室'};
 for(let stage=0;stage<4;stage++)assert.doesNotMatch(journeyMarkup({...common,p,stage}),/id="finishGuide"/);
 assert.match(journeyMarkup({...common,p,stage:4}),/id="finishGuide"/);
});
test('toilet recovery offers alternatives without completing the task or claiming a usable facility',()=>{
 const html=journeyMarkup({...common,p:{type:'toilet',name:'Toilet',zh:'厕所'},stage:4,recovery:true});
 assert.match(html,/id="otherToilets"/);assert.match(html,/id="recheckFloor"/);
 assert.match(html,/confirmed the facilities needed are usable/);
 assert.match(html,/not field-verified/);
});
