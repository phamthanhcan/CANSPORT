import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { getListCategory } from "../home.actions";

const CategoryCarousel = (props) => {
  const categories = useSelector((state) => state.category.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListCategory());
  }, [dispatch]);

  console.log(categories?.filter((item) => item.status === true));

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    arrows: true,
    slidesToScroll: 1,
    autoplay: true,
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
    <Slider className="category" {...settings}>
      {categories
        ?.filter((category) => category.status === true)
        .map((item) => {
          return (
            <div key={item.id} className="category-item px-2">
              <img className="category-img" src={item.image} alt={item.name} />
              <p className="txt-center category-name">{item.name}</p>
            </div>
          );
        })}
    </Slider>
  );
};

export default CategoryCarousel;
