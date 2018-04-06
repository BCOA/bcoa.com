import React from "react";

export default ({image}) => {
	return(
		<img src={image.imageURL} alt={image.altText} />
	);
};