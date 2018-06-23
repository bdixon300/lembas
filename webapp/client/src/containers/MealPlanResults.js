import { connect } from "react-redux";
import MealPlanResults from "../components/search/MealPlanResults";
import { setAsMyWeek } from "../actions/savedMealPlans";
import { saveMealPlan } from "../actions/savedMealPlans";

const mapStateToProps = state => {
  return {
    userID: state.login.userID,
    mealPlanResults: state.search.mealPlanResults,
    goals: state.goals.goals
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveMealPlan: mealPlan => dispatch(saveMealPlan(mealPlan)),
    setAsMyWeek: (mealPlans) => dispatch(setAsMyWeek(mealPlans))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MealPlanResults);