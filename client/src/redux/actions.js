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
