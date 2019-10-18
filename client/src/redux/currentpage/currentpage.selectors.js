// jshint esversion:6
import { createSelector } from 'reselect';
// input selector
const selectPage = state => state.page;

// output selector
export const selectCurrentPage = createSelector(
    [selectPage],
    page => page.currentpage
);

export const selectPreviousPage = createSelector(
    [selectPage],
    page => page.previouspage
);
