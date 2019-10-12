// jshint esversion:9
import monstersActionTypes from './monsters.types';

const INITIAL_STATE = {
    monsters: null
};

const monstersReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case monstersActionTypes.GET_MONSTERS:
            return ({
                ...state,
                monsters: action.payload
            });
        default:
            return state;
    }
};

export default monstersReducer;