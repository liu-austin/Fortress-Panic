// jshint esversion:9
import defensesActionTypes from './defenses.types';

const INITIAL_STATE = {
    defenses: null
};

const defensesReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case defensesActionTypes.GET_DEFENSES:
            return ({
                ...state,
                defenses: action.payload
            });
        default:
            return state;
    }
};

export default defensesReducer;