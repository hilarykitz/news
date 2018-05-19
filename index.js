const express = require("express");
const app = express();
const memCache = require("memory-cache");
const port = process.env.PORT || 5000;

var cache = duration => {
  return (req, res, next) => {
    let key = "__express__" + req.originalUrl || req.url;
    let cachedBody = memCache.get(key);
    if (cachedBody) {
      res.send(cachedBody);
      return;
    } else {
      res.sendResponse = res.send;
      res.send = body => {
        memCache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };
      next();
    }
  };
};

app.get("/", cache(10), (req, res) => {
  const topArticles = newsapi.v2
    .topHeadlines({
      country: "gb"
    })
    .then(response => {
      return response.articles;
    })
    .then(articles => {
      return articles;
    });
  console.log(topArticles);
  console.log("helloooo");
  try {
    res.json(topHeadlines);
    res.render("index", {
      articles: topArticles
    });
  } catch (err) {
    console.warn("No articles found: " + err);
  }
});

app.use((req, res) => {
  res.status(404).send(""); //not found
});

app.listen(port, function() {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});
