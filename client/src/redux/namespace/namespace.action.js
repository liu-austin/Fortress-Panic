// jshint esversion:6
import nameSpaceActionTypes from './namespace.types';

export const setNamespace = (namespace) => {
    return ({
        type: nameSpaceActionTypes.SET_NAMESPACE,
        payload: namespace
    });
};

export const clearNamespace = () => {
    return ({
        type: nameSpaceActionTypes.CLEAR_NAMESPACE
    });
};