import { EmptyNutrientWeek } from "../actions/goals";

const createMealPlan = (
  state = {
    recipes: [[], [], [], [], [], [], []],
    name: "",
    mealPlanID: -1,
    nutrition: EmptyNutrientWeek,
    isPosting: false
  },
  action
) => {
  switch (action.type) {
    case "SET_MEAL_PLAN_ID":
      return { ...state, mealPlanID: action.mealPlanID };
    case "EDIT_EXISTING_MEAL_PLAN":
      return {
        ...state,
        recipes: action.recipes,
        name: action.name,
        mealPlanID: action.mealPlanID,
        nutrition: action.nutrition,
        isPosting: false
      };
    case "ADD_CUSTOM":
      return { ...state, isPosting: true };
    case "SUCCESS_ADD_CUSTOM":
      return {
        ...state,
        recipes: action.recipes,
        nutrition: action.nutrition,
        isPosting: false
      };
    case "FAILURE_ADD_CUSTOM":
      return { ...state, isPosting: false };
    case "REMOVE_CUSTOM":
      return { ...state, isPosting: true };
    case "SUCCESS_REMOVE_CUSTOM":
      return {
        ...state,
        recipes: action.recipes,
        nutrition: action.nutrition,
        isPosting: false
      };
    case "FAILURE_REMOVE_CUSTOM":
      return { ...state, isPosting: false };
    case "CHANGE_NAME":
      return { ...state, isPosting: true };
    case "SUCCESS_CHANGE_NAME":
      return { ...state, isPosting: false };
    case "FAILURE_CHANGE_NAME":
      return { ...state, isPosting: false };
    case "MODIFY_NAME":
      return { ...state, name: action.name };
    default:
      return state;
  }
};

export default createMealPlan;
