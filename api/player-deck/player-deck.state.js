// jshint esversion:8
const PlayerCardsList = require('../player-cards/player-cards.types');
const playerDeckModel = require('./player-deck.dao');

const playerDeckState = {
    initializePlayerDeck: function(room) {
        let playerIndex;
        for (let i = 0; i < PlayerCardsList.length; i++) {
            playerIndex = new playerDeckModel({
                index: i,
                room: room
            });
            playerIndex.save();
        }
    },
    removePlayerCardIndex: function(room, index) {
        playerDeckModel.deleteOne({index: index, room: room}).exec();
    },
    removePlayerCardIndices: function(room) {
        playerDeckModel.deleteMany({room: room}, function (err) {
            if (err) return handleError(err);
          }).exec();
    }
};

module.exports = playerDeckState;