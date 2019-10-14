// jshint esversion:9
import monstersActionTypes from './monsters.types';

const INITIAL_STATE = {
    monsters: null,
    monsterregion: []
};

const monstersReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case monstersActionTypes.GET_MONSTERS:
            return ({
                ...state,
                monsters: action.payload
            });
        case monstersActionTypes.SET_MONSTER_REGION:
            return ({
                ...state,
                monsterregion: action.payload
            });
        default:
            return state;
    }
};

export default monstersReducer;