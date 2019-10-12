// jshint esversion:6
import { createSelector } from 'reselect';
// input selector
const selectSelectedCard = state => state.selectedcard;

// output selector
export const selectCardSelected = createSelector(
    [selectSelectedCard],
    selectedcard => selectedcard.selected
);

export const selectSelectedCardInfo = createSelector(
    [selectSelectedCard],
    selectedcard => selectedcard.selectedcard
);