// jshint esversion:6
var playerIndexMethods = require('./player-deck.controller');

module.exports = function(router) {
    router.post('/create', playerIndexMethods.createPlayerIndex);
    router.get('/get', playerIndexMethods.getPlayerIndices);
    router.get('/get/:name', playerIndexMethods.getPlayerIndex);
    router.put('/update/:id', playerIndexMethods.updatePlayerIndex);
    router.delete('/remove/:id', playerIndexMethods.removePlayerIndex);
}