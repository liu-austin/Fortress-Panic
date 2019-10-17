// jshint esversion:6
import { createSelector } from 'reselect';
// input selector
const selectEndCondition = state => state.endcondition;

// output selector
export const selectWin = createSelector(
    [selectEndCondition],
    endcondition => endcondition.win
);

export const selectLose = createSelector(
    [selectEndCondition],
    endcondition => endcondition.lose
);

export const selectEndGameHud = createSelector(
    [selectEndCondition],
    endcondition => endcondition.showhud
);

export const selectHighScorePlayerId = createSelector(
    [selectEndCondition],
    endcondition => endcondition.highscoreplayerid
);

