import React, { Component } from "react";
import Slider from "react-slick";
import MediaQuery from "react-responsive";
import { icons } from "./Icons";
import Image from "./Image";

const PrevArrow = ({ onClick }) => (
  <div className="container slick-container">
    <button
      title="previous image"
      className="slick-arrow slick-previous c-white"
      onClick={onClick}
    >
      {icons.carouselArrowLeft}
    </button>
  </div>
);

const NextArrow = ({ onClick }) => (
  <div className="container slick-container">
    <button
      title="next image"
      className="slick-arrow slick-next c-white"
      onClick={onClick}
    >
      {icons.carouselArrowRight}
    </button>
  </div>
);

export default class HeroSlider extends Component {
  componentDidMount() {
    this.slider.innerSlider.list.setAttribute("tabindex", 0);
    this.slider.innerSlider.list.focus();
  }

  render() {
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: Math.floor(
        Math.random() * Math.floor(this.props.slides.length)
      ),
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    };

    return (
      <Slider
        className="hero"
        {...settings}
        ref={(el) => {
          if (el) {
            this.slider = el;
          }
        }}
      >
        {this.props.slides.map((slide, i) => {
          return slide.project ? (
            <div className="slide c-white" key={`slide-${i}`}>
              <MediaQuery orientation={"portrait"} maxWidth={1224}>
                {(matches) => {
                  if (matches && slide.portraitImage) {
                    return (
                      <Image image={slide.portraitImage} alt={slide.alt} />
                    );
                  } else if (slide.image) {
                    return <Image image={slide.image} alt={slide.alt} />;
                  } else {
                    return null;
                  }
                }}
              </MediaQuery>
            </div>
          ) : (
            <div className="slide c-white" key={`slide-${i}`}>
              {slide.image && (
                <Image image={slide.image} alt={slide.alt} />
              )}
            </div>
          );
        })}
      </Slider>
    );
  }
}
