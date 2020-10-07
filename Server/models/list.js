const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    'name': {
        type: String,
        required: true,
    },
    'isDone':{
        type: Boolean,
        required: true,
    },
    'tag': {
        type: mongoose.Schema.ObjectId,
        ref: 'tag',
        required: false,
    }
});

module.exports = mongoose.model('list', schema);