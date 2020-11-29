import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Img from 'gatsby-image';
import Layout from '../components/Layout'
import SEO from "../components/SEO";
// import Content, { HTMLContent } from '../components/Content'

export const AboutPageTemplate = ({data}) => {
  // const PageContent = contentComponent || Content
  const post = data.mdx;
  const fields = post.frontmatter;
  const principals = fields.studioMembers.filter(member => member.principal);
  const studioMembers = fields.studioMembers.filter(member => !member.principal);

  return (
    <div className="container
                    marginBottom-15
                    bp-1_marginBottom-24
                    bp-2_marginBottom-20">
      <SEO
        postImage={fields.seo.image ? fields.seo.image.childImageSharp.fluid.src : null}
        postData={fields}
      />
      <h1 className=" f-page-title 
                      marginTop-7 marginBottom-5
                      bp-1_marginTop-10 bp-1_marginBottom-9
                      bp-2_marginTop-17 bp-2_marginBottom-21"
      >
        { fields.title }
      </h1>
      <div className="bp-2_grid-12col bp-1_grid-12col">
        <div
          // ref={intersectionRef}
          className=" md
                      f-display-copy
                      marginBottom-15
                      bp-1_colSpan-10
                      bp-2_marginBottom-26 bp-2_colSpan-8"
        >
          <MDXRenderer>{post.body}</MDXRenderer>
        </div>
      </div>
      <div className="bp-2_grid-12col">
        { principals && (
          <div className="  marginBottom-2
                            bp-1_marginBottom-11
                            bp-2_colSpan-8">
            <hr className=" marginBottom-2
                            bp-1_marginBottom-3" />
            <h2 className=" f-headline-c 
                            marginBottom-7
                            bp-1_marginBottom-15">
              Principals
            </h2>
            <ul className="nestedGrid-8-2">
              { principals.map((member, i) => (
                <li className="f-copy-bold" key={`principalMember-${i}`}>
                  <Member member={ member } />
                </li>
              ))}
            </ul>
          </div>
        )}

        { !!studioMembers.length && (
          <div className="  colSpan-4
                            bp-1_marginBottom-24">
            <hr className=" marginBottom-2
                            bp-1_marginBottom-3" />
            <h2 className=" f-headline-c 
                            marginBottom-7
                            bp-2_marginBottom-16">
              Studio Members
            </h2>
            <ul className="marginBottom-15 bp-1_marginBottom-7">
              { studioMembers.map((member, i) => (
                <li key={`member-${i}`}>
                  <Member member={ member } />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="bp-2_grid-12col bp-2_marginBottom-3">
        { fields.publications && (
          <div className="  bp-2_colSpan-6
                            bp-2_marginBottom-20">
            <hr className=" marginBottom-2" />
            <h2 className=" f-headline-c 
                            marginBottom-7
                            bp-1_marginBottom-14
                            bp-2_marginBottom-15">
              Publications
            </h2>
            <ul className="marginBottom-15 bp-1_marginBottom-24">
              { fields.publications.map((publication, i) => (
                <li key={`publication-${i}`}>
                <Publication publication={ publication } />
              </li>
            ))}
            </ul>
          </div>
        )}
        { fields.awards && (
          <div className="colSpan-6">
          <hr className=" marginBottom-2" />
          <h2 className=" f-headline-c
                          marginBottom-7
                          bp-1_marginBottom-14
                          bp-2_marginBottom-15">
            Awards
          </h2>
            <ul className="marginBottom-15 bp-1_marginBottom-24">
              { fields.awards.map((award, i) => (
                <li key={`award-${i}`}>
                  <Award award={ award } />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      { fields.collaborators && (
        <div>
          <hr className=" marginBottom-2" />
          <h2 className=" f-headline-c
                          marginBottom-7
                          bp-1_marginBottom-14
                          bp-2_marginBottom-15">
            Collaborators
          </h2>
          <ul className="bp-2_grid-2col">
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
}

const AboutPage = (props) => {
  return (
    <Layout 
      {...props} 
      render={(ref, breakpoint) => <AboutPageTemplate data={props.data} intersectionRef={ref} breakpoint={breakpoint} /> }
    /> 
  )
}

export const aboutPageQuery = graphql`
  query AboutPage {
    mdx(fields: {slug: {eq: "/about/"}}) {
      id
      body
      frontmatter {
        title
        seo {
          title
          description
          image {
            childImageSharp {
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        studioMembers {
          name
          image {
            image {
              childImageSharp {
                fluid(maxWidth: 768, quality: 75) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            alt
          }
          jobTitle
          description
          principal
          principalInfo
        }
        publications {
          title
          visibleDate
          url
          publisher
        }
        awards {
          title
          orgName
          visibleDate
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
`
export default AboutPage

const Member = ({ member }) => (
  <div className={ `${ member.principal ? "principal bp-2_marginBottom-33" : "bp-2_marginBottom-13" } ` }>
    { !member.principal && <hr className=" marginBottom-2" /> }
    {member.principal && member.image && member.image.image && 
      <Img
        className="marginBottom-3 bp-1_marginBottom-2"
        fluid={member.image.image.childImageSharp.fluid}
        alt={member.image.alt}
      /> 
    }
    <h3 className=" f-copy-bold">{ member.name }</h3>
    <p className={ `${ member.principal ? "f-copy-bold" : "" }` }>{ member.jobTitle }</p>
    <p className={ `${ member.principal ? "f-copy-bold" : "" }  marginBottom-5` }>{ member.principalInfo }</p>
    { member.principal && <p className="f-copy marginBottom-13">{ member.description }</p> }
  </div>
);

const Publication = ({ publication }) => (
  <div className="paddingBottom-7">
    <hr className="marginBottom-2" />
    <a className="f-copy-bold defaultLink" href={ publication.url } target="_blank" rel="noopener noreferrer">{ publication.title } &#8212; { publication.publisher }</a>
    {publication.visibleDate && <p className="f-copy">{ publication.visibleDate }</p>}
  </div>
);

const Award = ({ award }) => (
  <div className="paddingBottom-7">
    <hr className=" marginBottom-2" />
    <a className="f-copy-bold defaultLink" href={ award.url } target="_blank" rel="noopener noreferrer">{ award.title } &#8212; { award.orgName }</a>
    {award.visibleDate && 
      <p>
        { award.visibleDate }
      </p>
    }
  </div>
);

const Collaborator = ({ collaborator }) => (
  <div>
  <hr className="marginBottom-2" />  
    {collaborator.url ? (
      <a href={ collaborator.url } target="_blank" rel="noopener noreferrer">
        <h3 className="f-copy-bold defaultLink">
          { collaborator.name } &#8212; { collaborator.jobTitle }
        </h3>
        { collaborator.description && <p className="marginBottom-7">{ collaborator.description }</p> }
      </a>
    ) : (
      <div>
      <hr className="marginBottom-2" />
        <h3 className="f-copy-bold">
        { collaborator.name } &#8212; { collaborator.jobTitle }
      </h3>
        { collaborator.description && <p className="marginBottom-7">{ collaborator.description }</p> }
      </div>
    )}
  </div>
);
