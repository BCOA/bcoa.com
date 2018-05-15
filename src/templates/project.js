import React, { Fragment } from "react";

import ProjectImage from "../components/ProjectImage";
import Hero from "../components/Hero";

export default ({ data }) => {
  const post = data.markdownRemark;
  const fields = post.frontmatter;
  return (
    <div>
      <div className="container
                      bp-1_paddingTop-2 bp-2_paddingTop-5
                      bp-1_marginBottom-3 bp-2_marginBottom-6">
        <div className="project-name">
          <h2 className='f-page-title'>{fields.name}</h2>
        </div>
      </div>

      <Hero image={fields.heroImage.url} alt={fields.heroImage.alt} />
      <div className="container marginTop-5 bp-1_marginTop-9 bp-2_marginTop-31">
      {/* Always will be 2 lines of text, even on large resolution as the first image of the proj img array will float over on the right side */}
        <h1 className='f-headline-b marginBottom-4 bp-1_marginBottom-13 bp-2_marginBottom-28'>
          {fields.title}-
        </h1>
        <div className="marginBottom-5 bp-1_marginBottom-5 bp-2_marginBottom-10"
             dangerouslySetInnerHTML={{ __html: post.html }}
        />

        {fields.infoObject && (
          <div>
            <dl className='marginBottom-12 bp-1_marginBottom-16 bp-2_marginBottom-30'>
              {fields.infoObject.map((item, i) => (
                <div key={`infoObject-${i}`} className='marginBottom-4'>
                  <dt className="f-credit">{item.title}</dt>
                  <dd className="f-caption">{item.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {fields.projectImages &&
          <div className="project-images grid-12col">
            {fields.projectImages.map((image, i) => (
              <ProjectImage key={i} image={image} />
            ))}
            <blockquote className="colSpan-12 t-center f-headline-b 
                                   marginBottom-11 bp-1_marginBottom-13 bp-2_marginBottom-28
                                   marginTop-5 bp-1_marginTop-4 bp-2_marginTop-23">
              {fields.pullQuote}
            </blockquote>
          </div>
        }
        
      </div>
    </div>
  );
};

export const query = graphql`
  query ProjectPageQuery($slug: String!) {
        markdownRemark(fields: {slug: {eq: $slug } }) {
        id
      html
      frontmatter {
        title
        name
      infoObject {
        title
          description
      }
        heroImage {
        url
          alt
      }
        projectImages {
        image
          colWidth
      offsetWidth
      alt
      caption
    }
    pullQuote
  }
}
}
`;
