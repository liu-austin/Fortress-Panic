// jshint esversion:6
import monsterInfoActionTypes from './monsterinfo.types';

export const selectMonsterHud = () => {
    return ({
        type: monsterInfoActionTypes.SELECT_MONSTER_HUD
    });
};

export const unselectMonsterHud = () => {
    return ({
        type: monsterInfoActionTypes.UNSELECT_MONSTER_HUD
    });
};

export const selectMonsterInfo = (monsterInfo) => {
    return ({
        type: monsterInfoActionTypes.SELECT_MONSTER_INFO,
        payload: monsterInfo
    });
};
