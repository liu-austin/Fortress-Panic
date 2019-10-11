// jshint esversion:6
import { createSelector } from 'reselect';
// input selector
const selectCurrentPlayer = state => state.currentplayer;

// output selector
export const selectCurrentPlayerName = createSelector(
    [selectCurrentPlayer],
    currentplayer => currentplayer.currentPlayer
);