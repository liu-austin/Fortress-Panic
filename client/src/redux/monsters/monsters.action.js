// jshint esversion:6
import monstersActionTypes from './monsters.types';

export const getMonsters = (monstersInfo) => {
    return ({
        type: monstersActionTypes.GET_MONSTERS,
        payload: monstersInfo
    });
};