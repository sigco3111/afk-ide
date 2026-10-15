// XP requirements stay unchanged so old totalXP/xp saves retain their exact level.
export const combatCurve=level=>({hp:1+Math.min(3,Math.max(0,level-30)*.012),atk:1+Math.min(.8,Math.max(0,level-60)*.004)});
export const rewardCurve=level=>({xp:1/(1+Math.max(0,level-60)*.012),gold:1/(1+Math.max(0,level-60)*.006)});
