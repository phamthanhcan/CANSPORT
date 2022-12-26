import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardHeader, Row, Table } from "reactstrap";
import Navbar from "../../../components/Navbar";
import Empty from "../../../libs/components/Empty";
import { getOrders } from "../actions";
import noImage from "../../../assets/images/no-image.png";

const OrderManage = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);

  useEffect(() => {
    dispatch(getOrders(0, 5));
  }, [dispatch]);

  orders.map((order) =>
    order.products.map((item) => {
      console.log(item.product.name);
    })
  );

  return (
    <>
      <Navbar title="ĐƠN HÀNG" />
      <div className="wrapper">
        {orders.length ? (
          <Card className="shadow">
            <CardHeader className="border-0">
              <h3 className="mb-0">Danh mục</h3>
            </CardHeader>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">Mã vận đơn</th>
                  <th scope="col">Sản phẩm</th>
                  <th scope="col">Trạng thái</th>
                  <th scope="col">Loại thanh toán</th>
                  <th scope="col">Phí vận chuyển</th>
                  <th scope="col">Ngày đặt hàng</th>
                  <th scope="col">Tổng tiền</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <span>{order.shippingId}</span>
                    </td>
                    <td>
                      <Table>
                        {order.products?.map((item) => (
                          <tr key={item._id}>
                            <td>
                              <span>{item.product.name}</span>
                            </td>
                            <td>
                              <img
                                style={{ width: 50, height: 50 }}
                                src={item.product.image || noImage}
                                alt="product"
                              />
                            </td>
                          </tr>
                        ))}
                      </Table>
                    </td>
                    <td>
                      <span>
                        {order.status === "Not comfirmed"
                          ? "Chờ xác nhận"
                          : "Đã duyệt"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        ) : (
          <Empty />
        )}
      </div>
    </>
  );
};

export default OrderManage;
