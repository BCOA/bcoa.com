import React from "react";
import Link from "gatsby-link";

export default ({ data }) => {
  const edges = data.allMarkdownRemark.edges;
  const projects = edges.filter(
    edge => edge.node.frontmatter.templateKey === "project-page"
  );
  return (
    <ul>
      {projects &&
        projects.map(({ node: project }, i) => (
          <li key={i}>
            <article>
              <Link to={project.fields.slug}>
                <img
                  src={project.frontmatter.previewImage.url}
                  alt={project.frontmatter.previewImage.alt}
                />
                <h1>{project.frontmatter.title}</h1>
              </Link>
            </article>
          </li>
        ))}
    </ul>
  );
};

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

/*

TODO:

        // current \\
        - index.js --> query featured page(grab title and carousel)
        
        // next \\
        - image array for slider on homepage
        - confirm all data from templates is on the page…if not add it!
        - understand how to work with the date widget to display the date correctly on news
        
        // ??????????? \\
        - add better sized placeholder images to content (projects, hero images, etc)
        ----? what do you mean? full-size images are huge rn --> so what size?
        
        // DONE \\
        ------title of page = "Featured"(index.js)
        --------add work.md to pages in config.yml
        -------add title to page

*/
