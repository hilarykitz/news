import { getArticles } from "./getArticles";
import { API_KEY } from "./common";

// action types
export const ARTICLES_FETCHING = () => `NEWS/ARTICLES_FETCHING`;
export const ARTICLES_FETCHED = () => `NEWS/ARTICLES_FETCHED`;
export const ARTICLES_FETCHING_ERROR = () => `NEWS/ARTICLES_FETCHING_ERROR`;

// action creators
export const articlesFetching = articles => ({
  type: ARTICLES_FETCHING,
  payload: articles
});

export const articlesFetched = payload => ({
  type: ARTICLES_FETCHED,
  payload
});

export const articlesFetchingError = payload => ({
  type: ARTICLES_FETCHING_ERROR,
  payload
});

//thunks
export const fetchArticles = endpoint => async dispatch => {
  try {
    dispatch(articlesFetching(true));
    const response = await fetch(`${endpoint}&apiKey=${API_KEY}`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    dispatch(articlesFetchingError(false));
    dispatch(articlesFetched(body.articles));
  } catch (error) {
    dispatch(articlesFetchingError(true));
    console.log(`Failed to fetch articles from ${endpoint}: ${error}`);
  } finally {
    dispatch(articlesFetching(false));
  }
};

export const fetchTopStories = () => async dispatch => {
  const endpoint = "https://newsapi.org/v2/top-headlines?country=gb";
  dispatch(fetchArticles(endpoint));
};

export const fetchNewsByQuery = query => async dispatch => {
  const query = query ? `?q=${query}` : "";
  const endpoint = `https://newsapi.org/v2/everything${query}`;
  dispatch(fetchArticles(endpoint));
};

export const initialState = {
  articles: [],
  articlesFetching: false,
  articlesFetchingError: false,
  totalArticles: 0
};

// reducer
const newsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ARTICLES_FETCHING: {
      return { ...state, articlesFetching: payload };
    }
    case ARTICLES_FETCHED: {
      return { ...state, articles: payload };
    }
    case ARTICLES_FETCHING_ERROR: {
      return { ...state, articlesFetchingError: payload };
    }
    default:
      return state;
  }
};
// selectors
export const getArticlesFromStore = ({ newsReducer }) => {
  return {
    articles: newsReducer.articles
  };
};

export default newsReducer;
