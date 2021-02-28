import React, { useRef, useState } from "react";
import { graphql } from "gatsby";
import moment from "moment";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Img from "gatsby-image";
import Layout from "../components/Layout";
import Image from "../components/Image";
// import ProjectImage from "../components/ProjectImage";
// import MediaQuery from "react-responsive";
import SEO from "../components/SEO";

const ArticleTemplate = ({ data, intersectionRef }) => {
  const articleLink = useRef();
  const [copying, setCopying] = useState(false);

  const copyLink = () => {
    articleLink.current.select();
    document.execCommand("copy");
    setCopying(true);
    setTimeout(() => {
      setCopying(false);
    }, 3000);
  };
  // console.log(intersectionRef);
  const post = data.mdx;
  const fields = post.frontmatter;
  return (
    <div className="bp-2_marginBottom-15">
      {/* <SEO
        postImage={fields.image.image.childImageSharp.fluid.src}
        postData={{
          slug: `/news${fields.slug}`,
          seo: {
            title:
              fields.seo && fields.seo.title ? fields.seo.title : fields.title,
            description:
              fields.seo && fields.seo.description
                ? fields.seo.description
                : fields.headline,
          },
        }}
      /> */}
      <div
        className="container
                        bp-1_paddingTop-2 bp-2_paddingTop-5
                        bp-1_marginBottom-3 bp-2_marginBottom-6"
      >
        <div className="grid-12col">
          <div className="colSpan-5">
            {fields.image && fields.image.image && fields.image.isPortrait ? (
              <div className="nestedGrid-6-2">
                <div className="colSpan-1"></div>
                {fields.image.image && (
                  <Image
                    {...fields.image}
                    className="colSpan-4 testing marginBottom-5
                            bp-2_marginBottom-6"
                  />
                )}
              </div>
            ) : (
              fields.image &&
              fields.image.image && (
                <Image
                  {...fields.image}
                  className="colSpan-4 testing marginBottom-5
                            bp-2_marginBottom-6"
                />
              )
            )}

            <h2 className="f-headline-a">{fields.title}</h2>
            <time className="c-gray f-headline-a">{fields.date}</time>
            <div
              className="f-copy-book
                        marginTop-3
                        bp-1_marginTop-4 
                        bp-2_marginTop-5
                        marginBottom-5"
            >
              <MDXRenderer>{post.body}</MDXRenderer>
            </div>
            <button className="f-copy-book copyButton" onClick={copyLink}>
              {copying ? "Link Copied!" : "Share This"}
            </button>
            <textarea
              className="copyInput"
              ref={articleLink}
              name="articleLink"
              id="articleLink"
              defaultValue={`http://bc-oa.com/news/${fields.slug}`}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

const ArticlePage = (props) => {
  return (
    <Layout
      {...props}
      render={(ref) => (
        <ArticleTemplate data={props.data} intersectionRef={ref} />
      )}
    />
  );
};

export default ArticlePage;

export const query = graphql`
  query ArticlePageQuery($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        slug
        date(formatString: "M.D.YYYY")
        image {
          alt
          image {
            publicURL
            extension
            childImageSharp {
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          isPortrait
        }
      }
    }
  }
`;
