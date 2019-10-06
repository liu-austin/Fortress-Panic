// jshint esversion:6
const mongoose = require('mongoose');
const playerCardsSchema = require('./player-cards.model');

playerCardsSchema.statics = {
    create: function(data, cb) {
        const playerCard = new this(data);
        playerCard.save(cb);
    },
    get: function(query, cb) {
        this.find(query, cb);
    },
    getByName: function(query, cb) {
        this.find(query, cb);
    },
    update: function(query, updateData, cb) {
        this.findOneAndUpdate(query, {$set: updateData}, {new: true}, cb);
    },
    delete: function(query, cb) {
        this.findOneAndDelete(query, cb);
    }
};

const playerCardsModel = mongoose.model('Player Cards', playerCardsSchema);
module.exports = playerCardsModel;