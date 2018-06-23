import { connect } from "react-redux";
import { addMealMyWeek } from "../actions/myWeek";
import AddToButton from "../components/AddToButton";

const mapStateToProps = state => {
  return {
    label: "Add to My Week"
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addMeal: day => dispatch(addMealMyWeek(ownProps.recipe, day))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddToButton);
