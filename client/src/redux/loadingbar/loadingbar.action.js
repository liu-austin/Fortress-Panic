// jshint esversion:6
import loadingBarActionTypes from './loadingbar.types';

export const setProgress = (progress) => {
    return ({
        type: loadingBarActionTypes.SET_PROGRESS,
        payload: progress
    });
};

export const addProgress = () => {
    return ({
        type: loadingBarActionTypes.ADD_PROGRESS
    });
};
