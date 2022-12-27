import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Empty from "../../../shared/components/modules/Empty";
import { getOrderByUser } from "../account.actions";
import { isEmpty, numberWithCommas } from "../../../shared/helper/data";
import EditIcon from "../../../../assets/icons/edit.svg";
import LoadingPage from "../../../shared/components/modules/LoadingPage";

const getStatus = (type) => {
  switch (type) {
    case "waitting":
      return "Chờ xác nhận";
    case "cancelled":
      return "Đã hủy";
    case "confirmed":
      return "Đã duyệt";
    default:
      return "Chờ xác nhận";
  }
};

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
                  <div>
                    <ul>
                      <div className="purchase-item-top">
                        <p>Mã đơn hàng: {item._id}</p>
                        <div>
                          <p>
                            Ngày đặt hàng:{" "}
                            {!!item.createdAt &&
                              format(new Date(item.createdAt), "dd/MM/yyyy")}
                          </p>
                          <p>Trạng thái: {getStatus(item.status)}</p>
                        </div>
                      </div>
                      {item.products &&
                        item.products?.map((productCart) => {
                          return (
                            <li key={productCart._id} className="order-product">
                              <div className="order-product-info">
                                <div className="f-center-y">
                                  <img
                                    className="order-product-img"
                                    src={productCart.product?.image}
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

                                {/* {productCart.isReviewed ? (
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
                                )} */}
                              </div>
                            </li>
                          );
                        })}
                    </ul>
                    <div className="f-center-x">
                      <p className="mr-3">
                        Phí vận chuyển: {numberWithCommas(item.shippingFee)}đ
                      </p>
                      <p style={{ fontWeight: "bold" }}>
                        Tổng tiền:{" "}
                        {numberWithCommas(item.shippingFee + item.price)}đ
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default Purchase;
