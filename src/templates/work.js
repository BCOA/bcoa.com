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

// export const query = graphql`
//   query WorkQuery {
//     allMarkdownRemark {
//       edges {
//         node {
//           id
//           frontmatter {
//             templateKey
//             title
//             previewImage {
//               url
//               alt
//             }
//           }
//           fields {
//             slug
//           }
//         }
//       }
//     }
//   }
// `;

// TODO: query for title of work/index(this js file ^^) page from index.js
