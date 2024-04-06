require('../model/database');


const Category = require('../model/Category');
const Recipe = require("../model/Recipe");
/** 
 * GET/
 *HOMEPAGE 
 */

 exports.homepage = async(req, res) => {

   
      try {
         const limitNumber= 5;
         const categories = await Category.find({}).limit(limitNumber);
         const latest = await Recipe.find({}).sort({_id: -1}).limit(limitNumber);
         
         const nigeria = await Recipe.find({ 'category':  'Nigeria'}).limit(limitNumber)
         const america = await Recipe.find({ 'category':  'America'}).limit(limitNumber)
         const chainese = await Recipe.find({ 'category':  'Chainese'}).limit(limitNumber)
         const ghana  = await Recipe.find({ 'category':  'Ghana'}).limit(limitNumber)
         const italy  = await Recipe.find({ 'category':  'Italian'}).limit(limitNumber)
         
         const food = {latest, nigeria, america, chainese, ghana,italy};

         
          res.render('index', { title: 'Recipe App - Home', categories, food });
      } catch (error) {
         res.status(500).seend({message: error.message || "Some Error as Occur  "});
      }
 }
 /** 
 * GET/
 *CATEGORIES 
 */

 exports.exploreCategories = async(req, res) => {
   try {
      const limitNumber= 6;
      const categories = await Category.find({}).limit(limitNumber);

       res.render('categories', { title: 'International Meal List', categories });
   } catch (error) {
      res.status(500).send({message: error.message || "Some Error as Occur  "});
   }
}

/** 
 * GET/ID
 *CATEGORIESById 
 */

 exports.exploreCategoriesById = async(req, res) => {
   try {
      let categoryId = req.params.id;

      const limitNumber= 5;
      const categoryById = await Recipe.find({'category': categoryId }).limit(limitNumber);

       res.render('categories', { title: 'International Meal List', categoryById });
   } catch (error) {
      res.status(500).send({message: error.message || "Some Error as Occur  "});
   }
}

/** 
 * Get
 * Recipe id
*/

exports.exploreRecipe = async(req, res) => {
   try {
      let recipeId = req.params.id;

      const recipe = await Recipe.findById(recipeId);

       res.render('recipe', { title: 'Recipe Home', recipe });
   } catch (error) {
      res.status(500).send({message: error.message || "Some Error as Occur  "});
   }
}

/** 
 * Post
 * RECIPE SEARCH
*/

   
   exports.searchRecipe = async(req, res) => {

      try {
         let searchTerm = req.body.searchTerm;
         let recipe = await Recipe.find({ $text: {$search: searchTerm, $diacriticSensitive: true }});
       
          res.render('search', { title: 'Recipe Searching', recipe });
      } catch (error) {
         res.status(500).send({message: error.message || "Some Error as Occur  "});
      }


     
   }
/** 
 * Get
 * ExploreLatest Page
*/
   
exports.exploreLatest= async(req, res) => {

   try {
      const limitNumber = 20;
      const recipe = await Recipe.find({}).sort({_id: -1}).limit(limitNumber);
    
       res.render('exploreLatest', { title: 'Recipe Searching', recipe});
   } catch (error) {
      res.status(500).send({message: error.message || "Some Error as Occur  "});
   }

   }
  
/** 
 * Get
 * ExploreRandom Page
*/

exports.exploreRandom= async(req, res) => {

   try {
      let count = await Recipe.find().countDocuments();
      let random = Math.floor(Math.random() * count);
      let recipe = await Recipe.findOne().skip(random).exec();
    
       res.render('exploreRandom', { title: 'Recipe Searching', recipe});
   } catch (error) {
      res.status(500).send({message: error.message || "Some Error as Occur  "});
   }

   }
/** 
 * Get
 * Submit recipe
*/
   exports.submitRecipe = async(req, res) =>{
      const errorInfo= req.flash('infoErrors');
      const successInfo= req.flash('infoSubmit');
      res.render('submitRecipe', {title: 'Recipe Submit', successInfo, errorInfo });

   }
   
