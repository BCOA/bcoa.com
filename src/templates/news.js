import React from "react";
import Image from "../components/Image";


export default ({ data }) => {
	// const post = data.markdownRemark;
  // const fields = post.frontmatter;
  return (
		<h1>new page</h1>
		// <div>
		// 	<h1>{ fields.title }</h1>
		// 	<div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
		// 	<img src={fields.image} />
		// 	<h4>{ fields.headline }</h4>
		// </div>
  );
};

export const query = graphql`
  query NewsPageQuery {
    allMarkdownRemark {
			edges {
				node {
					id
					frontmatter {
						templateKey
						title
						image
						headline
						date
						body
					}
					fields {
						slug
					}
				}
			}
    }
  }
`;