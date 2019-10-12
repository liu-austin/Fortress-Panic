// jshint esversion:6
import { createSelector } from 'reselect';
// input selector
const selectMonsters = state => state.monster;

// output selector
export const selectAllMonsters = createSelector(
    [selectMonsters],
    monster => monster.monsters
);

export const selectActiveMonsters = createSelector(
    [selectAllMonsters],
    monsters => monsters.filter(m => m.active)
);

export const selectMonstersLeft = createSelector(
    [selectAllMonsters],
    monsters => (31 - monsters.filter(m => {
        return (!m.active && m.type !== 'Monster Effect');
    }).length)
);