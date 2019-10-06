// jshint esversion:6
import CollectionActionTypes from './collection.types';

export const updateCollections = (collectionsMap) => {
    return ({
        type: CollectionActionTypes.UPDATE_COLLECTIONS,
        payload: collectionsMap
    });
};