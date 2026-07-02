const getImageSrc = (image, { size = "fluid" } = {}) => {
  if (!image) return null;
  if (image.extension === "gif") return image.publicURL;
  if (size === "fixed") {
    return image.childImageSharp?.fixed?.src ?? null;
  }
  return image.childImageSharp?.fluid?.src ?? null;
};

export default getImageSrc;
