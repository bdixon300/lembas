const search = (
  state = {
    results: [],
    mealPlanResults: [],
    isSearching: false,
    filter: []
  },
  action) => {
  switch (action.type) {
    case "REQUEST_SEARCH":
      return { ...state, results: [], isSearching: true };
    case "RECEIVE_SEARCH":
      return { ...state, results: action.results, isSearching: false };
    case "RECEIVE_MEAL_PLAN":
      return { ...state, mealPlanResults: action.mealPlanResults, isSearching: false };
    case "FAIL_SEARCH":
      return { ...state, results: [], isSearching: false };
    case "SET_SEARCH_FILTER":
      return { ...state, filter: action.filter};
    default: {
      return state;
    }
  }
};

export default search;
