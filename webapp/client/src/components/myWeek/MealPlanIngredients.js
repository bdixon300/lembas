import React, { Component } from "react";
import {
  PanelGroup,
  Panel,
  ListGroup,
  ListGroupItem,
  Well
} from "react-bootstrap";
import "./MyWeek.css";

class MealPlanIngredients extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.getPrice = this.getPrice.bind(this);
    this.state = {
      activeKey: null
    };
  }

  handleSelect(activeKey) {
    this.setState({ activeKey });
  }

  getPrice() {
    return 10;
  }

  render() {
    const recipes = this.props.recipes;
    const ingredientsList = recipes
      .map(day => day.map(item => item.recipe))
      .reduce((a, b) => a.concat(b));

    return (
      <PanelGroup accordion id="panel-group" onSelect={this.handleSelect}>
        {ingredientsList.map((recipe, i) => (
          <Well key={recipe.uri + i}>
            <Panel bsStyle="primary">
              <Panel.Heading>
                <Panel.Title componentClass="h3">{recipe.label}</Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                <ListGroup>
                  {recipe.ingredients.map((item, idx) => (
                    <ListGroupItem key={item.text + recipe.label + idx}>
                      {item.text}
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </Panel.Body>
            </Panel>
          </Well>
        ))}
      </PanelGroup>
    );
  }
}

export default MealPlanIngredients;
/*
<Panel>
  <ListGroup>
    {ingredientsList.map((item) =>
      <ListGroupItem
        key={item.name}
      >
        {item.name}
      </ListGroupItem>
    )}
  </ListGroup>
</Panel>
*/
