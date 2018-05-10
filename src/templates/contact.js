import React from "react";
import Image from "../components/Image";

export default ({ data }) => {
  const page       = data.page;
  const pageFields = page.frontmatter;
  const contact    = data.contact;
  return (
    <div>
      <h1 className="marginTop-11 marginBottom-8">
        { pageFields.title }
      </h1>
      <img
        src={ pageFields.heroImage.url }
        alt={ pageFields.heroImage.alt }
        className="marginBottom-11"
      />
      <div className="marginBottom-17" dangerouslySetInnerHTML={{ __html: page.html }} />
        <p>{ pageFields.message }</p>
        <p>{ contact.address.street }</p>
        <p>{ contact.address.street2 }</p>
        <p>
          { contact.address.city },{ contact.address.state } { contact.address.zip }
        </p>
        <p>
          <a href={`mailto:${ contact.email }`}>email</a>
        </p>
        <a href={`tel:${ contact.phone }`}>phone</a>
    </div>
  );
};

export const query = graphql`
  query ContactPageQuery($slug: String!) {
    page: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        message
        heroImage {
          url
          alt
        }
      }
    }
    contact: contactJson {
      address {
        street
        street2
        city
        state
        zip
      }
      phone
      email
      instagram
      facebook
    }
  }
`;
