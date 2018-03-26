import React from "react";

export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <div style={{ "background-color": post.frontmatter.color }}>
      <h1>{post.frontmatter.title}</h1>
      <h2>{post.frontmatter.color}</h2>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  );
};

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        color
      }
    }
  }
`;
