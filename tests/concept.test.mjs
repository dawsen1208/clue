import {test} from 'node:test';import assert from 'node:assert/strict';
import {places} from '../dist/data.mjs';import {conceptPlaces,walkMinutes,isDemo} from '../dist/concept.mjs';
test('scenario floors never overwrite the sourced directory',()=>{const original=JSON.stringify(places),concept=conceptPlaces(places);assert.equal(concept.find(p=>p.id==='arts127').floor,'1');assert.equal(places.find(p=>p.id==='arts127').floor,null);assert.equal(concept.find(p=>p.id==='arts127').originalFloor,null);assert.equal(JSON.stringify(places),original);assert.ok(concept.every(p=>p.scenario));});
test('concept and source views remain distinct',()=>{assert.equal(isDemo('concept'),true);assert.equal(isDemo('evidence'),false);});
test('scenario estimates stay finite and include floor transitions',()=>{assert.ok(Number.isFinite(walkMinutes(null,'G')));assert.ok(walkMinutes(150,'4')>walkMinutes(150,'G'));});
