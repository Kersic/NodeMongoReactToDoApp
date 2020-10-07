const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    'text': {
        type: String,
        required: true,
    },
    'color':{
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('tag', schema);