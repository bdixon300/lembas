import React, { Component } from "react";
import PropTypes from "prop-types";
import { PanelGroup, Panel } from "react-bootstrap";
import "./MyWeek.css";
import RecipePane from "../recipe/RecipePane";

class MealPlanDay extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      activeKey: null
    };
  }

  handleSelect(activeKey) {
    this.setState({ activeKey });
  }

  render() {
    const recipes = this.props.recipes;
    return (
      <PanelGroup accordion id="panel-group" onSelect={this.handleSelect}>
        {recipes.map((recipe, i) => (
          <Panel key={recipe.key} eventKey={i}>
            <RecipePane
              recipe={recipe.recipe}
              type={this.props.type}
              removeMeal={() => this.props.removeMeal(recipe)}
            />
          </Panel>
        ))}
      </PanelGroup>
    );
  }
}

MealPlanDay.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
};

export default MealPlanDay;
