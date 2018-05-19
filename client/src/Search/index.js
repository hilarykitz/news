import { connect } from "react-redux";
import { fetchNewsByQuery } from "../redux/newsDuck";
import Search from "./Search";

const mapDispatchToProps = {
  fetchNewsByQuery
};

export default connect(null, mapDispatchToProps)(Search);
