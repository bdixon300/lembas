import { connect } from "react-redux";
import SearchBar from "../components/search/SearchBar";
import { setSearchFilter } from "../actions/search";
import { fetchSearchResults } from "../actions/search";
import { fetchMealPlanResults } from "../actions/search";
import { changeMainComponent } from "../actions/app";

const mapStateToProps = state => {
  return {
    filter: state.search.filter,
    goals: state.goals.goals
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSearchFilter: filter => dispatch(setSearchFilter(filter)),
    changeMainComponent: (comp) => dispatch(changeMainComponent(comp)),
    fetchSearchResults: (term, filter) => dispatch(fetchSearchResults(term, filter)),
    fetchMealPlanResults: (term, filter) => dispatch(fetchMealPlanResults(term, filter))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);