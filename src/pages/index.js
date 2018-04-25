import React from "react";
import Link from "gatsby-link";
import "./index.scss";

export default ({ data }) => (
  <ul>
    <li>
      <Link to="/work">Work</Link>
    </li>
    <li>
      <Link to="/about">About</Link>
    </li>
    <li>
      <Link to="/news">News</Link>
    </li>
    <li>
      <Link to="/contact">Contact</Link>
    </li>
  </ul>
);

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
