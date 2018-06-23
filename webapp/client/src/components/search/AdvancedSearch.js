import React, { Component, Fragment } from "react";
import Slider from "rc-slider";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "rc-slider/assets/index.css";
import {
  Button,
  InputGroup,
  Panel,
  ListGroupItem,
  ListGroup
} from "react-bootstrap";

const Nutrition = [
  "Calcium",
  "Carbs",
  "Cholesterol",
  "Monounsaturated",
  "Polyunsaturated",
  "Saturated",
  "Fat",
  "Trans",
  "Iron",
  "Fiber",
  "Folate",
  "Potassium",
  "Magnesium",
  "Sodium",
  "Energy",
  "Niacin(B3)",
  "Phosphorus",
  "Protein",
  "Riboflavin(B2)",
  "Sugars",
  "Thiamin(B1)",
  "Vitamin E",
  "Vitamin A",
  "Vitamin B12",
  "Vitamin B6",
  "Vitamin C",
  "Vitamin D",
  "Vitamin K"
];
const units = [
  "mg",
  "g",
  "mg",
  "g",
  "g",
  "g",
  "g",
  "g",
  "mg",
  "g",
  "æg",
  "mg",
  "mg",
  "mg",
  "kcal",
  "mg",
  "mg",
  "g",
  "mg",
  "g",
  "mg",
  "mg",
  "æg",
  "æg",
  "mg",
  "mg",
  "æg",
  "æg"
];


class AdvancedSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adUnit: "",
      adSearch: [],
      nutritionSearch: []
    };
    this.adOnSelect = this.adOnSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  adOnSelect(event) {
    this.setState({
      adSearch: event,
      adUnit: units[Nutrition.indexOf(event[0])]
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let tempArray = [];
    let dupElement = false;

    this.state.nutritionSearch.forEach((e, i) => {
      if (e.nut === this.state.adSearch[0]) {
        dupElement = true;
      }
      tempArray.push(e);
    });

    if (!dupElement) {
      tempArray.push({
        nut: this.state.adSearch[0],
        units: this.state.adUnit,
        max: Math.floor(this.props.goals[Nutrition.indexOf(this.state.adSearch[0])]/ 3) * 2,
        min: 0
      });
    }
    this.setState({ nutritionSearch: tempArray });
    this.props.setSearchFilter(tempArray);
    setTimeout(() => this.refs.typeahead.getInstance().clear(), 0);
  }

  onChange(value, name, unit) {
    let tempArray = [];

    this.state.nutritionSearch.forEach((e, i) => {
      if (e.nut === name) {
        tempArray.push({
          nut: name,
          units: unit,
          max: value[1],
          min: value[0]
        });
      } else {
        tempArray.push(e);
      }
    });
    this.setState({ nutritionSearch: tempArray });
    this.props.setSearchFilter(tempArray);
  }

  handleClick(event, name) {
    event.preventDefault();
    let tempArray = [];
    this.state.nutritionSearch.forEach((e, i) => {
      if (e.nut !== name) {
        tempArray.push(e);
      }
    });
    this.setState({ nutritionSearch: tempArray });
    this.props.setSearchFilter(tempArray);
  }

  render() {

    return (
      <div>
        <Panel id="collapsible-panel-example-3">
          <Panel.Toggle>Advanced search</Panel.Toggle>
          <Panel.Collapse>
            <Panel.Body>
              <Fragment>
                <InputGroup>
                  <Typeahead
                    ref="typeahead"
                    placeholder="Choose Filter"
                    options={Nutrition}
                    onChange={event => this.adOnSelect(event)}
                    selected={this.state.adSearch}
                  />
                  <InputGroup.Button className="input-group-append">
                    <Button type="button" onClick={this.handleSubmit}>
                      Set
                    </Button>
                  </InputGroup.Button>
                </InputGroup>
              </Fragment>

              <ListGroup>
                {this.state.nutritionSearch.map((e, i) => {

                  const minGoal = Math.floor(this.props.goals[Nutrition.indexOf(e.nut)] * 0.9 / 3);
                  const maxGoal = Math.floor(this.props.goals[Nutrition.indexOf(e.nut)] * 1.1 / 3);
                  const maxUpperRange = Math.floor(this.props.goals[Nutrition.indexOf(e.nut)]/ 3) * 2;
                  console.log(minGoal + " " + maxGoal + " " + maxUpperRange);

                  return (
                    <ListGroupItem
                      key={typeof e.nut === "undefined" ? "_" : e.nut}
                    >
                      <div style={{width: 500, height: 50, margin: "0 auto"}}>
                        <Slider.Range
                          min={0}
                          max={maxUpperRange}
                          defaultValue={[0, maxUpperRange]}
                          onChange={value => this.onChange(value, e.nut, e.units)}
                          marks={{
                            0: {
                              style: {
                                color: 'red',
                              },
                              label: <strong>{0} {e.units}</strong>,
                            },
                            [minGoal]: 'Min Goal',
                            [maxGoal]: 'Max Goal',
                            [maxUpperRange]: {
                              style: {
                                color: 'red',
                              },
                              label: <strong>{maxUpperRange} {e.units}</strong>
                            },
                          }}
                        />
                      </div>
                      {e.nut}:- MIN: {e.min} {e.units} MAX: {e.max} {e.units} {}
                      <Button
                        bsStyle="link"
                        onClick={event => this.handleClick(event, e.nut)}
                      >
                        Remove
                      </Button>
                    </ListGroupItem>
                  );
                })}
              </ListGroup>
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
      </div>
    );
  }
}

export default AdvancedSearch;