// jshint esversion:6
import currentPlayerActionTypes from './currentplayer.types';

export const setCurrentPlayer = (playerName) => {
    return ({
        type: currentPlayerActionTypes.SET_CURRENT_PLAYER,
        payload: playerName
    });
};