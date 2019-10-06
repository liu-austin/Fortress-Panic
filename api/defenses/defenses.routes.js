// jshint esversion:6
var Defenses = require('./defenses.controller');

module.exports = function(router) {
    router.post('/create', Defenses.createDefense);
    router.get('/get', Defenses.getDefenses);
    router.get('/get/:name', Defenses.getDefense);
    router.put('/update/:id', Defenses.updateDefense);
    router.delete('/remove/:id', Defenses.removeDefense);
};