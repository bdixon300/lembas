import React, { Component } from "react";
import AddToMyWeek from "../../containers/AddToMyWeek";
import AddToCustom from "../../containers/AddToCustom";
import { Panel, Grid, Row, Col, Image, Button } from "react-bootstrap";
import "./Recipe.css";

/* See http://www.jacklmoore.com/notes/rounding-in-javascript/ */
function roundToTwoDecimals(x) {
  return Number(Math.round(x + "e2") + "e-2");
}

class RecipeHeader extends Component {
  render() {
    const recipe = this.props.recipe;
    const button = (component => {
      switch (component) {
        case "Saved Recipes":
          return (
            <div>
              <Grid fluid>
                <Row>
                  <Col sm={4}>
                    <AddToMyWeek recipe={recipe} />
                  </Col>
                  <Col sm={4}>
                    <AddToCustom recipe={recipe} />
                  </Col>
                  <Col sm={4}>
                    <Button
                      style={{ marginTop: "20%" }}
                      onClick={this.props.removeMeal}
                    >
                      Unsave Recipe
                    </Button>
                  </Col>
                </Row>
              </Grid>
            </div>
          );
        case "Create Meal Plan":
        /* falls through */
        case "My Week":
          return <Button onClick={this.props.removeMeal}>Remove Recipe</Button>;
        case "Search Results":
          return (
            <div>
              <Grid fluid>
                <Row>
                  <Col sm={4}>
                    <AddToMyWeek recipe={recipe} />
                  </Col>
                  <Col sm={4}>
                    <AddToCustom recipe={recipe} />
                  </Col>
                  <Col sm={4}>
                    <Button
                      style={{ marginTop: "20%" }}
                      onClick={this.props.saveRecipe}
                    >
                      Save Recipe
                    </Button>
                  </Col>
                </Row>
              </Grid>
            </div>
          );
        case "Custom Meal Plan":
        /* falls through */
        default:
          return null;
      }
    })(this.props.type);

    const image_url = recipe.image;
    const recipe_name = recipe.label;
    const calories = recipe.calories;

    return (
      <Grid className="Recipe-result">
        <Row>
          <Col sm={2}>
            <p />
            <Panel.Title toggle className="Recipe-name">
              {recipe_name}
            </Panel.Title>
            <p />
          </Col>
          <Col sm={2}>
            <Image
              className="Recipe-image"
              src={image_url}
              responsive
              rounded={true}
              alt="Image not loaded"
            />
          </Col>
          <Col sm={2}>
            <p />
            <p />
            <p style={{ marginTop: "20%" }}>Calories:</p>
            {roundToTwoDecimals(calories / recipe.yield)} per person
            <p />
          </Col>
          <Col sm={6}>
            <p />
            <p />
            {button}
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default RecipeHeader;

// {health_label.map((line, i) => (
//   <p key={line}>
//     {line}
//   </p>
// ))}
