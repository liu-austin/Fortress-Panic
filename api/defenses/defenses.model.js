// jshint esversion:6
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const defensesSchema = new Schema({
    name :{
        type: String,
        required : true
    },
    location: {
        type: String,
        default: ''
    },
    active: {
        type: Boolean,
        required: true
    }
});

module.exports = defensesSchema;