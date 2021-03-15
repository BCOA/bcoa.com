import React from "react";
import Img from "gatsby-image";

export default ({ alt, image, className }) => {
  if (!image) {
    return null;
  }
  return image.extension === "gif" ? (
    <img className={className} src={image.publicURL || image} alt={alt} />
  ) : image.childImageSharp ? (
    <Img fluid={image.childImageSharp.fluid} alt={alt} className={className} />
  ) : (
    <img src={image} alt={alt} />
  );
};
