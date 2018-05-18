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
  return (
    <div>
      <h2>{title}</h2>
      <small>{author}</small>
      <div>
        <p>{description}</p>
      </div>
    </div>
  );
};
