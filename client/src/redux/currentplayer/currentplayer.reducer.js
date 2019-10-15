// jshint esversion:9
import currentPlayerActionTypes from './currentplayer.types';

const INITIAL_STATE = {
    currentPlayer: 'NONE',
    id: 'NONE'
};

const currentPlayerReducer = (state= INITIAL_STATE, action) => {
    switch (action.type) {
        case currentPlayerActionTypes.SET_CURRENT_PLAYER:
            return ({
                ...state,
                currentPlayer: action.payload
            });
        case currentPlayerActionTypes.SET_CURRENT_PLAYER_ID:
            return ({
                ...state,
                id: action.payload
            });
        default:
            return state;
    }
};

export default currentPlayerReducer;
