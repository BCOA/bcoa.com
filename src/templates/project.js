import React from "react";
import Image from "../components/Image";

export default ({ data }) => {
  const post = data.markdownRemark;
  const fields = post.frontmatter;
  return (
    <div>
      <h3>{fields.name}</h3>
      <img src={fields.heroImage.url} alt={fields.heroImage.alt} />
      <h1>{fields.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      {fields.infoObject && (
        <div>
          <h2>Project Info</h2>
          <dl>
            {fields.infoObject.map((item, i) => (
              <div key={`infoObject-${i}`}>
                <dt>{item.title}</dt>
                <dd>{item.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
      {fields.projectImages &&
        fields.projectImages.map((image, i) => (
          <div key={i}>
            <Image image={image} />
            {image.caption && <p>{image.caption}</p>}
          </div>
        ))}
      <blockquote>{fields.pullQuote}</blockquote>
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
