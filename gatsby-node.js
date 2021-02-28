const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

// exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
//   createTypes(`
//     type Mdx implements Node
//   `);
// };

async function turnIntoPages({ graphql, actions }) {
  const projectTemplate = path.resolve(`src/templates/project.js`);
  const articleTemplate = path.resolve(`src/templates/article.js`);

  const { data } = await graphql(`
    query {
      projects: allMdx(
        filter: {
          frontmatter: {
            templateKey: { eq: "project" }
            isPublished: { eq: true }
          }
        }
      ) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            templateKey
            slug
          }
        }
      }
      articles: allMdx(
        filter: { frontmatter: { templateKey: { eq: "article" } } }
      ) {
        nodes {
          id
          frontmatter {
            templateKey
            slug
          }
          fields {
            slug
          }
        }
      }
    }
  `);
  const projects = data.projects.nodes;
  const articles = data.articles.nodes;

  articles.forEach((article) => {
    actions.createPage({
      path: `/news/${article.frontmatter.slug}`,
      component: articleTemplate,
      context: {
        id: article.id,
        slug: article.frontmatter.slug,
      },
    });
  });

  projects.forEach((project) => {
    const slug = project.frontmatter.slug;
    actions.createPage({
      path: `/projects/${slug}`,
      component: projectTemplate,
      context: {
        id: project.id,
        slug,
      },
    });
  });
}

exports.createPages = async (params) => {
  await turnIntoPages(params);
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
