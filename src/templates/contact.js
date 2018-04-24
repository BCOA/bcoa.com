import React from "react";
import Image from "../components/Image";


export default ({ data }) => {
	const post = data.markdownRemark;
  const fields = post.frontmatter;
  return (
		<div>
			<h1>{ fields.title }</h1>
			<div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
			<img src={fields.heroImage} />
			<h4>{ fields.message }</h4>
		</div>
  );
};

export const query = graphql`
  query ContactPageQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
				heroImage
				message
      }
    }
  }
`;