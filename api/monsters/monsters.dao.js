// jshint esversion:8
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
    update: async function(id, location) {
        return await this.findByIdAndUpdate(id, {location: location.slice(0, location.length - 1) + ((location.slice(location.length - 1) % 6) + 1)}).exec();
    },
    delete: function(query, cb) {
        this.findOneAndDelete(query, cb);
    }
};

const monstersModel = mongoose.model('Monsters', monstersSchema);
module.exports = monstersModel;