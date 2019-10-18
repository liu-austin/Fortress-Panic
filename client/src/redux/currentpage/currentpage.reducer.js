// jshint esversion:9
import currentPageActionTypes from './currentpage.types';

const INITIAL_STATE = {
    currentpage: '/',
    previouspage: '/'
};

const currentPageReducer = (state= INITIAL_STATE, action) => {
    switch (action.type) {
        case currentPageActionTypes.SET_CURRENT_PAGE:
            return ({
                ...state,
                currentpage: action.payload
            });
        case currentPageActionTypes.SET_PREVIOUS_PAGE:
            return ({
                ...state,
                previouspage: state.currentpage
            });
        default:
            return state;
    }
};

export default currentPageReducer;
