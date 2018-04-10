import React from "react";
import Link from "gatsby-link";
import Image from "../components/Image";

export default ({ data }) => {
  const post = data.markdownRemark;
  const fields = post.frontmatter;
  return (
    <div>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      {fields.studioMembers && (
        <ul>
          {fields.studioMembers
            .filter(member => member.principal)
            .map((member, i) => (
              <li key={i}>
                <h1>TIS A PRINCIPAL</h1>
                <img src={member.memberImage} />
                <h3>{member.memberName}</h3>
                <p>{member.jobTitle}</p>
                <p>{member.memberDescription}</p>
              </li>
            ))}
        </ul>
      )}
      {fields.studioMembers && (
        <ul>
          {fields.studioMembers
            .filter(member => !member.principal)
            .map((member, i) => (
              <li key={i}>
                <img src={member.memberImage} />
                <h3>{member.memberName}</h3>
                <p>{member.jobTitle}</p>
                <p>{member.memberDescription}</p>
              </li>
            ))}
        </ul>
      )}
      {fields.publications && (
        <ul>
          {fields.publications.map(publication => <h2>{publication.title}</h2>)}
        </ul>
      )}
    </div>
  );
};

export const query = graphql`
  query AboutPageQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        studioMembers {
          memberName
          memberImage
          jobTitle
          memberDescription
          principal
        }
        publications {
          title
          date
          url
        }
        awards {
          awardTitle
          orgName
          date
          url
        }
      }
    }
  }
`;
