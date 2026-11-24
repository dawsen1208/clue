import {journeyMarkup as textJourney} from './journey.mjs';
const unescape=s=>s.replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
const plain=s=>unescape(s.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim());
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function narrationLines(context){
 const {en,p,b,floor,origin,stage,stepFree}=context,t=(zh,eng)=>en?eng:zh,n=o=>en?o.name:o.zh;
 // Reuse the earlier text-led journey, excluding controls and progress labels.
 const markup=textJourney(context),body=markup.slice(markup.indexOf('<div class="route-instruction journey-stage"'));
 const instructions=[...body.matchAll(/<(h3|p|li)\b([^>]*)>([\s\S]*?)<\/\1>/g)].filter(m=>!m[2].includes('journey-demo')&&!m[2].includes('eyebrow')).map(m=>plain(m[3])).filter(Boolean);
 const contextLine=t('演示语音。目的地：','Demo guidance. Destination: ')+n(b)+t('，',', ')+n(p)+t('，',', ')+floor+t('。','.');
 const originLine=stage===0||stage===1?t('参考起点：','Reference origin: ')+n(origin)+t('。','.') :'';
 const accessLine=stage===2&&stepFree?t('本次优先使用电梯与无台阶路径，仍需核对现场通行条件。','Lift and step-free access are preferred. Check on-site access conditions.'):'';
 return [contextLine,originLine,accessLine,...instructions].filter(Boolean);
}
export function createNarrator({synthesis,Utterance,onStatus=()=>{}}={}){
 const supported=!!synthesis&&typeof synthesis.speak==='function'&&typeof synthesis.cancel==='function'&&typeof Utterance==='function';
 let enabled=false,current=null,generation=0,status=supported?'off':'unsupported';
 const notify=value=>{status=value;onStatus(value);};
 const cancel=()=>{generation++;if(supported)synthesis.cancel();};
 function play(){
  cancel();if(!supported){notify('unsupported');return;}if(!enabled){notify('off');return;}if(!current?.lines.length){notify('ready');return;}
  const token=generation,script=current;
  function next(index){
   if(token!==generation||!enabled)return;if(index>=script.lines.length){notify('done');return;}
   try{const u=new Utterance(script.lines[index]);u.lang=script.lang;u.rate=.95;u.pitch=1;u.volume=1;
    const voices=typeof synthesis.getVoices==='function'?synthesis.getVoices():[],voice=voices.find(v=>v.lang?.toLowerCase()===script.lang.toLowerCase())||voices.find(v=>v.lang?.split('-')[0]===script.lang.split('-')[0]);if(voice)u.voice=voice;
    u.onstart=()=>{if(token===generation)notify('speaking');};
    u.onend=()=>{if(token===generation)next(index+1);};
    u.onerror=e=>{if(token!==generation)return;notify(e.error==='not-allowed'?'blocked':'error');};
    notify(index?'speaking':'starting');synthesis.speak(u);
   }catch{if(token===generation)notify('error');}
  }
  next(0);
 }
 return {get supported(){return supported;},get enabled(){return enabled;},get status(){return status;},
  update(key,lines,lang){const changed=current?.key!==key||current?.lang!==lang||JSON.stringify(current?.lines)!==JSON.stringify(lines);current={key,lines,lang};if(changed&&enabled)play();},
  setEnabled(value){enabled=!!value&&supported;if(enabled)play();else{cancel();notify(supported?'off':'unsupported');}},
  replay(){if(enabled)play();},stop(){cancel();notify(enabled?'stopped':supported?'off':'unsupported');},
  deactivate(){if(!current)return;cancel();current=null;notify(enabled?'ready':supported?'off':'unsupported');}
 };
}
const speaker='<svg class="way-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4V9Zm12-1a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/></svg>';
export function setupNarration({en}){
 const t=(zh,eng)=>en?eng:zh,$=s=>document.querySelector(s),labels={off:t('已关闭','Off'),ready:t('已开启，等待当前步骤','On · ready for a step'),starting:t('正在准备语音…','Starting voice…'),speaking:t('正在播报当前步骤','Reading this step'),done:t('本步骤播报完毕','Step finished'),stopped:t('已停止；下一步仍可播报','Stopped · next step will play'),blocked:t('请点击重播；或关闭语音继续','Tap Replay, or turn voice off to continue'),error:t('语音暂不可用，可重播或继续看图','Voice unavailable. Retry or continue with the diagrams'),unsupported:t('此浏览器不支持语音播报','Voice is not supported in this browser')};
 const narrator=createNarrator({synthesis:globalThis.speechSynthesis,Utterance:globalThis.SpeechSynthesisUtterance,onStatus:draw});
 function draw(){const panel=$('#narrationControls');if(!panel)return;$('#voiceEnabled').checked=narrator.enabled;$('#voiceEnabled').disabled=!narrator.supported;$('#voiceReplay').disabled=!narrator.enabled;$('#voiceStop').disabled=!['starting','speaking'].includes(narrator.status);$('#voiceStatus').textContent=labels[narrator.status];panel.dataset.voiceState=narrator.status;}
 function sync(context){
  if(!context){narrator.deactivate();return;}
  if(!$('#narrationControls')){const panel=document.createElement('section');panel.id='narrationControls';panel.className='narration-controls';panel.setAttribute('aria-label',t('可选语音指引','Optional voice guidance'));panel.innerHTML=`<div><label class="voice-choice"><input id="voiceEnabled" type="checkbox" aria-describedby="voiceStatus">${speaker}<span>${t('语音指引','Voice guide')}</span></label><button id="voiceReplay" type="button" aria-label="${t('重播当前步骤','Replay current step')}"><span aria-hidden="true">↻</span>${t('重播','Replay')}</button><button id="voiceStop" type="button" aria-label="${t('停止当前播报','Stop current narration')}"><span aria-hidden="true">■</span>${t('停止','Stop')}</button></div><small id="voiceStatus" role="status" aria-live="polite"></small>`;($('#guidePane #confirmOrigin')||$('#guidePane .journey-progress')).after(panel);$('#voiceEnabled').onchange=e=>narrator.setEnabled(e.target.checked);$('#voiceReplay').onclick=()=>narrator.replay();$('#voiceStop').onclick=()=>narrator.stop();}
  const lines=narrationLines(context),key=[context.p.id,context.stage,context.stepFree,context.recovery,context.origin?.name].join('/');
  narrator.update(key,lines,en?'en-GB':'zh-CN');draw();
  const help=$('#guidePane .way-help');if(help){let script=help.querySelector('.voice-transcript');if(!script){script=document.createElement('div');script.className='voice-transcript';help.append(script);}script.innerHTML=`<h4>${t('当前步骤播报文字','Narration for this step')}</h4>${lines.map(line=>`<p>${escape(line)}</p>`).join('')}<small>${t('沿用此前的文字指引 · 浏览器／设备音色','Uses the earlier written guidance · browser/device voice')}</small>`;}
 }
 document.addEventListener('visibilitychange',()=>{if(document.hidden)narrator.stop();});window.addEventListener('pagehide',()=>narrator.stop());
 return {sync,stop:()=>narrator.stop()};
}
