var pgp = require("pg-promise")({
  //Initialisation Options
});

const cn = {
  host: "db.doc.ic.ac.uk",
  port: 5432,
  database: "g1727102_u",
  user: "g1727102_u",
  password: "QwjOoxEgjX",
  ssl: true
};

//var db = pgp("postgres://g1727102_u:QwjOoxEgjX@db.doc.ic.ac.uk:5432/g1727102_u?ssl=true");
var db = pgp(cn);

function getAllUserWeek(req, res, next) {
  let userID = 0;
  console.log("GETTING DATA");
  db.any("select * from userZeroRecipe")
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved ALL uri"
      });
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

function getUserWeek(req, res, next) {
  let userID_I = "0";
  console.log("GETTING DATA");
  db.any("SELECT * FROM userZeroRecipe WHERE userid = $1", [userID_I])
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved ONE uri"
      });
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

function createUserWeek(req, res, next) {
  console.log("POSTING RECIPE URI");
  let userID_I = req.body.data.userID;
  let uri_I = req.body.data.uri;
  db.none("INSERT INTO userZeroRecipe(userID, uri) VALUES($1, $2)", [
    userID_I,
    uri_I
  ])
    .then(function() {
      res.status(200).json({
        status: "success",
        message: "Inserted one userID uri"
      });
    })
    .catch(function(err) {
      console.log(err);
      return next(err);
    });
}

function connect(req, res, next) {
  console.log("ATTEMPTING CONNECTION");
  db.proc("version")
    .then(data => {
      console.log("DATA", data);
      res.send(data);
    })
    .catch(error => {
      console.log("ERROR:", error);
    });
}

function test(req, res, next) {
  res.send("HMMM");
}

function createGoalData(req, res, next) {
  console.log("Creating Goal Data Table Entry");
  let userID_I = req.body.data.userID;
  console.log(userID_I);
  db.none('INSERT INTO "GoalData" ("GoalDataID") VALUES($1)', [userID_I])
    .then(function() {
      res.status(200).json({
        status: "success",
        message: "Created Goal Data Table row"
      });
    })
    .catch(function(err) {
      console.log(err);
      return next(err);
    });
}

function createBodyData(req, res, next) {
  console.log("Creating Body Data Table Entry");
  let userID_I = req.body.data.userID;
  console.log(userID_I);
  db.none('INSERT INTO "BodyData" ("BodyDataID") VALUES($1)', [userID_I])
    .then(function() {
      res.status(200).json({
        status: "success",
        message: "Created Body Data Table row"
      });
    })
    .catch(function(err) {
      console.log(err);
      return next(err);
    });
}

function createMealPlans(req, res, next) {
  console.log("Creating Meal Plans Table Entry");
  let userID_I = req.body.data.userID;
  console.log(userID_I);
  db.none('INSERT INTO "MealPlans" ("MealPlansID") VALUES($1)', [userID_I])
    .then(function() {
      res.status(200).json({
        status: "success",
        message: "Created Meal Plans Table row"
      });
    })
    .catch(function(err) {
      console.log(err);
      return next(err);
    });
}

function createMyWeek(req, res, next) {
  console.log("Creating My Week Table Entry");
  let userID_I = req.body.data.userID;
  console.log(userID_I);
  db.none('INSERT INTO "MyWeek" ("MyWeekID") VALUES($1)', [userID_I])
    .then(function() {
      res.status(200).json({
        status: "success",
        message: "Created Week Table row"
      });
    })
    .catch(function(err) {
      console.log(err);
      return next(err);
    });
}

function createSavedRecipes(req, res, next) {
  console.log("Creating Saved Recipes Table Entry");
  let userID_I = req.body.data.userID;
  console.log(userID_I);
  db.none('INSERT INTO "SavedRecipes" ("SavedRecipesID") VALUES($1)', [
    userID_I
  ])
    .then(function() {
      res.status(200).json({
        status: "success",
        message: "Created Saved Recipes Table row"
      });
    })
    .catch(function(err) {
      console.log(err);
      return next(err);
    });
}

function createUserEntry(req, res, next) {
  console.log("Creating User Table Entry");
  let userID_I = req.body.data.userID;
  console.log(userID_I);
  db.none(
    'INSERT INTO "User" ("UserID", "BodyDataID", "GoalDataID", "MyWeekID", "SavedRecipesID", "MealPlansID") VALUES($1, $1, $1, $1, $1, $1)',
    [userID_I]
  )
    .then(function() {
      res.status(200).json({
        status: "success",
        message: "Created New User Table row"
      });
    })
    .catch(function(err) {
      console.log(err);
      return next(err);
    });
}

