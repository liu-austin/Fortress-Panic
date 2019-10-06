// jshint esversion:6
import { createSelector } from 'reselect';

// input selector
const selectStartButton = state => state.startbutton;

// output selectors
export const selectStartButtonPressed = createSelector(
    [selectStartButton],
    startbutton => startbutton.startButtonPressed
);