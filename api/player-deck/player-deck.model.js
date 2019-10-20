// jshint esversion:6
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const playerDeckSchema = new Schema({
    index: {
        type: Number,
        required : true
    }, 
    room: {
        type: String, 
        required: true
    }
});

module.exports = playerDeckSchema;