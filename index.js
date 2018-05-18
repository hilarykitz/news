const express = require("express");
const app = express();
const router = express.Router();
const port = process.env.PORT || 5000;

const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("2cd86ec8b59b4e7d8b2b14ea90a075e6");
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them

app.get("/", (req, res) => {
  const topHeadlines = newsapi.v2
    .topHeadlines({
      // sources: "bbc-news,the-verge",
      // q: "bitcoin",
      // category: "business",
      language: "en"
      // country: "us"
    })
    .then(response => {
      console.log(response.articles);
      /*
      {
        status: "ok",
        articles: [...]
      }
    */
    });

  try {
    res.json(topHeadlines);
  } catch (err) {
    console.warn("No articles found: " + err);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
