import React, { Component } from "react";
import {
  Panel,
  PanelGroup,
  Button,
  ListGroup,
  ListGroupItem
} from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars";
import "../recipe/Recipe.css";
import { Bar } from "react-chartjs-2";
import { AllNutrients } from "../../actions/goals";
import Rating from "react-rating";
import {
  carbGoal,
  fatsGoal,
  fibreGoal,
  proteinGoal,
  roundToTwoDecimals,
  sugarGoal
} from "../myWeek/MealPlanNutrition";
import { backgroundColorDefault } from "../recipe/RecipeContent";
import "../myWeek/MyWeek.css";

class MealPlanResults extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.onClickSet = this.onClickSet.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.getDataValues = this.getDataValues.bind(this);
    this.state = {
      activeKey: null
    };
  }

  handleSelect(activeKey) {
    this.setState({ activeKey });
  }

  onClickSet(event, mealPlan) {
    event.preventDefault();
    console.log("Set as my week");
    this.props.setAsMyWeek(mealPlan);
  }

  onClickSave(event, mealplan) {
    event.preventDefault();
    console.log("Save meal plan");
    this.props.saveMealPlan(mealplan);
  }

  getDataValues(mealplan) {
    const nutrients = mealplan.nutrition.map(item => item / 100);

    const dataLabels = [
      "Carbs",
      "Protein",
      "Sugar",
      "Fats",
      "Fibre",
      "Calories"
    ];
    const dataValues = [];
    let dataValuesElectro = 0;
    let dataValuesVitamin = 0;
    let dataValuesCarbs = 0;
    let dataValuesProtein = 0;
    let dataValuesSugar = 0;
    let dataValuesFats = 0;
    let dataValuesFibre = 0;
    let dataValuesCalories = 0;

    AllNutrients.forEach((ntr, idx) => {
      switch (ntr) {
        case "Calcium":
          dataValuesElectro += nutrients[idx];
          break;
        case "Iron":
          dataValuesElectro += nutrients[idx];
          break;
        case "Potassium":
          dataValuesElectro += nutrients[idx];
          break;
        case "Magnesium":
          dataValuesElectro += nutrients[idx];
          break;
        case "Sodium":
          dataValuesElectro += nutrients[idx];
          break;
        case "Phosphorus":
          dataValuesElectro += nutrients[idx];
          break;
        case "Vitamin A":
          dataValuesVitamin += nutrients[idx];
          break;
        case "Vitamin B12":
          dataValuesVitamin += nutrients[idx];
          break;
        case "Vitamin B6":
          dataValuesVitamin += nutrients[idx];
          break;
        case "Vitamin C":
          dataValuesVitamin += nutrients[idx];
          break;
        case "Vitamin D":
          dataValuesVitamin += nutrients[idx];
          break;
        case "Vitamin K":
          dataValuesVitamin += nutrients[idx];
          break;
        case "Thiamin (B1)":
          dataValuesVitamin += nutrients[idx];
          break;
        case "Riboflavin (B2)":
          dataValuesVitamin += nutrients[idx];
          break;
        case "Niacin (B3)":
          dataValuesVitamin += nutrients[idx];
          break;
        case "Carbs":
          dataValuesCarbs += nutrients[idx];
          break;
        case "Protein":
          dataValuesProtein += nutrients[idx];
          break;
        case "Sugars":
          dataValuesSugar += nutrients[idx];
          break;
        case "Fat":
          dataValuesFats += nutrients[idx];
          break;
        case "Energy":
          dataValuesCalories += nutrients[idx];
          break;
        case "Fibre":
          dataValuesFibre += nutrients[idx];
          break;
        default:
      }
    });

    dataValues.push(dataValuesCarbs);
    dataValues.push(dataValuesProtein);
    dataValues.push(dataValuesSugar);
    dataValues.push(dataValuesFats);
    dataValues.push(dataValuesFibre);
    dataValues.push(dataValuesCalories);

    dataValues[0] = roundToTwoDecimals(
      dataValues[0] / carbGoal(this.props.goals)
    );
    dataValues[1] = roundToTwoDecimals(
      dataValues[1] / proteinGoal(this.props.goals)
    );
    dataValues[2] = roundToTwoDecimals(
      dataValues[2] / sugarGoal(this.props.goals)
    );
    dataValues[3] = roundToTwoDecimals(
      dataValues[3] / fatsGoal(this.props.goals)
    );
    dataValues[4] = roundToTwoDecimals(
      dataValues[4] / fibreGoal(this.props.goals)
    );
    dataValues[5] = roundToTwoDecimals(dataValues[5] / this.props.goals[14]);

    const nutrientSummaryData = {
      labels: dataLabels,
      datasets: [
        {
          label: "Food Group",
          type: "bar",
          data: dataValues,
          yAxes: {
            ticks: {
              max: 1.0
            }
          },
          backgroundColor: "#44D04F",
          hoverBackgroundColor: backgroundColorDefault[3]
        },
        {
          label: "Max Goal",
          type: "line",
          data: [{ x: "Carbs", y: 1.1 }, { x: "Calories", y: 1.1 }],
          fill: false,
          borderColor: "#093172",
          backgroundColor: "#093172",
          pointBorderColor: "#093172",
          pointBackgroundColor: "#093172",
          pointHoverBackgroundColor: "#093172",
          pointHoverBorderColor: "#093172"
        },
        {
          label: "Min Goal",
          type: "line",
          data: [{ x: "Carbs", y: 0.9 }, { x: "Calories", y: 0.9 }],
          fill: false,
          borderColor: "#43E8D8",
          backgroundColor: "#43E8D8",
          pointBorderColor: "#43E8D8",
          pointBackgroundColor: "#43E8D8",
          pointHoverBackgroundColor: "#43E8D8",
          pointHoverBorderColor: "#43E8D8"
        }
      ]
    };
    return nutrientSummaryData;
  }

  render() {
    const mealPlanResults = this.props.mealPlanResults;
    //let goals = this.props.goals;

    mealPlanResults.sort(function(a, b) {
      return b.rating - a.rating;
    });

    const barChartSummaryOptions = {
      title: {
        display: true,
        text: "Nutritional Summary",
        fontFamily: "Roboto",
        fontSize: 20
      },
      legend: {
        display: true
      }
    };

    return (
      <div className="Recipe-result-headers" style={{ zIndex: 0 }}>
        <Scrollbars>
          <PanelGroup accordion id="panel-group" onSelect={this.handleSelect}>
            {mealPlanResults.map((e, i) => (
              <Panel key={i} eventKey={i}>
                <Panel.Title toggle className="MealPlan-name">
                  <p>{e.name}</p>
                </Panel.Title>
                <p>
                  {e.userID === this.props.userID
                    ? "Owned"
                    : "Made by " + e.userID}{" "}
                  {" Rating: "}
                  <Rating
                    emptySymbol="glyphicon glyphicon-heart-empty"
                    fullSymbol="glyphicon glyphicon-heart"
                    initialRating={e.rating}
                    readonly
                  />
                </p>
                <Button onClick={event => this.onClickSet(event, e)}>
                  Set As My Week
                </Button>
                <Button onClick={event => this.onClickSave(event, e)}>
                  Save MealPlan
                </Button>
                <Panel.Body collapsible>
                  <ListGroup>
                    <ListGroupItem className="Pie-chart">
                      <Bar
                        data={this.getDataValues(e)}
                        options={barChartSummaryOptions}
                      />
                    </ListGroupItem>
                  </ListGroup>
                </Panel.Body>
              </Panel>
            ))}
          </PanelGroup>
        </Scrollbars>
      </div>
    );
  }
}

export default MealPlanResults;
