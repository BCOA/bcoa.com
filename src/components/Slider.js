import React from 'react'
import Slider from "react-slick";

export default (props) => {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  console.log(props);
  return (
    <Slider className="hero" {...settings}>
      {props.slides.map((slide, i) => (
        <div className="slide" key={`slide-${i}`}>
          <div className="slide-info">
            <p>Ward Road, Location</p>
            <p>Lorem Ipsum Dolor Sit</p>
            <span>{i + 1}/{props.slides.length}</span>
          </div>
          <img src={slide.url} alt={slide.alt} />
        </div>
      ))}
    </Slider>
  )
}
