import axios from "axios";

/* BEGIN AUXILLARY DATA */

export const AllNutrients = [
  "Calcium",
  "Carbs",
  "Cholesterol",
  "Monounsaturated Fats",
  "Polyunsaturated Fats",
  "Saturated Fats",
  "Fat",
  "Trans Fats",
  "Iron",
  "Fibre",
  "Folate",
  "Potassium",
  "Magnesium",
  "Sodium",
  "Energy",
  "Niacin (B3)",
  "Phosphorus",
  "Protein",
  "Riboflavin (B2)",
  "Sugars",
  "Thiamin (B1)",
  "Vitamin E",
  "Vitamin A",
  "Vitamin B12",
  "Vitamin B6",
  "Vitamin C",
  "Vitamin D",
  "Vitamin K"
];

export const NutrientGroups = [
  "Minerals",
  "Vitamins",
  "Carbs",
  "Protein",
  "Sugar",
  "Fats",
  "Fibre"
];

export const EmptyNutrientWeek = [
  AllNutrients.map(ntr => 0),
  AllNutrients.map(ntr => 0),
  AllNutrients.map(ntr => 0),
  AllNutrients.map(ntr => 0),
  AllNutrients.map(ntr => 0),
  AllNutrients.map(ntr => 0),
  AllNutrients.map(ntr => 0)
];

export const DefaultNutrients = [
  "Calcium",
  "Carbs",
  "Fat",
  "Fibre",
  "Sodium",
  "Energy",
  "Protein",
  "Sugars"
];

export const EmptyNutrients = [];

export function getNutrientUnit(nutrient) {
  switch (nutrient) {
    case "Energy":
      return "kcal";
    case "Carbs":
    case "Monounsaturated Fats":
    case "Polyunsaturated Fats":
    case "Saturated Fats":
    case "Fat":
    case "Trans Fats":
    case "Fibre":
    case "Protein":
    /* falls through */
    case "Sugars":
      return "g";
    case "Folate":
    case "Vitamin A":
    case "Vitamin B12":
    case "Vitamin D":
    /* falls through */
    case "Vitamin K":
      return "µg";
    default:
      return "mg";
  }
}

export function edamamNutrientToDatabaseNutrient(nutrient) {
  switch (nutrient) {
    case "Saturated":
      return "Saturated Fats";
    case "Trans":
      return "Trans Fats";
    case "Monounsaturated":
      return "Monounsaturated Fats";
    case "Polyunsaturated":
      return "Polyunsaturated Fats";
    case "Fiber":
      return "Fibre";
    case "Folate equivalent (total)":
    /* falls through */
    case "Folate (food)":
      return "Folate";
    default:
      return nutrient;
  }
}

export const Settings = ["Age", "Sex"];

const TeenMale = [
  1000,
  333,
  300,
  36,
  18,
  31,
  97,
  5,
  11.3,
  30,
  200,
  3500,
  300,
  2.4,
  2500,
  16.5,
  775,
  55.2,
  1.3,
  33,
  1.0,
  4.0,
  700,
  1.5,
  1.5,
  40,
  10,
  60
];

const TeenFemale = [
  800,
  267,
  300,
  29,
  14,
  24,
  78,
  5,
  14.8,
  30,
  200,
  3500,
  300,
  2.4,
  2000,
  13.2,
  625,
  45.0,
  1.1,
  27,
  0.8,
  3.0,
  600,
  1.5,
  1.2,
  40,
  10,
  50
];

const AdultMale = [
  700,
  333,
  300,
  36,
  18,
  31,
  97,
  5,
  8.7,
  30,
  200,
  3500,
  300,
  2.4,
  2500,
  16.5,
  550,
  55.5,
  1.3,
  33,
  1.0,
  4.0,
  700,
  1.5,
  1.4,
  40,
  10,
  80
];

/* except 50-64 iron should be 14.8->8.7 */
const AdultFemale = [
  700,
  267,
  300,
  29,
  14,
  24,
  78,
  5,
  14.8,
  30,
  200,
  3500,
  270,
  2.4,
  2000,
  13.2,
  550,
  45.0,
  1.1,
  27,
  0.8,
  3.0,
  600,
  1.5,
  1.2,
  40,
  10,
  70
];

