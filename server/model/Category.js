const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This filed is required.'
    },
    image: {
        type: String,
        required: 'This filed is required.'
    },
}); 

module.exports = mongoose.model('Category', categorySchema); 