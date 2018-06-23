import { connect } from "react-redux";
import SavedMealPlans from "../components/SavedMealPlans";
import {
  removeMealPlan,
  saveMealPlanRating,
  showMealPlan,
  setAsMyWeek
} from "../actions/savedMealPlans";
import { editMealPlan } from "../actions/createMealPlan";

const mapStateToProps = state => {
  return {
    userID: state.login.userID,
    mealPlans: state.savedMealPlans.mealPlans,
    goals: state.goals.goals.map(x => parseFloat(x))
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeMealPlan: mealPlan => dispatch(removeMealPlan(mealPlan)),
    showMealPlan: mealPlan => dispatch(showMealPlan(mealPlan)),
    saveMealPlanRating: mealPlan => dispatch(saveMealPlanRating(mealPlan)),
    setAsMyWeek: mealPlans => dispatch(setAsMyWeek(mealPlans)),
    editMealPlan: (mealPlanID, name, uris, nutrition) =>
      dispatch(
        editMealPlan(mealPlanID, name, uris, nutrition, "Create Meal Plan")
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SavedMealPlans);
