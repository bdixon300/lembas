import { connect } from "react-redux";
import {
  modifySettings,
  modifyGoals,
  changePreset,
  postGoal,
  postSetting
} from "../actions/goals";
import UserGoals from "../components/goals/UserGoals";

const mapStateToProps = state => {
  return {
    goals: state.goals.goals,
    settings: state.goals.settings,
    preset: state.goals.preset,
    isFetchingSettings: state.goals.isFetchingSettings,
    isPostingSettings: state.goals.isPostingSettings,
    isFetchingGoals: state.goals.isFetchingGoals,
    isPostingGoals: state.goals.isPostingGoals
  };
};

const mapDispatchToProps = dispatch => {
  return {
    modifySetting: (setting, value) => dispatch(modifySettings(setting, value)),
    modifyGoal: (nutrient, value) => dispatch(modifyGoals(nutrient, value)),
    changePreset: preset => dispatch(changePreset(preset)),
    saveGoal: (nutrient, value) => dispatch(postGoal(nutrient, value)),
    saveSetting: (setting, value) => dispatch(postSetting(setting, value))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserGoals);
