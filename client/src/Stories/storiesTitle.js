import React from "react";
import { connect } from "react-redux";
import { getSearchQuery } from "../redux/newsDuck";

const storiesTitle = props => {
  const { searchQuery } = props;
  return (
    <h2 className="storiesTitle">
      Top Stories
      {searchQuery.length ? ` about: '${searchQuery}'` : ""}
    </h2>
  );
};

const mapStateToProps = state => getSearchQuery(state);

export default connect(mapStateToProps, null)(storiesTitle);
