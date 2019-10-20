// jshint esversion:8
const MonstersList = require('../monsters/monsters.types');
const monsterDeckModel = require('./monster-deck.dao');

const monsterDeckState = {
    initializeMonsterDeck: function(room) {
        let monsterIndex;
        for (let i = 0; i < MonstersList.length; i++) {
            monsterIndex = new monsterDeckModel({
                index: i,
                room: room
            });
            monsterIndex.save();
        }
    },
    removeMonsterIndex: function(room, index) {
        monsterDeckModel.deleteOne({index: index, room: room}).exec();
    },
    removeMonsterIndices: function(room) {
        monsterDeckModel.deleteMany({room: room}, function (err) {
            if (err) return handleError(err);
          }).exec();
    }
};

module.exports = monsterDeckState;