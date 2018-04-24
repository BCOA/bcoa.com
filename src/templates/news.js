import React from "react";
import Image from "../components/Image";


export default ({ data }) => {
	// const post = data.markdownRemark;
	// const fields = post.frontmatter;
	console.log(data);
  return (
		<div>
			<h1>{data.news.edges[0].node.frontmatter.title}</h1>
			{ data.articles.edges.map(({ node }, i) => (
				<h1 key={i}>{node.frontmatter.title}</h1>
			))}
		</div>
  );
};

export const query = graphql`
  query NewsPageQuery {
		articles: allMarkdownRemark(filter: { frontmatter: { templateKey: { regex: "/article-page/" } } } ) {
			edges {
				node {
					id
					html
					frontmatter {
						templateKey
						title
						image
						date
					}
					fields {
						slug
					}
				}
			}
		}
		
		news: allMarkdownRemark(filter: { frontmatter: { templateKey: { regex: "/news-page/" } } } ) {
			edges {
				node {
					id
					frontmatter {
						title
					}
				}
			}
		}
  }
`;


// we might not want to query all markdowns, but just look for the news page ^^