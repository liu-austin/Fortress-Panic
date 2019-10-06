// jshint esversion:6
var Monsters = require('./monsters.controller');

module.exports = function(router) {
    router.post('/create', Monsters.createMonster);
    router.get('/get', Monsters.getMonsters);
    router.get('/get/:name', Monsters.getMonster);
    router.put('/update/:id', Monsters.updateMonster);
    router.delete('/remove/:id', Monsters.removeMonster);
}