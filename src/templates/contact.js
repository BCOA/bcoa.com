import React from "react";
import Image from "../components/Image";

export default ({ data }) => {
  console.log(data);
  const page = data.page;
  const pageFields = page.frontmatter;
  const contact = data.contact;
  return (
    <div>
      <img src={pageFields.heroImage.image} alt={pageFields.heroImage.alt} />
      <h1>{pageFields.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.html }} />
      <p>{pageFields.message}</p>
      <p>{contact.address.street}</p>
      <p>{contact.address.street2}</p>
      <p>
        {contact.address.city},{contact.address.state} {contact.address.zip}
      </p>
      <p>
        <a href={`mailto:${contact.email}`}>email</a>
      </p>
      <a href={`tel:${contact.phone}`}>phone</a>
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
          image
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
