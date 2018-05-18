import React, { Component } from "react";
import { connect } from "react-redux";
import { getArticlesFromStore, fetchTopStories } from "../redux/newsDuck";
import { storyThumbnail } from "./storyThumbnail";

const TopStories = props => {
  const { articles, fetchTopStories } = props;
  if (!articles.length) {
    fetchTopStories();
  }
  return articles.map(article => storyThumbnail(article));
};

const mapStateToProps = state => getArticlesFromStore(state);

const mapDispatchToProps = {
  fetchTopStories
};

export default connect(mapStateToProps, mapDispatchToProps)(TopStories);
