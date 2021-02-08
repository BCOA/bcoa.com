import React, { Component } from "react";
import { graphql } from "gatsby";
import Link from "gatsby-link";
import Img from "gatsby-image";
import ProjectFilter from "../components/ProjectFilter";
import SEO from "../components/SEO";
import Layout from "../components/Layout";

class Work extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterValue: "all",
    };
  }

  filterProjects(project) {
    if (this.state.filterValue === "all") {
      return true;
    }
    return project.frontmatter.type === this.state.filterValue;
  }

  renderFilterTransition = (filterValue) => {
    this.setState({ inTransition: true });
    setTimeout(() => this.setState({ filterValue: filterValue }), 250);
    setTimeout(() => this.setState({ inTransition: false }), 500);
  };

  render() {
    const page = this.props.data.page.frontmatter;
    const projects = this.props.data.projects.nodes;
    const projectOrder = page.projects;
    //creates user defined order of projects from page frontmatter
    const orderedProjects = projectOrder
      .map((title) => {
        return projects.find((project) => {
          return project.frontmatter.title === title.project;
        });
      })
      .filter((project) => project.frontmatter.isPublished);

    return (
      <div
        className="container
                        marginBottom-11
                        bp-1_marginBottom-3
                        bp-2_marginBottom-9"
      >
        <SEO
          postImage={page.seo.image && page.seo.image.childImageSharp.fluid.src}
          postData={page}
        />
        <div
          className="flex
                          justifySpaceBetween
                          marginTop-7 marginBottom-6
                          bp-1_marginTop-10
                          bp-2_marginTop-17 bp-2_marginBottom-12"
        >
          <h1 className="f-page-title">{page.title}</h1>
          <ProjectFilter
            isWindowLarge={this.props.breakpoint === "large"}
            onChange={(val) => this.renderFilterTransition(val)}
          />
        </div>
        <ul
          className={`${
            this.state.inTransition ? "inTransition" : ""
          } bp-1_grid-3col bp-2_grid-4col`}
        >
          {projects &&
            orderedProjects
              .filter((project) => this.filterProjects(project))
              .map((project, i) => {
                return (
                  <li key={i}>
                    <article className="workProject marginBottom-9 bp-2_marginBottom-21">
                      <Link to={`/projects${project.fields.slug}`}>
                        {project.frontmatter.previewImage.image && (
                          <Img
                            fluid={
                              project.frontmatter.previewImage.image
                                .childImageSharp.fluid
                            }
                            className="marginBottom-3"
                            alt={project.frontmatter.previewImage.alt}
                          />
                        )}
                        <h1 className="f-subhead">
                          {project.frontmatter.title}
                        </h1>
                      </Link>
                    </article>
                  </li>
                );
              })}
        </ul>
      </div>
    );
  }
}

const WorkPage = (props) => {
  return (
    <Layout
      {...props}
      render={(ref, breakpoint) => (
        <Work data={props.data} intersectionRef={ref} breakpoint={breakpoint} />
      )}
    />
  );
};

export default WorkPage;

export const query = graphql`
  query WorkQuery {
    projects: allMdx(
      filter: {
        frontmatter: {
          templateKey: { regex: "/project/" }
          isPublished: { eq: true }
        }
      }
    ) {
      nodes {
        id
        frontmatter {
          title
          isPublished
          seo {
            title
            description
            image {
              childImageSharp {
                fluid(maxWidth: 1200) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          type
          previewImage {
            image {
              childImageSharp {
                fluid(maxWidth: 768, quality: 80) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            alt
          }
        }
        fields {
          slug
        }
      }
    }
    page: mdx(fields: { slug: { eq: "/work/" } }) {
      id
      frontmatter {
        title
        seo {
          title
          description
          image {
            childImageSharp {
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        projects {
          project
        }
      }
    }
  }
`;
