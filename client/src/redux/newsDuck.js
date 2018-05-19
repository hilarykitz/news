const API_KEY = "2cd86ec8b59b4e7d8b2b14ea90a075e6";
// action types
export const ARTICLES_FETCHING = () => `NEWS/ARTICLES_FETCHING`;
export const ARTICLES_FETCHED = () => `NEWS/ARTICLES_FETCHED`;
export const ARTICLES_FETCHING_ERROR = () => `NEWS/ARTICLES_FETCHING_ERROR`;
export const NEW_SEARCH_QUERY = () => `NEWS/NEW_SEARCH_QUERY`;
export const ARTICLE_COUNT = () => `NEWS/ARTICLE_COUNT`;

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

export const saveSearchQuery = payload => ({
  type: NEW_SEARCH_QUERY,
  payload
});

export const articleCount = payload => ({
  type: ARTICLE_COUNT,
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
    dispatch(articleCount(body.totalResults));
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
  articles: [0, 1, 2, 3, 4, 5, 6],
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
