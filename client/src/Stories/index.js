import React from "react";
import { connect } from "react-redux";
import { getArticlesFromStore, fetchTopStories } from "../redux/newsDuck";
import StoryCategories from "./storyCategories";
import StoriesTitle from "./storiesTitle";
import { storyThumbnail } from "./storyThumbnail";

const Stories = props => {
  const { articles, totalArticles, fetchTopStories } = props;

  if (totalArticles < 1) {
    fetchTopStories();
  }

  return (
    <div className="storyWrap">
      <StoryCategories />
      <StoriesTitle />
      {articles.map(article => storyThumbnail(article, totalArticles))}
    </div>
  );
};

const mapStateToProps = state => getArticlesFromStore(state);

const mapDispatchToProps = {
  fetchTopStories
};

export default connect(mapStateToProps, mapDispatchToProps)(Stories);
