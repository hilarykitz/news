import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchNewsByQuery } from "../redux/newsDuck";
import MdSearch from "react-icons/lib/md/search";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: ""
    };
  }

  saveString = e => {
    const newString = e.target.value;
    const currentString = this.state.searchString;
    if (currentString !== newString) {
      this.setState({ searchString: newString });
    }
  };

  submitSearch = (e, searchString) => {
    e.preventDefault();
    this.props.fetchNewsByQuery(searchString);
  };

  render() {
    const { searchString } = this.state;

    return (
      <div className="searchWrapper">
        <form onSubmit={e => this.submitSearch(e, searchString)}>
          <input
            placeholder="Search stories"
            onChange={e => this.saveString(e)}
            value={searchString}
          />
          <button className="searchBtn" type="submit">
            <MdSearch color="white" size={26} />
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchNewsByQuery
};

export default connect(null, mapDispatchToProps)(Search);