const ElderAdultFemale = [
  700,
  267,
  300,
  29,
  14,
  24,
  78,
  5,
  8.7,
  30,
  200,
  3500,
  270,
  2.4,
  2000,
  13.2,
  550,
  45.0,
  1.1,
  27,
  0.8,
  3.0,
  600,
  1.5,
  1.2,
  40,
  10,
  70
];

const ElderlyMale = [
  700,
  312,
  300,
  34,
  17,
  29,
  91,
  5,
  8.7,
  30,
  200,
  3500,
  300,
  2.4,
  2342,
  15.5,
  550,
  53.3,
  1.3,
  31,
  0.9,
  4.0,
  700,
  1.5,
  1.4,
  40,
  10,
  80
];

const ElderlyFemale = [
  700,
  255,
  300,
  28,
  14,
  23,
  74,
  5,
  8.7,
  30,
  200,
  3500,
  270,
  2.4,
  1912,
  12.6,
  550,
  46.5,
  1.1,
  26,
  0.8,
  3.0,
  600,
  1.5,
  1.2,
  40,
  10,
  70
];

const VeryElderlyMale = [
  700,
  306,
  300,
  33,
  17,
  28,
  89,
  5,
  8.7,
  30,
  200,
  3500,
  300,
  2.4,
  2294,
  15.1,
  550,
  53.3,
  1.3,
  31,
  0.9,
  4.0,
  700,
  1.5,
  1.4,
  40,
  10,
  80
];

const VeryElderlyFemale = [
  700,
  245,
  300,
  27,
  13,
  23,
  72,
  5,
  8.7,
  30,
  200,
  3500,
  270,
  2.4,
  1840,
  12.1,
  550,
  46.5,
  1.1,
  25,
  0.7,
  3.0,
  600,
  1.5,
  1.2,
  40,
  10,
  70
];

/* END AUXILLARY DATA */

export const requestSettings = () => ({
  type: "REQUEST_SETTINGS"
});

export const receiveSettings = settings => ({
  type: "RECEIVE_SETTINGS",
  settings
});

export const failureFetchSettings = () => ({
  type: "FAILURE_FETCH_SETTINGS"
});

export const requestGoals = () => ({
  type: "REQUEST_GOALS"
});

export const receiveGoals = (preset, goals) => ({
  type: "RECEIVE_GOALS",
  preset,
  goals
});

export const failureFetchGoals = () => ({
  type: "FAILURE_FETCH_GOALS"
});

export const modifySettings = (setting, value) => ({
  type: "MODIFY_SETTINGS",
  setting,
  value
});

export const saveSettings = () => ({
  type: "SAVE_SETTINGS"
});

export const successSaveSettings = () => ({
  type: "SUCCESS_SAVE_SETTINGS"
});

export const failureSaveSettings = () => ({
  type: "FAILURE_SAVE_SETTINGS"
});

export const savePreset = () => ({
  type: "SAVE_PRESET"
});

export const successSavePreset = (preset, goals) => ({
  type: "SUCCESS_SAVE_PRESET",
  preset,
  goals
});

export const successSaveCustomPreset = () => ({
  type: "SUCCESS_SAVE_CUSTOM_PRESET"
});

export const failureSavePreset = () => ({
  type: "FAILURE_SAVE_PRESET"
});

export const modifyGoals = (nutrient, value) => ({
  type: "MODIFY_GOALS",
  nutrient,
  value
});

export const saveGoals = () => ({
  type: "SAVE_GOALS"
});

export const successSaveGoals = () => ({
  type: "SUCCESS_SAVE_GOALS"
});

export const failureSaveGoals = () => ({
  type: "FAILURE_SAVE_GOALS"
});

export function fetchUserSettings() {
  return function(dispatch, getStore) {
    dispatch(requestSettings());
    const userID = getStore().login.userID;
    return axios
      .get("/query/getBodyData", {
        params: {
          userID: userID
        }
      })
      .then(response => {
        const settings = response.data.data[0].json_build_array;
        dispatch(
          receiveSettings(
            settings.map(x => (x == null ? "Female" : x.toString()))
          )
        );
      })
      .catch(error => failureFetchSettings());
  };
}

