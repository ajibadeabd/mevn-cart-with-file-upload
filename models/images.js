const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImagesSchema = new Schema({
    file:{
        type: String,
        required:true
    },
    originalname:{
        type: String,
        required:true
    },
});

module.exports = mongoose.model('Images', ImagesSchema);