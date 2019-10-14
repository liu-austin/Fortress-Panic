// jshint esversion:9
import selectedCardActionTypes from './selectedcard.types';

const INITIAL_STATE = {
    selected: false,
    selectedcard: null,
    trade: true,
    discard: true,
    tradehud: false,
    tradefor: false,
    tradetarget: null,
    targetable: false,
    missing: false,
    niceshot: false
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
        case selectedCardActionTypes.ALLOW_DISCARD:
            return ({
                ...state,
                discard: true
            });
        case selectedCardActionTypes.DISALLOW_DISCARD:
            return ({
                ...state,
                discard: false
            });
        case selectedCardActionTypes.ALLOW_TRADE:
            return ({
                ...state,
                trade: true
            });
        case selectedCardActionTypes.DISALLOW_TRADE:
            return ({
                ...state,
                trade: false
            });
        case selectedCardActionTypes.TOGGLE_TRADE_HUD:
            return ({
                ...state,
                tradehud: !state.tradehud
            });
        case selectedCardActionTypes.TOGGLE_TRADE_FOR:
        return ({
            ...state,
            tradefor: !state.tradefor
        });
        case selectedCardActionTypes.SET_TRADE_TARGET:
            return ({
                ...state,
                tradetarget: action.payload
            });
        case selectedCardActionTypes.TOGGLE_TARGETABLE:
            return ({
                ...state,
                targetable: !state.targetable
            });
        case selectedCardActionTypes.TOGGLE_NICE_SHOT:
            return ({
                ...state,
                niceshot: !state.niceshot
            });
        case selectedCardActionTypes.TOGGLE_MISSING:
            return ({
                ...state,
                missing: !state.missing
            });
        default:
            return state;
    }
};

export default selectedCardReducer;