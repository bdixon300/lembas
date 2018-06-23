import React from "react";
import PropTypes from "prop-types";
import { MealPlanTabs, Days } from "../../actions/mealPlan";
import MealPlanNutrition from "./MealPlanNutrition";
import MealPlanDay from "./MealPlanDay";
import MealPlanIngredients from "./MealPlanIngredients";
import "./MyWeek.css";

function MealPlanTab(props) {
  const tab = props.tab;
  const recipes = props.recipes;
  switch(tab){
    case MealPlanTabs[0]:
      return <MealPlanNutrition
        recipes={recipes}
        goals={props.goals}
        nutrition={props.nutrition}
      />;
    case MealPlanTabs[1]:
      return <MealPlanIngredients
        recipes={recipes}
        type={props.type}
      />;
    default:
      return <MealPlanDay
        recipes={recipes[Days.indexOf(tab)]}
        removeMeal={meal => props.removeMeal(meal, tab)}
        type={props.type}
      />;
  }
}

MealPlanTab.propTypes = {
  tab: PropTypes.string.isRequired,
  recipes: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
  ).isRequired
};

export default MealPlanTab;
