import { connect } from "react-redux";
import { addMealCustom } from "../actions/createMealPlan";
import AddToButton from "../components/AddToButton";

const mapStateToProps = state => {
  return {
    label: "Add to Custom"
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addMeal: day => dispatch(addMealCustom(ownProps.recipe, day))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddToButton);
