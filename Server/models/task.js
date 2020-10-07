const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    'text': {
        type: String,
        required: true,
    },
    'deadline':{
        type: Date,
        required: true,
    },
    'reminderDate':{
        type: Date,
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
    },
    'list': {
        type: mongoose.Schema.ObjectId,
        ref: 'list',
        required: false,
    }
});

module.exports = mongoose.model('category', schema);
