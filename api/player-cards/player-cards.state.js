// jshint esversion:8
const playerCardsList = require('./player-cards.types');
const monstersModel = require('../monsters/monsters.dao');
const defensesModel = require('../defenses/defenses.dao');
const defensesState = require('../defenses/defenses.states');
const playerCardsModel = require('../player-cards/player-cards.dao');
const playerDeckState = require('../player-deck/player-deck.state');
const playerDeckModel = require('../player-deck/player-deck.dao');

const playerCardsState = {
    outerMovementChart: {forest: 'archer', archer: 'knight', knight:'swordsman', swordsman: 'castle'},
    drawnPlayerCards: {},
    clearPlayerCards: async function(room) {
        return await playerCardsModel.deleteMany({room: room}, function (err) {
            if (err) return handleError(err);
          }).exec();
    },
    addPlayerCard: async function(room, id, amount) {
        playerCardsState.drawnPlayerCards[room] = playerCardsState.drawnPlayerCards[room] || [];
        for (let i = 0; i < amount; i++) {
            let playerDeck = await playerDeckModel.find({room: room}).exec();
            if (playerDeck.length < 7) {
                await new Promise((resolve, reject) => setTimeout(resolve, 750));
                playerCardsState.reshuffle(room);
                await new Promise((resolve, reject) => setTimeout(resolve, 750));
            } 
            let deckIndex = Math.round(Math.random() * (playerDeck.length - 1));
            let drawnCardIndex = playerDeck[deckIndex];
            let drawnCard = playerCardsList[drawnCardIndex.index];
            playerCardsState.drawnPlayerCards[room].push(drawnCard);
            playerDeckState.removePlayerCardIndex(room, drawnCardIndex.index);
            let playerCard = new playerCardsModel({
                name: drawnCard.name,
                src: drawnCard.src,
                description: drawnCard.description,
                position: id,
                key: drawnCardIndex.index,
                room: room
            });
            await playerCard.save();
        } 
    },
    reshuffle: async function(room) {
        let graveyardCards = await playerCardsModel.find({position: 'discard', room: room}).exec();
        for (let i = 0; i < graveyardCards.length; i++) {
            let cardIndex = new playerDeckModel({
                index: graveyardCards[i].key,
                room: room
            });
            await cardIndex.save();
        }
        await playerCardsModel.deleteMany({position: 'discard', room: room}).exec();
    },
    discardCard: async function(cardID) {
        await playerCardsModel.findByIdAndUpdate(cardID, {position: 'discard'}).exec();
    },
    tradeCards: async function(id1, id2, cardid1, cardid2) {
        await playerCardsModel.findByIdAndUpdate(cardid1, {position: id2}).exec();
        await playerCardsModel.findByIdAndUpdate(cardid2, {position: id1}).exec();
    }
};

module.exports = playerCardsState;