// jshint esversion:6
import playerActionTypes from './player.types';

export const retrievePlayers = (players) => {
    return ({
        type: playerActionTypes.RETRIEVE_PLAYERS,
        payload: players
    });
};

export const addPlayer = (playerInit) => {
    return ({
        type: playerActionTypes.ADD_PLAYER,
        payload: playerInit
    });
};

export const updatePlayerName = (id, displayName) => {
    return ({
        type: playerActionTypes.UPDATE_PLAYER_NAME,
        payload: [id, displayName]
    });
};

export const updatePlayerCards = (id, playerCards) => {
    return ({
        type: playerActionTypes.UPDATE_PLAYER_CARDS,
        payload: [id, playerCards]
    });
};

export const updatePlayerScore = (id, points) => {
    return ({
        type: playerActionTypes.UPDATE_PLAYER_SCORE,
        payload: [id, points]
    });
};

export const logOutPlayer = (id) => {
    return ({
        type: playerActionTypes.LOG_OUT_PLAYER,
        payload: id
    });
}

export const removePlayer = (id) => {
    return ({
        type: playerActionTypes.REMOVE_PLAYER,
        payload: id
    });
};

export const clearPlayerData = () => {
    return ({
        type: playerActionTypes.CLEAR_PLAYER_DATA
    });
};

export const setPlayerTurnActive = (id) => {
    return ({
        type: playerActionTypes.SET_PLAYER_TURN_ACTIVE,
        payload: id
    });
};

export const setPlayerTurnInactive = (id) => {
    return ({
        type: playerActionTypes.SET_PLAYER_TURN_INACTIVE,
        payload: id
    });
};