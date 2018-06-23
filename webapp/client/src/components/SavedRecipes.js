import React, { Component } from "react";
import { Panel, PanelGroup } from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars";
import RecipePane from "./recipe/RecipePane";

class SavedRecipes extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      activeKey: "1"
    };
  }

  handleSelect(activeKey) {
    this.setState({ activeKey });
  }

  render() {
    const recipes = this.props.recipes;
    if (recipes === "ERROR") {
      return <div> Error loading data </div>;
    }

    return (
      <div className="Recipe-result-headers">
        <Scrollbars>
          <PanelGroup accordion id="panel-group" onSelect={this.handleSelect}>
            {recipes.map((recipe, idx) => (
              <Panel key={recipe.uri} eventKey={idx}>
                <RecipePane
                  recipe={recipe}
                  type={"Saved Recipes"}
                  removeMeal={() => this.props.removeMeal(recipe)}
                />
              </Panel>
            ))}
          </PanelGroup>
        </Scrollbars>
      </div>
    );
  }
}

export default SavedRecipes;
