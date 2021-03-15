import React from "react";
import Hero from "../components/Hero";
import ProjectImage from "../components/ProjectImage";

export default (props) => {
  const entry = props.entry;
  const title = entry.getIn(["data", "title"]);
  const headline = entry.getIn(["data", "headline"]);
  const condition = entry.getIn(["data", "condition"]);
  const body = entry.getIn(["data", "body"]);
  const heroImg =
    props.widgetsFor("heroImage").getIn(["data", "image"]) &&
    props
      .getAsset(props.widgetsFor("heroImage").getIn(["data", "image"]))
      .toString();

  const primaryImg = {
    image:
      props.widgetsFor("primaryImage").getIn(["data", "image"]) &&
      props
        .getAsset(props.widgetsFor("primaryImage").getIn(["data", "image"]))
        .toString(),
    caption: props.widgetsFor("primaryImage").getIn(["data", "caption"]),
    alt: props.widgetsFor("primaryImage").getIn(["data", "alt"]),
  };

  const { titleInfoObject, infoObject } = props
    .widgetsFor("infoObjects")
    .getIn(["data"])
    .toJS();

  const projectGallery = props.widgetsFor("projectGallery");
  let firstGalleryImage;

  projectGallery.map((item, i) => {
    if (item) {
      if (item.getIn(["data", "type"]) === "image" && i === 0) {
        return (firstGalleryImage = {
          image:
            item.getIn(["data", "image"]) &&
            props.getAsset(item.getIn(["data", "image"])).toString(),
          caption: item.getIn(["data", "caption"]),
          alt: item.getIn(["data", "alt"]),
          offsetWidth: item.getIn(["data", "offsetWidth"]),
          colWidth: item.getIn(["data", "colWidth"]),
        });
      } else {
        return null;
      }
    } else return null;
  });

  return (
    <div>
      {condition}
      <div
        className="container
                      bp-1_paddingTop-2 bp-2_paddingTop-5
                      bp-1_marginBottom-3 bp-2_marginBottom-6"
      >
        <div className="project-name">
          <h2 className="f-page-title">{title}</h2>
        </div>
      </div>

      {heroImg && <Hero image={heroImg} alt={"hero image"} />}

      <div className="container marginTop-5 bp-1_marginTop-9 bp-2_marginTop-31">
        <div className="grid-12col">
          <div className="colSpan-5">
            <h3 className="f-headline-b marginBottom-4 bp-1_marginBottom-13 bp-2_marginBottom-11">
              {headline}-
            </h3>
            {body && (
              <div
                className="md marginBottom-5 bp-1_marginBottom-5 bp-2_marginBottom-10"
                dangerouslySetInnerHTML={{ __html: body }}
              />
            )}

            {infoObject && (
              <div className="infoObjects">
                {infoObject && (
                  <>
                    <dl className="bp-1_grid-2col marginBottom-8 bp-1_marginBottom-13 bp-2_marginBottom-24">
                      {titleInfoObject && (
                        <TitleInfoObject
                          title={titleInfoObject.title}
                          description={titleInfoObject.description}
                        />
                      )}
                      {infoObject.map((item, i) => (
                        <InfoObject
                          key={`infoObject-${i}`}
                          title={item.title}
                          description={item.description}
                        />
                      ))}
                    </dl>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="colSpan-1"></div>

          {primaryImg && (
            <div
              className={`project-primaryImage colSpan-6 bp-1_marginTop-1 bp-2_marginTop-3`}
            >
              <ProjectImage
                className={
                  firstGalleryImage && firstGalleryImage.colWidth > 6
                    ? ""
                    : "absolute"
                }
                key="primary-image"
                imageData={primaryImg}
              />
            </div>
          )}
        </div>
        <div>
          {projectGallery && (
            <div className="project-images grid-12col">
              {projectGallery.map((item, i) => {
                if (item) {
                  if (item.getIn(["data", "type"]) === "image") {
                    const image = {
                      image:
                        item.getIn(["data", "image"]) &&
                        props
                          .getAsset(item.getIn(["data", "image"]))
                          .toString(),
                      caption: item.getIn(["data", "caption"]),
                      alt: item.getIn(["data", "alt"]),
                      offsetWidth: item.getIn(["data", "offsetWidth"]),
                      colWidth: item.getIn(["data", "colWidth"]),
                    };
                    return <ProjectImage key={i} index={i} imageData={image} />;
                  } else {
                    return (
                      <blockquote
                        key={i}
                        className="colSpan-12 t-center f-headline-b 
                                            marginBottom-11 bp-1_marginBottom-13 bp-2_marginBottom-28
                                            marginTop-5 bp-1_marginTop-8 bp-2_marginTop-14"
                      >
                        {item.getIn(["data", "pullQuote"])}
                      </blockquote>
                    );
                  }
                }
                return null;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const InfoObject = ({ title, description }) => {
  return (
    <div className="marginBottom-4 bp-2_marginBottom-6">
      <dt className="f-credit">{title}</dt>
      <dd className="f-caption">{description}</dd>
    </div>
  );
};

const TitleInfoObject = ({ title, description }) => {
  return (
    <div className="marginBottom-4 bp-2_marginBottom-6">
      <span className="f-credit">{title}</span>
      <h1 className="f-caption f-copy">{description}</h1>
    </div>
  );
};
