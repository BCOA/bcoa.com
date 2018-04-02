const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require("path");

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: "pages" });
    createNodeField({
      node,
      name: "slug",
      value: slug
    });
  }
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                templateKey
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        if (node.frontmatter.templateKey === "project-page") {
          createPage({
            path: node.fields.slug,
            component: path.resolve("./src/templates/project.js"),
            context: {
              // Data passed to context is available in page queries as GraphQL variables.
              slug: node.fields.slug
            }
          });
        } else {
          createPage({
            path: node.fields.slug,
            component: path.resolve("./src/templates/blog-post.js"),
            context: {
              // Data passed to context is available in page queries as GraphQL variables.
              slug: node.fields.slug
            }
          });
        }
      });
      resolve();
    });
  });
};
