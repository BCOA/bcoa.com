import React from 'react'

export default (props) => {
  const entry = props.entry;
  const title = entry.getIn(['data', 'title']);
  const hero = props.getAsset(entry.getIn(['data', 'heroImage']));
  return (
    <div>
      <div>Project Title: {title}</div>
      <img src={hero.toString()} alt="hero image" />
    </div>
  )
};
