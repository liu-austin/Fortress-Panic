// jshint esversion:6
var monsterIndexMethods = require('./monster-deck.controller');

module.exports = function(router) {
    router.post('/create', monsterIndexMethods.createMonsterIndex);
    router.get('/get', monsterIndexMethods.getMonsterIndices);
    router.get('/get/:name', monsterIndexMethods.getMonsterIndex);
    router.put('/update/:id', monsterIndexMethods.updateMonsterIndex);
    router.delete('/remove/:id', monsterIndexMethods.removeMonsterIndex);
}