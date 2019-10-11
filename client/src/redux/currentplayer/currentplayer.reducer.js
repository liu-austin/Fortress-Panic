// jshint esversion:9
import currentPlayerActionTypes from './currentplayer.types';

const INITIAL_STATE = {
    currentPlayer: 'NONE'
};

const currentPlayerReducer = (state= INITIAL_STATE, action) => {
    switch (action.type) {
        case currentPlayerActionTypes.SET_CURRENT_PLAYER:
            return ({
                ...state,
                currentPlayer: action.payload
            });
        default:
            return state;
    }
};

export default currentPlayerReducer;
