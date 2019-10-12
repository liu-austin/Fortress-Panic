// jshint esversion:9
import selectedCardActionTypes from './selectedcard.types';

const INITIAL_STATE = {
    selected: false,
    selectedcard: null
};

const selectedCardReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case selectedCardActionTypes.SELECT_CARD:
            return ({
                ...state,
                selected: true
            });
        case selectedCardActionTypes.UNSELECT_CARD:
                return ({
                    ...state,
                    selected: false
                });
        case selectedCardActionTypes.SELECT_CARD_INFO:
            return ({
                ...state,
                selectedcard: action.payload
            });
        default:
            return state;
    }
};

export default selectedCardReducer;