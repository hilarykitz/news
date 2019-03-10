import {
  articlesFetching,
  articlesFetchingError,
  articlesFetched,
  articleCount
} from "./actions";
import { API_KEY } from "../config";

export const fetchArticles = endpoint => async dispatch => {
  try {
    dispatch(articlesFetching(true));
    const response = await fetch(`${endpoint}&apiKey=${API_KEY}`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    dispatch(articlesFetchingError(false));
    dispatch(articleCount(body.totalResults));
    dispatch(articlesFetched(body.articles));
  } catch (error) {
    dispatch(articlesFetchingError(true));
    console.log(
      `Failed to fetch articles from ${endpoint}: ${error}, ${process.env}`
    );
  } finally {
    dispatch(articlesFetching(false));
  }
};
