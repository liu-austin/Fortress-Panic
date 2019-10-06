// jshint esversion:6
import { rotationActionTypes } from './rotation.types';

const INITIAL_STATE = {
    angle: 0
};

const rotationReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case rotationActionTypes.ROTATE_CLOCKWISE:
            return ({
                ...state,
                angle: state.angle + 30
            });
        case rotationActionTypes.ROTATE_COUNTERCLOCKWISE:
            return ({
                ...state,
                angle: state.angle - 30
            });
        default:
            return state;
    }
};

export default rotationReducer;