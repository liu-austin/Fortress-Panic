// jshint esversion:6
const mongoose = require('mongoose');
const defensesSchema = require('./defenses.model');

defensesSchema.statics = {
    create: function(data, cb) {
        const defense = new this(data);
        defense.save(cb);
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

const defensesModel = mongoose.model('Defenses', defensesSchema);
module.exports = defensesModel;