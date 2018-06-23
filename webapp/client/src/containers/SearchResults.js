import { connect } from "react-redux";
import { saveRecipe } from "../actions/savedRecipes";
import SearchResults from "../components/search/SearchResults";

const mapStateToProps = state => {
  return {
    searchResults: state.search.results
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveRecipe: recipe => dispatch(saveRecipe(recipe))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults);
