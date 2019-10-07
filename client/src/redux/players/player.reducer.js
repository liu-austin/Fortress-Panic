// jshint esversion:9
import playerActionTypes from './player.types';

const INITIAL_STATE = {};

const playerReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case playerActionTypes.RETRIEVE_PLAYERS:
            state = action.payload;
            return state;
        case playerActionTypes.ADD_PLAYER:
            return ({
                ...state,
                [action.payload.playerId]: action.payload
            });
        case playerActionTypes.UPDATE_PLAYER_NAME:
            return ({
                ...state,
                [action.payload[0]]: {...state[action.payload[0]], displayName: action.payload[1]}
            });
        case playerActionTypes.UPDATE_PLAYER_CARDS:
            return ({
                ...state,
                [action.payload[0]]: {...state[action.payload[0]], playerCards: action.payload[1]}
            });
        case playerActionTypes.UPDATE_PLAYER_SCORE:
            return ({
                ...state,
                [action.payload[0]]: {...state[action.payload[0]], points: action.payload[1]} + state[action.payload[0]].points
            });
        case playerActionTypes.REMOVE_PLAYER:
            delete state[action.payload[0]];
            return state;
        case playerActionTypes.CLEAR_PLAYER_DATA:
            let players = Object.keys(state);
            players.forEach(function(player) {
                state[player].playerCards = [];
                state[player].points = 0;
            });
            return state;
        default:
            return state;
    }
};

export default playerReducer;