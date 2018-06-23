const savedMealPlans = (
  state = {
    mealPlans: [],
    isFetching: false,
    isPosting: false
  },
  action
) => {
  switch (action.type) {
    case "REQUEST_SAVED_MEAL_PLANS":
      return { ...state, isFetching: true };
    case "RECEIVE_SAVED_MEAL_PLANS":
      return { ...state, mealPlans: action.mealPlans, isFetching: false };
    case "FAILURE_FETCH_SAVED_MEAL_PLANS":
      return { ...state, isFetching: false };
    case "REMOVE_SAVED_MEAL_PLANS":
    /* falls through */
    case "ADD_SAVED_MEAL_PLANS":
      return { ...state, isPosting: true };
    case "ADD_RATING_MEAL_PLANS":
      return { ...state, isPosting: true };
    case "SUCCESS_REMOVE_SAVED_MEAL_PLANS":
    /* falls through */
    case "SUCCESS_ADD_SAVED_MEAL_PLANS":
      return { ...state, mealPlans: action.mealPlans, isPosting: false };
    case "SUCCESS_ADD_RATING_MEAL_PLANS":
      return { ...state, mealPlans: action.mealPlans, isPosting: false };
    case "FAILURE_REMOVE_SAVED_MEAL_PLANS":
    /* falls through */
    case "FAILURE_ADD_SAVED_MEAL_PLANS":
      return { ...state, isPosting: false };
    case "FAILURE_ADD_RATING_MEAL_PLANS":
      return { ...state, isPosting: false };
    default:
      return state;
  }
};

export default savedMealPlans;
