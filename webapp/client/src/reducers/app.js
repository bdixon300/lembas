const app = (state = { component: "My Week" }, action) => {
  switch (action.type) {
    case "CHANGE_MAIN_COMPONENT":
      return { ...state, component: action.component };
    default:
      return state;
  }
};

export default app;
