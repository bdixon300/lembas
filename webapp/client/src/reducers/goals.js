import { AllNutrients, Settings } from "../actions/goals";

const goals = (
  state = {
    preset: "custom",
    goals: AllNutrients.map(ntr => ""),
    settings: Settings.map(setting => ""),
    isFetchingSettings: false,
    isPostingSettings: false,
    isFetchingGoals: false,
    isPostingGoals: false
  },
  action
) => {
  switch (action.type) {
    case "REQUEST_SETTINGS":
      return { ...state, isFetchingSettings: true };
    case "RECEIVE_SETTINGS":
      return { ...state, isFetchingSettings: false, settings: action.settings };
    case "FAILURE_FETCH_SETTINGS":
      return { ...state, isFetchingSettings: false };
    case "REQUEST_GOALS":
      return { ...state, isFetchingGoals: true };
    case "RECEIVE_GOALS":
      return {
        ...state,
        preset: action.preset,
        isFetchingGoals: false,
        goals: action.goals
      };
    case "FAILURE_FETCH_GOALS":
      return { ...state, isFetchingGoals: false };
    case "SAVE_SETTINGS":
      return { ...state, isPostingSettings: true };
    case "MODIFY_SETTINGS": {
      let newSettings = state.settings.slice();
      newSettings[Settings.indexOf(action.setting)] = action.value;
      return { ...state, settings: newSettings };
    }
    case "SUCCESS_SAVE_SETTINGS":
      return { ...state, isPostingSettings: false };
    case "FAILURE_SAVE_SETTINGS":
      return { ...state, isPostingSettings: false };
    case "SAVE_GOALS":
      return { ...state, isPostingGoals: true };
    case "MODIFY_GOALS": {
      let newGoals = state.goals.slice();
      newGoals[AllNutrients.indexOf(action.nutrient)] = action.value;
      return {
        ...state,
        preset: "custom",
        goals: newGoals
      };
    }
    case "SUCCESS_SAVE_GOALS":
      return { ...state, isPostingGoals: false };
    case "FAILURE_SAVE_GOALS":
      return { ...state, isPostingGoals: false };
    case "SAVE_PRESET":
      return { ...state, isPostingGoals: true };
    case "SUCCESS_SAVE_PRESET":
      return {
        ...state,
        goals: action.goals,
        preset: action.preset,
        isPostingGoals: false
      };
    case "SUCCESS_SAVE_CUSTOM_PRESET":
      return { ...state, isPostingGoals: false, preset: "custom" };
    case "FAILURE_SAVE_PRESET":
      return { ...state, isPostingGoals: false };
    default:
      return state;
  }
};

export default goals;
