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
