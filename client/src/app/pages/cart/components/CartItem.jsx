import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import NoImage from "../../../../assets/images/no-image.png";
import { isEmpty, numberWithCommas } from "../../../shared/helper/data";
import { addProductCart, deleteItemCart } from "../cart.actions";

const CartItem = (props) => {
  const { cartItem, cartId } = props;

  const dispatch = useDispatch();

  const [amountProduct, setAmountProduct] = useState(cartItem.quantity);
  const amountTemp = useRef(cartItem.quantity);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const deletecartItem = () => {
    dispatch(
      deleteItemCart(
        cartItem.product._id,
        cartId,
        cartItem.size === null ? null : cartItem.size._id
      )
    );
  };

  const onChangeQuantity = (target) => {
    const maxQuantity = isEmpty(cartItem.size)
      ? cartItem.product.quantity
      : cartItem.size.quantity;

    if (amountTemp.current + target < 1) {
      setAmountProduct(1);
      dispatch(
        addProductCart(
          cartItem.product.id,
          !isEmpty(cartItem.size) ? cartItem.size.id : null,
          -amountTemp.current + 1,
          user.encode._id
        )
      );
    } else if (+amountTemp.current + target <= maxQuantity) {
      amountTemp.current = +amountTemp.current + target;
      setAmountProduct(+amountTemp.current);

      dispatch(
        addProductCart(
          cartItem.product.id || cartItem.product._id,
          !isEmpty(cartItem.size)
            ? cartItem.size.id || cartItem.size._id
            : null,
          target,
          user.encode._id
        )
      );
    }
  };

  const changeInputQuantity = (value) => {
    setAmountProduct(value);
  };

  return (
    <tr>
      <td>
        <img src={cartItem.product.image || NoImage} alt="Product" />
      </td>
      <td>
        <p>{cartItem.product.name}</p>
      </td>
      <td>
        {cartItem.size && (
          <div className="product-view-option">
            <span>{cartItem.size.size}</span>
          </div>
        )}
      </td>
      <td>
        <span className="price">
          {cartItem.product.price && numberWithCommas(cartItem.product.price)}đ
        </span>
      </td>
      <td>
        <input
          type="button"
          className="btn-quantity"
          value="-"
          onClick={() => onChangeQuantity(-1)}
        />
        <input
          type="number"
          min="1"
          value={amountProduct}
          className="form-control input-quantity"
          onChange={(e) => changeInputQuantity(e.target.value)}
          onBlur={(e) =>
            onChangeQuantity(+e.target.value - +amountTemp.current)
          }
        />
        <input
          type="button"
          className="btn-quantity"
          value="+"
          onClick={() => onChangeQuantity(1)}
        />
      </td>
      <td>
        {cartItem.product.discount > 0 ? cartItem.product.discount + "%" : ""}
      </td>
      <td>
        <span className="price">
          {cartItem !== null &&
            numberWithCommas(
              cartItem.quantity * cartItem.product.price -
                cartItem.quantity *
                  cartItem.product.price *
                  (cartItem.product.discount / 100)
            )}
          đ
        </span>
      </td>
      <td>
        <button onClick={deletecartItem}>
          <ion-icon name="trash-outline"></ion-icon>
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
