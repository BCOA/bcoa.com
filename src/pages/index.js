import React from "react";
import Link from "gatsby-link";
import "./index.scss";

export default ({ data }) => <h1>Featured page</h1>;

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;

/*
steps for creating data should be...
  set up the config.yml
  push it up
  add content to the cms
  pull it down
  set up the query
  add the data to the html render
*/
