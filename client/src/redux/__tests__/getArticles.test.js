// @flow

import { getArticles } from "../getArticles";
import {
  ARTICLES_FETCHED,
  FETCHING_ARTICLES
} from "../../redux/articles.duck.js";
import { MOCK_ENDPOINT, MOCK_VALID_ARTICLE_RESPONSE } from "./mocks";

const mockArticlesFetched = {
  type: EXCHANGE_RATES_FETCHED,
  payload: MOCK_VALID_ARTICLE_RESPONSE
};

const MOCK_FILLED_STATE = {
  articles: REDUCED_MOCK_RATES
};

jest.mock("axios", () => ({
  get: jest.fn().mockImplementation(() =>
    Promise.resolve({
      // Ugly, but Jest rejects passing a variable into this mock as Invalid variable access.
      data: {
        _embedded: {
          rates: [
            { code: "GBP", rate: 1 },
            { code: "USD", rate: 2 },
            { code: "PLN", rate: 3 },
            { code: "CHF", rate: 4 },
            { code: "CZK", rate: 5 },
            { code: "SEK", rate: 6 },
            { code: "CNY", rate: 7 },
            { code: "RUB", rate: 8 }
          ]
        }
      }
    })
  )
}));

describe("exchangeRatesState", () => {
  describe("THUNKS", () => {
    test("It should get rates from cache if available", async () => {
      const dispatch = jest.fn();
      // $FlowFixMe mock cache
      await getExchangeRatesWithCache(MOCK_CACHE, MOCK_ENDPOINT)(dispatch);

      expect(MOCK_CACHE.setWithTtl).not.toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch.mock.calls[0][0]).toEqual(mockExchangeRatesFetched);
    });

    test("It should fetch from API if cache is expired but not dispatch update", () => {
      const dispatch = jest.fn();
      // $FlowFixMe mock cache
      getExchangeRatesWithCache(MOCK_EXPIRED_CACHE, MOCK_ENDPOINT)(
        dispatch
      ).then(() => {
        expect(MOCK_EXPIRED_CACHE.setWithTtl).toHaveBeenCalledTimes(1);
        expect(dispatch).not.toHaveBeenCalled();
      });
    });
  });

  describe("STATE REDUCER", () => {
    test("State after: EXCHANGE_RATES_FETCHED", () => {
      const action = mockExchangeRatesFetched;
      const expectedState = {
        ...initialState,
        eurExchangeRates: REDUCED_MOCK_RATES
      };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe("SELECTORS", () => {
    test("getExchangeRates selector should return exchange rates", () => {
      const getData = getExchangeRates(MOCK_FILLED_STATE);

      expect(getData).toEqual({ eurExchangeRates: REDUCED_MOCK_RATES });
    });

    test("getExchangeRates selector should return null without error if no data", () => {
      const getData = getExchangeRates(initialState);

      expect(getData).toEqual({ eurExchangeRates: null });
    });
  });
});
