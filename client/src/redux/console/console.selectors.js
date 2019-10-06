// jshint esversion:6
import { createSelector } from 'reselect';
// input selector
const selectConsole = state => state.console;

// output selector
export const selectConsoleMessage = createSelector(
    [selectConsole],
    console => console.message
);