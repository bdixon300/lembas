import axios from "axios";
import { fetchMyWeek } from "./myWeek";
import { fetchUserSettings, fetchUserGoals } from "./goals";
import { fetchSavedRecipes } from "./savedRecipes";
import { fetchSavedMealPlans } from "./savedMealPlans";

export const changeUserID = userID => ({
  type: "USER_LOGIN",
  userID
});

export function fetchData() {
  return function(dispatch) {
    dispatch(fetchMyWeek());
    dispatch(fetchUserSettings());
    dispatch(fetchUserGoals());
    dispatch(fetchSavedRecipes());
    dispatch(fetchSavedMealPlans());
  };
}

export function login(userID) {
  return function(dispatch, getStore) {
    dispatch(changeUserID(parseInt(userID, 10)));

    return axios
      .get("/query/getUserID", {
        params: {
          loginID: userID
        }
      })
      .then(response => {
        if (response.data.data[0] === undefined) {
          return axios
            .get("/query/createUserID", {
              params: {
                loginID: userID
              }
            })
            .then(res => {
              return axios
                .post("/query/createUser", {
                  data: {
                    userID: userID
                  }
                })
                .then(r => {
                  return dispatch(fetchData());
                })
                .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
        } else {
          return dispatch(fetchData());
        }
      })
      .catch(error => console.log(error));
  };
}

export function login2(username, password) {
  return function(dispatch, getStore) {
    console.log(username);
    console.log(password);
    //dispatch(changeUserID(parseInt(userID, 10)));   //not sure what this is for

    return axios
      .get("/query/getUserIDUserPass", {
        params: {
          username: username,
          password: password
        }
      })
      .then(response => {
        if (response.data.data[0] === undefined) {
          console.log("Shouldnt reach here");
          /*                                  TODO tell the front end that the Username or Password is wrong
          return axios
            .get("/query/createUserID", {
              params: {
                loginID: userID
              }
            })
            .then(res => {
              return axios
                .post("/query/createUser", {
                  data: {
                    userID: userID
                  }
                })
                .then(r => {
                  return dispatch(fetchData());
                })
                .catch(error => console.log(error));
            })
            .catch(error => console.log(error)); */
        } else {
          console.log("Should reach here");
          console.log(response.data.data[0].UserID);
          dispatch(changeUserID(parseInt(response.data.data[0].UserID, 10)));

          return dispatch(fetchData()); //and set logged in value to true
        }
      })
      .catch(error => console.log(error));
  };
}

export function register(username, password) {
  return function(dispatch, getStore) {
    // dispatch(changeUserID(parseInt(userID, 10)));   //not sure what this is for

    return axios
      .get("/query/getUserIDUsername", {
        params: {
          username: username
        }
      })
      .then(response => {
        if (response.data.data[0] === undefined) {
          console.log("Creating new user");
          return axios
            .get("/query/createUserIDUserPass", {
              params: {
                username: username,
                password: password
              }
            })
            .then(res => {
              console.log("Creating user tables in DB");
              return axios
                .post("/query/createUser", {
                  data: {
                    userID: res.data.data[0].UserID
                  }
                })
                .then(r => {
                  console.log("Should reach here");
                  console.log(res.data.data[0].UserID);
                  dispatch(changeUserID(parseInt(res.data.data[0].UserID, 10)));
                  return dispatch(fetchData()); //and set logged in value to true
                })
                .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
        } else {
          return dispatch(fetchData()); // TODO tell the front end that the Username is in use
        }
      })
      .catch(error => console.log(error));
  };
}
