import React, { Component } from "react";
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Grid,
  Row,
  Col
} from "react-bootstrap";
import PropTypes from "prop-types";
import { AllNutrients, getNutrientUnit, Settings } from "../../actions/goals";
import { Scrollbars } from "react-custom-scrollbars";
import "./UserGoals.css";

function PresetSelector(props) {
  return (
    <FormGroup>
      <ControlLabel className="data-label">Goal</ControlLabel>
      <FormControl
        componentClass="select"
        value={props.preset}
        onChange={e => props.changePreset(e.target.value)}
      >
        <option value="health">Be Healthy</option>
        <option value="custom">Custom</option>
      </FormControl>
    </FormGroup>
  );
}

class NutrientGoal extends Component {
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
    this.props.changeGoal(this.props.nutrient, value);
    this.timer = setTimeout(this.triggerChange, 1000);
  }

  triggerChange() {
    this.props.submitGoal(this.props.nutrient, this.props.value);
  }

  render() {
    const nutrient = this.props.nutrient;
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
            <ControlLabel>
              {nutrient} (in {getNutrientUnit(nutrient)})
            </ControlLabel>{" "}
            <FormControl
              type="text"
              value={this.props.value}
              onChange={e => this.handleChange(e.target.value)}
            />
          </FormGroup>
        </Form>
      </div>
    );
  }
}

function SummaryDisplay(props) {
  return (
    <div className="Nutrient-goal">
      <h1> Summary </h1>
      {props.nutrients.map(ntr => (
        <div key={ntr}>
          <NutrientGoal
            nutrient={ntr}
            value={props.allGoals[AllNutrients.indexOf(ntr)]}
            changeGoal={props.changeGoal}
            submitGoal={props.submitGoal}
          />
          <p />
        </div>
      ))}
    </div>
  );
}

class PersonalDataEntry extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.triggerChange = this.triggerChange.bind(this);
  }

  componentWillMount() {
    this.timer = null;
  }

  handleChange(value) {
    const parsedValue = value === "" ? 0 : parseInt(value, 10);
    if (!isNaN(parsedValue)) {
      clearTimeout(this.timer);
      this.props.changeSetting(this.props.setting, "" + parsedValue);
      this.timer = setTimeout(this.triggerChange, 1000);
    }
  }

  triggerChange() {
    const setting = this.props.setting;
    this.props.submitSetting(
      setting,
      this.props.settings[Settings.indexOf(setting)]
    );
  }

  render() {
    const setting = this.props.setting;
    const value = this.props.settings[Settings.indexOf(setting)];
    return (
      <Form
        onSubmit={e => {
          e.preventDefault();
          this.triggerChange();
        }}
      >
        <FormGroup controlId={setting}>
          <ControlLabel className="data-label">{this.props.label}</ControlLabel>
          <FormControl
            type="text"
            value={value}
            onChange={e => this.handleChange(e.target.value)}
          />
        </FormGroup>
      </Form>
    );
  }
}

function PersonalDataSelector(props) {
  const setting = props.setting;
  return (
    <FormGroup controlId={setting}>
      <ControlLabel className="data-label">{props.label}</ControlLabel>
      <FormControl
        componentClass="select"
        value={props.settings[Settings.indexOf(setting)]}
        onChange={props.submitSetting}
      >
        {props.values.map(value => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </FormControl>
    </FormGroup>
  );
}

function PersonalDataForm(props) {
  return (
    <div>
      {[{ setting: "Age", label: "Age" }].map(o => (
        <PersonalDataEntry
          key={o.setting}
          setting={o.setting}
          label={o.label}
          settings={props.settings}
          changeSetting={props.changeSetting}
          submitSetting={props.submitSetting}
        />
      ))}
      <Form onSubmit={e => e.preventDefault()}>
        {[{ setting: "Sex", label: "Sex", values: ["Male", "Female"] }].map(
          o => (
            <PersonalDataSelector
              key={o.setting}
              setting={o.setting}
              label={o.label}
              values={o.values}
              settings={props.settings}
              submitSetting={e => {
                props.changeSetting(o.setting, e.target.value);
                props.submitSetting(o.setting, e.target.value);
              }}
            />
          )
        )}
      </Form>
    </div>
  );
}

class GoalsList extends Component {
  constructor(props) {
    super(props);
    this.state = { showGoals: false };
    this.toggleGoals = this.toggleGoals.bind(this);
  }

  toggleGoals() {
    this.setState({ showGoals: !this.state.showGoals });
  }

  render() {
    const goals = (
      <div>
        {AllNutrients.map(ntr => (
          <div key={ntr}>
            <NutrientGoal
              nutrient={ntr}
              value={this.props.goals[AllNutrients.indexOf(ntr)]}
              changeGoal={this.props.changeGoal}
              submitGoal={this.props.submitGoal}
            />
          </div>
        ))}
      </div>
    );

    return (
      <div>
        <Button onClick={this.toggleGoals}>
          {this.state.showGoals ? "Hide Goals" : "Show All Goals"}
        </Button>
        {this.state.showGoals ? goals : null}
      </div>
    );
  }
}

class UserGoals extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col sm={6}>
              <PresetSelector
                className="Preset-selector"
                preset={this.props.preset}
                changePreset={preset => this.props.changePreset(preset)}
              />
              <SummaryDisplay
                className="Summary-display"
                nutrients={["Energy", "Protein", "Sugars"]}
                allGoals={this.props.goals}
                changeGoal={this.props.modifyGoal}
                submitGoal={this.props.saveGoal}
              />
            </Col>
            <Col sm={6}>
              <PersonalDataForm
                className="Personal-data-form"
                settings={this.props.settings}
                changeSetting={this.props.modifySetting}
                submitSetting={this.props.saveSetting}
              />
              <p />
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <div className="Goals-list">
                <Scrollbars>
                  <p />
                  <GoalsList
                    goals={this.props.goals}
                    changeGoal={this.props.modifyGoal}
                    submitGoal={this.props.saveGoal}
                  />
                </Scrollbars>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

UserGoals.propTypes = {
  goals: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  settings: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  preset: PropTypes.string.isRequired
};

export default UserGoals;
