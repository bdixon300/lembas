import { connect } from "react-redux";
import {
  addMealCustom,
  removeMealCustom,
  modifyName,
  postNameCustom
} from "../actions/createMealPlan";
import MealPlan from "../components/myWeek/MealPlan";

const mapStateToProps = state => {
  return {
    name: state.createMealPlan.name,
    recipes: state.createMealPlan.recipes,
    goals: state.goals.goals.map(g => parseFloat(g)),
    parentComponent: "Create Meal Plan",
    nutrition: state.createMealPlan.nutrition,
    isPosting: state.createMealPlan.isPosting
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addMeal: (recipe, day) => dispatch(addMealCustom(recipe, day)),
    removeMeal: (meal, day) => dispatch(removeMealCustom(meal, day)),
    modifyName: name => dispatch(modifyName(name)),
    postName: () => dispatch(postNameCustom())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MealPlan);
