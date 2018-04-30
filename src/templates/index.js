import React from "react";
import Link from "gatsby-link";

export default ({ data }) => {
  console.log(data);
  const edges = data.allMarkdownRemark.edges;
  const projects = edges.filter(
    edge =>
      edge.node.frontmatter.templateKey === "project-page" &&
      edge.node.frontmatter.featured
  );
  console.log(projects);
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
            templateKey
            featured
            previewImage {
              url
              alt
            }
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
