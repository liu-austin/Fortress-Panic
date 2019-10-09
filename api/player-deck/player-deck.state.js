// jshint esversion:8
const PlayerCardsList = require('../player-cards/player-cards.types');
const playerDeckModel = require('./player-deck.dao');

const playerDeckState = {
    initializePlayerDeck: function() {
        let playerIndex;
        for (let i = 0; i < PlayerCardsList.length; i++) {
            playerIndex = new playerDeckModel({
                index: i
            });
            playerIndex.save();
        }
    },
    removePlayerCardIndex: function(index) {
        playerDeckModel.deleteOne({index: index}).exec();
    },
    removePlayerCardIndices: function() {
        playerDeckModel.deleteMany({}, function (err) {
            if (err) return handleError(err);
          }).exec();
    }
};

module.exports = playerDeckState;