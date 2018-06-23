const login = (
  state = {
    userID: 1
  },
  action
) => {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, userID: action.userID };
    default:
      return state;
  }
};

const login2 = (
  state = {
    userID: 1
    // username: "",
    // password: ""
  },
  action
) => {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, userID: action.userID };
    default:
      return state;
  }
};

export default login;
