import axios from "axios";
import { fetchSavedMealPlans } from "./savedMealPlans";
import {
  Days,
  calculateNutritionAfterAddition,
  calculateNutritionAfterRemoval
} from "./mealPlan";
import { changeMainComponent } from "./app";

export const editExistingMealPlan = (mealPlanID, name, recipes, nutrition) => ({
  type: "EDIT_EXISTING_MEAL_PLAN",
  mealPlanID,
  name,
  recipes,
  nutrition
});

export function editMealPlan(mealPlanID, name, uris, nutrition, component) {
  return function(dispatch) {
    const promises = uris.map(day =>
      day.map(uri =>
        axios
          .get("/searchBar/URI", {
            params: { uri: uri }
          })
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
            .catch(error => console.error(error))
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

        dispatch(changeMainComponent(component));
        return dispatch(
          editExistingMealPlan(mealPlanID, name, mealPlan, nutrition)
        );
      });
  };
}

export const addCustom = () => ({
  type: "ADD_CUSTOM"
});

export const successAddCustom = (recipes, nutrition) => ({
  type: "SUCCESS_ADD_CUSTOM",
  recipes,
  nutrition
});

export const failureAddCustom = () => ({
  type: "FAILURE_ADD_CUSTOM"
});

export const removeCustom = () => ({
  type: "REMOVE_CUSTOM"
});

export const successRemoveCustom = (recipes, nutrition) => ({
  type: "SUCCESS_REMOVE_CUSTOM",
  recipes,
  nutrition
});

export const failureRemoveCustom = (recipes, nutrition) => ({
  type: "FAILURE_REMOVE_CUSTOM",
  recipes,
  nutrition
});

export const modifyName = name => ({
  type: "MODIFY_NAME",
  name
});

export const changeName = () => ({
  type: "CHANGE_NAME"
});

export const successChangeName = () => ({
  type: "SUCCESS_CHANGE_NAME"
});

export const failureChangeName = () => ({
  type: "FAILURE_CHANGE_NAME"
});

export const setMealPlanID = mealPlanID => ({
  type: "SET_MEAL_PLAN_ID",
  mealPlanID
});

function verticallySumMatrix(a, b) {
  return a.map((v, i) => v + b[i]);
}

function calculateAverageNutrientsPerDay(nutrientsPerDay) {
  return nutrientsPerDay
    .reduce((a, b) => verticallySumMatrix(a, b))
    .map(ntr => Math.floor(ntr / Days.length));
}

export function postNameCustom() {
  return function(dispatch, getStore) {
    const mealPlanID = getStore().createMealPlan.mealPlanID;
    const name = getStore().createMealPlan.name;
    if (mealPlanID === -1) {
      return;
    }

    dispatch(changeName());
    return axios
      .post("/query/setCustomPlanName", {
        data: {
          planID: mealPlanID,
          name: name
        }
      })
      .then(response => {
        dispatch(successChangeName());
        dispatch(fetchSavedMealPlans());
      })
      .catch(error => failureChangeName());
  };
}

export function addMealCustom(recipe, day) {
  return function(dispatch, getStore) {
    dispatch(addCustom());
    const userID = getStore().login.userID;
    let newRecipes = getStore().createMealPlan.recipes.slice();
    const idx = Days.indexOf(day);
    let key = recipe.uri;
    const keyNotUnique = key => newRecipes[idx].some(e => e.key === key);
    while (keyNotUnique(key)) {
      key += "_";
    }
    newRecipes[idx].push({ recipe: recipe, key: key });

    const nutritionAfterAddition = calculateNutritionAfterAddition(
      recipe,
      day,
      getStore().createMealPlan.nutrition.slice()
    );

    const nutritionWeek = calculateAverageNutrientsPerDay(
      nutritionAfterAddition
    );

    const mealPlanID = getStore().createMealPlan.mealPlanID;
    if (mealPlanID === -1) {
      return axios
        .get("/query/createCustomPlan", {
          params: {
            userID: userID,
            day: day,
            recipe: recipe.uri,
            daynutri: nutritionAfterAddition[idx],
            weeknutri: nutritionWeek
          }
        })
        .then(response => {
          const id = response.data.data[0].CustomPlanID;
          return axios
            .post("/query/addPlanToFavourites", {
              data: {
                userID: userID,
                plan: id
              }
            })
            .then(r => {
              dispatch(setMealPlanID(id));
              dispatch(fetchSavedMealPlans());
              dispatch(successAddCustom(newRecipes, nutritionAfterAddition));
            })
            .catch(error => dispatch(failureAddCustom()));
        })
        .catch(error => dispatch(failureAddCustom()));
    } else {
      return axios
        .post("/query/addToPlan", {
          data: {
            planID: mealPlanID,
            day: day,
            recipe: recipe.uri,
            daynutri: nutritionAfterAddition[idx],
            weeknutri: nutritionWeek
          }
        })
        .then(response => {
          dispatch(successAddCustom(newRecipes, nutritionAfterAddition));
          dispatch(fetchSavedMealPlans());
        })
        .catch(error => dispatch(failureAddCustom()));
    }
  };
}

export function removeMealCustom(meal, day) {
  return function(dispatch, getStore) {
    dispatch(removeCustom());
    const idx = Days.indexOf(day);
    let newRecipes = getStore().createMealPlan.recipes.slice();
    newRecipes[idx] = newRecipes[idx].filter(e => e.key !== meal.key);
    const nutritionAfterRemoval = calculateNutritionAfterRemoval(
      meal.recipe,
      day,
      getStore().createMealPlan.nutrition.slice()
    );

    const nutritionWeek = calculateAverageNutrientsPerDay(
      nutritionAfterRemoval
    );
    const mealPlanID = getStore().createMealPlan.mealPlanID;
    return axios
      .post("/query/removeFromPlan", {
        data: {
          planID: mealPlanID,
          day: day,
          recipe: meal.recipe.uri,
          daynutri: nutritionAfterRemoval[idx],
          weeknutri: nutritionWeek
        }
      })
      .then(response => {
        dispatch(successRemoveCustom(newRecipes, nutritionAfterRemoval));
        dispatch(fetchSavedMealPlans());
      })
      .catch(error => failureRemoveCustom());
  };
}
