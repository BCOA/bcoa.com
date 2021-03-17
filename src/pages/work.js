import React, { Component } from "react";
import { graphql } from "gatsby";
import Link from "gatsby-link";
import ProjectFilter from "../components/ProjectFilter";
import SEO from "../components/SEO";
import Layout from "../components/Layout";
import Image from "../components/Image";

class Work extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterValue: "all",
    };
  }

  // get projects sorted by categories
  // create a document with a list you can add <to></to>

  renderFilterTransition = (filterValue) => {
    this.setState({ inTransition: true });
    setTimeout(() => this.setState({ filterValue: filterValue }), 250);
    setTimeout(() => this.setState({ inTransition: false }), 500);
  };

  render() {
    const page = this.props.data.page.frontmatter;
    const userOrderedProjects = page.projects;
    const projectsByCategory = this.props.data.projects.group;
    const allProjects = this.props.data.projects.all;

    // this should exist in both project categories list and projects.group
    // how do we sort these?
    const projectCategories = this.props.data.projects.group.map(
      (node) => node.fieldValue
    );
    // const projectOrder = page.projects;

    // how do I get all projects / make fragment and grab all
    // grab the active filter
    // order the projects / or ahead of time
    // convert to rfc?

    //creates user defined order of projects from page frontmatter
    const getProjectsByUserOrder = (filter, order = userOrderedProjects) => {
      const projects =
        filter === "all"
          ? allProjects
          : projectsByCategory.filter((node) => {
              return node.fieldValue === filter;
            })[0].nodes;
      const orderedProjects = order.filter((item) => {
        return projects.find(
          (project) => project.frontmatter.title === item.project
        );
      });
      return orderedProjects.map((item) =>
        projects.find((project) => project.frontmatter.title === item.project)
      );
    };

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
            items={projectCategories}
          />
        </div>
        <ul
          className={`${
            this.state.inTransition ? "inTransition" : ""
          } bp-1_grid-3col bp-2_grid-4col`}
        >
          {getProjectsByUserOrder(this.state.filterValue).map((project, i) => {
            const slug = project.frontmatter.slug
              ? `/${project.frontmatter.slug}`
              : project.fields.slug;
            return (
              <li key={i}>
                <article className="workProject marginBottom-9 bp-2_marginBottom-21">
                  <Link to={`/projects${slug}`}>
                    {project.frontmatter.previewImage.image && (
                      <Image
                        {...project.frontmatter.previewImage}
                        className="marginBottom-3"
                      />
                    )}
                    <h1 className="f-subhead">{project.frontmatter.title}</h1>
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
      group(field: frontmatter___categories) {
        fieldValue
        nodes {
          ...projectFields
        }
      }
      all: nodes {
        ...projectFields
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

export const PROJECT_FIELDS = graphql`
  fragment projectFields on Mdx {
    id
    frontmatter {
      slug
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
      previewImage {
        image {
          extension
          publicURL
          childImageSharp {
            fluid(maxWidth: 768, quality: 80) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        alt
      }
    }
  }
`;
