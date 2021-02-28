import React, { Component } from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Img from "gatsby-image";
import Masonry from "react-masonry-component";
import slugify from "slugify";
import Layout from "../components/Layout";

import SEO from "../components/SEO";

const Image = ({ alt, image, className }) => {
  console.log(image);
  return image.extension === "gif" ? (
    <img className={className} src={image.publicURL} alt={alt} />
  ) : (
    <Img fluid={image.childImageSharp.fluid} alt={alt} className={className} />
  );
};

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  copyLink = () => {
    this.articleLink.select();
    document.execCommand("copy");
    this.setState({ copying: true });
    setTimeout(() => {
      this.setState({ copying: false });
    }, 3000);
  };

  render() {
    const { article } = this.props;

    return (
      <article
        id={slugify(article.frontmatter.title, { lower: true })}
        className="marginBottom-12 bp-1_marginBottom-14 bp-2_marginBottom-21"
      >
        {article.frontmatter.image &&
        article.frontmatter.image.image &&
        article.frontmatter.image.isPortrait ? (
          <div className="nestedGrid-6-2">
            <div className="colSpan-1"></div>
            {article.frontmatter.image.image && (
              <Image
                {...article.frontmatter.image}
                className="colSpan-4 marginBottom-5 bp-2_marginBottom-6"
              />
            )}
          </div>
        ) : (
          article.frontmatter.image &&
          article.frontmatter.image.image && (
            <Image
              {...article.frontmatter.image}
              className="colSpan-4 marginBottom-5 bp-2_marginBottom-6"
            />
          )
        )}

        <h2 className="f-headline-a">{article.frontmatter.title}</h2>
        <time className="c-gray f-headline-a">{article.frontmatter.date}</time>
        <div
          className="f-copy-book
                        marginTop-3
                        bp-1_marginTop-4 
                        bp-2_marginTop-5
                        marginBottom-5"
        >
          <MDXRenderer>{article.body}</MDXRenderer>
        </div>
        <button className="f-copy-book copyButton" onClick={this.copyLink}>
          {this.state.copying ? "Link Copied!" : "Share This"}
        </button>
        <textarea
          className="copyInput"
          ref={(el) => (this.articleLink = el)}
          name="articleLink"
          id="articleLink"
          defaultValue={`http://bc-oa.com/news#${slugify(
            article.frontmatter.title,
            { lower: true }
          )}`}
        ></textarea>
      </article>
    );
  }
}

const renderArticles = (articles) =>
  articles.map((article, i) => (
    <li
      key={i}
      className=" bp-1_masonry-child-2col
                    bp-2_masonry-child-3col"
    >
      <Article article={article} />
    </li>
  ));

const NewsPageTemplate = ({ data, breakpoint }) => {
  const news = data.news.frontmatter;
  const articles = data.articles.nodes;

  return (
    <div className="container bp-2_marginBottom-8">
      <SEO
        postImage={news.seo.image.childImageSharp.fluid.src}
        postData={news}
      />
      <h1 className="f-page-title marginTop-8 marginBottom-7 bp-1_marginTop-10 bp-2_marginTop-17 bp-2_marginBottom-12">
        {news.title}
      </h1>
      {articles && (breakpoint === "large" || breakpoint === "medium") ? (
        <Masonry
          className={"masonry"}
          elementType={"ul"}
          options={{ transitionDuration: 0, horizontalOrder: true }}
        >
          {renderArticles(articles)}
        </Masonry>
      ) : (
        renderArticles(articles)
      )}
    </div>
  );
};

const ArticlePage = (props) => {
  return (
    <Layout
      {...props}
      render={(_, breakpoint) => (
        <NewsPageTemplate data={props.data} breakpoint={breakpoint} />
      )}
    />
  );
};

export default ArticlePage;

export const query = graphql`
  query NewsPageQuery {
    news: mdx(fields: { slug: { eq: "/news/" } }) {
      id
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
      }
    }
    articles: allMdx(
      filter: { frontmatter: { templateKey: { eq: "article" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        id
        body
        frontmatter {
          templateKey
          title
          date(formatString: "M.D.YYYY")

          image {
            alt
            image {
              extension
              publicURL
              childImageSharp {
                fluid(maxWidth: 1200) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            isPortrait
          }
        }
        fields {
          slug
        }
      }
    }
  }
`;
