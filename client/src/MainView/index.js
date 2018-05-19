import React, { Component, Fragment } from "react";

import Search from "../Search";
import Stories from "../Stories";

class MainView extends Component {
  render() {
    return (
      <Fragment>
        <Search />
        <Stories />
      </Fragment>
    );
  }
}

export default MainView;
