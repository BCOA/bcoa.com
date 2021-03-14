import React from "react";
import Link from "gatsby-link";
import Image from "../components/Image";

const FeaturedProjectImage = (props) => {
  return <Image {...props} />;
};

export default function FeaturedProjects({ projects }) {
  return projects.map((project, i) => {
    return (
      <li className="bp-1_masonry-child-2col" key={i}>
        <article className="featuredProject">
          <Link to={`projects/${project.frontmatter.slug}`}>
            {project.frontmatter.featured.featuredImage.isPortrait ? (
              <div className="nestedGrid-6-2">
                <div className="colSpan-1"></div>
                {project.frontmatter.featured.featuredImage.image && (
                  <FeaturedProjectImage
                    className="colSpan-4 marginBottom-5 bp-2_marginBottom-6"
                    {...project.frontmatter.featured.featuredImage}
                  />
                )}
              </div>
            ) : (
              project.frontmatter.featured.featuredImage.image && (
                <FeaturedProjectImage
                  className="marginBottom-5 bp-2_marginBottom-6"
                  {...project.frontmatter.featured.featuredImage}
                />
              )
            )}
            <div className="featured-info">
              <h1
                className=" f-headline-d
                              marginBottom-5
                              bp-2_marginBottom-10"
              >
                {project.frontmatter.headline}&nbsp;&#8212;
              </h1>
              <div
                className="f-subhead
                              marginBottom-12
                              bp-1_marginBottom-14
                              bp-2_marginBottom-30"
              >
                <p>{project.frontmatter.featured.featuredDescription}</p>
                <p className="underline">Read More</p>
              </div>
            </div>
          </Link>
        </article>
      </li>
    );
  });
}
