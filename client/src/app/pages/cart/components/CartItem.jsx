import NoImage from "../../../../assets/images/no-image.png";
import { numberWithCommas } from "../../../shared/helper/data";

const CartItem = (props) => {
  const { productCart } = props;

  console.log(productCart);

  if (productCart && productCart.sku === null) {
    return (
      <tr>
        <td>
          <img src={productCart.product.images[0] || NoImage} alt="Product" />
        </td>
        <td>
          <p>{productCart.product.name}</p>
        </td>
        <td></td>
        <td></td>
        <td>
          <span className="price">
            {numberWithCommas(productCart.product.maxPrice)}đ
          </span>
        </td>
        <td>
          <input
            type="number"
            min="1"
            value={productCart.quantity}
            className="form-control input-quantity"
          />
        </td>
        <td>
          <span className="price">
            {numberWithCommas(
              productCart.quantity * productCart.product.maxPrice
            )}
            đ
          </span>
        </td>
        <td>
          <button>
            <ion-icon name="trash-outline"></ion-icon>
          </button>
        </td>
      </tr>
    );
  }
  return <></>;
};

export default CartItem;
