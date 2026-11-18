import test from 'node:test';
import assert from 'node:assert/strict';
import {journeyMarkup,journeyNext} from '../dist/visual-journey.mjs';
const common={p:{id:'library404',name:'Training Room 1 · 404',zh:'培训室 404',type:'room',floor:'4'},b:{id:'R30',name:'Main Library',zh:'主图书馆'},origin:{name:'Green Heart',zh:'Green Heart'},floor:'Fourth floor · 4',en:true,stepFree:false,recovery:false,reminders:true,muted:false,estimate:'~4 min'};
test('each checkpoint has a labelled diagram, compact action and optional expanded help',()=>{
 const controls=['confirmOrigin','enterBuilding','atFloor','atDoor','finishGuide'];
 for(let stage=0;stage<5;stage++){const html=journeyMarkup({...common,stage});assert.match(html,new RegExp('data-visual-step="'+stage+'"'));assert.match(html,/role="img" aria-label=/);assert.match(html,new RegExp('id="'+controls[stage]+'"'));assert.match(html,/<details class="way-help">/);assert.doesNotMatch(html,/checkpoint-list/);if(stage<4)assert.doesNotMatch(html,/id="finishGuide"/);}
});
test('lift preference changes the indoor graphic and its short cue, without bypassing confirmation',()=>{
 const lift=journeyMarkup({...common,stage:3,stepFree:true}),stairs=journeyMarkup({...common,stage:3});assert.match(lift,/Lift exit/);assert.match(stairs,/Stairs exit/);assert.equal(journeyNext(3,'gpsUpdated'),3);assert.equal(journeyNext(3,'atDoor'),4);
});
test('unknown floors are shown as unknown and user supplied room labels are escaped',()=>{
 const html=journeyMarkup({...common,p:{...common.p,floor:null,name:'Room · <404>'},stage:2});assert.ok(html.includes('<strong>?</strong>'));assert.doesNotMatch(html,/<404>/);assert.match(html,/&lt;404&gt;/);
});
test('toilet recovery preserves alternatives and facilities confirmation',()=>{
 const html=journeyMarkup({...common,p:{...common.p,type:'toilet'},stage:4,recovery:true});assert.match(html,/facilities usable/);for(const id of ['retryIndoor','recheckFloor','otherToilets','leaveFeedback'])assert.match(html,new RegExp('id="'+id+'"'));assert.match(html,/not field-verified/);
});
