// jshint esversion:6
var playerCards = require('./player-cards.controller');

module.exports = function(router) {
    router.post('/create', playerCards.createPlayerCard);
    router.get('/get', playerCards.getPlayerCards);
    router.get('/get/:name', playerCards.getPlayerCard);
    router.put('/update/:id', playerCards.updatePlayerCard);
    router.delete('/remove/:id', playerCards.removePlayerCard);
}