import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};

const banners = [
  {
    id: 1,
    imageUrl:
      "https://bizweb.dktcdn.net/100/108/842/themes/775959/assets/slide-img1.jpg?1669439764403",
  },
  {
    id: 2,
    imageUrl:
      "https://bizweb.dktcdn.net/100/108/842/themes/775959/assets/slide-img2.jpg?1669439764403",
  },
  {
    id: 3,
    imageUrl:
      "https://bizweb.dktcdn.net/100/108/842/themes/775959/assets/slide-img3.jpg?1669439764403",
  },
  {
    id: 4,
    imageUrl:
      "https://bizweb.dktcdn.net/100/108/842/themes/775959/assets/slide-img4.jpg?1669439764403",
  },
];

const BannerSlide = () => {
  return (
    <section className="section-banners">
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.id} className="banner">
            <img src={banner.imageUrl} alt="" />
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default BannerSlide;
