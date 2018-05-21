import React from 'react'

export default (props) => {
  console.log(props);
  const entry = props.entry;
  const title = entry.getIn(['data', 'title']);
  const heroImg = props.getAsset(props.widgetsFor('heroImage').getIn(['data', 'url']));
  return (
    <div>
      <div>{title}</div>
      <img src={heroImg.toString()} alt="hero image" />
      <div>{entry.getIn(['data', 'headline'])}</div>
      <div className="marginBottom-5 bp-1_marginBottom-5 bp-2_marginBottom-10"
        dangerouslySetInnerHTML={{ __html: entry.getIn(['data', 'body']) }}
      />
    </div>
  )
};
