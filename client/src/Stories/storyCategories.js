import React from "react";
import { connect } from "react-redux";
import { fetchNewsByCategory, getSearchQuery } from "../redux/newsDuck";

const categories = [
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology"
];

const makeFilters = (fetchNewsByCategory, searchQuery) => {
  const filters = [];
  for (let i = 0; i < categories.length; i++) {
    const filterClass = `${
      categories[i] === searchQuery ? "active" : ""
    } filterPill`;
    filters.push(
      <div
        className={filterClass}
        onClick={() => fetchNewsByCategory(categories[i])}
      >
        {categories[i]}
      </div>
    );
  }
  return filters;
};

const storyCategories = props => {
  const { fetchNewsByCategory, searchQuery } = props;
  return (
    <div className="filters">
      {makeFilters(fetchNewsByCategory, searchQuery)}
    </div>
  );
};

const mapDispatchToProps = {
  fetchNewsByCategory
};

const mapStateToProps = state => getSearchQuery(state);

export default connect(mapStateToProps, mapDispatchToProps)(storyCategories);
