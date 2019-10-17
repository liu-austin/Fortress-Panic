// jshint esversion:9
import endConditionActionTypes from './endcondition.types';

const INITIAL_STATE = {
    win: false,
    lose: false,
    showhud: false,
    highscoreplayerid: null 
};

const endConditionReducer = (state= INITIAL_STATE, action) => {
    switch (action.type) {
        case endConditionActionTypes.SET_WIN:
            return ({
                ...state,
                win: true
            });
        case endConditionActionTypes.SET_LOSE:
            return ({
                ...state,
                lose: true
            });
        case endConditionActionTypes.SHOW_END_GAME_HUD:
            return ({
                ...state,
                showhud: true
            });
        case endConditionActionTypes.CLOSE_END_GAME_HUD:
            return ({
                ...state,
                showhud: false
            });
        case endConditionActionTypes.SET_HIGH_SCORE_PLAYER:
            return ({
                ...state,
                highscoreplayerid: action.payload
            });
        default:
            return state;
    }
};

export default endConditionReducer;
