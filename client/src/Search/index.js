import React, { Component } from "react";
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

  render() {
    const { searchString } = this.state;

    return (
      <div className="searchWrapper">
        <input
          placeholder="Find stories"
          onChange={e => this.saveString(e)}
          value={searchString}
        />
        <div className="searchBtn">
          <MdSearch color="white" size={26} />
        </div>
      </div>
    );
  }
}

export default Search;
