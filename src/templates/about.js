import React from "react";
import Link from "gatsby-link";
import Image from "../components/Image";

const Member = ({ member }) => (
  <div className={ member.principal ? "principal" : "" }>
    <img src={ member.image.url} alt={member.image.alt } />
    <h3>{ member.name }</h3>
    <p>{ member.jobTitle }</p>
    <p>{ member.description }</p>
  </div>
);

const Award = ({ award }) => (
  <div>
    <h3>{ award.title }</h3>
    <p>{ award.orgName }</p>
    <date>{ award.date }</date>
    <a href={ award.url } target="_blank">
      View Award
    </a>
  </div>
);

const Collaborator = ({ collaborator }) => (
  <div>
    {collaborator.url ? (
      <a href={ collaborator.url }>
        <h3>{ collaborator.name }</h3>
        <p>{ collaborator.jobTitle }</p>
        { collaborator.description && <p>{ collaborator.description }</p> }
      </a>
    ) : (
      <div>
        <h3>{ collaborator.name }</h3>
        <p>{ collaborator.jobTitle }</p>
        { collaborator.description && <p>{ collaborator.description }</p> }
      </div>
    )}
  </div>
);

export default ({ data }) => {
  const post = data.markdownRemark;
  const fields = post.frontmatter;
  const principals = fields.studioMembers.filter(member => member.principal);
  const studioMembers = fields.studioMembers.filter(
    member => !member.principal
  );
  return (
    <div style={{ backgroundColor: --lightRed }}>
      <h1>{ fields.title }</h1>
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      { principals && (
        <div>
          <h2>Principals</h2>
          <ul>
            { principals.map((member, i) => (
              <li key={`principalMember-${i}`}>
                <Member member={member} />
              </li>
            ))}
          </ul>
        </div>
      )}
      { !!studioMembers.length && (
        <div>
          <h2>Studio Members</h2>
          <ul>
            { studioMembers.map((member, i) => (
              <li key={`member-${i}`}>
                <Member member={ member } />
              </li>
            ))}
          </ul>
        </div>
      )}
      { fields.publications && (
        <div>
          <h2>Publications</h2>
          <ul>
            { fields.publications.map((publication, i) => (
              <li key={`publication-${i}`}>
                <h4>{ publication.title} </h4>
                <p>{ publication.date }</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      { fields.awards && (
        <div>
          <h2>Awards</h2>
          <ul>
            { fields.awards.map((award, i) => (
              <li key={`award-${i}`}>
                <Award award={ award } />
              </li>
            ))}
          </ul>
        </div>
      )}
      { fields.collaborators && (
        <div>
          <h2>Collaborators</h2>
          <ul>
            { fields.collaborators.map((collaborator, i) => (
              <li key={`award-${i}`}>
                <Collaborator collaborator={ collaborator } />
              </li>
            ))}
          </ul>
        </div>
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
          name
          image {
            url
            alt
          }
          jobTitle
          description
          principal
        }
        publications {
          title
          date
          url
        }
        awards {
          title
          orgName
          date
          url
        }
        collaborators {
          name
          jobTitle
          description
          url
        }
      }
    }
  }
`;
