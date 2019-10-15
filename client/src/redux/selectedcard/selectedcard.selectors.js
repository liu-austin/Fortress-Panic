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

export const selectDiscard = createSelector(
    [selectSelectedCard],
    selectedcard => selectedcard.discard
);

export const selectTrade = createSelector(
    [selectSelectedCard],
    selectedcard => selectedcard.trade
);

export const selectTradeTargetInfo = createSelector(
    [selectSelectedCard],
    selectedcard => selectedcard.tradetarget
);

export const selectTradeHud = createSelector(
    [selectSelectedCard],
    selectedcard => selectedcard.tradehud
);

export const selectTradeFor = createSelector(
    [selectSelectedCard],
    selectedcard => selectedcard.tradefor
);

export const selectTargetable = createSelector(
    [selectSelectedCard],
    selectedcard => selectedcard.targetable
);

export const selectNiceShot = createSelector(
    [selectSelectedCard],
    selectedcard => selectedcard.niceshot
);

export const selectMissing = createSelector(
    [selectSelectedCard],
    selectedcard => selectedcard.missing
);

export const selectDriveItBack = createSelector(
    [selectSelectedCard],
    selectedcard => selectedcard.driveitback
);

export const selectRebuild = createSelector(
    [selectSelectedCard],
    selectedcard => selectedcard.rebuild
);