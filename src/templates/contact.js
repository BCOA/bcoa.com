import React from "react";
import Image from "../components/Image";


export default ({ data }) => {
  return (
		<div>
			<h1>Contact</h1>
		</div>
  );
};

// export const query = graphql`
//   query ContactPageQuery($slug: String!) {
//     markdownRemark(fields: { slug: { eq: $slug } }) {
//       id
//       html
//       frontmatter {
//         title
// 				heroImage
// 				message
//       }
//     }
//   }
// `;