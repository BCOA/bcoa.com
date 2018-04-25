import React from "react";
import Image from "../components/Image";

export default ({ data }) => {
  const news = data.news.frontmatter;

  return (
    <div>
      <h1>{news.title}</h1>
      {data.articles.edges.map(({ node }, i) => (
        <h2 key={i}>{node.frontmatter.title}</h2>
      ))}
    </div>
  );
};

export const query = graphql`
  query NewsPageQuery($slug: String!) {
    articles: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { regex: "/article-page/" } } }
    ) {
      edges {
        node {
          id
          html
          frontmatter {
            templateKey
            title
            image
            date
          }
          fields {
            slug
          }
        }
      }
    }

    news: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      frontmatter {
        title
      }
    }
  }
`;
