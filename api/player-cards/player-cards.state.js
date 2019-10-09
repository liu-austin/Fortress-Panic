// jshint esversion:8
const playerCardsList = require('./player-cards.types');
const monstersModel = require('./monsters.dao');
const defensesModel = require('../defenses/defenses.dao');
const defensesState = require('../defenses/defenses.states');
const playerCardsModel = require('../player-cards/player-cards.dao');
const playerDeckState = require('../player-deck/player-deck.state');
const playerDeckModel = require('../player-deck/player-deck.dao');

const playerCardsState = {
    outerMovementChart: {forest: 'archer', archer: 'knight', knight:'swordsman', swordsman: 'castle'},
    drawnPlayerCards: [],
    clearPlayerCards: async function() {
        playerDeckState.initializePlayerDeck();
        await playerCardsModel.deleteMany({}, function (err) {
            if (err) return handleError(err);
          }).exec();
    },
    addPlayerCard: async function(id, amount) {
        for (let i = 0; i < amount; i++) {
            let playerDeck = await playerDeckModel.find({}).exec();
            if (playerDeck.length === 0) {
                playerCardsState.reshuffle();
            } 
            let deckIndex = Math.round(Math.random() * (playerDeck.length - 1));
            let drawnCardIndex = playerDeck[deckIndex];
            let drawnCard = playerCardsList[drawnCardIndex.index];
            playerCardsState.drawnPlayerCards.push(drawnCard);
            playerDeckState.removePlayerCardIndex(drawnCardIndex.index);
            let playerCard = new playerCardsModel({
                name: drawnCard.name,
                src: drawnCard.src,
                description: drawnCard.description,
                position: id,
                key: drawnCardIndex.index
            });
            await playerCard.save();
        } 
    },
    reshuffle: async function() {
        let graveyardCards = await playerCardsModel.find({position: 'discard'}).exec();
        for (let i = 0; i < graveyardCards.length; i++) {
            let cardIndex = new playerDeckModel({
                index: graveyardCards[i].key
            });
            await cardIndex.save();
        }
        await playerCardsModel.deleteMany({position: 'discard'}).exec();
    },
    discardCard: async function(key) {
        await playersCardModel.updateOne({key: key}, {position: 'discard'}).exec();
    },
    tradeCards: async function(id1, id2, key1, key2) {
        await playersCardModel.updateOne({key: key1}, {position: id2}).exec();
        await playersCardModel.updateOne({key: key2}, {position: id1}).exec();
    },
    playerCardsEffects: {'Goblin King': {method: 'addMonster', input: 3}, 
    'Ogre Mage': {method: 'discard', input: null}, 
    'Shaman': {method: 'heal', input: null},
    'Orc Warlord': {method: 'moveMonsters', input: null},
    'Blue Monsters Move 1': {method: 'moveMonsters', input: /5|6/},
    'Green Monsters Move 1': {method: 'moveMonsters', input: /3|4/},
    'Red Monsters Move 1': {method: 'moveMonsters', input: /1|2/},
    'Plague! Archers': {method: 'discard', input: /Archer/},
    'Plague! Knights': {method: 'discard', input: /Knight/},
    'Plague! Swordsmen': {method: 'discard', input: /Swordsman/},
    'All Players Discard 1 Card': {method: 'discard', input: null},
    'Draw 3 Monsters': {method: 'addMonster', input: 3},
    'Draw 4 Monsters': {method: 'addMonster', input: 4},
    'Monsters Move Clockwise': {method: 'moveClockwise', input: null},
    'Monsters Move Counter-Clockwise': {method: 'moveCounterClockwise', input: null},
    'Giant Boulder': {method: 'giantBoulder', input: null}
    }
};

module.exports = playerCardsState;