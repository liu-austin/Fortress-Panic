// jshint esversion:8
const MonstersList = require('../monsters/monsters.types');
const monsterDeckModel = require('./monster-deck.dao');

const monsterDeckState = {
    initializeMonsterDeck: async function(room) {
        let monsterIndex;
        for (let i = 0; i < MonstersList.length; i++) {
            monsterIndex = new monsterDeckModel({
                index: i,
                room: room
            });
            if (i === MonstersList.length - 1) {
                return await monsterIndex.save();
            }
            await monsterIndex.save();
        }
    },
    removeMonsterIndex: function(room, index) {
        monsterDeckModel.deleteOne({index: index, room: room}).exec();
    },
    removeMonsterIndices: async function(room) {
        return await monsterDeckModel.deleteMany({room: room}, function (err) {
            if (err) return handleError(err);
          }).exec();
    }
};

module.exports = monsterDeckState;