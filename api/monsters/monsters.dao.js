// jshint esversion:6
const mongoose = require('mongoose');
const monstersSchema = require('./monsters.model');

monstersSchema.statics = {
    create: function(data, cb) {
        const monster = new this(data);
        monster.save(cb);
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

const monstersModel = mongoose.model('Monsters', monstersSchema);
module.exports = monstersModel;