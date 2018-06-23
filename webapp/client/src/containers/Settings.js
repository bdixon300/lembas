import { connect } from "react-redux";
import { login, login2, register } from "../actions/login";
import Settings from "../components/Settings";

const mapStateToProps = state => {
  return {
    userID: state.login.userID,
    username: state.login.username,
    password: state.login.password

  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: userID => dispatch(login(userID)),
    login2: (username, password) => dispatch(login2(username, password)),
    register: (username, password) => dispatch(register(username, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
