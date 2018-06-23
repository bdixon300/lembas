import axios from "axios";

export const requestSavedRecipes = () => ({
  type: "REQUEST_SAVED_RECIPES"
});

export const receiveSavedRecipes = recipes => ({
  type: "RECEIVE_SAVED_RECIPES",
  recipes
});

export const failFetchSavedRecipes = () => ({
  type: "FAILURE_FETCH_SAVED_RECIPES"
});

export const addSavedRecipes = () => ({
  type: "ADD_SAVED_RECIPES"
});

export const successAddSavedRecipes = recipes => ({
  type: "SUCCESS_ADD_SAVED_RECIPES",
  recipes
});

export const failureAddSavedRecipes = () => ({
  type: "FAILURE_ADD_SAVED_RECIPES"
});

export const removeSavedRecipes = () => ({
  type: "REMOVE_SAVED_RECIPES"
});

export const successRemoveSavedRecipes = recipes => ({
  type: "SUCCESS_REMOVE_SAVED_RECIPES",
  recipes
});

export const failureRemoveSavedRecipes = () => ({
  type: "FAILURE_REMOVE_SAVED_RECIPES"
});

export function fetchSavedRecipes() {
  return function(dispatch, getStore) {
    dispatch(requestSavedRecipes());

    const userID = getStore().login.userID;
    return axios
      .get("/query/getFavouriteRecipes", { params: { userID: userID } })
      .then(response => {
        const uris = response.data.data[0].Favourites;
        const promises = uris.map(uri =>
          axios
            .get("/searchBar/URI", { params: { uri: uri } })
            .then(response => response.data[0])
            .catch(error => error)
        );

        return axios
          .all(promises)
          .then(response => {
            dispatch(receiveSavedRecipes(response));
          })
          .catch(error => dispatch(failFetchSavedRecipes()));
      })
      .catch(error => dispatch(failFetchSavedRecipes()));
  };
}

export function saveRecipe(recipe) {
  return function(dispatch, getStore) {
    let recipes = getStore().savedRecipes.recipes.slice();
    if (recipes.some(e => e.uri === recipe.uri)) {
      dispatch(failureAddSavedRecipes());
      return;
    }

    const userID = getStore().login.userID;
    dispatch(addSavedRecipes());
    recipes.push(recipe);
    return axios
      .post("/query/addRecipeToFavourites", {
        data: { userID: userID, meal: recipe.uri }
      })
      .then(response => dispatch(successAddSavedRecipes(recipes)))
      .catch(error => dispatch(failureAddSavedRecipes()));
  };
}

export function removeRecipe(recipe) {
  return function(dispatch, getStore) {
    dispatch(removeSavedRecipes());
    const recipes = getStore().savedRecipes.recipes.filter(
      e => e.uri !== recipe.uri
    );

    const userID = getStore().login.userID;
    return axios
      .post("/query/setFavouriteRecipes", {
        data: { userID: userID, meals: recipes.map(e => e.uri) }
      })
      .then(response => dispatch(successRemoveSavedRecipes(recipes)))
      .catch(error => dispatch(failureRemoveSavedRecipes()));
  };
}

export function fetchOtherRecipes(userID) {
  return function(dispatch) {
    dispatch(requestSavedRecipes());

    return axios
      .get("/query/getOtherRecipes", { params: { userID: userID } })
      .then(response => {
        const uris = response.data.data[0].Favourites;
        const promises = uris.map(uri =>
          axios
            .get("/searchBar/URI", { params: { uri: uri } })
            .then(response => response.data[0])
            .catch(error => error)
        );

        return axios
          .all(promises)
          .then(response => {
            dispatch(receiveSavedRecipes(response));
          })
          .catch(error => dispatch(failFetchSavedRecipes()));
      })
      .catch(error => dispatch(failFetchSavedRecipes()));
  };
}

export function saveOtherRecipe(userID, allRecipes, recipe) {
  return function(dispatch) {
    if (allRecipes.some(e => e.uri === recipe.uri)) {
      return;
    }

    dispatch(addSavedRecipes());
    return axios
      .post("/query/addRecipeToOthers", {
        data: { userID: userID, meal: recipe.uri }
      })
      .then(response => dispatch(successAddSavedRecipes(recipe)))
      .catch(error => dispatch(failureAddSavedRecipes()));
  };
}

export function removeOtherRecipe(userID, allRecipes, recipe) {
  return function(dispatch) {
    dispatch(removeSavedRecipes());
    const newFavourites = allRecipes
      .map(e => e.uri)
      .filter(u => u !== recipe.uri);
    axios
      .post("/query/setOtherRecipes", {
        data: { userID: userID, meals: newFavourites }
      })
      .then(response => dispatch(successRemoveSavedRecipes(newFavourites)))
      .catch(error => dispatch(failureRemoveSavedRecipes()));
  };
}
