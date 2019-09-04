import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import HomeIcon from "./icons/HomeIcon";
import { NavigationConsumer } from "../contexts/NavigationContext";

class BackButton extends Component {
  render() {
    return (
      <NavigationConsumer>
        {context => (
          <NavLink className="button back-button" to={context}>
            <HomeIcon />
          </NavLink>
        )}
      </NavigationConsumer>
    );
  }
}

export default withRouter(BackButton);
