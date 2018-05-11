import React, { Fragment } from "react";

import Image from "../components/Image";
import Hero from "../components/Hero";

export default ({ data }) => {
  const post = data.markdownRemark;
  const fields = post.frontmatter;
  return (
    <div>
      <div className="container">
        <div className="project-name">
          <h2 className='f-page-title'>{fields.name}</h2>
        </div>
      </div>
      <Hero image={fields.heroImage.url} alt={fields.heroImage.alt} />
      <div className="container">
        <h1 className='f-headline-b'>{fields.title}–</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        {fields.infoObject && (
          <div>
            <dl className='marginBottom-10'>
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
          fields.projectImages.map((image, i) => (
            <figure key={i} className="marginBottom-6">
              <Image image={image} />
              {image.caption &&
                <div>
                  –
                  <figcaption className='f-caption'>{image.caption}</figcaption>
                </div>
              }
            </figure>
          ))}
        <blockquote className="t-center f-headline-b marginVertical-13">{fields.pullQuote}</blockquote>
      </div>
    </div>
  );
};

export const query = graphql`
  query ProjectPageQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
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
