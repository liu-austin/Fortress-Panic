// jshint esversion:8
const MonstersList = require('../monsters/monsters.types');
const monsterDeckModel = require('./monster-deck.dao');

const monsterDeckState = {
    initializeMonsterDeck: function() {
        let monsterIndex;
        for (let i = 0; i < MonstersList.length; i++) {
            monsterIndex = new monsterDeckModel({
                index: i
            });
            monsterIndex.save();
        }
    },
    removeMonsterIndex: function(index) {
        monsterDeckModel.deleteOne({index: index}).exec();
    },
    removeMonsterIndices: function() {
        monsterDeckModel.deleteMany({}, function (err) {
            if (err) return handleError(err);
          });
    }
};

module.exports = monsterDeckState;