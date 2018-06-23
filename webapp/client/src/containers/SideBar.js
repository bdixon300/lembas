import { connect } from "react-redux";
import { changeMainComponent } from "../actions/app";
import SideBarNav from "../components/SideBarNav";

const mapStateToProps = state => {
  return {
    selected: state.app.component
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changePage: page => dispatch(changeMainComponent(page))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBarNav);
