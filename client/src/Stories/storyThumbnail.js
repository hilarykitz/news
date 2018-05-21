// @flow

import React from "react";

const buildThumbnail = ({
  source,
  name,
  author,
  title,
  description,
  url,
  urlToImage,
  publishedAt
}) => {
  const hideImage = e => {
    e.target.style.display = "none";
  };

  return description && urlToImage ? (
    <div key={url} className="storyThumbnail">
      <a href={url} target="blank">
        <div className="storyDescription">
          <h2>{title}</h2>
          <img onError={e => hideImage(e)} alt={title} src={urlToImage} />
          <p>{description}</p>
        </div>
      </a>
    </div>
  ) : (
    ""
  );
};

const buildPlaceholder = article => (
  <div key={article} className="storyThumbnail">
    <div className="storyPlaceholder">
      <h2>...</h2>
    </div>
  </div>
);

export const storyThumbnail = (article, totalArticles) => {
  return totalArticles > 0
    ? buildThumbnail(article)
    : buildPlaceholder(article);
};
