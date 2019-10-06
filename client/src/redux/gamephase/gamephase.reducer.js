// jshint esversion:6
import { gamePhaseActionTypes } from './gamephase.types';
import { GamePhases, IsSkippable } from './gamephase.utils';

const INITIAL_STATE = {
    phase: GamePhases[0],
};

const gamePhaseReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case gamePhaseActionTypes.GO_TO_NEXT_PHASE:
            return ({
                ...state,
                phase: IsSkippable[GamePhases.indexOf(state.phase)] ? GamePhases[(GamePhases.indexOf(state.phase) + 1) % 6] : state.phase
            });
            case gamePhaseActionTypes.FORCE_NEXT_PHASE:
                    return ({
                        ...state,
                        phase: GamePhases[(GamePhases.indexOf(state.phase) + 1) % 6]
                    });
        default:
            return state;
    }
};

export default gamePhaseReducer;