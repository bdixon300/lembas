import { Days, loadMealPlan } from "./mealPlan";
import { changeMainComponent } from "./app";
import axios from "axios";
import { fetchMyWeek } from "./myWeek";

export const requestSavedMealPlans = () => ({
  type: "REQUEST_SAVED_MEAL_PLANS"
});

export const receiveSavedMealPlans = mealPlans => ({
  type: "RECEIVE_SAVED_MEAL_PLANS",
  mealPlans
});

export const failFetchSavedMealPlans = () => ({
  type: "FAILURE_FETCH_SAVED_MEAL_PLANS"
});

export const addSavedMealPlans = () => ({
  type: "ADD_SAVED_MEAL_PLANS"
});

export const successAddSavedMealPlans = mealPlans => ({
  type: "SUCCESS_ADD_SAVED_MEAL_PLANS",
  mealPlans
});

export const failureAddSavedMealPlans = () => ({
  type: "FAILURE_ADD_SAVED_MEAL_PLANS"
});

export const addRatingMealPlans = () => ({
  type: "ADD_RATING_MEAL_PLANS"
});

export const successAddRatingMealPlans = mealPlans => ({
  type: "SUCCESS_ADD_RATING_MEAL_PLANS",
  mealPlans
});


export const failureAddRatingMealPlans = () => ({
  type: "FAILURE_ADD_RATING_MEAL_PLANS"
});

export const removeSavedMealPlans = () => ({
  type: "REMOVE_SAVED_MEAL_PLANS"
});

export const successRemoveSavedMealPlans = mealPlans => ({
  type: "SUCCESS_REMOVE_SAVED_MEAL_PLANS",
  mealPlans
});

export const failureRemoveSavedMealPlans = () => ({
  type: "FAILURE_REMOVE_SAVED_MEAL_PLANS"
});

export function fetchSavedMealPlans() {
  return function(dispatch, getStore) {
    dispatch(requestSavedMealPlans());
    const userID = getStore().login.userID;
    return axios
      .get("/query/getFavouritePlans", {
        params: {
          userID: userID
        }
      })
      .then(response => {
        const planIDArray = response.data.data;
        const promises = planIDArray.map(planID =>
          axios
            .get("/query/getCustomPlan", {
              params: {
                planID: planID
              }
            })
            .then(response => response.data.data)
            .catch(error => dispatch(failFetchSavedMealPlans()))
        );

        return axios
          .all(promises)
          .then(response => {
            let results = [];
            response.forEach(elem => {
              const mealplan = elem[0].json_build_array;
              results.push({
                userID: mealplan[0],
                mealPlanID: mealplan[1],
                name: mealplan[2],
                nutritionDays: mealplan[3],
                nutrition: mealplan[4],
                meals: mealplan[5],
                rating: (mealplan[6] === null) ? 0 : mealplan[6]
              });
            });
            return dispatch(receiveSavedMealPlans(results));
          })
          .catch(error => dispatch(failFetchSavedMealPlans()));
      })
      .catch(error => dispatch(failFetchSavedMealPlans()));
  };
}

export function setAsMyWeek(mealPlans) {
  return function(dispatch, getStore) {
    const userID = getStore().login.userID;
    const mealsArray = mealPlans.meals;
    const promises = mealsArray.map((meals, idx) =>
      axios
        .post("/query/setDay", {
          data: { userID: userID, day: Days[idx], data: meals }
        })
        .then(response => response)
        .catch(error => console.error(error))
    );

    const nutritionData = mealPlans.nutritionDays;
    console.log(nutritionData);
    const promisesNutrition = nutritionData.map((day, idx) => {
      console.log(Days[idx]);
      return axios
        .post("/query/setMyWeekNutri", {
          data: { userID: userID, day: Days[idx].toLowerCase(), nutri: day }
        })
        .then(response => response)
        .catch(error => console.error(error));
    });

    return axios
      .all(promises.concat(promisesNutrition))
      .then(response => dispatch(fetchMyWeek()))
      .catch(error => console.error(error));
  };
}

export function showMealPlan(mealPlan) {
  return function(dispatch) {
    dispatch(
      loadMealPlan(
        mealPlan.creatorID,
        mealPlan.name,
        mealPlan.meals,
        mealPlan.nutrition
      )
    );
    dispatch(changeMainComponent("Custom Meal Plan"));
  };
}

export function saveMealPlan(mealPlan) {
  return function(dispatch, getStore) {
    dispatch(addSavedMealPlans());
    const userID = getStore().login.userID;
    const planID = mealPlan.mealPlanID;
    let mealPlans = getStore().savedMealPlans.mealPlans.slice();
    if (mealPlans.some(e => e.mealPlanID === mealPlan.mealPlanID)) {
      dispatch(failureAddSavedMealPlans);
      return;
    }
    axios
      .post("/query/addPlanToFavourites", {
        data: { userID: userID, plan: planID }
      })
      .then(response => response)
      .catch(error => console.error(error));

    mealPlans.push(mealPlan);
    dispatch(successAddSavedMealPlans(mealPlans));
  };
}

export function removeMealPlan(mealPlan) {
  return function(dispatch, getStore) {
    dispatch(removeSavedMealPlans());
    const userID = getStore().login.userID;

    const mealPlans = getStore().savedMealPlans.mealPlans.filter(
      e => e.mealPlanID !== mealPlan.mealPlanID
    );

    const plansArray = mealPlans.map(elem => elem.mealPlanID);
    axios
      .post("/query/setFavouritePlans", {
        data: { userID: userID, plans: plansArray }
      })
      .then(response => response)
      .catch(error => console.error(error));

    dispatch(successRemoveSavedMealPlans(mealPlans));
  };
}

export function saveMealPlanRating(mealPlan) {
  return function(dispatch, getStore) {
    dispatch(addRatingMealPlans());
    const userID = getStore().login.userID;
    const planID = mealPlan.mealPlanID;

    const mealPlans = getStore().savedMealPlans.mealPlans.filter(
      e => e.mealPlanID !== mealPlan.mealPlanID
    );

    mealPlans.push(mealPlan);

    axios
      .post("/query/createRating", {
        data: { userID: userID, planID: planID, rating: mealPlan.rating }
      })
      .then(response => response)
      .catch(error => console.error(error));

     dispatch(successAddRatingMealPlans(mealPlans));
  };
}
