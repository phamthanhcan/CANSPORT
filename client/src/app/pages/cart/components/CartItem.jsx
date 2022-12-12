import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import NoImage from "../../../../assets/images/no-image.png";
import { isEmpty, numberWithCommas } from "../../../shared/helper/data";
import { addProductCart, deleteItemCart } from "../cart.actions";

const CartItem = (props) => {
  const { productCart, cartId } = props;

  const dispatch = useDispatch();

  const [amountProduct, setAmountProduct] = useState(productCart.quantity);
  const amountTemp = useRef(productCart.quantity);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const deleteProductCart = () => {
    dispatch(
      deleteItemCart(
        productCart.product.id,
        cartId,
        productCart.size === null ? null : productCart.size.id
      )
    );
  };

  const onChangeQuantity = (target) => {
    const maxQuantity = isEmpty(productCart.size)
      ? productCart.product.quantity
      : productCart.size.quantity;

    if (amountTemp.current + target < 1) {
      setAmountProduct(1);
      dispatch(
        addProductCart(
          productCart.product.id,
          !isEmpty(productCart.size) ? productCart.size.id : null,
          -amountTemp.current + 1,
          user.encode._id
        )
      );
    } else if (+amountTemp.current + target <= maxQuantity) {
      amountTemp.current = +amountTemp.current + target;
      setAmountProduct(+amountTemp.current);

      dispatch(
        addProductCart(
          productCart.product.id || productCart.product._id,
          !isEmpty(productCart.size)
            ? productCart.size.id || productCart.size._id
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
    <tr
      key={
        productCart.size === null ? productCart.product.id : productCart.size.id
      }
    >
      <td>
        <img src={productCart.product.images[0] || NoImage} alt="Product" />
      </td>
      <td>
        <p>{productCart.product.name}</p>
      </td>
      <td>
        {productCart.size && (
          <div className="product-view-option">
            <span>{productCart.size.size}</span>
          </div>
        )}
      </td>
      <td>
        <span className="price">
          {numberWithCommas(productCart.product.price)}đ
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
      <td>{productCart.product.discount}</td>
      <td>
        <span className="price">
          {numberWithCommas(
            productCart.quantity * productCart.product.price -
              productCart.quantity *
                productCart.product.price *
                (productCart.product.discount / 100)
          )}
          đ
        </span>
      </td>
      <td>
        <button onClick={deleteProductCart}>
          <ion-icon name="trash-outline"></ion-icon>
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
