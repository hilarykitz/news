const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mcache = require("memory-cache");
const NewsAPI = require("newsapi");
import { API_KEY } from "./config";

const newsapi = new NewsAPI(API_KEY);

app.use("/", async (req, res) => {
  const cachedArticles = mcache.get("articles");

  if (cachedArticles) {
    return cachedArticles;
  }

  try {
    const topArticles = await newsapi.v2
      .topHeadlines({
        country: "gb"
      })
      .then(articles => {
        mcache.put("articles", articles);
        return res.json(articles);
      });

    res.send({
      articles: topArticles
    });
  } catch (err) {
    console.warn("No articles found: " + err);
  }
});

app.listen(port, function() {
  console.log(`News server listening on port ${port}`);
});
