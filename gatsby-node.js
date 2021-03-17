const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
  createTypes(`
    type Mdx implements Node {
      frontmatter: MdxFrontmatter
    }
    type MdxFrontmatter {
      excerpt: String @mdx
    }
  `);
};

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
            redirects {
              from
              permanent
            }
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
            redirects {
              from
              permanent
            }
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
    const path = `/news/${article.frontmatter.slug}`;
    actions.createPage({
      path,
      component: articleTemplate,
      context: {
        id: article.id,
        slug: article.frontmatter.slug,
      },
    });
    const redirects = article.frontmatter.redirects;

    if (redirects && redirects.length) {
      redirects.forEach((redirect) => {
        actions.createRedirect({
          fromPath: `/news/${redirect.from}`,
          toPath: path,
          statusCode: redirect.permanent ? "301" : "302",
        });
      });
    }
  });

  projects.forEach((project) => {
    const slug = project.frontmatter.slug;
    const path = `/projects/${slug}`;
    actions.createPage({
      path,
      component: projectTemplate,
      context: {
        id: project.id,
        slug,
      },
    });

    const redirects = project.frontmatter.redirects;

    if (redirects && redirects.length) {
      redirects.forEach((redirect) => {
        actions.createRedirect({
          fromPath: `/projects/${redirect.from}`,
          toPath: path,
          statusCode: redirect.permanent ? "301" : "302",
        });
      });
    }
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
