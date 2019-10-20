// jshint esversion:6
import { startButtonActionTypes } from './startbutton.types';

export const pressStartButton = () => {
    return ({
        type: startButtonActionTypes.PRESS_START_BUTTON
    });
};

export const resetStartButton = () => {
    return ({
        type: startButtonActionTypes.RESET_START_BUTTON
    });
};