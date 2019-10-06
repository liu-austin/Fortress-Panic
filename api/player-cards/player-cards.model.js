// jshint esversion:6
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const playerCardsSchema = new Schema({
    name :{
        type: String,
        required : true
    },
    src: {
        type: String,
        required: true
    },
    description : {
        type: String,
        default: ''
    },
    position: {
        type: String,
    },
    key: {
        type: Number,
        required: true
    }
});

module.exports = playerCardsSchema;