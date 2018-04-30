import React from "react";
import Link from "gatsby-link";

export default ({ data }) => {
  console.log(data);
  const edges = data.projects.edges;
  const projects = edges.filter(
    edge =>
      edge.node.frontmatter.templateKey === "project-page" &&
      edge.node.frontmatter.featured
  );
  // console.log(projects);
  return (
    <div>
      <ul>
        {data.page.frontmatter.carouselImages.map((slide, i) => (
          <li>
            <img src={slide.url} alt={slide.alt} />
          </li>
        ))}
      </ul>
      <h2>{data.page.frontmatter.title}</h2>
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
    </div>
  );
};

export const query = graphql`
  query IndexQuery($slug: String!) {
    page: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      frontmatter {
        title
        carouselImages {
          url
          alt
        }
      }
    }
    projects: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
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
