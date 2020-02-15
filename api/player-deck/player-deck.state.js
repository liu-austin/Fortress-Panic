// jshint esversion:8
const PlayerCardsList = require('../player-cards/player-cards.types');
const playerDeckModel = require('./player-deck.dao');

const playerDeckState = {
    initializePlayerDeck: async function(room) {
        let playerIndex;
        for (let i = 0; i < PlayerCardsList.length; i++) {
            playerIndex = new playerDeckModel({
                index: i,
                room: room
            });
            if (i === PlayerCardsList.length - 1) {
                return await playerIndex.save();
            }
            playerIndex.save();
        }
    },
    removePlayerCardIndex: function(room, index) {
        playerDeckModel.deleteOne({index: index, room: room}).exec();
    },
    removePlayerCardIndices: async function(room) {
        return await playerDeckModel.deleteMany({room: room}, function (err) {
            if (err) return handleError(err);
          }).exec();
    }
};

module.exports = playerDeckState;