// jshint esversion:8
const playerCardsList = require('./player-cards.types');
const monstersModel = require('./monsters.dao');
const defensesModel = require('../defenses/defenses.dao');
const defensesState = require('../defenses/defenses.states');
const playerCardsModel = require('../player-cards/player-cards.dao');
const playerDeckState = require('../player-deck/player-deck.state');

const playerCardsState = {
    outerMovementChart: {forest: 'archer', archer: 'knight', knight:'swordsman', swordsman: 'castle'},
    drawnPlayerCards: [],
    clearPlayerCards: function() {

    },
    drawUp: function() {

    },
    addPlayerCard: async function(id, amount) {
        for (let i = 0; i < amount; i++) {
            let playerDeck = await playerCardsModel.find({}).exec();
            if (playerDeck.length > 0) {
                let deckIndex = Math.round(Math.random() * (playerDeck.length - 1));
                let drawnCardIndex = playerDeck[deckIndex];
                let drawnCard = playerCardsList[drawnCardIndex.index];
                playerCardsState.drawnPlayerCards.push(drawnCard);
                playerDeckState.removePlayerCardIndex(drawnCardIndex.index);
                let playerCard = new playerCardsModel({
                    name: drawnMonster.name,
                    src: drawnMonster.src,
                    description: drawnMonster.description,
                    position: id,
                    key: drawnMonster.key
                });
                await playerCard.save();
            } else {
                break;
            }
        }
    },
    endTurn: function() {
        MonstersState.drawnMonsters.splice(0, MonstersState.drawnMonsters.length);
    },
    initializeMonsters: function() {
        let goblin1 = new monstersModel({
            name: 'Goblin',
            type: 'Monster',
            hitpoints: 1,
            location: 'archer 1',
            active: true,
            points: 1
        });
        let orc1 = new monstersModel({
            name: 'Orc',
            type: 'Monster',
            hitpoints: 2,
            location: 'archer 2',
            active: true,
            points: 2
        });
        let troll1 = new monstersModel({
            name: 'Troll',
            type: 'Monster',
            hitpoints: 3,
            location: 'archer 3',
            active: true,
            points: 3
        });
        let goblin2 = new monstersModel({
            name: 'Goblin',
            type: 'Monster',
            hitpoints: 1,
            location: 'archer 4',
            active: true,
            points: 1
        });
        let orc2 = new monstersModel({
            name: 'Orc',
            type: 'Monster',
            hitpoints: 2,
            location: 'archer 5',
            active: true,
            points: 2
        });
        let troll2 = new monstersModel({
            name: 'Troll',
            type: 'Monster',
            hitpoints: 3,
            location: 'archer 6',
            active: true,
            points: 3
        });
        monstersModel.insertMany([goblin1, orc1, troll1, goblin2, orc2, troll2], function (err, initMonsters) {
            if (err){ 
                return console.error(err);
            } else {
              console.log("Multiple monsters inserted to Collection");
            }
          });
    },
    hitMonster: async function(monsterId) {
        monstersModel.findByIdAndUpdate(monsterId, {$inc: {hitpoints: -1}}).exec();
        let struckMonster = await monstersModel.findById(monsterId).exec();
        if (struckMonster.hitpoints <= 0) {
            MonstersState.killMonster(monsterId);
        }
    },
    killMonster: function(monsterId) {
        monstersModel.findByIdAndUpdate(monsterId, {active: false}).exec();
    },
    removeAllMonsters: function() {
        monstersModel.deleteMany({}, function (err) {
            if (err) return handleError(err);
            // deleted at most one tank document
          });
    },
    moveMonsters: async function() {
        let allMonsters;
        if (arguments[0] === null) {
            allMonsters = await monstersModel.find({active: true}).exec();
        } else {
            allMonsters = await monstersModel.find({active: true, location: {$regex: arguments[0]}}).exec();
        }
        allMonsters.forEach(async function(monster) {
            if (Object.keys(MonstersState.outerMovementChart).includes(monster.location.slice(0, monster.location.length - 2))) {
                let checkWallCollision = await defensesModel.findOne({name: 'Wall', location: 'castle ' + monster.location.slice(monster.location.length - 1, monster.location.length), active: true}).exec();
                if (monster.location.includes('swordsman') && checkWallCollision) {
                    let hitMonster = await monstersModel.find({location: monster.location}).exec();
                    if (String(hitMonster[0]._id) === String(monster._id)) {
                        MonstersState.hitMonster(hitMonster[0]._id);
                        defensesState.killDefense(monster.location.slice(monster.location.length - 1, monster.location.length), 'Wall');
                    }
                } else {
                    monstersModel.findByIdAndUpdate(monster._id, 
                        {location: MonstersState.outerMovementChart[monster.location.slice(0, monster.location.length - 2)] + monster.location.slice(monster.location.length - 2, monster.location.length)}).exec();
                }
            } else {
                let checkTowerCollison = await defensesModel.findOne({name: 'Tower', location: 'castle ' + monster.location.slice(monster.location.length - 1, monster.location.length), active: true}).exec();
                if (checkTowerCollison) {
                    let hitMonster = await monstersModel.find({location: monster.location}).exec();
                    if (String(hitMonster[0]._id) === String(monster._id)) {
                        MonstersState.hitMonster(hitMonster[0]._id);
                        defensesState.killDefense(monster.location.slice(monster.location.length - 1, monster.location.length), 'Tower');
                    }
                } else {
                    monstersModel.findByIdAndUpdate(monster._id, {location: monster.location.slice(0, monster.location.length - 1) + ((monster.location.slice(monster.location.length - 1, monster.location.length) % 6) + 1)}).exec();
                }
            }
        });
    },
    checkWinGame: async function() {
        let playedMonsters = monstersModel.find({$or:[{type: 'Monster'},{type: 'Boss Monster'}]}).exec();
        if (playedMonsters.filter(function(playedMonster) {
            return playedMonster.active === false;
        }).length === 31) {
            winGame = true;
        }
    },
    discard: async function() {

    },
    moveClockwise: async function() {
        let allMonsters = await monstersModel.find({active: true}).exec();
        allMonsters.forEach(async function(monster) {
            if (monster.location.includes('castle')) {
                let checkTowerCollison = await defensesModel.findOne({name: 'Tower', location: 'castle ' + monster.location.slice(monster.location.length - 1, monster.location.length), active: true}).exec();
                if (checkTowerCollison) {
                    let hitMonster = await monstersModel.find({location: monster.location}).exec();
                    if (String(hitMonster[0]._id) === String(monster._id)) {
                        MonstersState.hitMonster(hitMonster[0]._id);
                        defensesState.killDefense(monster.location.slice(monster.location.length - 1, monster.location.length), 'Tower');
                    }
                } else {
                    monstersModel.findByIdAndUpdate(monster._id, {location: monster.location.slice(0, monster.location.length - 1) + ((monster.location.slice(monster.location.length - 1, monster.location.length) % 6) + 1)}).exec();
                }
            } else {
                monstersModel.findByIdAndUpdate(monster._id, {location: monster.location.slice(0, monster.location.length - 1) + ((monster.location.slice(monster.location.length - 1, monster.location.length) % 6) + 1)}).exec();
            }
        });
    },
    moveCounterClockwise: async function() {
        let counterClockwiseChart = {'1': '6', '2': '1', '3': '2', '4': '3', '5': '4', '6': '5'};
        let allMonsters = await monstersModel.find({active: true}).exec();
        allMonsters.forEach(async function(monster) {
            if (monster.location.includes('castle')) {
                let checkTowerCollison = await defensesModel.findOne({name: 'Tower', location: 'castle ' + monster.location.slice(monster.location.length - 1, monster.location.length), active: true}).exec();
                if (checkTowerCollison) {
                    let hitMonster = await monstersModel.find({location: monster.location}).exec();
                    if (String(hitMonster[0]._id) === String(monster._id)) {
                        MonstersState.hitMonster(hitMonster[0]._id);
                        defensesState.killDefense(monster.location.slice(monster.location.length - 1, monster.location.length), 'Tower');
                    }
                } else {
                    monstersModel.findByIdAndUpdate(monster._id, {location: monster.location.slice(0, monster.location.length - 1) + counterClockwiseChart[monster.location.slice(monster.location.length - 1, monster.location.length)]}).exec();
                }
            } else {
                monstersModel.findByIdAndUpdate(monster._id, {location: monster.location.slice(0, monster.location.length - 1) + counterClockwiseChart[monster.location.slice(monster.location.length - 1, monster.location.length)]}).exec();
            }
        });
    },
    heal: async function() {
        let allMonsters = await monstersModel.find({active: true}).exec();
        allMonsters.forEach(async function(monster) {
            monstersModel.findByIdAndUpdate(monster._id, {$inc: {hitpoints: 1}}).exec();
        });
    },
    giantBoulder: async function() {
        let rollDistance = 1;
        let number = Math.round(Math.random() * 5) + 1;
        let opposites = {'1': '4', '2': '5', '3': '6', '4': '1', '5': '2', '6': '3'};
        await monstersModel.updateMany({active: true, location: 'forest ' + number}, {active: false}).exec();
        // await new Promise((resolve, reject) => setTimeout(resolve, 1000));
        await monstersModel.updateMany({active: true, location: 'archer ' + number}, {active: false}).exec();
        await monstersModel.updateMany({active: true, location: 'knight ' + number}, {active: false}).exec();
        await monstersModel.updateMany({active: true, location: 'swordsman ' + number}, {active: false}).exec();
        let checkWallCollision1 = await defensesModel.findOne({name: 'Wall', location: 'castle ' + number, active: true}).exec();
        if (checkWallCollision1) {
            defensesState.killDefense(number, 'Wall');
            console.log([number, rollDistance]);
            return [number, rollDistance];
        } else {
            rollDistance += 1;
            let checkTowerCollision1 = await defensesModel.findOne({name: 'Tower', location: 'castle ' + number, active: true}).exec();
            if (checkTowerCollision1) {
                defensesState.killDefense(number, 'Tower');
                console.log([number, rollDistance]);
                return [number, rollDistance];
            } else {
                let oppositeNumber = opposites[String(number)];
                rollDistance += 1;
                let checkTowerCollision2 = await defensesModel.findOne({name: 'Tower', location: 'castle ' + oppositeNumber, active: true}).exec();
                if (checkTowerCollision2) {
                    defensesState.killDefense(oppositeNumber, 'Tower');
                    console.log([number, rollDistance]);
                    return [number, rollDistance];
                } else {
                    rollDistance += 1;
                    let checkWallCollision2 = await defensesModel.findOne({name: 'Wall', location: 'castle ' + oppositeNumber, active: true}).exec();
                    if (checkWallCollision2) {
                        defensesState.killDefense(oppositeNumber, 'Wall');
                        console.log([number, rollDistance]);
                        return [number, rollDistance];
                    } else {
                        rollDistance += 1;
                        await monstersModel.updateMany({active: true, location: 'swordsman ' + oppositeNumber}, {active: false}).exec();
                        await monstersModel.updateMany({active: true, location: 'knight ' + oppositeNumber}, {active: false}).exec();
                        await monstersModel.updateMany({active: true, location: 'archer ' + oppositeNumber}, {active: false}).exec();
                        await monstersModel.updateMany({active: true, location: 'forest ' + oppositeNumber}, {active: false}).exec();
                        console.log([number, rollDistance]);
                        return [number, rollDistance];
                    }
                }
            }
        }
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