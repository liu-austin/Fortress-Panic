// jshint esversion:6
var playerCardsModel = require('./player-cards.dao');

exports.createPlayerCard = function (req, res, next) {
    var playerCard = {
        name: req.body.name,
        src: req.body.src,
        position: req.body.position,
        description: req.body.description,
        key: req.body.key
    };

    playerCardsModel.create(playerCard, function(err, playerCard) {
        if(err) {
            res.json({
                error : err
            });
        }
        res.json({
            message : "Player card created successfully"
        });
    })
}

exports.getPlayerCards = function(req, res, next) {
    playerCardsModel.get({}, function(err, playerCards) {
        if(err) {
            res.json({
                error: err
            });
        }
        res.json({
            playerCards: playerCards
        });
    })
}

exports.getPlayerCard = function(req, res, next) {
    playerCardsModel.get({name: req.params.name}, function(err, playerCards) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            playerCards: playerCards
        })
    })
}

exports.updatePlayerCard = function(req, res, next) {
    var playerCard = {
        name: req.body.name,
        src: req.body.src,
        position: req.body.position,
        description: req.body.description,
        key: req.body.key
    }
    playerCardsModel.update({_id: req.params.id}, playerCard, function(err, playerCard) {
        if(err) {
            res.json({
                error : err
            });
        }
        res.json({
            message : "Player card updated successfully"
        });
    });
}

exports.removePlayerCard = function(req, res, next) {
    playerCardsModel.delete({_id: req.params.id}, function(err, playerCard) {
        if(err) {
            res.json({
                error : err
            });
        }
        res.json({
            message : "Player card deleted successfully"
        });
    })
}