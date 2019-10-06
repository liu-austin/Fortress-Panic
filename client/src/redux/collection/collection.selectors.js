// jshint esversion:6
import { createSelector } from 'reselect';
// input selector
const selectCollection = state => state.collection;

// output selector
export const selectCollectionSection = createSelector(
    [selectCollection],
    collection => collection.collections
);

export const selectCollectionsForPreview = createSelector(
    [selectCollectionSection],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
);

export const selectCategory = collectionUrlParam => 
    createSelector(
        [selectCollectionSection],
        collections => (collections ? collections[collectionUrlParam] : null)
        );