/**
 * Posting
 * Posting Recipe
*/ 

   exports.submitRecipePosting = async(req, res) =>{
      try {
         let imageUploadFile;
         let uploadPath;
         let newImageName;
         
         if(!req.files || Object.keys(req.files).length === 0){
         }else{
            imageUploadFile= req.files.image;
            newImageName = Date.now() + imageUploadFile.name;
            
            uploadPath = require('path').resolve('./') + 
            '/public/uploads/' + newImageName;

            imageUploadFile.mv(uploadPath, function(err){
               if (err) return res.status(500).send(err);               
            })
         }
         const newMeal = new Recipe({
         name: req.body.name,
         destription:req.body.description,
         email:req.body.email,
         ingredients: req.body.ingredient,          
         category:req.body.category,
         image: newImageName
         });

   await newMeal.save(); 
      

     req.flash('infoSubmit',  "Meal Added Successfully.");
      res.redirect('/submitRecipe');
   } catch (error) {
      req.flash('infoErrors', error);
      res.redirect('/submitRecipe');   
      }

   }

   //  async function insertDummyRecipeData(){
//    try{
//       await Recipe.insertMany(
//          [
//       {
//          "name": "Cornbread ",
//          "destription": "Cornbread is a quick bread made with cornmeal, associated with the cuisine of the Southern United States, with origins in Native American cuisine. It is an example of batter bread. Dumplings and pancakes made with finely ground cornmeal are staple foods of the Hopi people in Arizona.",
//          "source": "Wikipedia.com",
//          "email": "www.test@gmail.com",
//          "ingredients": [
//              "Cornmeal",
//              "Baking powder",
//              "Cracklin",
//              "Bread",
//              "Corn pone",
//              "Hot water",
//          ],
//          "category": "America",
//          "image": "Cornbread.jpg",
//       },
   
//       {
//          "name": "Coleslaw ",
//          "destription": "Coleslaw from the Dutch term koolsla meaning 'cabbage salad, also known as cole slaw, or simply as slaw, is a side dish consisting primarily of finely shredded raw cabbage with a salad dressing or condiment, commonly either vinaigrette or mayonnaise. This dish originated in the Netherlands in the 18th century. Coleslaw prepared with vinaigrette may benefit from the long lifespan granted by pickling.",
//          "source": "Wikipedia.com",
//          "email": "www.test@gmail.com",
//          "ingredients": [
//             " Fine shredded raw cabbage",
//             "  vinaigrette",
//             " vinegar",
//             " vegetable oil, salt",
//             " mayonnaise",
//             "  Salad cream",
//          ],
//          "category": "America",
//          "image": "coleslaw.jpg",
//       },
   
//       {
//          "name": "Chili con carne ",
//          "destription": "chili with meat, is a spicy stew containing chili peppers sometimes in the form of chili powder, meat usually beef, tomatoes, and often pinto beans or kidney beans. Other seasonings may include garlic, onions, and cumin. The dish originated in northern Mexico.",
//          "source": "Wikipedia.com",
//          "email": "www.test@gmail.com",
//          "ingredients": [
//              "Chil pepper",
//              "Meat",
//              "Tomatos",
//              "Kidney beans",
           
//          ],
//          "category": "America",
//          "image": "Chil con carne.jpg",
//       },
//       {
//          "name": "Achu/Achou ",
//          "destription": "A dish consisting of pounded cocoyams and a red palm oil soup, served with cow skin, oxtail, tripe, and steamed eggplant ",
//          "source": "Wikipedia.com",
//          "email": "www.test@gmail.com",
//          "ingredients": [
//             " cocoyam",
//             " Spices, water",
//             " palm oil",
//             " canwa or Nikki",
//             " fish",
           
//          ],
//          "category": "Ghana",
//          "image": "Achu.jpg",
//       },
//       {
//          "name": "Afang soup",
//          "destription": "Afang soup not to be misconstrued for Okazi soup or Ukazi soup, a soup from the Igbo cuisine, is a vegetable soup that originates from the Ibibio People of Akwa Ibom in Southern Nigeria. They share this soup with their neighbors the Efik people of Efik Tribe in Calabar, Cross River It is a dish popularly known by Nigerians and also some parts of Africa. It is especially popular among the Ibibio and the Anang people of Akwa Ibom and Cross River state who have adopted this cuisine as part of their cultural identity. ",
//          "source": "Wikipedia.com",
//          "email": "www.test@gmail.com",
//          "ingredients": [
//              "Beef",
//              "Fish",
//              "palm oil",
//             " Crayfish",
//              "Pepper",
//              "Shaki or cow tripe",
//             " Waterleaf",
//              "Okazi leaf",
//             "Onion",
           
