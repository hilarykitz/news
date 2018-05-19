// @flow

import React, { Component } from "react";

export const storyThumbnail = ({
  source,
  name,
  author,
  title,
  description,
  url,
  urlToImage,
  publishedAt
}) => {
  return description ? (
    <div className="storyThumbnail">
      <div className="storyDescription">
        <a href={url} target="blank">
          <h2>{title}</h2>
        </a>
        <img alt={title} src={urlToImage} />
        <div>
          <p>{description}</p>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
