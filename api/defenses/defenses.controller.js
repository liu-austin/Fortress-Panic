// jshint esversion:6
var defenses = require('./defenses.dao');

exports.createdefense = function (req, res, next) {
    var defense = {
        name: req.body.name,
        location: req.body.location,
        active: req.body.active,
        room: req.body.room
    };

    defenses.create(defense, function(err, defense) {
        if(err) {
            res.json({
                error : err
            });
        }
        res.json({
            message : "defense created successfully"
        });
    })
}

exports.getdefenses = function(req, res, next) {
    defenses.get({}, function(err, defenses) {
        if(err) {
            res.json({
                error: err
            });
        }
        res.json({
            defenses: defenses
        });
    })
}

exports.getdefense = function(req, res, next) {
    defenses.get({name: req.params.name}, function(err, defenses) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            defenses: defenses
        })
    })
}

exports.updatedefense = function(req, res, next) {
    var defense = {
        name: req.body.name,
        location: req.body.location,
        active: req.body.active,
        room: req.body.room
    }
    defenses.update({_id: req.params.id}, defense, function(err, defense) {
        if(err) {
            res.json({
                error : err
            });
        }
        res.json({
            message : "defense updated successfully"
        });
    });
}

exports.removedefense = function(req, res, next) {
    defenses.delete({_id: req.params.id}, function(err, defense) {
        if(err) {
            res.json({
                error : err
            });
        }
        res.json({
            message : "defense deleted successfully"
        });
    })
}