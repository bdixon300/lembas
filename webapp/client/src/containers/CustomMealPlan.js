import { connect } from "react-redux";
import { setAsMyWeek } from "../actions/mealPlan";
import MealPlan from "../components/myWeek/MealPlan";

const mapStateToProps = state => {
  return {
    name: state.customMealPlan.name,
    recipes: state.customMealPlan.recipes,
    goals: state.goals.goals.map(g => parseFloat(g)),
    nutrition: state.customMealPlan.nutrition,
    parentComponent: "Custom Meal Plan"
  };
};

const mapDispatchToProps = dispatch => ({
  setAsMyWeek: rs => dispatch(setAsMyWeek())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MealPlan);
