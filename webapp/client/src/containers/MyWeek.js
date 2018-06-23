import { connect } from "react-redux";
import { addMealMyWeek, removeMealMyWeek } from "../actions/myWeek";
import MealPlan from "../components/myWeek/MealPlan";

const mapStateToProps = state => {
  return {
    name: "My Week",
    recipes: state.myWeek.recipes,
    goals: state.goals.goals.map(g => parseFloat(g)),
    parentComponent: "My Week",
    nutrition: state.myWeek.nutrition,
    isFetching: state.myWeek.isFetching,
    isPosting: state.myWeek.isPosting
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addMeal: (recipe, day) => dispatch(addMealMyWeek(recipe, day)),
    removeMeal: (meal, day) => dispatch(removeMealMyWeek(meal, day))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MealPlan);
