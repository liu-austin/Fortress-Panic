// jshint esversion:6
import { createSelector } from 'reselect';
// input selector
const selectDefenses = state => state.defenses;

// output selector
export const selectDefensesInfo = createSelector(
    [selectDefenses],
    defenses => defenses.defenses
);