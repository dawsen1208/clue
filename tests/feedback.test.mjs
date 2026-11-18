import test from 'node:test';
import assert from 'node:assert/strict';
import {createFeedback,advanceFeedback,readFeedback} from '../dist/feedback.mjs';
test('a saved note starts pending with no invented handling or reply',()=>{
 const r=createFeedback('  Floor sign unclear  ','arts127','2026-11-18T10:00:00Z','test-1');
 assert.equal(r.text,'Floor sign unclear');assert.equal(r.status,'pending');assert.equal(r.simulated,false);assert.equal(r.repliedAt,null);
 assert.equal(createFeedback('   '),null);assert.equal(createFeedback('x'.repeat(801)),null);
});
test('only explicit simulated transitions advance handling and preserve the original note',()=>{
 const r=createFeedback('Help with this doorway',null,'2026-11-18T10:00:00Z','test-2');
 const review=advanceFeedback(r,'2026-11-18T10:01:00Z'),reply=advanceFeedback(review,'2026-11-18T10:02:00Z');
 assert.equal(r.status,'pending');assert.equal(review.status,'reviewing');assert.equal(review.simulated,true);assert.equal(review.repliedAt,null);
 assert.equal(reply.status,'replied');assert.equal(reply.text,r.text);assert.equal(reply.reviewedAt,review.reviewedAt);assert.equal(reply.repliedAt,'2026-11-18T10:02:00Z');assert.deepEqual(advanceFeedback(reply),reply);
 assert.deepEqual(readFeedback(JSON.stringify([reply])),[reply]);
});
test('corrupt storage, duplicate ids and unknown statuses cannot create phantom cases',()=>{
 const r=createFeedback('<img src=x onerror=alert(1)>',null,'2026-11-18T10:00:00Z','test-3');
 assert.deepEqual(readFeedback('not json'),[]);assert.deepEqual(readFeedback('{}'),[]);
 assert.deepEqual(readFeedback(JSON.stringify([null,r,r,{...r,id:'bad',status:'fixed'}])),[r]);
});