function getDay(req, res, next) {
  console.log("Getting one day from my week");
  let userID_I = req.query.userID;
  let day_I = req.query.day;
  console.log("GETTING DATA");
  db.any('SELECT "$2" FROM "MyWeek" WHERE "MyWeekID" = $1', [userID_I, day_I])
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved ONE uri array"
      });
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

function getWeek(req, res, next) {
  console.log("Getting whole week");

  let userID_I = req.query.userID;

  let query = `SELECT json_agg(json_build_array("Monday","Tuesday", "Wednesday", "Thursday","Friday","Saturday","Sunday") )
  FROM "MyWeek" where "MyWeekID" = ${userID_I};`;

  db.any(query)
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data[0].json_agg[0],
        message: "Retrieved Array of URIs array"
      });
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

function setDay(req, res, next) {
  console.log("Setting Day");
  const userID_I = req.body.data.userID;
  const day_I = req.body.data.day;
  const data_I = req.body.data.data;
  const parsedData = "{" + data_I.toString() + "}";

  let query = `UPDATE "MyWeek" SET "${day_I}" = '${parsedData}' where "MyWeekID" = ${userID_I};`;
  db.none(query)
    .then(function() {
      res.status(200).json({
        status: "success",
        message: "Updated one day in MyWeek"
      });
    })
    .catch(function(err) {
      console.log(err);
      return next(err);
    });
}

function addToDay(req, res, next) {
  console.log("Adding to day");
  const userID_I = req.body.data.userID;
  const day_I = req.body.data.day;
  const meal_I = req.body.data.meal;
  const query = `UPDATE "MyWeek" SET "${day_I}" = "${day_I}" || '{${meal_I}}' where "MyWeekID" = ${userID_I};`;

  db.none(query)
    .then(function() {
      res.status(200).json({
        status: "success",
        message: "Updated one value in GoalData"
      });
    })
    .catch(function(err) {
      console.log(err);
      return next(err);
    });
}

function getGoalData(req, res, next) {
  console.log("Getting Goal Data");
  let userID_I = req.query.userID;
  let query = `SELECT json_build_array("CurrentPreset", "Calcium", "Carbs", "Cholesterol", "MonounsaturatedFats", "PolyunsaturatedFats", "SaturatedFats", "Fat", "TransFats", "Iron", "Fibre", "Folate", "Potassium", "Magnesium", "Sodium", "Energy", "Niacin(B3)", "Phosphorus", "Protein", "Riboflavin(B2)", "Sugars", "Thiamin(B1)", "VitaminE", "VitaminA", "VitaminB12", "VitaminB6", "VitaminC", "VitaminD", "VitaminK") FROM "GoalData" where "GoalDataID" = ${userID_I}`;
  db.any(query)
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data[0].json_build_array,
        message: "Retrieved ONE table"
      });
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

function setGoalData(req, res, next) {
  console.log("Setting Goal Data");
  let userID_I = req.body.data.userID;
  let goal_I = req.body.data.goal;
  console.log(goal_I);
  let value_I = req.body.data.value;
  console.log("GETTING DATA");
  let query = `UPDATE "GoalData" SET "${goal_I}" = ${value_I} where "GoalDataID" = ${userID_I};`;
  db.any(query)
    .then(function() {
      res.status(200).json({
        status: "success",
        message: "Updated one value in GoalData"
      });
    })
    .catch(function(err) {
      console.log(err);
      return next(err);
    });
}

function addRecipeToFavourites(req, res, next) {
  console.log("Adding recipe to favourites");
  let userID_I = req.body.data.userID;
  let meal_I = req.body.data.meal;
  console.log("GETTING DATA");
  const query = `UPDATE "SavedRecipes" SET "Favourites" = "Favourites" || '{${meal_I}}' where "SavedRecipesID" = ${userID_I}`;
  db.any(query)
    .then(function() {
      res.status(200).json({
        status: "success",
        message: "Added one value to SavedRecipes Favourites"
      });
    })
    .catch(function(err) {
      console.log(err);
      return next(err);
    });
}

