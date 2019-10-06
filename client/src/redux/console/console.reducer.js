// jshint esversion:6
import { ConsoleActionTypes } from './console.types';

const INITIAL_STATE = {
    message: ''
};

const consoleReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case ConsoleActionTypes.DISPLAY_NEW_MESSAGE:
            return ({
                ...state,
                message: action.payload
            });
        default:
            return state;
    }
};

export default consoleReducer;