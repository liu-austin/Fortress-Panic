// jshint esversion:9
import loadingBarActionTypes from './loadingbar.types';

const INITIAL_STATE = {
    progress: 0
};

const loadingBarReducer = (state= INITIAL_STATE, action) => {
    switch (action.type) {
        case loadingBarActionTypes.SET_PROGRESS:
            return ({
                ...state,
                progress: action.payload
            });
        case loadingBarActionTypes.ADD_PROGRESS:
            return ({
                ...state,
                progress: state.progress + 1
            });
        default:
            return state;
    }
};

export default loadingBarReducer;
