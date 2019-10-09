// jshint esversion:6
import { selectedPlayerActionTypes } from './selectedplayer.types';

export const setSelectedPlayer = (id) => {
    return ({
        type: selectedPlayerActionTypes.SET_SELECTED_PLAYER,
        payload: id
    });
};