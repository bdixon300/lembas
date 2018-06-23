import { connect } from "react-redux";
import {} from "../actions/app";
import MainApp from "../components/mainApp/MainApp";

const mapStateToProps = state => {
  return {
    mainComponent: state.app.component,
    searchResults: state.search.results
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainApp);
