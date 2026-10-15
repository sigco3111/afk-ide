import {HIGH_SETS} from './highlands.js';
import {THEMES,themeIndex} from './data.js';
// New drops only. Legacy items have no set and are never relabelled.
export const SET_NAMES=['안개 추적자','수렁 수호자','유리 유랑자','서리 파수꾼','공명 탐구자','왕의 맹세','화산 심장','심연 감시자','월광 수호자','조수 왕관','폭풍 날개','묘역 서약'];
SET_NAMES.push(...HIGH_SETS);
export const SET_BONUSES=[['atk','def'],['hp','def'],['atk','mp'],['def','hp'],['mp','atk'],['def','atk'],['atk','hp'],['mp','def'],['hp','atk'],['hp','mp'],['atk','def'],['def','hp']];
SET_BONUSES.push(['atk','mp'],['def','atk'],['mp','hp'],['hp','atk']);
export const SET_STAT={atk:'공격',def:'방어',hp:'최대HP',mp:'최대MP'};
export const setOf=i=>i?.setId!==undefined&&i.slot>=1&&i.slot<=4?{id:i.setId,name:SET_NAMES[i.setId],theme:THEMES[i.setId]?.[0]}:null;
export const setRate=grade=>[.02,.03,.04,.05,.06][grade];
export function setGroups(s){return SET_NAMES.map((name,id)=>{let items=s.equipment.filter(i=>i&&i.dur>0&&setOf(i)?.id===id),count=new Set(items.map(i=>i.slot)).size,grade=count?Math.min(...items.map(i=>i.grade)):0,rate=setRate(grade),stats=SET_BONUSES[id];return{id,name,theme:THEMES[id][0],count,grade,rate,stats,items};});}
export function setMultipliers(s){let out={atk:1,def:1,hp:1,mp:1};for(let g of setGroups(s)){if(g.count>=2)out[g.stats[0]]+=g.rate;if(g.count>=4)out[g.stats[1]]+=g.rate;}return out;}
export function tagSet(s,i){if(i.slot>=1&&i.slot<=4)i.setId=themeIndex(s.region,s.worldBoundary,s.highlandStart);return i;}
export function rememberSet(s,i){let set=setOf(i);if(!set)return;s.permanent.setPieces??=[];let key=set.id+':'+i.slot+':'+i.grade;if(!s.permanent.setPieces.includes(key))s.permanent.setPieces.push(key);}
export function setDescription(g){return `2부위 ${SET_STAT[g.stats[0]]}+${Math.round(g.rate*100)}% / 4부위 ${SET_STAT[g.stats[1]]}+${Math.round(g.rate*100)}%`;}
