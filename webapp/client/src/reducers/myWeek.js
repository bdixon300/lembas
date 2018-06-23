import { EmptyNutrientWeek } from "../actions/goals";

const myWeek = (
  state = {
    recipes: [[], [], [], [], [], [], []],
    nutrition: EmptyNutrientWeek,
    isFetching: false,
    isPosting: false
  },
  action
) => {
  switch (action.type) {
    case "ADD_MY_WEEK":
    /* falls through */
    case "REMOVE_MY_WEEK":
      return { ...state, isPosting: true };
    case "FAILURE_ADD_MY_WEEK":
    /* falls through */
    case "FAILURE_REMOVE_MY_WEEK":
      return { ...state, isPosting: false };
    case "SUCCESS_ADD_MY_WEEK":
    /* falls through */
    case "SUCCESS_REMOVE_MY_WEEK":
      return {
        ...state,
        isPosting: false,
        recipes: action.mealPlan,
        nutrition: action.nutrition
      };
    case "REQUEST_MY_WEEK":
      return { ...state, isFetching: true };
    case "RECEIVE_MY_WEEK":
      return {
        ...state,
        isFetching: false,
        recipes: action.mealPlan,
        nutrition: action.nutrition
      };
    case "FAILURE_FETCH_MY_WEEK":
      return { ...state, isFetching: false };
    default:
      return state;
  }
};

export default myWeek;