function setFavouriteRecipes(req, res, next) {
  console.log("Setting Favourites");
  const userID_I = req.body.data.userID;
  const meals_I = req.body.data.meals;
  const parsedData = "{" + meals_I.toString() + "}";
  console.log("GETTING DATA");

  let query = `UPDATE "SavedRecipes" SET "Favourites" = '${parsedData}' where "SavedRecipesID" = ${userID_I};`;
  db.none(query)
    .then(function() {
      res.status(200).json({
        status: "success",
        message: "Updated SavedRecipes Favourites"
      });
    })
    .catch(function(err) {
      console.log(err);
      return next(err);
    });
}

function getFavouriteRecipes(req, res, next) {
  console.log("Getting Goal Data");
  let userID_I = req.query.userID;
  console.log("GETTING DATA");
  const query = `SELECT "Favourites" FROM "SavedRecipes" WHERE "SavedRecipesID" = ${userID_I}`;
  db.any(query)
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved ONE table"
      });
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

function addRecipeToOthers(req, res, next) {
  console.log("Adding recipe to others");
  let userID_I = req.body.data.userID;
  let meal_I = req.body.data.meal;
  console.log("GETTING DATA");
  const query = `UPDATE "SavedRecipes" SET "Others" = "Others" || '{${meal_I}}' where "SavedRecipesID" = ${userID_I}`;
  db.any(query)
    .then(function() {
      res.status(200).json({
        status: "success",
        message: "Added one value to SavedRecipes Favourites"
      });
    })
    .catch(function(err) {
      console.log(err);
      return next(err);
    });
}

function setOtherRecipes(req, res, next) {
  console.log("Setting Other recipes");
  const userID_I = req.body.data.userID;
  const meals_I = req.body.data.meals;
  const parsedData = "{" + meals_I.toString() + "}";
  console.log("GETTING DATA");

  let query = `UPDATE "SavedRecipes" SET "Others" = '${parsedData}' where "SavedRecipesID" = ${userID_I};`;
  db.none(query)
    .then(function() {
      res.status(200).json({
        status: "success",
        message: "Updated SavedRecipes Favourites"
      });
    })
    .catch(function(err) {
      console.log(err);
      return next(err);
    });
}

function getOtherRecipes(req, res, next) {
  console.log("Getting Other recipes");
  let userID_I = req.query.userID;
  console.log("GETTING DATA");
  const query = `SELECT "Others" FROM "SavedRecipes" WHERE "SavedRecipesID" = ${userID_I}`;
  db.any(query)
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved ONE table"
      });
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

function addPlanToFavourites(req, res, next) {
  console.log("Adding plan to favourites");
  let userID_I = req.body.data.userID;
  let plan_I = req.body.data.plan;
  console.log("POSTING DATA");
  const query = `UPDATE "MealPlans" SET "Favourites" = "Favourites" || '{${plan_I}}' where "MealPlansID" = ${userID_I}`;
  db.any(query)
    .then(function() {
      res.status(200).json({
        status: "success",
        message: "Added one value to SavedPlans Favourites"
      });
    })
    .catch(function(err) {
      console.log(err);
      return next(err);
    });
}

function setFavouritePlans(req, res, next) {
  console.log("Setting Favourite Plans");
  const userID_I = req.body.data.userID;
  const plans_I = req.body.data.plans;
  const parsedData = "{" + plans_I.toString() + "}";
  console.log("GETTING DATA");

  let query = `UPDATE "MealPlans" SET "Favourites" = '${parsedData}' where "MealPlansID" = ${userID_I};`;
  db.none(query)
    .then(function() {
      res.status(200).json({
        status: "success",
        message: "Updated SavedPlans Favourites"
      });
    })
    .catch(function(err) {
      console.log(err);
      return next(err);
    });
}

