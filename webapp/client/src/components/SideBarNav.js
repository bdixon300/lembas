import React from "react";
import PropTypes from "prop-types";
import { Nav, NavItem } from "react-bootstrap";
import { SideBarTabs } from "../actions/app";
import "./mainApp/MainApp.css";
import { getIconFromComponent } from "../actions/app";

function SideBarNav(props) {
  return (
    <Nav stacked onSelect={e => props.changePage(e)} activeKey={props.selected}>
      {SideBarTabs.map(tab => (
        <NavItem key={tab} eventKey={tab} className="Side-bar-nav-item">
          <p className="Side-bar-text">
            {getIconFromComponent(tab)} <br />
            {tab}
          </p>
          <p style={{ marginTop: "3em" }} />
        </NavItem>
      ))}
    </Nav>
  );
}

SideBarNav.propTypes = {
  selected: PropTypes.string.isRequired
};

export default SideBarNav;
