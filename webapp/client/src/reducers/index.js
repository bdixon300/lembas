import { combineReducers } from "redux";
import myWeek from "./myWeek";
import app from "./app";
import search from "./search";
import goals from "./goals";
import customMealPlan from "./customMealPlan";
import savedRecipes from "./savedRecipes";
import savedMealPlans from "./savedMealPlans";
import createMealPlan from "./createMealPlan";
import login from "./login";

export default combineReducers({
  app,
  myWeek,
  search,
  goals,
  customMealPlan,
  savedRecipes,
  savedMealPlans,
  createMealPlan,
  login
});
