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
export const fetchArticles = () => dispatch => {
  getArticles();
};

export const fetchTopStories = (country = "ca") => async dispatch => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${API_KEY}`
    );
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    dispatch(articlesFetched(body.articles));
  } catch (error) {
    console.log(error);
  }
};

export const initialState = {
  articles: [],
  articlesFetching: false,
  articlesFetchingError: false,
  totalArticles: 0
};

// reducer
const newsReducer = (state = initialState, { type, payload }) => {
  console.log(state);
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
    articles: newsReducer.articles,
    articlesFetchingError: newsReducer.articlesFetchingError
  };
};

export default newsReducer;
