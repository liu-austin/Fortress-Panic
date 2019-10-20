// jshint esversion:6
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const monstersSchema = new Schema({
    name :{
        type: String,
        required : true
    },
    type: {
        type: String,
        required: true
    },
    description : {
        type: String,
        default: ''
    },
    hitpoints: {
        type: Number,
        default: 0,
    },
    location: {
        type: String,
        default: ''
    },
    active: {
        type: Boolean,
        required: true
    },
    points: {
        type: Number
    },
    room: {
        type: String,
        require: true
    }
});

module.exports = monstersSchema;