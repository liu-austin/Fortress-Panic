// jshint esversion:6
import defensesActionTypes from './defenses.types';

export const getDefenses = (defensesInfo) => {
    return ({
        type: defensesActionTypes.GET_DEFENSES,
        payload: defensesInfo
    });
};