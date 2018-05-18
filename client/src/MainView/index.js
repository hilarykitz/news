import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Search from "../Search";
import TopStories from "../TopStories";

class MainView extends Component {
  render() {
    return (
      <Fragment>
        <Search />
        <TopStories />
      </Fragment>
    );
  }
}

export default MainView;
