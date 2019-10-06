// jshint esversion:6
var monsterDeckModel = require('./monster-deck.dao');

exports.createMonsterIndex = function (req, res, next) {
    var monsterIndex = {
        index: req.body.index
    };

    monsterDeckModel.create(monsterIndex, function(err, monsterIndex) {
        if(err) {
            res.json({
                error : err
            });
        }
        res.json({
            message : "Monster Index created successfully"
        });
    })
}

exports.getMonsterIndices = function(req, res, next) {
    monsterDeckModel.get({}, function(err, monsterIndices) {
        if(err) {
            res.json({
                error: err
            });
        }
        res.json({
            monsterIndices: monsterIndices
        });
    })
}

exports.getMonsterIndex = function(req, res, next) {
    monsterDeckModel.get({index: req.params.index}, function(err, monsterIndices) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            monsterIndices: monsterIndices
        })
    })
}

exports.updateMonsterIndex = function(req, res, next) {
    var monsterIndex = {
        index: req.body.index
    }
    monsterDeckModel.update({_id: req.params.id}, monsterIndex, function(err, monsterIndex) {
        if(err) {
            res.json({
                error : err
            });
        }
        res.json({
            message : "Monster index updated successfully"
        });
    });
}

exports.removeMonsterIndex = function(req, res, next) {
    monsterDeckModel.delete({_id: req.params.id}, function(err, monsterIndex) {
        if(err) {
            res.json({
                error : err
            });
        }
        res.json({
            message : "Monster index deleted successfully"
        });
    })
}