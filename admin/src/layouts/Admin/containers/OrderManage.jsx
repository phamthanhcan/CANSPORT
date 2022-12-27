import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap";
import { Pagination } from "@mui/material";
import Navbar from "../../../components/Navbar";
import Empty from "../../../libs/components/Empty";
import { getOrders, updateOrder } from "../actions";
import noImage from "../../../assets/images/no-image.png";
import { numberWithCommas } from "../../../libs/helper";
import axios from "axios";

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

const getTypePay = (type) => {
  switch (type) {
    case "cod":
      return "Thanh toán khi nhận hàng";
    case "online":
      return "Đã chuyển khoản";
    default:
      return "Thanh toán khi nhận hàng";
  }
};

const OrderManage = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const totalPages = useSelector((state) => state.order.totalPages);

  const [page, setPage] = useState(1);
  const [modalConfirm, setModalConfirm] = useState(false);
  const toggleModalConfirm = () => {
    setModalConfirm(!modalConfirm);
  };
  const [modalInfo, setModalInfo] = useState(false);
  const toggleModalInfo = () => {
    setModalInfo(!modalInfo);
  };
  const [selectedOrder, setSelectedOrder] = useState({ id: "", type: "" });
  const orderDetail = orders?.find((order) => order._id === selectedOrder.id);

  const handleChangePage = (e, value) => {
    setPage(value);
  };

  const handleConfirm = (status) => {
    dispatch(updateOrder(selectedOrder.id, status));

    if (status === "confirmed") {
      axios
        .post(
          "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create",
          {
            ShopId: "121017",
            payment_type_id: 2,
            required_note: "KHONGCHOXEMHANG",
            return_phone: "0921194881",
            return_address: "107 Nguyễn Hữu Dật - TP Đà Nẵng",
            return_district_id: 1526,
            return_ward_code: "40105",
            to_name: orderDetail.name,
            to_phone: String(orderDetail.phone),
            to_address: `${orderDetail?.address} - ${orderDetail?.province} - ${orderDetail?.district} - ${orderDetail?.ward}`,
            to_ward_code: String(orderDetail.wardId),
            to_district_id: orderDetail.districtId,
            cod_amount: orderDetail.price,
            content: `CANSPORT send to ${orderDetail.name}`,
            weight: orderDetail.weight,
            length: orderDetail.length,
            width: orderDetail.width,
            height: orderDetail.height,
            service_id: orderDetail.service.id,
            service_type_id: orderDetail.service.typeId,
            item: orderDetail.products.map((item) => {
              return {
                name: item.product.name,
                code: item.product.id,
                price: item.product.price,
                quantity: item.quantity,
              };
            }),
          },
          {
            headers: {
              Token: "3203fd77-7a41-11ed-a2ce-1e68bf6263c5",
            },
          }
        )
        .then((response) => {
          console.log(response);
        });
    }

    toggleModalConfirm();
  };

  useEffect(() => {
    dispatch(getOrders(page - 1, 5));
  }, [dispatch, page]);

  return (
    <>
      <Navbar title="ĐƠN HÀNG" />
      <div className="wrapper">
        {orders.length ? (
          <Card className="shadow">
            <CardHeader className="border-0">
              <h3 className="mb-0">Danh mục</h3>
            </CardHeader>
            <Table
              style={{ fontSize: 14 }}
              className="align-items-center table-flush"
              responsive
            >
              <thead className="thead-light">
                <tr>
                  <th scope="col">Mã đơn hàng</th>
                  <th scope="col" style={{ width: 300 }}>
                    Sản phẩm
                  </th>
                  <th scope="col">Trạng thái</th>
                  <th scope="col">Loại thanh toán</th>
                  <th scope="col">Phí vận chuyển</th>
                  <th scope="col">Ngày đặt hàng</th>
                  <th scope="col">Tổng tiền</th>
                  <th scope="col" style={{ width: 150 }}></th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <span
                        style={{
                          cursor: "pointer",
                          color: "#febb0a",
                          textDecoration: "underline",
                        }}
                        onClick={() => {
                          setSelectedOrder({ id: order._id, type: "detail" });
                          toggleModalInfo();
                        }}
                      >
                        {order._id}
                      </span>
                    </td>
                    <td>
                      {order.products?.map((item) => (
                        <div className="d-flex mb-2" key={item._id}>
                          <div>
                            <img
                              className="mx-2"
                              style={{ width: 50, height: 50 }}
                              src={item.product.image || noImage}
                              alt="product"
                            />
                          </div>
                          <span>{item.product.name}</span>
                        </div>
                      ))}
                    </td>
                    <td>
                      <span>{getStatus(order.status)}</span>
                    </td>
                    <td>
                      <span>{getTypePay(order.typePay)}</span>
                    </td>
                    <td>
                      <span>{numberWithCommas(order.shippingFee)}đ</span>
                    </td>
                    <td>
                      <span>
                        {new Date(order.createdAt).toLocaleDateString("en-GB")}
                      </span>
                    </td>
                    <td>{numberWithCommas(order.price)}đ</td>
                    <td>
                      {order.status === "waitting" && (
                        <div>
                          <button
                            className="btn btn-danger btn-sm mx-1"
                            onClick={() => {
                              setSelectedOrder({
                                id: order._id,
                                type: "cancel",
                              });
                              toggleModalConfirm();
                            }}
                          >
                            Hủy
                          </button>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => {
                              setSelectedOrder({
                                id: order._id,
                                type: "confirm",
                              });
                              toggleModalConfirm();
                            }}
                          >
                            Duyệt
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <CardFooter>
              <div className="d-flex justify-content-center">
                <Pagination
                  count={totalPages}
                  variant="outlined"
                  shape="rounded"
                  onChange={handleChangePage}
                />
              </div>
            </CardFooter>
          </Card>
        ) : (
          <Empty />
        )}
        <Modal isOpen={modalConfirm} toggle={toggleModalConfirm}>
          <ModalHeader toggle={toggleModalConfirm}>
            {selectedOrder.type === "cancel"
              ? "Bạn có chắc chắn muốn hủy đơn hàng này?"
              : "Bạn có chắc chắn duyệt đơn này"}
          </ModalHeader>
          <ModalBody>
            <span>Mã đơn hàng: {selectedOrder.id}</span>
          </ModalBody>
          <ModalFooter>
            {selectedOrder.type === "cancel" ? (
              <Button
                color="primary"
                onClick={() => handleConfirm("cancelled")}
              >
                Xác nhận hủy
              </Button>
            ) : (
              <Button
                color="primary"
                onClick={() => handleConfirm("confirmed")}
              >
                Duyệt đơn
              </Button>
            )}
            <Button color="secondary" onClick={toggleModalConfirm}>
              Hủy
            </Button>
          </ModalFooter>
        </Modal>

        {orderDetail && (
          <Modal isOpen={modalInfo} toggle={toggleModalInfo}>
            <ModalHeader toggle={toggleModalInfo}>
              Thông tin chi tiết đơn hàng
            </ModalHeader>
            <ModalBody>
              <p>Mã đơn hàng: {orderDetail?._id}</p>
              <p>
                Ngày đặt hàng:{" "}
                {orderDetail?.createdAt &&
                  new Date(orderDetail?.createdAt).toLocaleDateString("en-GB")}
              </p>
              <p>Người đặt hàng: {orderDetail?.name}</p>
              <p>Số điện thoại: {orderDetail?.phone}</p>
              <p>
                Địa chỉ giao hàng:{" "}
                {`${orderDetail?.address} - ${orderDetail?.province} - ${orderDetail?.district} - ${orderDetail?.ward}`}
              </p>
              <p>
                Phí vận chuyển: {numberWithCommas(orderDetail?.shippingFee)}đ
              </p>
              <p>Loại thanh toán: {getTypePay(orderDetail?.typePay)}</p>
              <p>Trạng thái: {getStatus(orderDetail?.status)}</p>
              {orderDetail?.products?.map((item) => (
                <div className="order-product">
                  <div className="d-flex align-items-center">
                    <div className="order-product-img">
                      <img
                        style={{ width: 50, height: 50 }}
                        src={item.product?.image}
                        alt="product"
                      />
                      <span className="order-product-quantity">
                        {item.quantity}
                      </span>
                    </div>
                    <div>
                      <p className="order-product-name">{item.product.name}</p>
                      {item.product.size && (
                        <p className="order-product-size">
                          {item.product.size}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="order-product-price">
                    <p
                      className={`${
                        item.product.discount > 0 ? "origin" : "current"
                      }`}
                    >
                      {numberWithCommas(item.product.price)}đ
                    </p>
                    {item.product.discount > 0 && (
                      <p className="current">
                        {numberWithCommas(
                          item.product.price -
                            item.product.price * (item.product.discount / 100)
                        )}
                        đ
                      </p>
                    )}
                  </div>
                </div>
              ))}
              <p>Tổng tiền: {numberWithCommas(orderDetail?.price)}đ</p>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggleModalInfo}>
                Quay lại
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </div>
    </>
  );
};

export default OrderManage;
