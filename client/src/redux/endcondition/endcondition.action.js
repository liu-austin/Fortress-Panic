// jshint esversion:6
import endConditionActionTypes from './endcondition.types';

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

export const showEndGameHud = () => {
    return ({
        type: endConditionActionTypes.SHOW_END_GAME_HUD
    });
};

export const closeEndGameHud = () => {
    return ({
        type: endConditionActionTypes.CLOSE_END_GAME_HUD
    });
};

export const setHighScorePlayer = (playerId) => {
    return ({
        type: endConditionActionTypes.SET_HIGH_SCORE_PLAYER,
        payload: playerId
    });
};