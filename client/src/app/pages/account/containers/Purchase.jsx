import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Empty from "../../../shared/components/modules/Empty";
import { getOrderByUser } from "../account.actions";
import { isEmpty, numberWithCommas } from "../../../shared/helper/data";
import EditIcon from "../../../../assets/icons/edit.svg";
import LoadingPage from "../../../shared/components/modules/LoadingPage";

const Purchase = () => {
  const user = useSelector((state) => state.auth.data.encode);
  const order = useSelector((state) => state.order.data);
  const isLoading = useSelector((state) => state.order.isLoading);
  const dispatch = useDispatch();

  const [shipInfo, setShipInfo] = useState();
  const [showReview, setShowReview] = useState(false);
  const [productSelected, setProductSelected] = useState("");
  const [productOrderId, setProductOrderId] = useState("");

  console.log(order);

  useEffect(() => {
    dispatch(getOrderByUser(user._id));
  }, [dispatch]);

  return (
    <div className="purchase-page">
      <h2 className="section-title">Đơn hàng của tôi</h2>
      {isLoading ? (
        <LoadingPage />
      ) : !order?.length ? (
        <Empty />
      ) : (
        <ul className="purchase-list">
          {order &&
            order?.map((item) => {
              return (
                <li className="purchase-item">
                  <Link to={`account/purchase/${item.id}`}>
                    <ul>
                      <div className="purchase-item-top">
                        <p>
                          Mã đơn hàng: {item.id} <br />
                          Mã vận đơn: {item.shippingId}
                        </p>
                        <p>
                          Ngày đặt hàng:{" "}
                          {!!item.orderDate &&
                            format(new Date(item.orderDate), "dd/MM/yyyy")}
                        </p>
                      </div>
                      {item.products &&
                        item.products?.map((productCart) => {
                          return (
                            <li key={productCart.id} className="order-product">
                              <div className="order-product-info">
                                <div className="f-center-y">
                                  <img
                                    className="order-product-img"
                                    src={productCart.product?.images[0]}
                                    alt="product"
                                  />
                                  <div>
                                    <h4 className="order-product-name">
                                      {productCart.product?.name}
                                    </h4>
                                    {!isEmpty(productCart.size) && (
                                      <p className="order-product-size">
                                        Size {productCart.size?.size}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div className="order-product-price">
                                  <p
                                    className={`price-origin ${
                                      productCart.product?.discount > 0
                                        ? "disabled"
                                        : ""
                                    }`}
                                  >
                                    {numberWithCommas(
                                      productCart.product?.price
                                    )}
                                    đ
                                  </p>
                                  {productCart.product?.discount > 0 && (
                                    <p className="price">
                                      {numberWithCommas(
                                        productCart.product?.price -
                                          (productCart.product?.price *
                                            productCart.product?.discount) /
                                            100
                                      )}
                                      đ
                                    </p>
                                  )}
                                </div>
                                <p className="order-product-quantity">
                                  Số lượng: {productCart.quantity}
                                </p>
                                {productCart.isReviewed ? (
                                  <span>Rated</span>
                                ) : (
                                  <button
                                    className="order-product-rating-btn"
                                    onClick={() => {
                                      setShowReview(true);
                                      setProductSelected(
                                        productCart.product.id
                                      );
                                      setProductOrderId(productCart.id);
                                    }}
                                  >
                                    <img src={EditIcon} alt="edit icon" />
                                    <span className="txt-sm pl-2">Rating</span>
                                  </button>
                                )}
                              </div>
                            </li>
                          );
                        })}
                    </ul>
                  </Link>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default Purchase;
