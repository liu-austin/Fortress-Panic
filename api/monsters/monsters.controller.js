// jshint esversion:6
var Monsters = require('./monsters.dao');

exports.createMonster = function (req, res, next) {
    var monster = {
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        hitpoints: req.body.hitpoints,
        location: req.body.location,
        active: req.body.active,
        points: req.body.points
    };

    Monsters.create(monster, function(err, monster) {
        if(err) {
            res.json({
                error : err
            });
        }
        res.json({
            message : "Monster created successfully"
        });
    })
}

exports.getMonsters = function(req, res, next) {
    Monsters.get({}, function(err, monsters) {
        if(err) {
            res.json({
                error: err
            });
        }
        res.json({
            monsters: monsters
        });
    })
}

exports.getMonster = function(req, res, next) {
    Monsters.get({name: req.params.name}, function(err, monsters) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            monsters: monsters
        })
    })
}

exports.updateMonster = function(req, res, next) {
    var monster = {
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        hitpoints: req.body.hitpoints,
        location: req.body.location,
        active: req.body.active,
        points: req.body.points
    }
    Monsters.update({_id: req.params.id}, monster, function(err, monster) {
        if(err) {
            res.json({
                error : err
            });
        }
        res.json({
            message : "Monster updated successfully"
        });
    });
}

exports.removeMonster = function(req, res, next) {
    Monsters.delete({_id: req.params.id}, function(err, monster) {
        if(err) {
            res.json({
                error : err
            });
        }
        res.json({
            message : "Monster deleted successfully"
        });
    })
}