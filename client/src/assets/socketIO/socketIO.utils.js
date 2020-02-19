// jshint esversion:6
import socketIOClient from 'socket.io-client';

const state = {
    // endpoint: 'http://localhost:9000'
    endpoint: 'https://al-fortress-panic.herokuapp.com/'
    // endpoint: 'https://reactsocketiopresentation.herokuapp.com/'
};

export const socket = socketIOClient(state.endpoint);
