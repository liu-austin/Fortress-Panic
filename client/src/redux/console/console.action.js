// jshint esversion:6
import { ConsoleActionTypes } from './console.types';

export const displayNewMessage = (newMessage) => {
    return ({
        type: ConsoleActionTypes.DISPLAY_NEW_MESSAGE,
        payload: newMessage
    });
};