import React from "react";
import { Days } from "../actions/mealPlan";
import { DropdownButton, MenuItem } from "react-bootstrap";

function AddToButton(props) {
  return (
    <div style={{marginTop: "20%"}}>
      <DropdownButton title={props.label} id={props.label + "-dropdown"}>
        {Days.map(day => (
          <MenuItem
            key={day}
            eventKey={day}
            onSelect={day => props.addMeal(day)}
          >
            {" "}
            {day}{" "}
          </MenuItem>
        ))}
      </DropdownButton>
    </div>
  );
}

export default AddToButton;
