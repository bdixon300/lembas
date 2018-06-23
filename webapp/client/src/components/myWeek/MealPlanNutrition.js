import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { Days } from "../../actions/mealPlan";
import { AllNutrients, getNutrientUnit } from "../../actions/goals";
import { Bar } from "react-chartjs-2/dist/react-chartjs-2";
import { backgroundColorDefault } from "../recipe/RecipeContent";

/* Sums the matrix vertically, i.e. all entries with same index. */
function verticallySumMatrix(a, b) {
  return a.map((v, i) => v + b[i]);
}

/* See http://www.jacklmoore.com/notes/rounding-in-javascript/ */
export function roundToTwoDecimals(x) {
  return Number(Math.round(x + "e2") + "e-2");
}

/* See http://www.jacklmoore.com/notes/rounding-in-javascript/ */
export function formatValue(x, unit) {
  if (unit === "mg") {
    x = x / 1000;
  }
  if (unit === "µg") {
    x = x / 1000000;
  }
  return Number(Math.round(x + "e2") + "e-2");
}

function calculateAverageNutrientsPerDay(nutrientsPerDay) {
  return nutrientsPerDay
    .reduce((a, b) => verticallySumMatrix(a, b))
    .map(ntr => roundToTwoDecimals(ntr / 100 / Days.length));
}

/*
function calculateGoalsAlignment(nutrients, goals) {
  return nutrients.map((amt, idx) => {
    let goal = goals[idx];
    if (amt < goal * 0.9) {
      return (
        <span>
          <Glyphicon glyph="chevron-down" />
          <Glyphicon glyph="chevron-down" />
        </span>
      );
    } else if (amt < goal * 0.95) {
      return <Glyphicon glyph="chevron-down" />;
    } else if (amt > goal * 1.1) {
      return (
        <span>
          <Glyphicon glyph="chevron-up" />
          <Glyphicon glyph="chevron-up" />
        </span>
      );
    } else if (amt > goal * 1.05) {
      return <Glyphicon glyph="chevron-up" />;
    }
    return <Glyphicon glyph="ok" />;
  });
}
*/

/*
function NutrientInformation(props) {
  const nutrient = props.nutrient;
  const amount = props.amount;
  return (
    <p>
      Average {nutrient} per day: {amount}
      {getNutrientUnit(nutrient)} {props.goalAlignment}
    </p>
  );
}
*/

export function electrolyteGoal(props) {
  return roundToTwoDecimals(
    (props[8] + props[11] + props[12] + props[13] + props[16]) / 5
  );
}

export function vitaminsGoal(props) {
  return roundToTwoDecimals(
    (formatValue(props[18], getNutrientUnit(props[18])) +
      formatValue(props[20], getNutrientUnit(props[20])) +
      formatValue(props[21], getNutrientUnit(props[21])) +
      formatValue(props[22], getNutrientUnit(props[22])) +
      formatValue(props[23], getNutrientUnit(props[23])) +
      formatValue(props[24], getNutrientUnit(props[24])) +
      formatValue(props[25], getNutrientUnit(props[25])) +
      formatValue(props[26], getNutrientUnit(props[26])) +
      formatValue(props[27], getNutrientUnit(props[27]))) /
      9
  );
}

export function carbGoal(props) {
  return roundToTwoDecimals(props[1]);
}

export function proteinGoal(props) {
  return roundToTwoDecimals(props[17]);
}

export function sugarGoal(props) {
  return roundToTwoDecimals(props[19]);
}

export function fatsGoal(props) {
  return roundToTwoDecimals(props[6]);
}

export function fibreGoal(props) {
  return roundToTwoDecimals(props[9]);
}

class MealPlanNutrition extends Component {
  constructor(props) {
    super(props);
    this.state = { displayDefault: true };
    this.changeDisplay = this.changeDisplay.bind(this);
  }

  changeDisplay() {
    this.setState({ displayDefault: !this.state.displayDefault });
  }

