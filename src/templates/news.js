import React from "react";
import Image from "../components/Image";

export default ({ data }) => {
  const news = data.news.frontmatter;

  return (
    <div>
      <h1 className="marginTop-11 marginBottom-8">{ news.title }</h1>
      <ul>
        { data.articles.edges.map(({ node }, i) => (
          <li key={i}>
            <img
              src={ node.frontmatter.image.url }
              alt={ node.frontmatter.image.alt }
              className="marginBottom-11"
            />
            <h2>{ node.frontmatter.title }</h2>
            <time className="marginBottom-8">
              { node.frontmatter.date }
            </time>
            <div
              className="marginBottom-13"
              dangerouslySetInnerHTML={{ __html: node.html }}
            />
          </li>
        ))}
      </ul>
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
            image {
              url
              alt
            }
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