//          ],
//          "category": "Nigeria",
//          "image": "Afang_Soup.jpg",
//       },
//       {
//          "name": "Fufu",
//          "destription": "Fufu is a pounded meal found in West African cuisine. It is a Twi word that originates from the Akans in Ghana. The word has been expanded to include several variations of the pounded meal found in other African countries including Sierra Leone, Guinea, Liberia, Cote D'Ivoire, Burkina Faso, Benin, Togo, Nigeria, Cameroon, the Democratic Republic of Congo, the Central African Republic, the Republic of Congo, Angola and Gabon. It also includes variations in the Greater Antilles, where African culinary influence is high.",
//          "source": "Wikipedia.com",
//          "email": "www.test@gmail.com",
//          "ingredients": [
//             " cassaava",
//             " Plantains",
//             " Cocoyam",
//             " Yams",
           
           
//          ],
//          "category": "Ghana",
//          "image": "fuf.jpg",
//       },
//       {
//          "name": "Sauteed reindeer ",
//          "destription": "Sauteed reindeer is perhaps the best known traditional meal from Sápmi in Finland, Sweden, Norway and Russia and Sakha. Usually steak or the back of the reindeer is used. It is sliced thinly usually while the meat is still frozen so that it is easier to cut through, fried in fat traditionally in reindeer fat, but butter and oil are more common nowadays, and spiced with black pepper and salt. Finally, some water, cream, or beer is added, and it is cooked until tender. The dish is served with mashed potatoes and lingonberry preserves or, more traditionally, with raw lingonberries mashed with sugar. In Finland, the meat is often served with pickled cucumber, which is not as common in Sweden. ",
//          "source": "Wikipedia.com",
//          "email": "www.test@gmail.com",
//          "ingredients": [
//             " Butter and oil ",
//             " Black pepper",
//             " Salt",
//             " Water or Milk or Beer",
//             " Mashed potatoes",
//             " Sugar",
//             " Pickled cucumber",
//             " Lingonberry",
           
           
//          ],
//          "category": "Italian ",
//          "image": "sauteed reindeer.jpg",
//       },
//       {
//          "name": "Baklava ",
//          "destription": "Baklava is a layered dessert made of filo pastry sheets, filled with chopped nuts, and sweetened with syrup or honey. There are many competing proposals for the origin of baklava, but there is no consensus on which of the options is true.In modern times, it is a common in Greek, Iranian, Arab, Turkish, Levantine, and Maghrebi cuisine, as well as in the cuisines of South Caucasus, Balkans, and Central Asia.",
   
//          "source": "Wikipedia.com",
//          "email": "www.test@gmail.com",
//          "ingredients": [
//             " Filo pastry ",
//             " Nuts",
//             " Syrup",
//             " Placenta cake",
//             " Layers bread",
            
           
           
//          ],
//          "category": "Chainese ",
//          "image": "Baklava.png",
//       },
//       {
//          "name": "Manti ",
//          "destription": "Manti is a type of dumpling mainly found in Turkish cuisine and Central Asian cuisine but also in West Asia, South Caucasus, and the Balkans. Manti is also popular among Chinese Muslims, and it is consumed throughout post-Soviet countries, where the dish spread from the Central Asian republics. The dumplings typically consist of a spiced meat mixture, usually lamb or ground beef, wrapped in a thin dough sheet which is then boiled or steamed. The size and shape of manti vary significantly depending on geographic location.",
   
//          "source": "Wikipedia.com",
//          "email": "www.test@gmail.com",
//          "ingredients": [
//             " Spiced meat ",
//             " Dough",
//             " Yoghurt",
//             " Garlic",
//          ],
//          "category": "Chainese ",
//          "image": "manti.jpg",
//       }
   
//      ]
//       );
//    }catch(error){
//       console.log('Connection errors:' +error)
//    }
//  }

//  insertDummyRecipeData();






//  async function insertDummyCate(){
   

//    try{
//       await Category.insertMany(
//          [

//             {  "name": "Nigeria",
//             "image": "9ja food.jpg"
           
//            },
//            {  "name": "America",
//            "image": "american food.jpg"
          
//           },
//           {  "name": "Chainese",
//           "image": "chainese food.jpg"
         
//          },
//          {  "name": "Ghana",
//          "image": "ghana food.jpg"
        
//         },
//         {  "name": "Italian",
//         "image": "italian food.jpg"
       
//        },
//        {  "name": "Russia",
//        "image": "russian food.jpg"
      
//       },
  
//            ]
//       );
//    }catch(error){
//       console.log('err', + error)
//    }
//  }

//  insertDummyCate();