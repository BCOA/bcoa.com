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
      <img src={fields.projectImage.imageURL} alt={fields.projectImage.altText} />
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
        projectImage {
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
