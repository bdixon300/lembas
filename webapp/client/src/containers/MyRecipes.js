import { connect } from "react-redux";
import SavedRecipes from "../components/SavedRecipes";
import { removeRecipe } from "../actions/savedRecipes";

const mapStateToProps = state => {
  return {
    recipes: state.savedRecipes.recipes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeMeal: recipe => dispatch(removeRecipe(recipe))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SavedRecipes);
