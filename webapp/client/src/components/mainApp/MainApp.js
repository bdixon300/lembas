import React, { Component } from "react";
import MyWeek from "../../containers/MyWeek";
//import SearchBar from "../search/SearchBar";
import SearchResults from "../../containers/SearchResults";
import MealPlanResults from "../../containers/MealPlanResults";
import SideBar from "../../containers/SideBar";
import Goals from "../../containers/Goals";
import CustomMealPlan from "../../containers/CustomMealPlan";
import SavedMealPlans from "../../containers/SavedMealPlans";
import Search from "../../containers/Search";
import CreateMealPlan from "../../containers/CreateMealPlan";
import { fetchMyWeek } from "../../actions/myWeek";
import { fetchUserSettings, fetchUserGoals } from "../../actions/goals";
import { fetchSavedRecipes } from "../../actions/savedRecipes";
import { fetchSavedMealPlans } from "../../actions/savedMealPlans";
import { store } from "../../index";
import MyRecipes from "../../containers/MyRecipes";
import Logo from "../../assets/leaftransparent.png";
import { Grid, Row, Col, Image } from "react-bootstrap";
import Settings from "../../containers/Settings";
//import GoogleLogin from "react-google-login";
//import { GoogleLogout } from "react-google-login";

/*
const responseGoogle = response => {
  console.log("Logged in");
  console.log(response);
  console.log(response.googleId);
};

const logout = response => {
  console.log("Logged out");
  console.log(response);
};
*/

class MainApp extends Component {
  componentDidMount() {
    store.dispatch(fetchMyWeek());
    store.dispatch(fetchUserSettings());
    store.dispatch(fetchUserGoals());
    store.dispatch(fetchSavedRecipes());
    store.dispatch(fetchSavedMealPlans());
  }

  render() {
    const mainComponent = (component => {
      switch (component) {
        case "My Week":
          return <MyWeek />;
        case "Search Results":
          return <SearchResults />;
        case "MealPlan Results":
          return <MealPlanResults />;
        case "Goals":
          return <Goals />;
        case "Saved Recipes":
          return <MyRecipes />;
        case "Saved Meal Plans":
          return <SavedMealPlans />;
        case "Custom Meal Plan":
          return <CustomMealPlan />;
        case "Create Meal Plan":
          return <CreateMealPlan />;
        default:
          return null;
      }
    })(this.props.mainComponent);
    return (
      <div className="App">
        <Grid fluid className="Main-body">
          <Row className="Main-header">
            <Col sm={1}>
              <h1 style={{ fontSize: "4em", color: "black" }}>lembas</h1>
            </Col>
            <Col sm={1}>
              <Image
                src={Logo}
                width="150vw"
                height="50vw"
                style={{ marginLeft: "20%", marginTop: "1.75vw" }}
              />
            </Col>
            <Col sm={9}>
              <p />
              <Search />
            </Col>
            <Col sm={1}>
              <Settings />
              {/*<GoogleLogin
                style={{ marginLeft: "30%" }}
                clientId="612144094022-jffbfikrvjshbmdf1g6k87d31o8gdldh.apps.googleusercontent.com"
                buttonText="test1"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
              />*/}
            </Col>
          </Row>
          <Row>
            <Col sm={1} className="Left-sideComponent">
              <p />
              <SideBar />
            </Col>
            <Col sm={11} className="Main-body-middle">
              <Grid fluid>
                <Row>
                  <Col>
                    <p />
                    <p />
                    {mainComponent}
                    {this.props.mainComponent !== "Saved Meal Plans" ? (
                      <div
                        id="edamam-badge"
                        data-color="transparent"
                        style={{ marginTop: "3vw" }}
                      />
                    ) : null}
                  </Col>
                </Row>
              </Grid>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default MainApp;
