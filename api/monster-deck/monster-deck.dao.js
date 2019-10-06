// jshint esversion:6
const mongoose = require('mongoose');
const monsterDeckSchema = require('./monster-deck.model');

monsterDeckSchema.statics = {
    create: function(data, cb) {
        const monsterIndex = new this(data);
        monsterIndex.save(cb);
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

const monsterDeckModel = mongoose.model('Monster-Deck', monsterDeckSchema);
module.exports = monsterDeckModel;