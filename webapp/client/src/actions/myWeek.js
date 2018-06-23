import axios from "axios";
import { AllNutrients } from "./goals";
import {
  Days,
  calculateNutritionAfterAddition,
  calculateNutritionAfterRemoval
} from "./mealPlan";

export const addMyWeek = () => ({
  type: "ADD_MY_WEEK"
});

export const successAddMyWeek = (mealPlan, nutrition) => ({
  type: "SUCCESS_ADD_MY_WEEK",
  mealPlan,
  nutrition
});

export const failureAddMyWeek = () => ({
  type: "FAILURE_ADD_MY_WEEK"
});

export const removeMyWeek = () => ({
  type: "REMOVE_MY_WEEK"
});

export const successRemoveMyWeek = (mealPlan, nutrition) => ({
  type: "SUCCESS_REMOVE_MY_WEEK",
  mealPlan,
  nutrition
});

export const failureRemoveMyWeek = () => ({
  type: "FAILURE_REMOVE_MY_WEEK"
});

export const requestMyWeek = () => ({
  type: "REQUEST_MY_WEEK"
});

export const receiveMyWeek = (mealPlan, nutrition) => ({
  type: "RECEIVE_MY_WEEK",
  mealPlan,
  nutrition
});

export const failFetchMyWeek = () => ({
  type: "FAILURE_FETCH_MY_WEEK"
});

export function fetchMyWeek() {
  return function(dispatch, getStore) {
    dispatch(requestMyWeek());
    const userID = getStore().login.userID;
    return axios
      .get("/query/getWeek", {
        params: { userID: userID }
      })
      .then(response => {
        const mealPlanURIs = response.data.data;
        const promises = mealPlanURIs.map(day =>
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
                .catch(error => dispatch(failFetchMyWeek()))
            )
          )
          .then(r => {
            const nutritionPromises = Days.map(day =>
              axios
                .get("/query/getMyWeekNutri", {
                  params: { userID: userID, day: day.toLowerCase() }
                })
                .then(response => response.data.data[0].json_build_array[0])
                .catch(error => dispatch(failFetchMyWeek()))
            );

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

            return axios
              .all(nutritionPromises)
              .then(response => {
                const nonNullResponse = response.map(
                  r => (r === null ? AllNutrients.map(ntr => 0) : r)
                );
                dispatch(receiveMyWeek(mealPlan, nonNullResponse));
              })
              .catch(error => dispatch(failFetchMyWeek));
          })
          .catch(error => dispatch(failFetchMyWeek()));
      })
      .catch(error => dispatch(failFetchMyWeek()));
  };
}

export function addMealMyWeek(recipe, day) {
  return function(dispatch, getStore) {
    dispatch(addMyWeek());

    const userID = getStore().login.userID;
    let newRecipes = getStore().myWeek.recipes.slice();
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
      getStore().myWeek.nutrition.slice()
    );

    return axios
      .post("/query/addToDay", {
        data: { userID: userID, day: day, meal: recipe.uri }
      })
      .then(response =>
        axios
          .post("/query/setMyWeekNutri", {
            data: {
              userID: userID,
              day: day.toLowerCase(),
              nutri: nutritionAfterAddition[idx]
            }
          })
          .then(response =>
            dispatch(successAddMyWeek(newRecipes, nutritionAfterAddition))
          )
          .catch(error => dispatch(failureAddMyWeek()))
      )
      .catch(error => dispatch(failureAddMyWeek()));
  };
}

export function removeMealMyWeek(meal, day) {
  return function(dispatch, getStore) {
    dispatch(removeMyWeek());

    const userID = getStore().login.userID;
    const idx = Days.indexOf(day);
    let newRecipes = getStore().myWeek.recipes.slice();
    newRecipes[idx] = newRecipes[idx].filter(e => e.key !== meal.key);
    const nutritionAfterRemoval = calculateNutritionAfterRemoval(
      meal.recipe,
      day,
      getStore().myWeek.nutrition.slice()
    );

    const newDay = newRecipes[idx].map(meal => meal.recipe.uri);

    return axios
      .post("/query/setDay", {
        data: { userID: userID, day: day, data: newDay }
      })
      .then(response =>
        axios
          .post("/query/setMyWeekNutri", {
            data: {
              userID: userID,
              day: day.toLowerCase(),
              nutri: nutritionAfterRemoval[idx]
            }
          })
          .then(response =>
            dispatch(successRemoveMyWeek(newRecipes, nutritionAfterRemoval))
          )
          .catch(error => dispatch(failureRemoveMyWeek()))
      )
      .catch(error => dispatch(failureRemoveMyWeek()));
  };
}
