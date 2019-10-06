// jshint esversion:6
import { createSelector } from 'reselect';
// input selector
const selectGamePhase = state => state.gamephase;

// output selector
export const selectCurrentPhase = createSelector(
    [selectGamePhase],
    gamephase => gamephase.phase
);