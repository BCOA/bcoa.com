import React from "react";

export default ({ data }) => {
  const post = data.markdownRemark;
  const fields = post.frontmatter;
  return (
    <div>
      <img src={fields.heroImage} alt="" />
      <h3>{fields.name}</h3>
      <h1>{fields.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      {fields.infoObject && (
        <dl>
          <dt>{fields.infoObject.title}</dt>
          <dd>{fields.infoObject.description}</dd>
        </dl>
      )}
      {fields.projectImages && fields.projectImages.map((image, i) => (
        <div key={i}>
          <img src={image.imageURL} alt={image.altText}/>
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
        heroImage
        projectImages {
          imageURL
          colWidth
          offsetWidth
          altText
          caption
        }
        pullQuote
      }
    }
  }
`;
