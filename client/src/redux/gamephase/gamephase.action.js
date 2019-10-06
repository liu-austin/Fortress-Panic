// jshint esversion:6
import { gamePhaseActionTypes } from './gamephase.types';

export const goToNextPhase = () => {
    return ({
        type: gamePhaseActionTypes.GO_TO_NEXT_PHASE
    });
};

export const forceNextPhase = () => {
    return ({
        type: gamePhaseActionTypes.FORCE_NEXT_PHASE
    });
};
