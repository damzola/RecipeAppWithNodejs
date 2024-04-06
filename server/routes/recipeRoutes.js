const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');


    // App Routes

    router.get('/', recipeController.homepage);
    router.get('/categories', recipeController.exploreCategories);
    router.get('/recipe/:id', recipeController.exploreRecipe);
    router.get('/categories/:id', recipeController.exploreCategoriesById);
    router.post('/search', recipeController.searchRecipe);
    router.get('/exploreLatest', recipeController.exploreLatest);
    router.get('/exploreRandom', recipeController.exploreRandom);
    router.get('/submitRecipe', recipeController.submitRecipe);
    router.post('/submitRecipe', recipeController.submitRecipePosting);
    
module.exports = router; 