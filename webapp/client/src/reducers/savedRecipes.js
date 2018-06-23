const savedRecipes = (
  state = {
    recipes: [],
    isFetching: false,
    isPosting: false
  },
  action
) => {
  switch (action.type) {
    case "REQUEST_SAVED_RECIPES":
      return { ...state, isFetching: true };
    case "RECEIVE_SAVED_RECIPES":
      return { ...state, isFetching: false, recipes: action.recipes };
    case "FAILURE_FETCH_SAVED_RECIPES":
      return { ...state, isFetching: false };
    case "REMOVE_SAVED_RECIPES":
    /* falls through */
    case "ADD_SAVED_RECIPES":
      return { ...state, isPosting: true };
    case "SUCCESS_REMOVE_SAVED_RECIPES":
    /* falls through */
    case "SUCCESS_ADD_SAVED_RECIPES":
      return { ...state, recipes: action.recipes, isPosting: false };
    case "FAILURE_REMOVE_SAVED_RECIPES":
    /* falls through */
    case "FAILURE_ADD_SAVED_RECIPES":
      return { ...state, isPosting: false };
    default:
      return state;
  }
};

export default savedRecipes;
