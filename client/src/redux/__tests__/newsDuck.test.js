// @flow

global.fetch = require("jest-fetch-mock");

import {
  ARTICLES_FETCHING,
  ARTICLES_FETCHED,
  ARTICLES_FETCHING_ERROR,
  ARTICLE_COUNT
} from "../actions";

import reducer, {
  initialState,
  fetchTopStories,
  getArticlesFromStore
} from "../newsDuck.js";

import { fetchArticles } from "../fetchArticles";

import {
  MOCK_ENDPOINT,
  MOCK_ARTICLES,
  MOCK_VALID_RESPONSE
} from "../../__mocks__";

const mockArticlesFetching = {
  type: ARTICLES_FETCHING,
  payload: true
};

const mockArticleCount = {
  type: ARTICLE_COUNT,
  payload: MOCK_ARTICLES.length
};

const mockArticlesFetchingError = {
  type: ARTICLES_FETCHING_ERROR,
  payload: true
};

const mockArticlesFetchingErrorResolve = {
  type: ARTICLES_FETCHING_ERROR,
  payload: false
};

const mockArticlesFetchingResolve = {
  type: ARTICLES_FETCHING,
  payload: false
};

const mockArticlesFetched = {
  type: ARTICLES_FETCHED,
  payload: MOCK_ARTICLES
};

const MOCK_FILLED_STATE = {
  newsReducer: {
    articles: MOCK_ARTICLES,
    totalArticles: 1
  }
};

describe("newsDuckState", () => {
  describe("THUNKS", () => {
    beforeAll(() => {});
    test("It should get top stories", async () => {
      const dispatch = jest.fn();

      fetch.mockResponseOnce(JSON.stringify(MOCK_VALID_RESPONSE));
      await fetchArticles(MOCK_ENDPOINT)(dispatch);

      expect(dispatch).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledTimes(5);
      expect(dispatch.mock.calls[0][0]).toEqual(mockArticlesFetching);
      expect(dispatch.mock.calls[1][0]).toEqual(
        mockArticlesFetchingErrorResolve
      );
      expect(dispatch.mock.calls[2][0]).toEqual(mockArticleCount);
      expect(dispatch.mock.calls[3][0]).toEqual(mockArticlesFetched);
      expect(dispatch.mock.calls[4][0]).toEqual(mockArticlesFetchingResolve);
    });
  });

  describe("STATE REDUCER", () => {
    test("State after: ARTICLES_FETCHED", () => {
      const action = mockArticlesFetched;
      const expectedState = {
        ...initialState,
        articles: MOCK_ARTICLES
      };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe("SELECTORS", () => {
    test("getArticlesFromStore selector should return articles", () => {
      const getArticles = getArticlesFromStore(MOCK_FILLED_STATE);
      expect(getArticles).toEqual({
        articles: MOCK_ARTICLES,
        totalArticles: 1
      });
    });

    test("getArticlesFromStore selector should return initial array of mock values without error if no articles fetched", () => {
      const getArticles = getArticlesFromStore({ newsReducer: initialState });
      expect(getArticles).toEqual({
        articles: initialState.articles,
        totalArticles: 0
      });
    });
  });
});
