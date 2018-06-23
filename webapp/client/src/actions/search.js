import axios from "axios";

export const requestSearch = () => ({
  type: "REQUEST_SEARCH"
});

export const receiveSearch = results => ({
  type: "RECEIVE_SEARCH",
  results
});

export const receiveMealPlan = mealPlanResults => ({
  type: "RECEIVE_MEAL_PLAN",
  mealPlanResults
});

export const failSearch = () => ({
  type: "FAIL_SEARCH"
});

export function fetchSearchResults(term, filter) {
  return function(dispatch) {
    dispatch(requestSearch());
    return axios
      .get("/searchBar", {
        params: {
          term: term,
          filter: filter
        }})
      .then(response => dispatch(receiveSearch(response.data)))
      .catch(error => dispatch(failSearch()));
  };
}

export function fetchMealPlanResults(term, filter) {
  return function(dispatch) {
    dispatch(requestSearch());
    return axios
      .get("/query/getSearchMealPlan", {
        params: {
          term: term,
          filter: filter
        }})
      .then(response => dispatch(receiveMealPlan(response.data)))
      .catch(error => dispatch(failSearch()));
  };
}


export const setSearchFilter = (filter) => ({
  type: "SET_SEARCH_FILTER",
  filter,
});

