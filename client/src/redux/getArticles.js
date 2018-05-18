// @ flow

import { API_KEY } from "./common";
const ENDPOINT = "https://newsapi.org/v2/everything";

export const getArticles = async searchQuery => {
  const filter = searchQuery ? `?q=${searchQuery}` : "";

  const response = await fetch(`${ENDPOINT}${filter}&apiKey=${API_KEY}`);
  const body = await response.json();

  if (response.status !== 200) throw Error(body.message);

  return body;
};