function getFavouritePlans(req, res, next) {
  console.log("Getting Favourite plans");
  let userID_I = req.query.userID;
  const query = `SELECT json_build_array("Favourites") from "MealPlans" where "MealPlansID" =  ${userID_I}`;
  db.any(query)
    .then(data => {
      console.log("FAVOURTITE RETURN DATA");
      res.status(200).json({
        status: "success",
        data: data[0].json_build_array[0],
        message: "Retrieved ONE table"
      });
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

function addPlanToOthers(req, res, next) {
  console.log("Adding plan to others");
  let userID_I = req.body.data.userID;
  let plan_I = req.body.data.plan;
  console.log("ADDING DATA");
  const query = `UPDATE "SavedRecipes" SET "Others" = "Others" || '{${plan_I}}' where "SavedRecipesID" = ${userID_I}`;
  db.any(query)
    .then(function() {
      res.status(200).json({
        status: "success",
        message: "Added one value to SavedRecipes Favourites"
      });
    })
    .catch(function(err) {
      console.log(err);
      return next(err);
    });
}

function setOtherPlans(req, res, next) {
  console.log("Setting Others");
  const userID_I = req.body.data.userID;
  const plans_I = req.body.data.plans;
  const parsedData = "{" + plans_I.toString() + "}";
  console.log("SETTING DATA");

  let query = `UPDATE "SavedRecipes" SET "Others" = '${parsedData}' where "SavedRecipesID" = ${userID_I};`;
  db.none(query)
    .then(function() {
      res.status(200).json({
        status: "success",
        message: "Updated SavedRecipes Favourites"
      });
    })
    .catch(function(err) {
      console.log(err);
      return next(err);
    });
}

function getOtherPlans(req, res, next) {
  console.log("Getting Plan Data");
  let userID_I = req.query.userID;
  console.log("GETTING DATA");
  const query = `SELECT json_build_array("Other") from "MealPlans" where "MealPlansID" = " = ${userID_I}`;
  db.any(query)
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved ONE table"
      });
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

function setMyWeekNutri(req, res, next) {
  console.log("Setting My Week Nutrition Data");
  const userID_I = req.body.data.userID;
  const day_I = req.body.data.day;
  const nutri_I = req.body.data.nutri;
  const parsedData = "{" + nutri_I.toString() + "}";
  console.log("SETTING DATA");

  let query = `UPDATE "MyWeek" SET "${day_I}ntr" = '${parsedData}' where "MyWeekID" = ${userID_I};`;
  db.none(query)
    .then(function() {
      res.status(200).json({
        status: "success",
        message: "Updated MyWeekNutri Favourites"
      });
    })
    .catch(function(err) {
      console.log(err);
      return next(err);
    });
}

function getMyWeekNutri(req, res, next) {
  console.log("Getting My Week Data");
  let userID_I = req.query.userID;
  let day_I = req.query.day;
  console.log("GETTING DATA");
  const query = `SELECT json_build_array(${day_I}ntr) from "MyWeek" where "MyWeekID" = ${userID_I}`;
  db.any(query)
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved ONE table"
      });
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

function setCustomPlanNutri(req, res, next) {
  console.log("Setting Custom Plan Nutrition Data");
  const planID_I = req.body.data.planID;
  const day_I = req.body.data.day;
  const nutri_I = req.body.data.nutri;
  const parsedData = "{" + nutri_I.toString() + "}";
  console.log("SETTING DATA");

  let query = `UPDATE "CustomPlan" SET ${parsedData}ntr = '${parsedData}' where "CustomPlanID" = ${planID_I};`;
  db.none(query)
    .then(function() {
      res.status(200).json({
        status: "success",
        message: "Updated CustomPlanNutri Favourites"
      });
    })
    .catch(function(err) {
      console.log(err);
      return next(err);
    });
}

function getCustomPlanNutri(req, res, next) {
  console.log("Getting Custom Plan Data");
  let planID_I = req.query.planID;
  let day_I = req.query.day;
  console.log("GETTING DATA");
  const query = `SELECT json_build_array(${day}ntr) from "CustomPlan" where "CustomPlanID" = ${planID_I}`;
  db.any(query)
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved ONE table"
      });
    })
    .catch(error => {
      console.log("Error:", error);
    });
}
//TODO EDIT WITH NEW RATING SYSTEM
function getCustomPlan(req, res, next) {
  console.log("Getting Custom Plan Data");
  let planID_I = req.query.planID;
  console.log("GETTING DATA");
  const queryCustomPlan = `SELECT json_build_array("UserID", "CustomPlanID" ,"PlanName", json_build_array("mondayntr", "tuesdayntr", "wednesdayntr", "thursdayntr", "fridayntr", "saturdayntr", "sundayntr"), "weekntr", json_build_array("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday")) from "CustomPlan" where "CustomPlanID" =  ${planID_I}`;
  const queryRating = `SELECT avg("Rating") from "UserRatings" where "MealPlanID" =  '${planID_I}'`;
  db.multi(`${queryCustomPlan}; ${queryRating}`)
    .then(data => {
      data[0][0].json_build_array[6] = data[1][0].avg;
      res.status(200).json({
        status: "success",
        data: data[0],
        message: "Retrieved ONE plan"
      });
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

//TODO EDIT WITH NEW RATING SYSTEM
function getAllCustomPlans(req, res, next) {
  console.log("Getting All Custom Plan Data");
  console.log("GETTING DATA");
  const query = `SELECT json_agg(json_build_array("UserID", "CustomPlanID", "PlanName", "weekntr",json_build_array("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"))) from "CustomPlan"`;
  db.any(query)
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved ALL plans"
      });
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

function createCustomPlan(req, res, next) {
  console.log("Creating Custom Plan");
  const userID_I = req.query.userID;
  const day_I = req.query.day;
  const recipe_I = req.query.recipe;
  const daynutri_I = req.query.daynutri;
  const weeknutri_I = req.query.weeknutri;
  const dayLower_I = req.query.day.toLowerCase();
  const parsedDay = "'{" + daynutri_I.toString() + "}'";
  const parsedWeek = "'{" + weeknutri_I.toString() + "}'";
  console.log("SETTING DATA");

  const query = `INSERT INTO "CustomPlan"("UserID", "PlanName", "${day_I}", "${dayLower_I}ntr", "weekntr") VALUES('${userID_I}','No Name','{${recipe_I}}', ${parsedDay}, ${parsedWeek}) RETURNING "CustomPlanID"`;
  //const query2 = `UPDATE "MealPlans" SET "Favourites" = "Favourites" || ARRAY[currval('"CustomPlan_CustomPlanID_seq"')] where "MealPlansID" = ${userID_I}`;

  db.any(query)
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Created plan and returned its ID"
      });
    })
    .catch(error => {
      console.log("Error:", error);
    });

  /*db.tx(t => {
        // `t` and `this` here are the same;
        // this.ctx = transaction config + state context;
        return t.batch([
            t.one(query),
            t.none(query2)
        ]);
    })
    // using .spread(function(user, event)) is best here, if supported;
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data[0],
        message: "Created Plan"
    })
  })
    .catch(function(err) {
      console.log(err);
      return next(err);
    });*/
}

