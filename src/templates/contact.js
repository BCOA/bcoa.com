import React from "react";

export default ({ data }) => {
  const post = data.markdownRemark;
  const fields = post.frontmatter;
  return (
		<h1>Contact</h1>
  );
};