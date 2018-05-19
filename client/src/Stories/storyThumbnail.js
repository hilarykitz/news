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
  return (
    <div key={url} className="storyThumbnail">
      <a href={url} target="blank">
        <div className="storyDescription">
          <h2>{title}</h2>
          <img alt={title} src={urlToImage} />
          <p>{description}</p>
        </div>
      </a>
    </div>
  );
};

const buildPlaceholder = () => (
  <div className="storyThumbnail">
    <div className="storyDescription">
      <h2 />
    </div>
  </div>
);

export const storyThumbnail = (article, totalArticles) => {
  return totalArticles > 0 ? buildThumbnail(article) : buildPlaceholder();
};
