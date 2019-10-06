// jshint esversion:8

const defensesModel = require('./defenses.dao');

const defensesState = {
    lostGame: false,
    initializeDefenses: function() {
        let wall1 = new defensesModel({
            name: 'Wall',
            location: 'castle 1',
            active: true
        });
        let wall2 = new defensesModel({
            name: 'Wall',
            location: 'castle 2',
            active: true
        });
        let wall3 = new defensesModel({
            name: 'Wall',
            location: 'castle 3',
            active: true
        });
        let wall4 = new defensesModel({
            name: 'Wall',
            location: 'castle 4',
            active: true
        });
        let wall5 = new defensesModel({
            name: 'Wall',
            location: 'castle 5',
            active: true
        });
        let wall6 = new defensesModel({
            name: 'Wall',
            location: 'castle 6',
            active: true
        });
        let tower1 = new defensesModel({
            name: 'Tower',
            location: 'castle 1',
            active: true
        });
        let tower2 = new defensesModel({
            name: 'Tower',
            location: 'castle 2',
            active: true
        });
        let tower3 = new defensesModel({
            name: 'Tower',
            location: 'castle 3',
            active: true
        });
        let tower4 = new defensesModel({
            name: 'Tower',
            location: 'castle 4',
            active: true
        });
        let tower5 = new defensesModel({
            name: 'Tower',
            location: 'castle 5',
            active: true
        });
        let tower6 = new defensesModel({
            name: 'Tower',
            location: 'castle 6',
            active: true
        });
        defensesModel.insertMany([wall1, wall2, wall3, wall4, wall5, wall6, tower1, tower2, tower3, tower4, tower5, tower6], function (err, initDefenses) {
            if (err){ 
                return console.error(err);
            } else {
              console.log("Multiple defenses inserted to Collection");
            }
          });
    },
    checkLoseGame: async function() {
        let towers = await defensesModel.find({name: 'Tower'}).exec();
        if (towers.every(function(tower) {
            return tower.active === false;
        })) {
            defensesState.loseGame = true;
        }
    },
    killDefense: function(locationNumber, type) {
        defensesModel.findOneAndUpdate({name: type, location: 'castle ' + locationNumber}, {active: false}).exec();
        defensesState.checkLoseGame();
    },
    removeDefenses: function() {
        defensesModel.deleteMany({}, function (err) {
            if (err) return handleError(err);
            // deleted at most one tank document
          });
    },
    rebuildWall: function(locationNumber) {
        defensesModel.findOneAndUpdate({name: 'Wall', location: 'castle ' + locationNumber}, {active: true}).exec();
    }
};

module.exports = defensesState;