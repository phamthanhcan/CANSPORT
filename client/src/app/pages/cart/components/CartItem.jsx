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
        productCart.sku === null ? null : productCart.sku.id
      )
    );
  };

  const onChangeQuantity = (target) => {
    const maxQuantity = isEmpty(productCart.sku)
      ? productCart.product.quantity
      : productCart.sku.quantity;

    if (amountTemp.current + target < 1) {
      setAmountProduct(1);
      dispatch(
        addProductCart(
          productCart.product.id,
          !isEmpty(productCart.sku) ? productCart.sku.id : null,
          -amountTemp.current + 1,
          user.encode._id
        )
      );
    } else if (+amountTemp.current + target <= maxQuantity) {
      amountTemp.current = +amountTemp.current + target;
      setAmountProduct(+amountTemp.current);

      console.log({
        productId: productCart.product.id || productCart.product._id,
        skuId: !isEmpty(productCart.sku)
          ? productCart.sku.id || productCart.sku._id
          : null,
        target: target,
        userId: user.encode._id,
      });
      dispatch(
        addProductCart(
          productCart.product.id || productCart.product._id,
          !isEmpty(productCart.sku)
            ? productCart.sku.id || productCart.sku._id
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

  if (productCart.sku === null) {
    return (
      <tr key={productCart.product.id || productCart.product._id}>
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
              productCart.quantity * productCart.product.maxPrice -
                productCart.quantity *
                  productCart.product.maxPrice *
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
  }
  return (
    <tr key={productCart.sku.id}>
      <td>
        <img src={productCart.sku.image || NoImage} alt="Product" />
      </td>
      <td>
        <p>{productCart.product.name}</p>
      </td>
      <td>
        <div
          className="product-view-option"
          style={{ backgroundColor: productCart.sku.color }}
        ></div>
      </td>
      <td>
        <div className="product-view-option">
          <span>{productCart.sku.size}</span>
        </div>
      </td>
      <td>
        <span className="price">
          {numberWithCommas(productCart.sku.price)}đ
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
      <td>{productCart.sku.discount}</td>
      <td>
        <span className="price">
          {numberWithCommas(
            productCart.quantity * productCart.sku.price -
              productCart.quantity *
                productCart.sku.price *
                (productCart.sku.discount / 100)
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
