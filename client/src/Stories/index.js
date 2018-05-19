import React from "react";
import { connect } from "react-redux";
import { getArticlesFromStore, fetchTopStories } from "../redux/newsDuck";
import SearchQueryTitle from "../SearchQueryTitle";
import { storyThumbnail } from "./storyThumbnail";

const Stories = props => {
  const { articles, fetchTopStories } = props;
  if (!articles.length) {
    fetchTopStories();
  }
  return (
    <div className="storyWrap">
      <SearchQueryTitle />
      {articles.map(article => storyThumbnail(article))}
    </div>
  );
};

const mapStateToProps = state => getArticlesFromStore(state);

const mapDispatchToProps = {
  fetchTopStories
};

export default connect(mapStateToProps, mapDispatchToProps)(Stories);