function addToPlan(req, res, next) {
  console.log("Adding recipe to Customplan");
  const planID_I = req.body.data.planID;
  const day_I = req.body.data.day;
  const recipe_I = req.body.data.recipe;
  const daynutri_I = req.body.data.daynutri;
  const weeknutri_I = req.body.data.weeknutri;
  const dayLower_I = req.body.data.day.toLowerCase();
  const parsedDay = "'{" + daynutri_I.toString() + "}'";
  const parsedWeek = "'{" + weeknutri_I.toString() + "}'";
  console.log("SETTING DATA");

  let query = `UPDATE "CustomPlan" SET "${day_I}" = "${day_I}" || '{${recipe_I}}' where "CustomPlanID" = ${planID_I};`;
  let query2 = `UPDATE "CustomPlan" SET "${dayLower_I}ntr" = ${parsedDay} where "CustomPlanID" = ${planID_I};`;
  let query3 = `UPDATE "CustomPlan" SET "weekntr" = ${parsedWeek} where "CustomPlanID" = ${planID_I};`;
  db.tx(t => {
    // this.ctx = transaction config + state context;
    return t.batch([t.none(query), t.none(query2), t.none(query3)]);
  })
    .then(function() {
      res.status(200).json({
        status: "success",
        message: "Added recipe to custom plan"
      });
    })
    .catch(error => {
      console.log("ERROR:", error);
    });
}

function removeFromPlan(req, res, next) {
  console.log("Removing recipe from customplan");
  const planID_I = req.body.data.planID;
  const day_I = req.body.data.day;
  const recipe_I = req.body.data.recipe;
  const daynutri_I = req.body.data.daynutri;
  const weeknutri_I = req.body.data.weeknutri;
  const dayLower_I = req.body.data.day.toLowerCase();
  const parsedDay = "'{" + daynutri_I.toString() + "}'";
  const parsedWeek = "'{" + weeknutri_I.toString() + "}'";
  console.log("SETTING DATA");

  let query = `UPDATE "CustomPlan" SET "${day_I}" = array_remove("${day_I}", '${recipe_I}')  where "CustomPlanID" = ${planID_I};`;
  let query2 = `UPDATE "CustomPlan" SET "${dayLower_I}ntr" = ${parsedDay} where "CustomPlanID" = ${planID_I};`;
  let query3 = `UPDATE "CustomPlan" SET "weekntr" = ${parsedWeek} where "CustomPlanID" = ${planID_I};`;
  console.log(query);
  console.log(query2);
  console.log(query3);
  db.tx(t => {
    // this.ctx = transaction config + state context;
    return t.batch([t.none(query), t.none(query2), t.none(query3)]);
  })
    .then(function() {
      res.status(200).json({
        status: "success",
        message: "Removed recipe from custom plan"
      });
    })
    .catch(error => {
      console.log("ERROR:", error);
    });
}

