// jshint esversion:6
import { createSelector } from 'reselect';

// input selector
const selectNS = state => state.namespace;

// output selectors
export const selectNamespace = createSelector(
    [selectNS],
    namespace => namespace.namespace
);