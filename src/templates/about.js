import React from "react";
import Link from "gatsby-link";

export default ({ data }) => (
	<div>
    <h2>{data.markdownRemark.frontmatter.title}</h2>
    <h2>{data.markdownRemark.frontmatter.subtitle}</h2>
    <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.frontmatter.body }} />
  </div>	
);

export const query = graphql`
  query AboutPageQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        subtitle
      }
    }
  }
`;
