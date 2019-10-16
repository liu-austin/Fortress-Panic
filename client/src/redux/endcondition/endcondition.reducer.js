// jshint esversion:9
import endConditionActionTypes from './endcondition.types';

const INITIAL_STATE = {
    win: false,
    lose: false
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
        default:
            return state;
    }
};

export default endConditionReducer;
