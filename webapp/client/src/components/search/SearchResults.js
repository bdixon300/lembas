import React, { Component } from "react";
import {
  Panel,
  PanelGroup,
} from "react-bootstrap";
import RecipePane from "../recipe/RecipePane";
import { Scrollbars } from "react-custom-scrollbars";
import "../recipe/Recipe.css";

class SearchResults extends Component {
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
    const searchResults = this.props.searchResults;
    if (searchResults === "ERROR") {
      return <div> Error loading data </div>;
    }
    return (
      <div className="Recipe-result-headers" style={{zIndex:0}}>
        <Scrollbars>
          <PanelGroup accordion id="panel-group" onSelect={this.handleSelect}>
            {searchResults.map((e, i) => (
              <Panel key={e.recipe.uri} eventKey={i}>
                <RecipePane
                  recipe={e.recipe}
                  type={"Search Results"}
                  saveRecipe={() => this.props.saveRecipe(e.recipe)}
                />
              </Panel>
            ))}
          </PanelGroup>
        </Scrollbars>
      </div>

    );
  }
}

export default SearchResults;
