// jshint esversion:9
import { startButtonActionTypes } from './startbutton.types';

const INITIAL_STATE = {
    startButtonPressed: false
};

const startButtonReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case startButtonActionTypes.PRESS_START_BUTTON:
            return ({
                ...state,
                startButtonPressed: true
            });
        case startButtonActionTypes.RESET_START_BUTTON:
            return ({
                ...state,
                startButtonPressed: false
            });
        default:
            return state;
    }
};

export default startButtonReducer;