import React from 'react'
import Slider from "react-slick";

const PrevArrow = ({ onClick }) => (
  <div className="slick-arrow" onClick={onClick}>
    Previous
  </div>
)

const NextArrow = ({ onClick }) => (
  <div className="slick-arrow slick-next" onClick={onClick} >
    Next
  </div>
)

export default ({ slides }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  return (
    <Slider className="hero" {...settings}>
      {slides.map((slide, i) => (
        <div className="slide" key={`slide-${i}`}>
          <div className="slide-info">
            <p>Ward Road, Location</p>
            <p>Lorem Ipsum Dolor Sit</p>
            <span>{i + 1}/{slides.length}</span>
          </div>
          <img src={slide.url} alt={slide.alt} />
        </div>
      ))}
    </Slider>
  )
}
