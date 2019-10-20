// jshint esversion:6
var playerDeckModel = require('./player-deck.dao');

exports.createPlayerIndex = function (req, res, next) {
    var playerIndex = {
        index: req.body.index,
        room: req.body.room
    };

    playerDeckModel.create(playerIndex, function(err, playerIndex) {
        if(err) {
            res.json({
                error : err
            });
        }
        res.json({
            message : "Player Index created successfully"
        });
    })
}

exports.getPlayerIndices = function(req, res, next) {
    playerDeckModel.get({}, function(err, playerIndices) {
        if(err) {
            res.json({
                error: err
            });
        }
        res.json({
            playerIndices: playerIndices
        });
    })
}

exports.getPlayerIndex = function(req, res, next) {
    playerDeckModel.get({index: req.params.index}, function(err, playerIndices) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            playerIndices: playerIndices
        })
    })
}

exports.updatePlayerIndex = function(req, res, next) {
    var playerIndex = {
        index: req.body.index,
        room: req.body.room
    }
    playerDeckModel.update({_id: req.params.id}, playerIndex, function(err, playerIndex) {
        if(err) {
            res.json({
                error : err
            });
        }
        res.json({
            message : "Player index updated successfully"
        });
    });
}

exports.removePlayerIndex = function(req, res, next) {
    playerDeckModel.delete({_id: req.params.id}, function(err, playerIndex) {
        if(err) {
            res.json({
                error : err
            });
        }
        res.json({
            message : "Player index deleted successfully"
        });
    })
}