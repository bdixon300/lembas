import axios from "axios";
import { fetchMyWeek } from "./myWeek";
import { AllNutrients, edamamNutrientToDatabaseNutrient } from "./goals";

/* BEGIN AUXILARY DATA */

export const MealPlanTabs = [
  "Nutrition",
  "Ingredients",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

export const Days = MealPlanTabs.slice(2);

/* Sums the matrix vertically, i.e. all entries with same index. */
function verticallySumMatrix(a, b) {
  return a.map((v, i) => v + b[i]);
}

function verticallySubtractMatrix(a, b) {
  return a.map((v, i) => v - b[i]);
}

function getNutrientInformation(recipe) {
  //const recipe = meal.recipe;
  const people = recipe.yield;
  const totalNutrients = recipe.totalNutrients;
  const nutrientsPerPerson = AllNutrients.map(ntr => 0);
  Object.entries(totalNutrients).forEach(([_, ntrObj]) => {
    const label = edamamNutrientToDatabaseNutrient(ntrObj.label);
    const quantityPerPerson = ntrObj.quantity / people;
    nutrientsPerPerson[AllNutrients.indexOf(label)] = Math.floor(
      quantityPerPerson * 100
    );
  });
  return nutrientsPerPerson;
}

export function calculateNutritionAfterAddition(recipe, day, nutrition) {
  const idx = Days.indexOf(day);
  const ntrInfo = getNutrientInformation(recipe);
  nutrition[idx] = verticallySumMatrix(ntrInfo, nutrition[idx]);
  return nutrition;
}

export function calculateNutritionAfterRemoval(recipe, day, nutrition) {
  const idx = Days.indexOf(day);
  const ntrInfo = getNutrientInformation(recipe);
  nutrition[idx] = verticallySubtractMatrix(nutrition[idx], ntrInfo);
  return nutrition;
}

/* END AUXILARY DATA */

export const receiveMealPlan = (creatorID, name, mealPlan, nutrition) => ({
  type: "RECEIVE_MEAL_PLAN",
  creatorID,
  name,
  mealPlan,
  nutrition
});

export const failLoadMealPlan = () => ({
  type: "FAIL_LOAD_MEAL_PLAN"
});

export function loadMealPlan(creatorID, name, uris, nutrition) {
  return function(dispatch) {
    console.log("TODO: loadMealPlan - Nutrition");
    const promises = uris.map(day =>
      day.map(uri =>
        axios
          .get("/searchBar/URI", { params: { uri: uri } })
          .then(response => response.data[0])
          .catch(error => error)
      )
    );

    return axios
      .all(
        promises.map(promisesDay =>
          axios
            .all(promisesDay)
            .then(r => r)
            .catch(error => dispatch(failLoadMealPlan()))
        )
      )
      .then(r => {
        const mealPlan = r.map(day => {
          let mealDay = [];
          const keyNotUnique = key => mealDay.some(e => e.key === key);
          day.forEach(recipe => {
            let key = recipe.uri;
            while (keyNotUnique(key)) {
              key += "_";
            }
            mealDay.push({ recipe: recipe, key: key });
          });
          return mealDay;
        });
        dispatch(receiveMealPlan(creatorID, name, mealPlan, nutrition));
      })
      .catch(error => dispatch(failLoadMealPlan()));
  };
}

export function setAsMyWeek() {
  return function(dispatch, getStore) {
    const userID = getStore().login.userID;
    const uris = getStore().customMealPlan.recipes.map(day =>
      day.map(({ recipe, key }) => recipe.uri)
    );
    const promises = uris.map((meals, idx) =>
      axios
        .post("/query/setDay", {
          data: { userID: userID, day: Days[idx], data: meals }
        })
        .then(response => response)
        .catch(error => console.error(error))
    );

    const promisesNutrition = getStore().customMealPlan.nutrition.map(
      (day, idx) =>
        axios
          .post("/query/setMyWeekNutri", {
            data: { userID: userID, day: Days[idx].toLowerCase(), nutri: day }
          })
          .then(response => response)
          .catch(error => console.error(error))
    );

    return axios
      .all(promises.concat(promisesNutrition))
      .then(response => dispatch(fetchMyWeek()))
      .catch(error => console.error(error));
  };
}