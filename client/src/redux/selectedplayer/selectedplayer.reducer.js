// jshint esversion:6
import { selectedPlayerActionTypes } from './selectedplayer.types';

const INITIAL_STATE = {
    selectedplayer: null
};

const selectedPlayerReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case selectedPlayerActionTypes.SET_SELECTED_PLAYER:
            return ({
                ...state, 
                selectedplayer: action.payload
            });
        default:
            return state;
    }
};

export default selectedPlayerReducer;