function setCustomPlanName(req, res, next) {
  console.log("Setting Custom Plan Name");
  const planID_I = req.body.data.planID;
  const name_I = req.body.data.name;
  console.log("SETTING DATA");

  let query = `UPDATE "CustomPlan" SET "PlanName" = '${name_I}' where "CustomPlanID" = ${planID_I};`;
  db.none(query)
    .then(function() {
      res.status(200).json({
        status: "success",
        message: "Updated CustomPlan Name"
      });
    })
    .catch(function(err) {
      console.log(err);
      return next(err);
    });
}

function setBodyData(req, res, next) {
  console.log("Setting Custom Plan Name");
  const userID_I = req.body.data.userID;
  const value_I = req.body.data.value;
  const data_I = req.body.data.data;
  console.log("SETTING DATA");

  let query = `UPDATE "BodyData" SET "${value_I}" = '${data_I}' where "BodyDataID" = ${userID_I};`;
  db.none(query)
    .then(function() {
      res.status(200).json({
        status: "success",
        message: "Updated BodyData value"
      });
    })
    .catch(function(err) {
      console.log(err);
      return next(err);
    });
}

function getBodyData(req, res, next) {
  console.log("Getting Body Data");
  let userID_I = req.query.userID;
  console.log("GETTING DATA");
  const query = `SELECT json_build_array("Age", "Gender") from "BodyData" where "BodyDataID" =  ${userID_I}`;
  db.any(query)
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved body data"
      });
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

function getUserID(req, res, next) {
  console.log("Getting UserID");
  let loginID_I = req.query.loginID.toString();
  console.log("GETTING DATA");
  const query = `SELECT "UserID" from "UserIdent" where "LoginID" =  '${loginID_I}'`;
  console.log(query);
  db.any(query)
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved User ID"
      });
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

function createUserID(req, res, next) {
  console.log("Creating UserID");
  let loginID_I = req.query.loginID;
  console.log("GETTING DATA");
  const query = `insert into "UserIdent"("LoginID") VALUES('${loginID_I}') returning "UserID"`;
  db.any(query)
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Created User ID"
      });
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

//--------SET RATING COLUMN------------

function setRating(req, res, next) {
  console.log("Setting Custom Meal Plan Rating Data");
  const userID_I = req.body.data.userID;
  const mealPlanID_I = req.body.data.mealPlanID;
  const rating_I = req.body.data.rating;

  console.log("SETTING RATING DATA");

  //let query = `UPDATE "CustomMealPlan" SET "" = '${parsedData}' where "MyWeekID" = ${userID_I};`;
  //
  // db.none(query)
  //   .then(function() {
  //     res.status(200).json({
  //       status: "success",
  //       message: "Updated rating in custom meal plan"
  //     });
  //   })
  //   .catch(function(err) {
  //     console.log(err);
  //     return next(err);
  //   });
}

