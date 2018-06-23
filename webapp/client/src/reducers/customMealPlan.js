import { EmptyNutrientWeek } from "../actions/goals";

const customMealPlan = (
  state = {
    recipes: [[], [], [], [], [], [], []],
    nutrition: EmptyNutrientWeek,
    creatorID: -1,
    name: ""
  },
  action
) => {
  switch (action.type) {
    case "RECEIVE_MEAL_PLAN":
      return {
        ...state,
        recipes: action.mealPlan,
        nutrition: action.nutrition,
        creatorID: action.creatorID,
        name: action.name
      };
    default:
      return state;
  }
};

export default customMealPlan;
