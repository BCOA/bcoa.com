import React from "react";

export default ({ image }) => {
  console.log(image);
  return <img src={image.image} alt={image.altText} />;
};
