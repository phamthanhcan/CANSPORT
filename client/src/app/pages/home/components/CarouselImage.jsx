import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarouselImage = (props) => {
  const { imgs, onClickImg } = props;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: imgs.length > 1 && 5,
    arrows: true,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider className="carousel" {...settings}>
      {imgs.map((item, index) => {
        return (
          <div key={index} className="carousel-item px-1">
            <img
              className="carousel-img"
              src={item}
              alt="product-img"
              onClick={() => onClickImg(item)}
            />
          </div>
        );
      })}
    </Slider>
  );
};

export default CarouselImage;