//--------SEARCH BAR DATABASE QUERY------------

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function searchMealPlan(req, res, next) {
  let param = req.query.term;
  if (param === "All") {
    param = " ";
  }
  let filter = req.query.filter;

  console.log("SEARCHING MEAL PLAN DATABASE");
  const queryCustomPlan = `SELECT json_agg(json_build_array("UserID", "CustomPlanID", "PlanName", json_build_array("mondayntr", "tuesdayntr", "wednesdayntr", "thursdayntr", "fridayntr", "saturdayntr", "sundayntr"), "weekntr",json_build_array("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"))) from "CustomPlan" where "PlanName" ilike '%${param}%'`;
  const queryRating = `SELECT * from "UserRatings"`;
  db.multi(`${queryCustomPlan}; ${queryRating}`)
    .then(data => {
      let returnDatabaseQuery = data[0][0].json_agg;
      let returnDatabaseArray = [];
      returnDatabaseQuery.map((mealPlan, index) => {
        let sum = 0;
        let total = 0;

        data[1].map(obj => {
          if (obj.MealPlanID === mealPlan[1]) {
            total++;
            sum += obj.Rating;
          }
        });

        let avg = Math.floor(sum / total);
        returnDatabaseArray.push({
          userID: mealPlan[0],
          mealPlanID: mealPlan[1],
          name: mealPlan[2],
          nutritionDays: mealPlan[3],
          nutrition: mealPlan[4],
          meals: mealPlan[5],
          rating: isNaN(avg) ? 0 : avg
        });
      });

      res.send(returnDatabaseArray);
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

function createUser(req, res, next) {
  console.log("Creating user");
  const userID_I = req.body.data.userID;
  console.log("SETTING DATA");

  let query = `INSERT INTO "GoalData" ("GoalDataID") VALUES(${userID_I})`;
  let query2 = `INSERT INTO "BodyData" ("BodyDataID") VALUES(${userID_I})`;
  let query3 = `INSERT INTO "MealPlans" ("MealPlansID") VALUES(${userID_I})`;
  let query4 = `INSERT INTO "MyWeek" ("MyWeekID") VALUES(${userID_I})`;
  let query5 = `INSERT INTO "SavedRecipes" ("SavedRecipesID") VALUES(${userID_I})`;
  let query6 = `INSERT INTO "User" ("UserID", "BodyDataID", "GoalDataID", "MyWeekID", "SavedRecipesID", "MealPlansID") VALUES(${userID_I}, ${userID_I}, ${userID_I}, ${userID_I}, ${userID_I}, ${userID_I})`;
  db.tx(t => {
    // this.ctx = transaction config + state context;
    return t.batch([
      t.none(query),
      t.none(query2),
      t.none(query3),
      t.none(query4),
      t.none(query5),
      t.none(query6)
    ]);
  })
    .then(function() {
      res.status(200).json({
        status: "success",
        message: "Created new user"
      });
    })
    .catch(error => {
      console.log("ERROR:", error);
    });
}

function getAllPlanNutri(req, res, next) {
  console.log("Getting Custom Plan Nutrition Data");
  let planID_I = req.query.planID;
  console.log("GETTING DATA");
  const query = `SELECT json_build_array(mondayntr, tuesdayntr, wednesdayntr, thursdayntr, fridayntr, saturdayntr, sundayntr, weekntr) from "CustomPlan" where "CustomPlanID" =  ${planID_I}`;
  db.any(query)
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved Nutrition data"
      });
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

function getUserIDUserPass(req, res, next) {
  console.log("Getting UserID");
  let username_I = req.query.username;
  let password_I = req.query.password;
  console.log("GETTING DATA");
  const query = `SELECT "UserID" from "UserIdent" where "Username" =  '${username_I}' and "Password" = '${password_I}'`;
  console.log(query);
  db.any(query)
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved User ID"
      });
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

function createUserIDUserPass(req, res, next) {
  console.log("Creating UserID");
  let username_I = req.query.username;
  let password_I = req.query.password;
  console.log("GETTING DATA");
  const query = `insert into "UserIdent"("LoginID", "Username", "Password") VALUES('${username_I}', '${username_I}', '${password_I}') returning "UserID"`;
  db.any(query)
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Created User ID"
      });
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

function getUserIDUsername(req, res, next) {
  console.log("Getting UserID");
  let username_I = req.query.username;
  console.log("GETTING DATA");
  const query = `SELECT "UserID" from "UserIdent" where "Username" =  '${username_I}'`;
  console.log(query);
  db.any(query)
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved User ID"
      });
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

function createRating(req, res, next) {
  console.log("Creating Rating");
  let mealPlanID = req.body.data.planID;
  let userID = req.body.data.userID;
  let rating = req.body.data.rating;
  console.log("GETTING DATA");
  /*
INSERT INTO "UserRatings"
VALUES ('9','1','3')
ON CONFLICT ("MealPlanID", "UserID")
DO UPDATE SET ("MealPlanID", "UserID", "Rating") = ('9','1', '3');
*/
  const query = `INSERT INTO "UserRatings" VALUES ('${mealPlanID}', '${userID}','${rating}') ON CONFLICT ("MealPlanID", "UserID") DO UPDATE SET ("MealPlanID", "UserID", "Rating") = ('${mealPlanID}', '${userID}','${rating}');`;
  db.any(query)
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Created User rating"
      });
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

function getUserRating(req, res, next) {
  console.log("Getting UserID");
  let userID_I = req.query.userID;
  let planID_I = req.query.planID;
  console.log("GETTING DATA");
  const query = `SELECT "Rating" from "UserRatings" where "UserID" =  '${userID_I}' and "MealPlanID" = '${planID_I}'`;
  db.any(query)
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved User Rating"
      });
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

