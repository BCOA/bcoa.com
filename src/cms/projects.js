import React from 'react'

export default (props) => {
  console.log(props);
  const entry = props.entry;
  const title = entry.getIn(['data', 'title']);
  return (
    <div>Project Title: {title}</div>
  )
};
