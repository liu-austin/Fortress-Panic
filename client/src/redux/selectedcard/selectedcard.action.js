// jshint esversion:6
import selectedCardActionTypes from './selectedcard.types';

export const selectCard = () => {
    return ({
        type: selectedCardActionTypes.SELECT_CARD
    });
};

export const unselectCard = () => {
    return ({
        type: selectedCardActionTypes.UNSELECT_CARD
    });
};

export const selectCardInfo = (cardInfo) => {
    return ({
        type: selectedCardActionTypes.SELECT_CARD_INFO,
        payload: cardInfo
    });
};

export const allowDiscard = () => {
    return ({
        type: selectedCardActionTypes.ALLOW_DISCARD
    });
};

export const disallowDiscard = () => {
    return ({
        type: selectedCardActionTypes.DISALLOW_DISCARD
    });
};

export const allowTrade = () => {
    return ({
        type: selectedCardActionTypes.ALLOW_TRADE
    });
};

export const disallowTrade = () => {
    return ({
        type: selectedCardActionTypes.DISALLOW_TRADE
    });
};

export const toggleTradeHud = () => {
    return ({
        type: selectedCardActionTypes.TOGGLE_TRADE_HUD
    });
};

export const toggleTradeFor = () => {
    return ({
        type: selectedCardActionTypes.TOGGLE_TRADE_FOR
    });
};

export const setTradeTarget = (cardInfo) => {
    return ({
        type: selectedCardActionTypes.SET_TRADE_TARGET,
        payload: cardInfo
    });
};

export const toggleTargetable = () => {
    return ({
        type: selectedCardActionTypes.TOGGLE_TARGETABLE
    });
};

export const toggleNiceShot = () => {
    return ({
        type: selectedCardActionTypes.TOGGLE_NICE_SHOT
    });
};

export const toggleMissing = () => {
    return ({
        type: selectedCardActionTypes.TOGGLE_MISSING
    });
};




