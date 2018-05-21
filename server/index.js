const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cache = require("./cache");

app.use("/", (req, res) => {
  const cachedArticles = cache.get("articles");

  if (cachedArticles) {
    return cachedArticles;
  }

  const topArticles = newsapi.v2
    .topHeadlines({
      country: "gb"
    })
    .then(articles => {
      cache.set("articles", response.articles);
      return response.articles;
    });

  try {
    res.json(topHeadlines);
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