export function fetchUserGoals() {
  return function(dispatch, getStore) {
    dispatch(requestGoals());
    const userID = getStore().login.userID;
    axios
      .get("/query/getGoalData", {
        params: { userID: userID }
      })
      .then(response => {
        dispatch(
          receiveGoals(
            getEnumPreset(response.data.data[0]),
            response.data.data.slice(1).map(x => x.toString())
          )
        );
      })
      .catch(error => dispatch(failureFetchGoals()));
  };
}

export function postSetting(setting, value) {
  return function(dispatch, getStore) {
    if (parseInt(value, 10) < 16) {
      alert("Lembas is not recommended for those under the age of 15");
      return;
    }
    dispatch(saveSettings());
    const userID = getStore().login.userID;

    let databaseValue = setting === "Sex" ? "Gender" : setting;

    return axios
      .post("/query/setBodyData", {
        data: {
          userID: userID,
          value: databaseValue,
          data: value
        }
      })
      .then(response => {
        dispatch(successSaveSettings(setting, value));
        const currentPreset = getStore().goals.preset;
        if (currentPreset !== "custom") {
          dispatch(changeGoalsWithPreset(currentPreset));
        }
      })
      .catch(error => dispatch(failureSaveSettings()));
  };
}

function getEnumPreset(e) {
  switch (e) {
    case 1:
      return "health";
    case 69:
      return "muscle";
    case 42:
      return "slim";
    default:
      return "custom";
  }
}

function getPresetEnum(preset) {
  switch (preset) {
    case "health":
      return 1;
    case "muscle":
      return 69;
    case "slim":
      return 42;
    default:
      return 0;
  }
}

export function changeGoalsWithPreset(preset) {
  return function(dispatch, getStore) {
    const [age, sex] = getStore().goals.settings;
    const nutrients = ((age, sex) => {
      if (sex === "Male") {
        if (age < 19) {
          return TeenMale;
        } else if (age < 65) {
          return AdultMale;
        } else if (age < 75) {
          return ElderlyMale;
        }
        return VeryElderlyMale;
      } else {
        if (age < 19) {
          return TeenFemale;
        } else if (age < 50) {
          return AdultFemale;
        } else if (age < 65) {
          return ElderAdultFemale;
        } else if (age < 75) {
          return ElderlyFemale;
        }
        return VeryElderlyFemale;
      }
    })(age, sex);

    const userID = getStore().login.userID;
    const promises = nutrients.map((value, idx) =>
      axios
        .post("/query/setGoalData", {
          data: {
            userID: userID,
            goal: AllNutrients[idx].replace(/\s+/g, ""),
            value: value
          }
        })
        .then(response => response)
        .catch(error => dispatch(failureSavePreset()))
    );

    return axios
      .all(promises)
      .then(response => {
        dispatch(successSavePreset(preset, nutrients.map(x => x.toString())));
      })
      .catch(error => dispatch(failureSavePreset()));
  };
}

export function changePreset(preset) {
  return function(dispatch, getStore) {
    dispatch(savePreset());
    const userID = getStore().login.userID;
    return axios
      .post("/query/setGoalData", {
        data: {
          userID: userID,
          goal: "CurrentPreset",
          value: getPresetEnum(preset)
        }
      })
      .then(response => {
        if (preset === "health") {
          dispatch(changeGoalsWithPreset(preset));
        } else {
          dispatch(successSaveCustomPreset());
        }
      })
      .catch(error => dispatch(failureSavePreset()));
  };
}

export function postGoal(nutrient, value) {
  return function(dispatch, getStore) {
    const parsedValue = isNaN(parseFloat(value)) ? 0 : parseFloat(value);
    dispatch(saveGoals());
    const userID = getStore().login.userID;
    return axios
      .post("/query/setGoalData", {
        data: {
          userID: userID,
          goal: nutrient.replace(/\s+/g, ""),
          value: parsedValue
        }
      })
      .then(response => {
        dispatch(changePreset(userID, "custom"));
        dispatch(modifyGoals(nutrient, parsedValue.toString()));
        dispatch(successSaveGoals());
      })
      .catch(error => dispatch(failureSaveGoals()));
  };
}
