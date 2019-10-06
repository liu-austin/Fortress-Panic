// jshint esversion:6
import { rotationActionTypes } from './rotation.types';

export const rotateClockwise = () => {
    return ({
        type: rotationActionTypes.ROTATE_CLOCKWISE
    });
};

export const rotateCounterClockwise = () => {
    return ({
        type: rotationActionTypes.ROTATE_COUNTERCLOCKWISE
    });
};