function getRating(req, res, next) {
  console.log("Getting UserID");
  let planID_I = req.query.planID;
  console.log("GETTING DATA");
  const query = `SELECT avg("Rating") from "UserRatings" where "MealPlanID" =  '${planID_I}'`;
  db.any(query)
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved User Rating"
      });
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

function updateRating(req, res, next) {
  console.log("Setting Custom Plan Name");
  const userID_I = req.body.data.userID;
  const planID_I = req.body.data.planID;
  const rating_I = req.body.data.rating;
  console.log("SETTING DATA");

  let query = `UPDATE "UserRatings" SET "Rating" = '${rating_I}' where "UserID" = '${userID_I}' and "MealPlanID" = '${planID_I}';`;
  db.none(query)
    .then(function() {
      res.status(200).json({
        status: "success",
        message: "Updated BodyData value"
      });
    })
    .catch(function(err) {
      console.log(err);
      return next(err);
    });
}

function getCustomPlansName(req, res, next) {
  console.log("Getting All Custom Plan Data with certain name");
  let name_I = req.query.name;
  console.log("GETTING DATA");
  const query = `SELECT json_agg(json_build_array("UserID", "CustomPlanID", "PlanName", "weekntr",json_build_array("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"))) from "CustomPlan" where "PlanName" ilike '%${name_I}%'`;
  db.any(query)
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved ALL plans with certain name"
      });
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

module.exports = {
  connectTest: connect,
  getAll: getAllUserWeek,
  get: getUserWeek,
  post: createUserWeek,
  testQ: test,

  createGoalData: createGoalData,
  createBodyData: createBodyData,
  createUserWeek: createUserWeek,
  createMealPlans: createMealPlans,
  createSavedRecipes: createSavedRecipes,
  createUserEntry: createUserEntry,

  getDay: getDay,
  getWeek: getWeek,
  setDay: setDay,
  addToDay: addToDay,

  getGoalData: getGoalData,
  setGoalData: setGoalData,

  addRecipeToFavourites: addRecipeToFavourites,
  setFavouriteRecipes: setFavouriteRecipes,
  getFavouriteRecipes: getFavouriteRecipes,

  addRecipeToOthers: addRecipeToOthers,
  setOtherRecipes: setOtherRecipes,
  getOtherRecipes: getOtherRecipes,

  addPlanToFavourites: addPlanToFavourites,
  setFavouritePlans: setFavouritePlans,
  getFavouritePlans: getFavouritePlans,

  addPlanToOthers: addPlanToOthers,
  setOtherPlans: setOtherPlans,
  getOtherPlans: getOtherPlans,

  setMyWeekNutri: setMyWeekNutri,
  getMyWeekNutri: getMyWeekNutri,

  setCustomPlanNutri: setCustomPlanNutri,
  getCustomPlanNutri: getCustomPlanNutri,

  getCustomPlan: getCustomPlan,
  getAllCustomPlans: getAllCustomPlans,
  searchMealPlan: searchMealPlan,
  createCustomPlan: createCustomPlan,
  setRating: setRating,

  addToPlan: addToPlan,
  removeFromPlan: removeFromPlan,
  setCustomPlanName: setCustomPlanName,

  setBodyData: setBodyData,
  getBodyData: getBodyData,

  getUserID: getUserID,
  createUserID: createUserID,

  createUser: createUser,

  getCustomPlansName: getCustomPlansName,
  getAllPlanNutri: getAllPlanNutri,

  getUserIDUserPass: getUserIDUserPass,
  createUserIDUserPass: createUserIDUserPass,
  getUserIDUsername: getUserIDUsername,

  createRating: createRating,
  getUserRating: getUserRating,
  getRating: getRating,
  updateRating: updateRating
};

/*
* CREATE TABLE UserRatings
(
    MealPlanID INT,
	UserID INT,
	Rating INT,
	CONSTRAINT pk_UserRatings_userID_mealPlanID PRIMARY KEY (MealPlanID, UserID)
);

INSERT INTO UserRatings
VALUES (1,2,3),(1,3,4),(2,2,3),(2,3,5);


INSERT INTO UserRatings
VALUES (1,3,5)
ON CONFLICT (MealPlanID, UserID)
DO UPDATE SET rating = '5' WHERE excluded.MealPlanID = '3' AND excluded.UserID = '1';


SELECT * FROM UserRatings; */