  render() {
    if (this.props.recipes === "ERROR") {
      return <p>Error loading My Week </p>;
    }

    const avgNutrients = calculateAverageNutrientsPerDay(this.props.nutrition);
    /*
    const goalsAlignment = calculateGoalsAlignment(
      avgNutrients,
      this.props.goals
    );
    */

    /* Bar chart processing code */

    const dataLabels = [
      "Carbs",
      "Protein",
      "Sugar",
      "Fats",
      "Fibre",
      "Calories"
    ];
    const dataMineralLabels = [
      "Calcium",
      "Iron",
      "Potassium",
      "Magnesium",
      "Sodium",
      "Phosphorus"
    ];
    const dataVitaminLabels = [
      "Vitamin A",
      "Vitamin B12",
      "Vitamin B6",
      "Vitamin C",
      "Vitamin D",
      "Vitamin K",
      "Vitamin E",
      "Thiamin (B1)",
      "Riboflavin (B2)",
      "Niacin (B3)"
    ];

    const dataValues = [];
    const dataMineralValues = [];
    const dataVitaminValues = [];

    let dataValuesCarbs = 0;
    let dataValuesProtein = 0;
    let dataValuesSugar = 0;
    let dataValuesFats = 0;
    let dataValuesFibre = 0;
    let dataValuesCalories = 0;

    let dataValueCalcium = 0;
    let dataValueIron = 0;
    let dataValuePotassium = 0;
    let dataValueMagnesium = 0;
    let dataValueSodium = 0;
    let dataValuePhosphorus = 0;

    let dataValueVitA = 0;
    let dataValueVitB_12 = 0;
    let dataValueVitB_6 = 0;
    let dataValueVitC = 0;
    let dataValueVitD = 0;
    let dataValueVitK = 0;
    let dataValueVitE = 0;
    let dataValueThiamin = 0;
    let dataValueRiboFlavin = 0;
    let dataValueNiacin = 0;

    AllNutrients.forEach((ntr, idx) => {
      switch (ntr) {
        case "Calcium":
          dataValueCalcium += avgNutrients[idx];
          break;
        case "Iron":
          dataValueIron += avgNutrients[idx];
          break;
        case "Potassium":
          dataValuePotassium += avgNutrients[idx];
          break;
        case "Magnesium":
          dataValueMagnesium += avgNutrients[idx];
          break;
        case "Sodium":
          dataValueSodium += avgNutrients[idx];
          break;
        case "Phosphorus":
          dataValuePhosphorus += avgNutrients[idx];
          break;
        case "Vitamin A":
          dataValueVitA += avgNutrients[idx];
          break;
        case "Vitamin B12":
          dataValueVitB_12 += avgNutrients[idx];
          break;
        case "Vitamin B6":
          dataValueVitB_6 += avgNutrients[idx];
          break;
        case "Vitamin C":
          dataValueVitC += avgNutrients[idx];
          break;
        case "Vitamin D":
          dataValueVitD += avgNutrients[idx];
          break;
        case "Vitamin K":
          dataValueVitK += avgNutrients[idx];
          break;
        case "Vitamin E":
          dataValueVitE += avgNutrients[idx];
          break;
        case "Thiamin (B1)":
          dataValueThiamin += avgNutrients[idx];
          break;
        case "Riboflavin (B2)":
          dataValueRiboFlavin += avgNutrients[idx];
          break;
        case "Niacin (B3)":
          dataValueNiacin += avgNutrients[idx];
          break;
        case "Carbs":
          dataValuesCarbs += avgNutrients[idx];
          break;
        case "Protein":
          dataValuesProtein += avgNutrients[idx];
          break;
        case "Sugars":
          dataValuesSugar += avgNutrients[idx];
          break;
        case "Fat":
          dataValuesFats += avgNutrients[idx];
          break;
        case "Energy":
          dataValuesCalories += avgNutrients[idx];
          break;
        case "Fibre":
          dataValuesFibre += avgNutrients[idx];
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

    dataVitaminValues.push(dataValueVitA);
    dataVitaminValues.push(dataValueVitB_6);
    dataVitaminValues.push(dataValueVitB_12);
    dataVitaminValues.push(dataValueVitC);
    dataVitaminValues.push(dataValueVitD);
    dataVitaminValues.push(dataValueVitK);
    dataVitaminValues.push(dataValueThiamin);
    dataVitaminValues.push(dataValueNiacin);
    dataVitaminValues.push(dataValueRiboFlavin);
    dataVitaminValues.push(dataValueVitE);

    dataMineralValues.push(dataValueCalcium);
    dataMineralValues.push(dataValueIron);
    dataMineralValues.push(dataValuePotassium);
    dataMineralValues.push(dataValueMagnesium);
    dataMineralValues.push(dataValueSodium);
    dataMineralValues.push(dataValuePhosphorus);

    /* Convert summary nutrient values to % of daily intake */
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

    /* Convert mineral nutrient values to % of intake */
    dataMineralValues[0] = roundToTwoDecimals(
      dataMineralValues[0] / this.props.goals[0]
    );
    dataMineralValues[1] = roundToTwoDecimals(
      dataMineralValues[1] / this.props.goals[8]
    );
    dataMineralValues[2] = roundToTwoDecimals(
      dataMineralValues[2] / this.props.goals[11]
    );
    dataMineralValues[3] = roundToTwoDecimals(
      dataMineralValues[2] / this.props.goals[12]
    );
    dataMineralValues[4] = roundToTwoDecimals(
      dataMineralValues[2] / this.props.goals[13]
    );
    dataMineralValues[5] = roundToTwoDecimals(
      dataMineralValues[2] / this.props.goals[16]
    );

    /* Convert vitamin nutrient values to % of intake */
    dataVitaminValues[0] = roundToTwoDecimals(
      dataVitaminValues[0] / this.props.goals[22]
    );
    dataVitaminValues[1] = roundToTwoDecimals(
      dataVitaminValues[1] / this.props.goals[24]
    );
    dataVitaminValues[2] = roundToTwoDecimals(
      dataVitaminValues[2] / this.props.goals[23]
    );
    dataVitaminValues[3] = roundToTwoDecimals(
      dataVitaminValues[3] / this.props.goals[25]
    );
    dataVitaminValues[4] = roundToTwoDecimals(
      dataVitaminValues[4] / this.props.goals[26]
    );
    dataVitaminValues[5] = roundToTwoDecimals(
      dataVitaminValues[5] / this.props.goals[27]
    );
    dataVitaminValues[6] = roundToTwoDecimals(
      dataVitaminValues[6] / this.props.goals[20]
    );
    dataVitaminValues[7] = roundToTwoDecimals(
      dataVitaminValues[7] / this.props.goals[15]
    );
    dataVitaminValues[8] = roundToTwoDecimals(
      dataVitaminValues[8] / this.props.goals[18]
    );
    dataVitaminValues[9] = roundToTwoDecimals(
      dataVitaminValues[9] / this.props.goals[21]
    );

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
          label: " Max Goal",
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

    const nutrientMineralData = {
      labels: dataMineralLabels,
      datasets: [
        {
          data: dataMineralValues,
          backgroundColor: "#44D04F",
          hoverBackgroundColor: backgroundColorDefault[3]
        },
        {
          label: "Max Goal",
          type: "line",
          data: [{ x: "Calcium", y: 1.1 }, { x: "Phosphorus", y: 1.1 }],
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
          data: [{ x: "Calcium", y: 0.9 }, { x: "Phosphorus", y: 0.9 }],
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

    const nutrientVitaminData = {
      labels: dataVitaminLabels,
      datasets: [
        {
          data: dataVitaminValues,
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
          data: [{ x: "Vitamin A", y: 1.1 }, { x: "Niacin (B3)", y: 1.1 }],
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
          data: [{ x: "Vitamin A", y: 0.9 }, { x: "Niacin (B3)", y: 0.9 }],
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

    const barChartMineralsOptions = {
      title: {
        display: true,
        text: "Minerals/Electrolyte Summary",
        fontFamily: "Roboto",
        fontSize: 20
      },
      legend: {
        display: false
      }
    };

    const barChartVitaminsOptions = {
      title: {
        display: true,
        text: "Vitamins Summary",
        fontFamily: "Roboto",
        fontSize: 20
      },
      legend: {
        display: false
      }
    };

    const barChartSummaryOptions = {
      title: {
        display: true,
        text: "Nutritional Summary",
        fontFamily: "Roboto",
        fontSize: 20
      },
      legend: {
        display: true
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              min: 0,
              max: 1.5
            }
          }
        ]
      }
    };

    const nutrientInfo = this.state.displayDefault ? (
      <p />
    ) : (
      <ListGroup>
        <ListGroupItem className="Pie-chart">
          <Bar data={nutrientMineralData} options={barChartMineralsOptions} />
          <p />
        </ListGroupItem>
        <ListGroupItem className="Pie-chart">
          <Bar data={nutrientVitaminData} options={barChartVitaminsOptions} />
        </ListGroupItem>
      </ListGroup>
    );

    return (
      <div>
        <ListGroup>
          <ListGroupItem className="Pie-chart">
            <Bar data={nutrientSummaryData} options={barChartSummaryOptions} />
          </ListGroupItem>
        </ListGroup>
        <Button onClick={this.changeDisplay}>
          {this.state.displayDefault
            ? "Show All nutrition"
            : "Show All nutrition"}
        </Button>
        <p />
        <ul>{nutrientInfo}</ul>
      </div>
    );
  }
}

MealPlanNutrition.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
  ).isRequired,
  goals: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
};

export default MealPlanNutrition;
