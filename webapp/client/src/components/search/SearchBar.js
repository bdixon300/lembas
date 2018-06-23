import React, { Component } from "react";
import {
  Button,
  Glyphicon,
  FormGroup,
  FormControl,
  HelpBlock,
  InputGroup,
  Form,
  DropdownButton,
  MenuItem
} from "react-bootstrap";
import "../mainApp/MainApp.css";
import AdvancedSearch from "./AdvancedSearch";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      search: "Recipe",
      open: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  handleChange(e) {
    this.setState({ term: e.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.term !== "") {
      switch (this.state.search) {
        case "Recipe":
          this.props.changeMainComponent("Search Results");
          this.props.fetchSearchResults(this.state.term, this.props.filter);
          break;
        case "Mealplan":
          this.props.changeMainComponent("MealPlan Results");
          this.props.fetchMealPlanResults(this.state.term, this.props.filter);
          break;
        default:
          console.log("ERROR");
          break;
      }
    }
  }

  onSelect(event) {
    this.setState({ search: event });
  }

  render() {
    return (
      <Form
        horizontal
        onSubmit={this.handleSubmit}
        id="form-box"
        className="Search-bar"
      >
        <FormGroup controlId="formBasicText">
          <InputGroup>
            <DropdownButton
              componentClass={InputGroup.Button}
              id="input-dropdown-addon"
              title={this.state.search}
              onSelect={event => this.onSelect(event)}
            >
              <MenuItem eventKey="Recipe">Recipe</MenuItem>
              <MenuItem eventKey="Mealplan">MealPlan</MenuItem>
            </DropdownButton>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="Search"
              onChange={this.handleChange}
            />
            <InputGroup.Button>
              <Button
                id="button-box"
                className="search-button"
                type="submit"
                onClick={this.handleSubmit}
              >
                <Glyphicon id="icon-box" glyph="search" />
              </Button>
            </InputGroup.Button>
          </InputGroup>
          <FormControl.Feedback />
          <HelpBlock>
            <AdvancedSearch
              setSearchFilter={filter => this.props.setSearchFilter(filter)}
              goals = {this.props.goals}
            />
          </HelpBlock>
        </FormGroup>
      </Form>
    );
  }
}

export default SearchBar;
