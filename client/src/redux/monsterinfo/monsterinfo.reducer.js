// jshint esversion:9
import monsterInfoActionTypes from './monsterinfo.types';

const INITIAL_STATE = {
    selected: false,
    monsterInfo: null
};

const monsterInfoReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case monsterInfoActionTypes.SELECT_MONSTER_HUD:
            return ({
                ...state,
                selected: true
            });
        case monsterInfoActionTypes.UNSELECT_MONSTER_HUD:
                return ({
                    ...state,
                    selected: false
                });
        case monsterInfoActionTypes.SET_MONSTER_INFO:
            return ({
                ...state,
                monsterInfo: action.payload
            });
        default:
            return state;
    }
};

export default monsterInfoReducer;