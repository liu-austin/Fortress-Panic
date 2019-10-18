// jshint esversion:6
import currentPageActionTypes from './currentpage.types';

export const setCurrentPage = (page) => {
    return ({
        type: currentPageActionTypes.SET_CURRENT_PAGE,
        payload: page
    });
};

export const setPreviousPage = () => {
    return ({
        type: currentPageActionTypes.SET_PREVIOUS_PAGE
    });
};