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
        <img src={data.image || NoImage} alt="product" />
      </div>
      <div className="product-info">
        <div>
          <div className="product-price">
            <p
              className={`product-price-${
                data.discount > 0 ? "origin" : "current"
              }`}
            >
              {numberWithCommas(data.price)}đ
            </p>
            {data.discount > 0 && (
              <p className="product-price-current">
                {numberWithCommas(
                  data.price - data.price * (data.discount / 100)
                )}
                đ
              </p>
            )}
          </div>
          <p className="product-status">HÀNG CÓ SẴN</p>
          <ul className="product-sizes">
            {data.sizes.map((size) => (
              <li
                className={`product-size-item ${
                  size.quantity === 0 ? "disabled" : ""
                }`}
                key={size._id}
              >
                <p>{size.size}</p>
              </li>
            ))}
          </ul>
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
