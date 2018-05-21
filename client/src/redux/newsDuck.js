import {
  ARTICLES_FETCHING,
  ARTICLES_FETCHED,
  ARTICLES_FETCHING_ERROR,
  NEW_SEARCH_QUERY,
  ARTICLE_COUNT,
  saveSearchQuery
} from "./actions";

import { fetchArticles } from "./fetchArticles";

//thunks
export const fetchTopStories = () => async dispatch => {
  const endpoint = "https://newsapi.org/v2/top-headlines?country=gb";
  dispatch(fetchArticles(endpoint));
  dispatch(saveSearchQuery(""));
};

export const fetchNewsByQuery = query => async dispatch => {
  if (!query) {
    dispatch(fetchTopStories());
    return;
  }
  const endpoint = `https://newsapi.org/v2/everything?q=${query}&language=en`;
  dispatch(fetchArticles(endpoint));
  dispatch(saveSearchQuery(query));
};

export const fetchNewsByCategory = category => async dispatch => {
  if (!category) {
    dispatch(fetchTopStories());
    return;
  }
  const endpoint = `https://newsapi.org/v2/top-headlines?country=gb&category=${category}`;
  dispatch(fetchArticles(endpoint));
  dispatch(saveSearchQuery(category));
};

export const initialState = {
  articles: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  articlesFetching: false,
  articlesFetchingError: false,
  totalArticles: 0,
  articleQuery: ""
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
    case NEW_SEARCH_QUERY: {
      return { ...state, searchQuery: payload };
    }
    case ARTICLE_COUNT: {
      return { ...state, totalArticles: payload };
    }
    default:
      return state;
  }
};
// selectors
export const getArticlesFromStore = ({ newsReducer }) => {
  return {
    articles: newsReducer.articles,
    totalArticles: newsReducer.totalArticles
  };
};

export const getSearchQuery = ({ newsReducer }) => {
  return { searchQuery: newsReducer.searchQuery };
};

export default newsReducer;
