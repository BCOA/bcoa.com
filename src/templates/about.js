import React from "react";
import Link from "gatsby-link";
import Image from "../components/Image";

const Award = ({ award }) => (
  <div>
    <h4>{award.awardTitle}</h4>
    <p>{award.orgName}</p>
    <date>{award.date}</date>
    <a href={award.url} target="_blank">
      View Award
    </a>
  </div>
);

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
          <h2>Publications</h2>
          {fields.publications.map((publication, i) => (
            <li key={`publication-${i}`}>
              <h4>{publication.title}</h4>
            </li>
          ))}
        </ul>
      )}
      {fields.awards && (
        <ul>
          <h2>Awards</h2>
          {fields.awards.map((award, i) => (
            <li key={`award-${i}`}>
              <Award award={award} />
            </li>
          ))}
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
