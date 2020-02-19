// jshint esversion:6
import socketIOClient from 'socket.io-client';

const state = {
    endpoint: 'https://al-fortress-panic.herokuapp.com/'
    // endpoint: 'http://localhost:9000/'
};

export const socket = socketIOClient(state.endpoint);
