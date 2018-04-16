import React from "react";

export default ({ data }) => {
  const post = data.markdownRemark;
	const fields = post.frontmatter;
	const { edges: fields }
  return (
    <div>
			
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      {fields.infoObject && (
        <dl>
          <dt>{fields.infoObject.title}</dt>
          <dd>{fields.infoObject.description}</dd>
        </dl>
      )}
      {fields.projectImages && fields.projectImages.map((image, i) => (
        <div key={i}>

        </div>
      ))}
    </div>
  );
};