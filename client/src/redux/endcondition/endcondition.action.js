// jshint esversion:6
import { endConditionActionTypes } from './endcondition.types';

export const setWin = () => {
    return ({
        type: endConditionActionTypes.SET_WIN
    });
};

export const setLose = () => {
    return ({
        type: endConditionActionTypes.SET_LOSE
    });
};

