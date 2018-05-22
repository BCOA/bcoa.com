import React from "react";
import Link from "gatsby-link";
import Image from "../components/Image";

const Member = ({ member }) => (
  <div className={ member.principal ? "principal" : "" }>
    { !member.principal && <hr className="c-red marginBottom-2" /> }
    { member.principal && <img
      className="bp-1_marginBottom-2 marginBottom-3"
      src={ member.image.url}
      alt={ member.image.alt } /> }
    <h3 className="f-copy-bold">{ member.name }</h3>
    <p className={ `${ member.principal ? "f-copy-bold" : "" } bp-1_marginBottom-5 marginBottom-2` }>{ member.jobTitle }</p>
    { member.principal && <p className="marginBottom-15">{ member.description }</p> }
  </div>
);

const Publication = ({ publication }) => (
  <div className="">
    <h4 className="f-copy-bold">{ publication.title }</h4>
    <p className="marginBottom-7">{ publication.date }</p>
    <hr className="c-red marginBottom-2" />
  </div>
);

const Award = ({ award }) => (
  <div>
    <h3 className="f-copy-bold">{ award.title } - { award.orgName }</h3>
    <date className="marginBottom-7">{ award.date }</date>
    <a href={ award.url } target="_blank">
      View Award
    </a>
    <hr className="c-red marginBottom-2 marginTop-7" />
  </div>
);

const Collaborator = ({ collaborator }) => (
  <div>
    {collaborator.url ? (
      <a href={ collaborator.url }>
        <h3 className="f-copy-bold">
          { collaborator.name } - { collaborator.jobTitle }
        </h3>
        { collaborator.description && <p className="marginBottom-7">{ collaborator.description }</p> }
      </a>
    ) : (
      <div>
      <hr className="c-red marginBottom-2" />
        <h3 className="f-copy-bold">
        { collaborator.name } - { collaborator.jobTitle }
      </h3>
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
    <div className="container">
      <h1 className="f-page-title
                      marginTop-7 marginBottom-6
                      bp-1_marginTop-10 bp-1_marginBottom-9">
        { fields.title }
      </h1>
      <div className="grid-12col">
        <div
          className="f-display-copy colSpan-9
          marginBottom-16
          bp-1_marginBottom-15"
          dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
        />
      </div>
      <div className="grid-12col">
        { principals && (
          <div className="colSpan-8
                          marginBottom-2">
            <hr className="c-red
                            marginBottom-2
                            bp-1_marginBottom-3" />
            <h2 className="f-headline-c
                            marginBottom-7
                            bp-1_marginBottom-15              
                            bp-2_marginBottom-16">
              Principals
            </h2>
            <ul className="nestedGrid-8-2">
              { principals.map((member, i) => (
                <li className="f-copy" key={`principalMember-${i}`}>
                  <Member member={ member } />
                </li>
              ))}
            </ul>
          </div>
        )}

        { !!studioMembers.length && (
          <div className="colSpan-4">
            <hr className="c-red
                            marginBottom-2
                            bp-1_marginBottom-3" />
            <h2 className="f-headline-c marginBottom-7 bp-2_marginBottom-16">Studio Members</h2>
            <ul>
              { studioMembers.map((member, i) => (
                <li key={`member-${i}`}>
                  <Member member={ member } />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <hr className="c-red marginBottom-2" />
      { fields.publications && (
        <div>
        <h2 className="f-headline-c marginBottom-7">Publications</h2>
          <hr className="c-red marginBottom-2" />
          <ul>
            { fields.publications.map((publication, i) => (
              <li key={`publication-${i}`}>
              <Publication publication={ publication } />
            </li>
          ))}
          </ul>
        </div>
      )}
      { fields.awards && (
        <div>
        <h2 className="f-headline-c marginBottom-7">Awards</h2>
        <hr className="c-red marginBottom-2" />
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
          <h2 className="f-headline-c marginBottom-7">Collaborators</h2>
          <hr className="c-red marginBottom-2" />
          <ul>
            { fields.collaborators.map((collaborator, i) => (
              <li key={`award-${i}`}>
                <Collaborator collaborator={ collaborator } />
              </li>
            ))}
          </ul>
        </div>
      )}
      <hr className="c-red marginBottom-2" />
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
