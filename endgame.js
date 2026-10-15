export const END_TITLES={'end-tier-1':'경계의 도전자','end-tier-3':'네 왕좌의 승자','end-tier-5':'심화의 개척자','end-tier-10':'영겁의 투사','end-tier-25':'왕좌 너머의 전설','end-tier-100':'백 겹 경계의 종결자'};
export const endRecord=s=>s.permanent.endgame||{best:0,clears:0,rewards:[]};
export const endUnlocked=s=>s.level>=110&&[12,13,14,15].every(i=>(s.permanent.monsters[i+':boss:0']?.kills||0)>0);
export function endDefs(s){let r=endRecord(s);return [1,3,5,10,25,100].map(n=>({id:'end-tier-'+n,name:'경계 심화 러시 '+n+'단계',group:'엔드콘텐츠',current:r.best,target:n,rule:'Lv110 + 신규4보스 처치 후4연전을 완주. HP/MP·포션 유지, 단계마다 강화.',reward:'칭호: '+END_TITLES['end-tier-'+n]+' (외형)'}));}
export function validateEndgame(s){let e=s.permanent?.endgame;if(e&&(!Number.isInteger(e.best)||e.best<0||e.best>100||!Number.isSafeInteger(e.clears)||e.clears<0||!Array.isArray(e.rewards)||e.rewards.length>100||new Set(e.rewards).size!==e.rewards.length||!e.rewards.every(n=>Number.isInteger(n)&&n>=1&&n<=e.best)))throw Error('심화 러시 기록 오류');}
