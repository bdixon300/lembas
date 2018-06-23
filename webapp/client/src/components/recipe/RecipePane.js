import React, { Component } from "react";
import RecipeContent from "./RecipeContent";
import RecipeHeader from "./RecipeHeader";
import "./Recipe.css";

import { Panel } from "react-bootstrap";

class RecipePane extends Component {
  render() {
    return (
      <div>
        <Panel.Heading>
          <RecipeHeader
            recipe={this.props.recipe}
            type={this.props.type}
            removeMeal={this.props.removeMeal}
            saveRecipe={this.props.saveRecipe}
          />
        </Panel.Heading>
        <Panel.Body collapsible>
          <RecipeContent recipe={this.props.recipe} />
        </Panel.Body>
      </div>
    );
  }
}

export default RecipePane;
