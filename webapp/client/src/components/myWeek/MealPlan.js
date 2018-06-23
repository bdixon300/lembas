import React, { Component } from "react";
import PropTypes from "prop-types";
import MealPlanTab from "./MealPlanTab";
import {
  Tabs,
  Tab,
  Button,
  Form,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import { MealPlanTabs } from "../../actions/mealPlan";
import "./MyWeek.css";
import { Scrollbars } from "react-custom-scrollbars";

class NameForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.triggerChange = this.triggerChange.bind(this);
  }

  componentWillMount() {
    this.timer = null;
  }

  handleChange(value) {
    clearTimeout(this.timer);
    this.props.modifyName(value);
    this.timer = setTimeout(this.triggerChange, 1000);
  }

  triggerChange() {
    this.props.postName();
  }

  render() {
    return (
      <div>
        <Form
          inline
          onSubmit={e => {
            e.preventDefault();
            this.triggerChange();
          }}
        >
          <FormGroup>
            <ControlLabel>Name:</ControlLabel>
            <FormControl
              type="text"
              value={this.props.name}
              onChange={e => this.handleChange(e.target.value)}
            />
          </FormGroup>
        </Form>
      </div>
    );
  }
}

class MealPlan extends Component {
  constructor(props) {
    super(props);
    this.state = { currentTab: MealPlanTabs[0] };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(tab) {
    this.setState({ currentTab: tab });
  }

  render() {
    return (
      <div>
        {this.props.parentComponent === "Create Meal Plan" ? (
          <NameForm
            name={this.props.name}
            modifyName={this.props.modifyName}
            postName={this.props.postName}
          />
        ) : (
          <h1 style={{fontSize: "3vw"}}>{this.props.name}</h1>
        )}
        {this.props.parentComponent === "Custom Meal Plan" ? (
          <span>
            <Button onClick={() => this.props.setAsMyWeek(this.props.recipes)}>
              Set as My Week
            </Button>
          </span>
        ) : null}
        <Tabs
          className="My-week"
          activeKey={this.state.currentTab}
          onSelect={this.handleSelect}
          id="meal-plan-tabs"
        >
            {MealPlanTabs.map(tab => (
              <Tab key={tab} eventKey={tab} title={tab} className="Tab">
                <Scrollbars>
                <MealPlanTab
                  tab={tab}
                  recipes={this.props.recipes}
                  goals={this.props.goals}
                  removeMeal={this.props.removeMeal}
                  type={this.props.parentComponent}
                  nutrition={this.props.nutrition}
                />
                </Scrollbars>
              </Tab>
            ))}
        </Tabs>
      </div>
    );
  }
}

MealPlan.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
  ).isRequired,
  goals: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
};

export default MealPlan;
