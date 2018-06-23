import React from "react";
import {Glyphicon} from "react-bootstrap";

export const Components = [
  "Search Results",
  "My Week",
  "Goals",
  "Saved Recipes",
  "Saved Meal Plans",
  "Create Meal Plan"
];

export function getIconFromComponent(c) {
  switch (c) {
    case "My Week":
      return <Glyphicon glyph="calendar"/>;
    case "Goals":
      return <Glyphicon glyph="screenshot"/>;
    case "Saved Recipes":
      return <Glyphicon glyph="heart"/>;
    case "Saved Meal Plans":
      return <Glyphicon glyph="folder-open"/>;
    case "Create Meal Plan":
      return <Glyphicon glyph="plus"/>;
    default:
      return null;
  }
}

export const SideBarTabs = Components.slice(1);

export const changeMainComponent = component => ({
  type: "CHANGE_MAIN_COMPONENT",
  component
});
