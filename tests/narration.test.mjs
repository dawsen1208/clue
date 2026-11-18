import test from 'node:test';
import assert from 'node:assert/strict';
import {narrationLines,createNarrator} from '../dist/narration.mjs';
const context={p:{id:'arts127',type:'room',name:'Lecture Room 3 · 127',zh:'教室127',floor:'1'},b:{id:'R16',name:'Arts Building',zh:'文科楼'},stage:3,en:true,origin:{name:'Green Heart',zh:'Green Heart'},floor:'First floor · 1',stepFree:false,recovery:false,reminders:true,muted:false,estimate:'~4 min'};
test('spoken steps reuse the earlier detailed text rather than reading visual controls',()=>{
 const script=narrationLines(context).join(' ');assert.match(script,/From the stairs exit, enter the corridor on this floor/);assert.match(script,/check the direction sign at the corner/);assert.match(script,/Compare the room code beside or on the door/);assert.doesNotMatch(script,/Show indoor sketch|Previous clue|FOLLOWING A CLUE|CLUE 4/);assert.match(script,/Demo guidance/);assert.match(script,/Arts Building/);
 assert.match(narrationLines({...context,stepFree:true}).join(' '),/From the lift exit/);
 assert.match(narrationLines({...context,en:false}).join(' '),/从本层的楼梯出口进入走廊/);
});
test('recovery and toilet instructions preserve the human confirmation and fallback',()=>{
 const script=narrationLines({...context,stage:4,p:{...context.p,type:'toilet'},recovery:true}).join(' ');assert.match(script,/facilities needed are usable/);assert.match(script,/ask an on-site service desk or staff member/);assert.doesNotMatch(script,/id=|<button/);
});
function fake(){const spoken=[],statuses=[];let cancelled=0;class Utterance{constructor(text){this.text=text;}}const synthesis={speak:u=>spoken.push(u),cancel:()=>cancelled++,getVoices:()=>[{lang:'en-GB',name:'English'},{lang:'zh-CN',name:'Chinese'}]};return {spoken,statuses,narrator:createNarrator({synthesis,Utterance,onStatus:s=>statuses.push(s)}),cancelled:()=>cancelled};}
test('voice is off until explicit opt-in, then reads chunks and does not repeat identical renders',()=>{
 const {spoken,narrator}=fake();narrator.update('step0',['First','Second'],'en-GB');assert.equal(spoken.length,0);assert.equal(narrator.enabled,false);narrator.setEnabled(true);assert.equal(spoken.length,1);assert.equal(spoken[0].lang,'en-GB');assert.equal(spoken[0].voice.lang,'en-GB');spoken[0].onstart();assert.equal(narrator.status,'speaking');spoken[0].onend();assert.equal(spoken.length,2);spoken[1].onend();assert.equal(narrator.status,'done');narrator.update('step0',['First','Second'],'en-GB');assert.equal(spoken.length,2);
});
test('step changes replace old speech; stale events cannot start old instructions',()=>{
 const {spoken,narrator}=fake();narrator.update('0',['Origin','Old continuation'],'en-GB');narrator.setEnabled(true);const old=spoken[0];narrator.update('1',['Building'],'en-GB');assert.equal(spoken.at(-1).text,'Building');old.onend();old.onerror({error:'canceled'});assert.equal(spoken.length,2);assert.equal(narrator.status,'starting');narrator.setEnabled(false);spoken[1].onend();assert.equal(spoken.length,2);assert.equal(narrator.status,'off');
});
test('stop, replay, leaving a guide and engine failures all leave a controllable state',()=>{
 const {spoken,narrator}=fake();narrator.update('0',['Origin'],'zh-CN');narrator.setEnabled(true);narrator.stop();assert.equal(narrator.status,'stopped');narrator.replay();assert.equal(spoken.length,2);spoken[1].onerror({error:'not-allowed'});assert.equal(narrator.status,'blocked');narrator.replay();assert.equal(spoken.length,3);narrator.deactivate();spoken[2].onend();assert.equal(spoken.length,3);assert.equal(narrator.status,'ready');
 const missing=createNarrator();assert.equal(missing.supported,false);missing.setEnabled(true);assert.equal(missing.enabled,false);assert.equal(missing.status,'unsupported');
});
