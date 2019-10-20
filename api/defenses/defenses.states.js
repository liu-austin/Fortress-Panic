// jshint esversion:8

const defensesModel = require('./defenses.dao');

const defensesState = {
    lostGame: false,
    initializeDefenses: function(room) {
        let wall1 = new defensesModel({
            name: 'Wall',
            location: 'castle 1',
            active: true,
            room: room
        });
        let wall2 = new defensesModel({
            name: 'Wall',
            location: 'castle 2',
            active: true,
            room: room
        });
        let wall3 = new defensesModel({
            name: 'Wall',
            location: 'castle 3',
            active: true,
            room: room
        });
        let wall4 = new defensesModel({
            name: 'Wall',
            location: 'castle 4',
            active: true,
            room: room
        });
        let wall5 = new defensesModel({
            name: 'Wall',
            location: 'castle 5',
            active: true,
            room: room
        });
        let wall6 = new defensesModel({
            name: 'Wall',
            location: 'castle 6',
            active: true,
            room: room
        });
        let tower1 = new defensesModel({
            name: 'Tower',
            location: 'castle 1',
            active: true,
            room: room
        });
        let tower2 = new defensesModel({
            name: 'Tower',
            location: 'castle 2',
            active: true,
            room: room
        });
        let tower3 = new defensesModel({
            name: 'Tower',
            location: 'castle 3',
            active: true,
            room: room
        });
        let tower4 = new defensesModel({
            name: 'Tower',
            location: 'castle 4',
            active: true,
            room: room
        });
        let tower5 = new defensesModel({
            name: 'Tower',
            location: 'castle 5',
            active: true,
            room: room
        });
        let tower6 = new defensesModel({
            name: 'Tower',
            location: 'castle 6',
            active: true,
            room: room
        });
        defensesModel.insertMany([wall1, wall2, wall3, wall4, wall5, wall6, tower1, tower2, tower3, tower4, tower5, tower6], function (err, initDefenses) {
            if (err){ 
                return console.error(err);
            } else {
              console.log("Multiple defenses inserted to Collection");
            }
          });
    },
    checkLoseGame: async function(room) {
        let towers = await defensesModel.find({name: 'Tower', active: true, room: room}).exec();
        if (towers.length) {
            return false;
        } else {
            return true;
        }
    },
    killDefense: function(room, locationNumber, type) {
        defensesModel.findOneAndUpdate({name: type, location: 'castle ' + locationNumber, room: room}, {active: false}).exec();
        defensesState.checkLoseGame();
    },
    removeDefenses: function(room) {
        defensesModel.deleteMany({room: room}, function (err) {
            if (err) return handleError(err);
            // deleted at most one tank document
          });
    },
    rebuildWall: function(room, locationNumber) {
        defensesModel.findOneAndUpdate({name: 'Wall', location: 'castle ' + locationNumber, room: room}, {active: true}).exec();
    }
};

module.exports = defensesState;