// jshint esversion:6
import { createSelector } from 'reselect';
// input selector
const selectLoadingBar = state => state.loadingbar;

// output selector
export const selectProgress = createSelector(
    [selectLoadingBar],
    loadingbar => loadingbar.progress
);
