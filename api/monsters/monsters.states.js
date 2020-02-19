// jshint esversion:8
const MonstersList = require('./monsters.types');
const monstersModel = require('./monsters.dao');
const defensesModel = require('../defenses/defenses.dao');
const defensesState = require('../defenses/defenses.states');
const monsterDeckModel = require('../monster-deck/monster-deck.dao');
const monsterDeckState = require('../monster-deck/monster-deck.states');
const playerCardsModel = require('../player-cards/player-cards.dao');

const MonstersState = {
    outerMovementChart: {forest: 'archer', archer: 'knight', knight:'swordsman', swordsman: 'castle'},
    winGame: false,
    drawnMonsters: {},
    clearBoard: async function(room) {
        monsterDeckState.removeMonsterIndices(room)
        .then(() => MonstersState.removeAllMonsters(room))
        .then(() => defensesState.removeDefenses(room))
        .then(() => {
            return new Promise(resolve => {
                resolve('Done');
            });
        });
        // MonstersState.removeAllMonsters(room);
        // defensesState.removeDefenses(room);
    },
    initializeBoard: async function(room) {
        monsterDeckState.initializeMonsterDeck(room)
        .then(() => MonstersState.initializeMonsters(room))
        .then(() => defensesState.initializeDefenses(room))
        .then(() => {
            return new Promise(resolve => {
                resolve('Done');
            });
        });
        // MonstersState.initializeMonsters(room);
        // defensesState.initializeDefenses(room);
    },
    addMonster: async function(room, amount) {
        MonstersState.drawnMonsters[room] = MonstersState.drawnMonsters[room] || [];
        for (let i = 0; i < amount; i++) {
            let monsterDeck = await monsterDeckModel.find({room: room}).exec();
            if (monsterDeck.length > 0) {
                let deckIndex = Math.round(Math.random() * (monsterDeck.length - 1));
                let drawnMonsterIndex = monsterDeck[deckIndex];
                let drawnMonster = MonstersList[drawnMonsterIndex.index];
                MonstersState.drawnMonsters[room].push(drawnMonster);
                monsterDeckState.removeMonsterIndex(room, drawnMonsterIndex.index);
                if (drawnMonster.type === 'Monster') {
                    let monster = new monstersModel({
                        name: drawnMonster.name,
                        type: drawnMonster.type,
                        hitpoints: drawnMonster.hitpoints,
                        location: 'forest ' + (Math.round(Math.random()*5) + 1),
                        active: true,
                        points: drawnMonster.points,
                        room: room
                    });
                    await monster.save();
                } else if (drawnMonster.type === 'Boss Monster') {
                    let monster = new monstersModel({
                        name: drawnMonster.name,
                        type: drawnMonster.type,
                        description: drawnMonster.description,
                        hitpoints: drawnMonster.hitpoints,
                        location: 'forest ' + (Math.round(Math.random()*5) + 1),
                        active: true,
                        points: drawnMonster.points,
                        room: room
                    });
                    await monster.save();
                    await new Promise((resolve, reject) => setTimeout(resolve, 250));
                    MonstersState[MonstersState.monsterEffects[drawnMonster.name].method](room, MonstersState.monsterEffects[drawnMonster.name].input);
                    await new Promise((resolve, reject) => setTimeout(resolve, 250));
                } else if (drawnMonster.type === 'Monster Effect') {
                    let monster = new monstersModel({
                        name: drawnMonster.name,
                        type: drawnMonster.type,
                        description: drawnMonster.description,
                        active: false, 
                        room: room
                    });
                    await monster.save();
                    await new Promise((resolve, reject) => setTimeout(resolve, 500));
                    MonstersState[MonstersState.monsterEffects[drawnMonster.name].method](room, MonstersState.monsterEffects[drawnMonster.name].input);
                    await new Promise((resolve, reject) => setTimeout(resolve, 500));
                }
            } else {
                break;
            }
        }
    },
    clearMonsters: function(room) {
        if (MonstersState.drawnMonsters[room]) {
            MonstersState.drawnMonsters[room].splice(0, MonstersState.drawnMonsters[room].length);
        }
    },
    initializeMonsters: async function(room) {
        let goblin1 = new monstersModel({
            name: 'Goblin',
            type: 'Monster',
            hitpoints: 1,
            location: 'archer 1',
            active: true,
            points: 1,
            room: room
        });
        let orc1 = new monstersModel({
            name: 'Orc',
            type: 'Monster',
            hitpoints: 2,
            location: 'archer 2',
            active: true,
            points: 2,
            room: room
        });
        let troll1 = new monstersModel({
            name: 'Troll',
            type: 'Monster',
            hitpoints: 3,
            location: 'archer 3',
            active: true,
            points: 3,
            room: room
        });
        let goblin2 = new monstersModel({
            name: 'Goblin',
            type: 'Monster',
            hitpoints: 1,
            location: 'archer 4',
            active: true,
            points: 1,
            room: room
        });
        let orc2 = new monstersModel({
            name: 'Orc',
            type: 'Monster',
            hitpoints: 2,
            location: 'archer 5',
            active: true,
            points: 2,
            room: room
        });
        let troll2 = new monstersModel({
            name: 'Troll',
            type: 'Monster',
            hitpoints: 3,
            location: 'archer 6',
            active: true,
            points: 3,
            room: room
        });
        return await monstersModel.insertMany([goblin1, orc1, troll1, goblin2, orc2, troll2], function (err, initMonsters) {
            if (err){ 
                return console.error(err);
            } else {
              console.log("Multiple monsters inserted to Collection");
            }
          });
    },
    hitMonster: async function(monsterId) {
        let struckMonster = await monstersModel.findById(monsterId).exec();
        if (struckMonster.hitpoints <= 1) {
            await monstersModel.findByIdAndUpdate(monsterId, {active: false}).exec();
        }
        return await monstersModel.findByIdAndUpdate(monsterId, {$inc: {hitpoints: -1}}).exec();
    },
    killMonster: async function(monsterId) {
        return await monstersModel.findByIdAndUpdate(monsterId, {active: false}).exec();
    },
    removeAllMonsters: async function(room) {
        return await monstersModel.deleteMany({room: room}, function (err) {
            if (err) return handleError(err);
            // deleted at most one tank document
          });
    },
    moveTo: async function(name) {
        let monstersWithName = await monstersModel.find({active: true, room: room, name}).exec();
        monstersWithName.forEach(async function(monster) {
            await monstersModel.findByIdAndUpdate(monster._id, 
                {location: 'knight' + monster.location.slice(monster.location.length - 2)}).exec();
        });
    },
    moveMonsters: async function(room) {
        let allMonsters;
        if (arguments[1] === null) {
            allMonsters = await monstersModel.find({active: true, room: room}).exec();
        } else {
            allMonsters = await monstersModel.find({active: true, room: room, location: {$regex: arguments[1]}}).exec();
        }
        allMonsters.forEach(async function(monster) {
            if (Object.keys(MonstersState.outerMovementChart).includes(monster.location.slice(0, monster.location.length - 2))) {
                let checkWallCollision = await defensesModel.findOne({name: 'Wall', location: 'castle ' + monster.location.slice(monster.location.length - 1), active: true, room: room}).exec();
                if (monster.location.includes('swordsman') && checkWallCollision) {
                        MonstersState.hitMonster(monster._id);
                        defensesState.killDefense(room, monster.location.slice(monster.location.length - 1), 'Wall');
                } else {
                    await monstersModel.findByIdAndUpdate(monster._id, 
                        {location: MonstersState.outerMovementChart[monster.location.slice(0, monster.location.length - 2)] + monster.location.slice(monster.location.length - 2)}).exec();
                }
            } else {
                let checkTowerCollison = await defensesModel.findOne({name: 'Tower', location: 'castle ' + monster.location.slice(monster.location.length - 1), active: true, room: room}).exec();
                if (checkTowerCollison) {
                        MonstersState.hitMonster(monster._id);
                        defensesState.killDefense(room, monster.location.slice(monster.location.length - 1, monster.location.length), 'Tower');
                } else {
                    await monstersModel.update(monster._id, monster.location);
                    // monstersModel.findByIdAndUpdate(monster._id, {location: monster.location.slice(0, monster.location.length - 1) + ((monster.location.slice(monster.location.length - 1) % 6) + 1)}).exec();
                }
            }
        });
    },
    checkWinGame: async function(room) {
        let playedMonsters = await monstersModel.find({room: room, $or:[{type: 'Monster'},{type: 'Boss Monster'}]}).exec();
        if (playedMonsters.filter(function(playedMonster) {
            return playedMonster.active === false;
        }).length === 31) {
            return true;
        } else {
            return false;
        }
    },
    discard: async function(room) {
        if (arguments[1] === null) {
            let allCards = await playerCardsModel.find({room: room}).exec();
            let allDrawnCards = allCards.filter(card => card.position !== 'discard');
            let playerlist = [];
            for (let i = 0; i < allDrawnCards.length; i++) {
                if (!playerlist.includes(allDrawnCards[i].position)) {
                    playerlist.push(allDrawnCards[i].position);
                    await playerCardsModel.findByIdAndUpdate(allDrawnCards[i]._id, {position: 'discard'}).exec();
                }
            }
        } else {
            await playerCardsModel.updateMany({room: room, name: {$regex: arguments[1]}}, {position: 'discard'}).exec();
        }
    },
    moveClockwise: async function(room) {
        let allMonsters = await monstersModel.find({room: room, active: true}).exec();
        allMonsters.forEach(async function(monster) {
            if (monster.location.includes('castle')) {
                let checkTowerCollison = await defensesModel.findOne({name: 'Tower', location: 'castle ' + monster.location.slice(monster.location.length - 1), active: true, room: room}).exec();
                if (checkTowerCollison) {
                        MonstersState.hitMonster(monster._id);
                        defensesState.killDefense(room, monster.location.slice(monster.location.length - 1), 'Tower');
                } else {
                    monstersModel.findByIdAndUpdate(monster._id, {location: monster.location.slice(0, monster.location.length - 1) + ((monster.location.slice(monster.location.length - 1) % 6) + 1)}).exec();
                }
            } else {
                monstersModel.findByIdAndUpdate(monster._id, {location: monster.location.slice(0, monster.location.length - 1) + ((monster.location.slice(monster.location.length - 1) % 6) + 1)}).exec();
            }
        });
    },
    moveCounterClockwise: async function(room) {
        let counterClockwiseChart = {'1': '6', '2': '1', '3': '2', '4': '3', '5': '4', '6': '5'};
        let allMonsters = await monstersModel.find({active: true, room: room}).exec();
        allMonsters.forEach(async function(monster) {
            if (monster.location.includes('castle')) {
                let checkTowerCollison = await defensesModel.findOne({name: 'Tower', location: 'castle ' + monster.location.slice(monster.location.length - 1), active: true, room: room}).exec();
                if (checkTowerCollison) {
                        MonstersState.hitMonster(monster._id);
                        defensesState.killDefense(room, monster.location.slice(monster.location.length - 1), 'Tower');
                } else {
                    monstersModel.findByIdAndUpdate(monster._id, {location: monster.location.slice(0, monster.location.length - 1) + counterClockwiseChart[monster.location.slice(monster.location.length - 1)]}).exec();
                }
            } else {
                monstersModel.findByIdAndUpdate(monster._id, {location: monster.location.slice(0, monster.location.length - 1) + counterClockwiseChart[monster.location.slice(monster.location.length - 1)]}).exec();
            }
        });
    },
    heal: async function(room) {
        let allMonsters = await monstersModel.find({active: true, room: room}).exec();
        allMonsters.forEach(async function(monster) {
            monstersModel.findByIdAndUpdate(monster._id, {$inc: {hitpoints: 1}}).exec();
        });
    },
    giantBoulder: async function(room) {
        let number = Math.round(Math.random() * 5) + 1;
        await monstersModel.updateMany({active: true, location: {$regex: number}, room: room}, {active: false}).exec();
        let checkWallCollision1 = await defensesModel.findOne({name: 'Wall', location: 'castle ' + number, active: true, room: room}).exec();
        if (checkWallCollision1) {
            defensesState.killDefense(room, number, 'Wall');
        } else {
            let checkTowerCollision1 = await defensesModel.findOne({name: 'Tower', location: 'castle ' + number, active: true, room: room}).exec();
            if (checkTowerCollision1) {
                defensesState.killDefense(room, number, 'Tower');
            } 
        }
    },
    spawnFinalBoss: async function(room, number) {
        let bossMonster;
        if (number) {
            bossMonster = {name: 'Dragon', 
            type: 'Boss Monster',
            description: 'During every spawn phase, this monster either moves forward 1 or moves clockwise 1. Destroy effects deal an additional damage point instead.',
            hitpoints: 5,
            points: 8
            };
        } else {
            bossMonster = {name: 'Overlord', 
            type: 'Boss Monster',
            description: 'During every spawn phase, this monster causes players to discard or heals itself. Destroy effects deal an additional damage point instead.',
            hitpoints: 4,
            points: 8
            };
        }
        MonstersState.drawnMonsters[room].push(bossMonster);
        let monster = new monstersModel({
            name: bossMonster.name,
            type: bossMonster.type,
            description: bossMonster.description,
            hitpoints: bossMonster.hitpoints,
            location: 'forest ' + (Math.round(Math.random()*5) + 1),
            active: true,
            points: bossMonster.points,
            room: room
        });
        await monster.save();
        await new Promise((resolve, reject) => setTimeout(resolve, 250));
        MonstersState[MonstersState.monsterEffects[bossMonster.name].method](room, MonstersState.monsterEffects[bossMonster.name].input);
        await new Promise((resolve, reject) => setTimeout(resolve, 250));
        return number;
    },
    finalBossEffect: async function(room, number) {
        let randomNum = Math.round(Math.random());
        if (number) {
            if (randomNum) {
                MonstersState.moveMonsters(room, null);
            } else {
                MonstersState.moveClockwise(room, null);
            }
        } else {
            if (randomNum) {
                MonstersState.heal(room, null);
            } else {
                MonstersState.discard(room, null);
            }
        }
    },
    monsterEffects: {'Goblin King': {method: 'addMonster', input: 3}, 
    'Ogre Mage': {method: 'moveMonsters', input: null}, 
    'Shaman': {method: 'heal', input: null},
    'Orc Warlord': {method: 'discard', input: null},
    'Savage Orc': {method: 'moveClockwise', input: null},
    'Wyvern': {method: 'moveTo', input: 'Wyvern'},
    'Goblin Trickster': {method: 'giantBoulder', input: null},
    'Blue Monsters Move 1': {method: 'moveMonsters', input: /5|6/},
    'Green Monsters Move 1': {method: 'moveMonsters', input: /3|4/},
    'Red Monsters Move 1': {method: 'moveMonsters', input: /1|2/},
    'Plague! Archers': {method: 'discard', input: /ARCHER/},
    'Plague! Knights': {method: 'discard', input: /KNIGHT/},
    'Plague! Swordsmen': {method: 'discard', input: /SWORDSMAN/},
    'All Players Discard 1 Card': {method: 'discard', input: null},
    'Draw 3 Monsters': {method: 'addMonster', input: 3},
    'Draw 4 Monsters': {method: 'addMonster', input: 4},
    'Monsters Move Clockwise': {method: 'moveClockwise', input: null},
    'Monsters Move Counter-Clockwise': {method: 'moveCounterClockwise', input: null},
    'Destroy Region': {method: 'giantBoulder', input: null},
    'Overlord': {method: 'discard', input: null},
    'Dragon': {method: 'moveMonsters', input: null}
    }
};

module.exports = MonstersState;