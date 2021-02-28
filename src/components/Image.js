import React from "react";
import Img from "gatsby-image";

export default ({ alt, image, className }) => {
  return image.extension === "gif" ? (
    <img className={className} src={image.publicURL} alt={alt} />
  ) : (
    <Img fluid={image.childImageSharp.fluid} alt={alt} className={className} />
  );
};
