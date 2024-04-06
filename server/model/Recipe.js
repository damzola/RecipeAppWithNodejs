const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This filed is required.'
    },
    destription: {
        type: String,
        required: 'This filed is required.'
    },
    email: {
        type: String,
        required: 'This filed is required.'
    },
    ingredients: {
        type: Array,
        required: 'This filed is required.'
    },
    category: {
        type: String,
        Enumerator:['Nigeria', 'Italian', 'America', 'Ghana', 'Chainese'],
        required: 'This filed is required.'
    }, 
    image: {
        type: String,
        required: 'This filed is required.'
    },
    
}); 

    recipeSchema.index({name: 'text', distription: 'text' });
    
module.exports = mongoose.model('Recipe', recipeSchema);