// Visual-only events. WeakMap keeps them out of encrypted saves and combat rules.
const visualEvents=new WeakMap();
export const FX_TYPES={basic:['·','공격'],strike:['╱','강공격'],mark:['◎','표식'],dot:['∴','지속피해'],buff:['↑','공격강화'],guard:['▣','방어'],pierce:['↗','관통'],multi:['≋','연타'],vamp:['⇠','흡혈'],heal:['+','회복'],weaken:['↓','약화'],finisher:['⌁','마무리'],kill:['✓','처치'],combo:['⛓','연계'],incoming:['‹','피격']};
export function emitFx(s,event){let q=visualEvents.get(s)||[];q.push(event);visualEvents.set(s,q.slice(-12));}
export function drainFx(s){let q=visualEvents.get(s)||[];visualEvents.delete(s);return q;}
export function logFx(text,catalog=[]){if(text.includes('연계 발동'))return 'combo';if(text.includes('지속 피해'))return 'dot';if(text.includes('처치 완료')||text.includes('층 돌파'))return 'kill';let a=catalog.find(a=>text.includes('의 '+a.name+' →')||text.includes('의 '+a.name+' ·')||text.includes('['+a.name+']'));return a?.kind||(text.includes('의 공격 →')?'incoming':'basic');}
