import React from 'react'

export default (props) => {
  console.log(props);
  const entry = props.entry;
  const title = entry.getIn(['data', 'title']);

  const hero = entry.getIn(['data', 'heroImage']);
  const heroImg = props.widgetsFor(hero).getIn(['data', 'url'])
  return (
    <div>
      <div>Project Title: {title}</div>
      <img src={heroImg.toString()} alt="hero image" />
    </div>
  )
};
