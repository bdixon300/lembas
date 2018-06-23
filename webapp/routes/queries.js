var express = require("express");
var router = express.Router();

var db = require("../models/queries");

router.get("/", db.connectTest);
router.get("/test", db.testQ);
router.get("/getAllRecipe", db.getAll);
router.get("/getRecipe", db.get);
router.post("/postRecipe", db.post);

router.post("/createGoalDataEntry", db.createGoalData);
router.post("/createBodyDataEntry", db.createBodyData);
router.post("/createUserWeekEntry", db.createUserWeek);
router.post("/createMealPlansEntry", db.createMealPlans);
router.post("/createSavedRecipesEntry", db.createSavedRecipes);
router.post("/createUserEntry", db.createUserEntry);

router.get("/getDay", db.getDay); //Returns day as array of URIs
router.get("/getWeek", db.getWeek); //Returns week as array of URIs
router.post("/setDay", db.setDay); //Set the whole day as an array of URIs
router.post("/addToDay", db.addToDay); //Adds one URI to the day

router.get("/getGoalData", db.getGoalData); //Returns all goal data including userID and preset as the first two values,
router.post("/setGoalData", db.setGoalData); //Sets one goal value

router.post("/addRecipeToFavourites", db.addRecipeToFavourites); //Adds one recipe URI to favourite recipes
router.get("/getFavouriteRecipes", db.getFavouriteRecipes); //Gets favourite URIs as array of URIs
router.post("/setFavouriteRecipes", db.setFavouriteRecipes); //Sets favourites as array of URIs

router.post("/addRecipeToOthers", db.addRecipeToOthers); //Adds one recipe URI to other recipes
router.get("/getOtherRecipes", db.getOtherRecipes); //Gets other URIs as array of URIs
router.post("/setOtherRecipes", db.setOtherRecipes); //Sets others as array of URIs

router.post("/addPlanToFavourites", db.addPlanToFavourites); //Adds one recipe int to favourite recipes
router.get("/getFavouritePlans", db.getFavouritePlans); //Gets favourite ints as array of ints
router.post("/setFavouritePlans", db.setFavouritePlans); //Sets favourites as array of ints

router.post("/addPlanToOthers", db.addPlanToOthers); //Adds one plan to other recipes
router.get("/getOtherPlans", db.getOtherPlans); //Gets other ints as array of ints
router.post("/setOtherPlans", db.setOtherPlans); //Sets others as array of ints

router.post("/setMyWeekNutri", db.setMyWeekNutri); //Sets Myweek nutrition data as array of ints
router.get("/getMyWeekNutri", db.getMyWeekNutri); //Gets Myweek nutrition data as array of ints

router.post("/setCustomPlanNutri", db.setCustomPlanNutri); //Sets CustomPlan nutrition data as array of ints
router.get("/getCustomPlanNutri", db.getCustomPlanNutri); //Gets CustomPlan nutrition data as array of ints

router.get("/getCustomPlan", db.getCustomPlan); //Gets CustomPlan data as array of values
router.get("/getAllCustomPlans", db.getAllCustomPlans); //Gets All CustomPlan data as array of arrays
router.get("/createCustomPlan", db.createCustomPlan); //Creates a custom plan with the required paramters
router.post("/setRating", db.setRating); //Sets the rating data of the custom meal plan

router.post("/addToPlan", db.addToPlan); //Adds a recipe to the custom plan
router.post("/removeFromPlan", db.removeFromPlan); //Removes a recipe from the custom plan
router.post("/setCustomPlanName", db.setCustomPlanName); //Changes the name of the custom plan

router.post("/setBodyData", db.setBodyData); //Sets BodyPlan data
router.get("/getBodyData", db.getBodyData); //Gets BodyPlan data

router.get("/getUserID", db.getUserID); //Gets UserID from loginID
router.get("/createUserID", db.createUserID); //Creates a UserID and returns it from a loginID

router.get("/getSearchMealPlan", db.searchMealPlan); //Get all the mealplans on database
router.post("/createUser", db.createUser); //Sets BodyPlan data

router.get("/getCustomPlansName", db.getCustomPlansName); //Gets UserID from loginID
router.get("/getUserIDUserPass", db.getUserIDUserPass); //Gets UserID from Username and Password
router.get("/createUserIDUserPass", db.createUserIDUserPass); //Creates a UserID and returns it from a Username and password
router.get("/getUserIDUsername", db.getUserIDUsername); //Gets UserID from Username

router.post("/createRating", db.createRating); //Creates a new rating
router.get("/getUserRating", db.getUserRating); //Gets a singles users rating
router.get("/getRating", db.getRating); //Gets the average of all user ratings
router.post("/updateRating", db.updateRating); //Updates a rating value

module.exports = router;
