import React, { Component } from "react";
import { Tab, Tabs, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { Pie } from "react-chartjs-2";
import "../myWeek/MyWeek.css";
import { formatValue, roundToTwoDecimals } from "../myWeek/MealPlanNutrition";

export const backgroundColorDefault = [
  "#007349",
  "#ed00c1",
  "#aeff20",
  "#002eb5",
  "#d7d400",
  "#1e0066",
  "#00a329",
  "#fb0081",
  "#99ffa4",
  "#a5007d",
  "#00e6c8",
  "#b1002f",
  "#01b1c0",
  "#e65e00",
  "#0075e1",
  "#ff9a1e",
  "#005388",
  "#fff47d",
  "#000828",
  "#ffce5c",
  "#ff8cf0",
  "#5a7500",
  "#93b7ff",
  "#814200",
  "#aef8ff",
  "#4b0005",
  "#ffead0",
  "#2c2c2d",
  "#ffb196",
  "#007091"
];

class RecipeContent extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      key: 1
    };
  }

  handleSelect(key) {
    this.setState({ key });
  }

  render() {
    const searchResults = this.props.recipe;
    //const uri = searchResults.uri;
    //const label = searchResults.label;
    //const image = searchResults.image;
    const source = searchResults.source;
    const url = searchResults.url;
    const calories = searchResults.calories;
    //const cautions = searchResults.cautions;
    const dietLabels = searchResults.dietLabels;
    const digest = searchResults.digest;
    const healthLabels = searchResults.healthLabels;
    const ingredientLines = searchResults.ingredientLines;
    //const ingredients = searchResults.ingredient;
    //const shareAs = searchResults.shareAs;
    //const totalDaily = searchResults.totalDaily;
    //const totalNutrients = searchResults.totalNutrients;
    //const totalTime = searchResults.totalTime;
    const totalWeight = searchResults.totalWeight;

    const dataLabels = [];
    const dataValues = [];
    const databackgroundColor = [];
    const datahoverBackgroundColor = [];

    let dataValuesElectro = 0;
    let dataValuesVitamin = 0;
    let dataValuesCarbs = 0;
    let dataValuesProtein = 0;
    let dataValuesSugar = 0;
    let dataValuesFats = 0;
    let dataValuesFibre = 0;

    digest.forEach((item, i) => {
      if (item.tag.match(/^(CA|FE|K|MG|NA|P|ZN)$/)) {
        dataValuesElectro += formatValue(item.total, item.unit);
      } else if (
        item.tag.match(
          /^(TOCPHA|VITA_RAE|VITB12|VITB6A|VITC|VITD|VITK1|THIA|RIBF|NIA)$/
        )
      ) {
        dataValuesVitamin += formatValue(item.total, item.unit);
      } else if (item.tag.match(/^(CHOCDF)$/)) {
        dataValuesCarbs += formatValue(item.total, item.unit);
      } else if (item.tag.match(/^(PROCNT)$/)) {
        dataValuesProtein += formatValue(item.total, item.unit);
      } else if (item.tag.match(/^(SUGAR)$/)) {
        dataValuesSugar += formatValue(item.total, item.unit);
      } else if (item.tag.match(/^(FAT)$/)) {
        dataValuesFats += formatValue(item.total, item.unit);
      } else if (item.tag.match(/^(ENERC_KCAL)$/)) {
      } else if (item.tag.match(/^(FIBTG)$/)) {
        dataValuesFibre += formatValue(item.total, item.unit);
      }
    });

    dataLabels.push("Electrolytes (%)");
    dataValues.push(dataValuesElectro);
    databackgroundColor.push(
      backgroundColorDefault[backgroundColorDefault.length - 1]
    );
    datahoverBackgroundColor.push(
      backgroundColorDefault[backgroundColorDefault.length - 1]
    );

    dataLabels.push("Vitamins (%)");
    dataValues.push(dataValuesVitamin);
    databackgroundColor.push(
      backgroundColorDefault[backgroundColorDefault.length - 2]
    );
    datahoverBackgroundColor.push(
      backgroundColorDefault[backgroundColorDefault.length - 2]
    );

    dataLabels.push("Carbs (%)");
    dataValues.push(dataValuesCarbs);
    databackgroundColor.push(
      backgroundColorDefault[backgroundColorDefault.length - 3]
    );
    datahoverBackgroundColor.push(
      backgroundColorDefault[backgroundColorDefault.length - 3]
    );

    dataLabels.push("Protein (%)");
    dataValues.push(dataValuesProtein);
    databackgroundColor.push(
      backgroundColorDefault[backgroundColorDefault.length - 4]
    );
    datahoverBackgroundColor.push(
      backgroundColorDefault[backgroundColorDefault.length - 4]
    );

    dataLabels.push("Sugar (%)");
    dataValues.push(dataValuesSugar);
    databackgroundColor.push(
      backgroundColorDefault[backgroundColorDefault.length - 8]
    );
    datahoverBackgroundColor.push(
      backgroundColorDefault[backgroundColorDefault.length - 8]
    );

    dataLabels.push("Fats (%)");
    dataValues.push(dataValuesFats);
    databackgroundColor.push(
      backgroundColorDefault[backgroundColorDefault.length - 6]
    );
    datahoverBackgroundColor.push(
      backgroundColorDefault[backgroundColorDefault.length - 6]
    );

    dataLabels.push("Fibre (%)");
    dataValues.push(dataValuesFibre);
    databackgroundColor.push(
      backgroundColorDefault[backgroundColorDefault.length - 7]
    );
    datahoverBackgroundColor.push(
      backgroundColorDefault[backgroundColorDefault.length - 7]
    );

    /* Convert nutrient values to % of daily intake */
    for (var i = 0; i < dataValues.length; i++) {
      dataValues[i] = roundToTwoDecimals(dataValues[i]);
    }

    const data = {
      labels: dataLabels,
      datasets: [
        {
          data: dataValues,
          backgroundColor: databackgroundColor,
          hoverBackgroundColor: datahoverBackgroundColor
        }
      ]
    };

    return (
      <div>
        <Tabs
          activeKey={this.state.key}
          onSelect={this.handleSelect}
          id="Recipe-Tabs"
        >
          <Tab eventKey={1} title="Basic">
            <ListGroupItem>
              Total Calories: {formatValue(calories, "null")}
            </ListGroupItem>
            <ListGroupItem>
              Calories per Serving:{" "}
              {formatValue(calories / searchResults.yield, "null")}{" "}
            </ListGroupItem>
            <ListGroupItem>Diet Tags: {dietLabels.join(", ")}</ListGroupItem>
            <ListGroupItem>
              Health Tags: {healthLabels.join(", ")}
            </ListGroupItem>
            <ListGroupItem>Serves: {searchResults.yield}</ListGroupItem>
            <ListGroupItem>
              Total Weight: {formatValue(totalWeight, "null")}
            </ListGroupItem>
            <ListGroupItem>
              <p />
            </ListGroupItem>
          </Tab>

          <Tab eventKey={2} title="Ingredients">
            <ListGroup>
              {ingredientLines.map((line, i) => (
                <ListGroupItem key={line + i}>{line}</ListGroupItem>
              ))}

              <ListGroupItem>Source: {source} </ListGroupItem>
              <ListGroupItem>
                <Button href={url}>Preparation</Button>
              </ListGroupItem>
              <ListGroupItem>
                <p />
              </ListGroupItem>
            </ListGroup>
          </Tab>

          <Tab eventKey={3} title="Nutritional">
            <ListGroup>
              <p />
              <ListGroupItem className="Pie-chart">
                {" "}
                <Pie data={data} />
              </ListGroupItem>
            </ListGroup>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default RecipeContent;
