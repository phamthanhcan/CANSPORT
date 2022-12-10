import { numberWithCommas } from "../../../shared/helper/data";
import Star from "../../../shared/components/modules/Star";
import Heart from "../../../../assets/icons/heart.svg";
import NoImage from "../../../../assets/images/no-image.png";

export const getNumberStar = (product) => {
  if (!product.ratingsReviews.length) return 0;
  const totalNumber = product.ratingsReviews.reduce((sum, item) => {
    return sum + +item.rating;
  }, 0);
  return (totalNumber / product.ratingsReviews.length).toFixed(1);
};

const ProductItem = (props) => {
  const { data } = props;

  return (
    <div className="product">
      {!!data.discount && (
        <p className="badge product-badge">{data.discount}%</p>
      )}
      <div className="product-img">
        <img src={data.images[0] || NoImage} alt="product" />
      </div>
      <div className="product-info">
        <div>
          <p className="mb-3">
            {data.minPrice === data.maxPrice ? (
              <>
                <span className="product-price-origin">
                  {numberWithCommas(
                    Math.floor((data.minPrice * 100) / (100 - data.discount))
                  )}
                </span>
                <span className="product-price">
                  {numberWithCommas(data.minPrice)}đ
                </span>
              </>
            ) : (
              <span className="product-price">
                {numberWithCommas(data.minPrice)}đ -{" "}
                {numberWithCommas(data.maxPrice)}đ
              </span>
            )}
          </p>
          <p className="product-status">HÀNG CÓ SẴN</p>
          <p className="product-name">{data.name}</p>
        </div>
        <div className="d-flex product-actions mt-2">
          <img src={Heart} alt="love" className="product-love" />
          <div className="d-flex">
            <Star numberStar={getNumberStar(data)} />
            <p className="product-sold pl-2">{data.sold} Đã bán</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
