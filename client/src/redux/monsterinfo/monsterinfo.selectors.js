// jshint esversion:6
import { createSelector } from 'reselect';
// input selector
const selectMonsters = state => state.monsterinfo;

// output selector
export const selectMonsterHud = createSelector(
    [selectMonsters],
    monsterinfo => monsterinfo.selected
);

export const selectMonsterInfo = createSelector(
    [selectMonsters],
    monsterinfo => monsterinfo.monsterInfo
);