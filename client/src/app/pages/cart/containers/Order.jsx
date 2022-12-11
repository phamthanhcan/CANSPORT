import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { isEmpty, numberWithCommas } from "../../../shared/helper/data";

const getWidth = (products) => {
  return Math.max(...products.map((item) => item.product?.width));
};

const getLength = (products) => {
  return Math.max(...products.map((item) => item.product?.length));
};

const getHeight = (products) => {
  return products.reduce((sum, item) => {
    return sum + item.product.height * item.quantity;
  }, 0);
};

const getWeight = (products) => {
  return products.reduce((sum, item) => {
    return sum + item.product.weight * item.quantity;
  }, 0);
};

const Order = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();

  const onSubmit = (data) => {};

  const user = useSelector((state) => state.auth.data.encode);
  const cart = useSelector((state) => state.cart.data);
  const products = useRef([]);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [services, setServices] = useState([]);
  const [shippingFee, setShippingFee] = useState(0);

  const province = watch("province");
  const district = watch("district");
  const ward = watch("ward");

  useEffect(() => {
    if (cart?.products) {
      products.current = cart.products;
    }
  }, [cart]);

  console.log(products.current);

  useEffect(() => {
    axios
      .get(
        `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province`,
        {
          headers: {
            Token: "6e71122d-5c20-11ec-ac64-422c37c6de1b",
          },
        }
      )
      .then((res) => {
        setProvinces(res.data.data);
      })
      .catch((err) => console.error(err));
    return () => {
      localStorage.removeItem("data");
      localStorage.removeItem("product");
      localStorage.removeItem("services");
      localStorage.removeItem("province");
      localStorage.removeItem("district");
      localStorage.removeItem("ward");
    };
  }, []);

  useEffect(() => {
    if (+province) {
      axios
        .get(
          `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${province}`,
          {
            headers: {
              Token: "6e71122d-5c20-11ec-ac64-422c37c6de1b",
            },
          }
        )
        .then((res) => {
          setDistricts(res.data.data);
        })
        .catch((err) => console.error(err));
    }
  }, [province]);

  useEffect(() => {
    if (+district) {
      axios
        .get(
          `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${district}`,
          {
            headers: {
              Token: "6e71122d-5c20-11ec-ac64-422c37c6de1b",
            },
          }
        )
        .then((res) => {
          setWards(res.data.data);
        })
        .catch((err) => console.error(err));
    }
  }, [district]);

  useEffect(() => {
    if (+ward) {
      axios
        .get(
          `https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services?from_district=1848&to_district=${district}&shop_id=84329`,
          {
            headers: {
              Token: "6e71122d-5c20-11ec-ac64-422c37c6de1b",
            },
          }
        )
        .then((res) => {
          console.log(services);
          setServices(res.data.data);
        })
        .catch((err) => console.error(err));
    }
  }, [ward]);

  // useEffect(() => {
  //   if (services.length) {
  //     axios
  //       .post(
  //         `https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee`,
  //         {
  //           from_district_id: 1848,
  //           service_id: services[services.length - 1].service_id,
  //           service_type_id: services[services.length - 1].service_type_id,
  //           to_district_id: +district,
  //           to_ward_code: ward,
  //           height: getHeight(products),
  //           length: getLength(products),
  //           weight: getWeight(products),
  //           width: getWidth(products),
  //           coupon: null,
  //         },
  //         {
  //           headers: {
  //             Token: "6e71122d-5c20-11ec-ac64-422c37c6de1b",
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         console.log(res.data.data);
  //         setShippingFee(res.data.data.total);
  //       })
  //       .catch((err) => console.error(err));
  //   }
  // }, [services]);

  return (
    <div className="main container">
      <section className="order">
        <h2 className="section-title">SHOPPING ORDER</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="delivery-info col-5">
              <h3>THÔNG TIN NHẬN HÀNG</h3>
              <div className="form-group">
                <label className="form-label" htmlFor="name">
                  Họ và tên <span className="form-label-required">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="name"
                  {...register("name")}
                />
                <p className="form-error">{errors.name?.message}</p>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="phone">
                  Số điện thoại
                  <span className="form-label-required">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="phone"
                  {...register("phone")}
                />
                <p className="form-error">{errors.phone?.message}</p>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="addressDetail">
                  Địa chỉ chi tiết
                  <span className="form-label-required">*</span>
                </label>
                <textarea
                  className="form-control"
                  id="addressDetail"
                  {...register("addressDetail")}
                ></textarea>
                <p className="form-error">{errors.name?.message}</p>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="provinces">
                  Tỉnh thành
                  <span className="form-label-required">*</span>
                </label>
                <select
                  id="province"
                  className="order-select form-control"
                  {...register("province")}
                >
                  <option defaultChecked value="">
                    --------------
                  </option>
                  {provinces.map((item) => {
                    return (
                      <option key={item.ProvinceID} value={item.ProvinceID}>
                        {item.ProvinceName}
                      </option>
                    );
                  })}
                </select>
                <p className="form-error">{errors.province?.message}</p>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="district">
                  Quận huyện
                  <span className="form-label-required">*</span>
                </label>
                <select
                  id="district"
                  className="order-select form-control"
                  {...register("district")}
                >
                  <option defaultChecked value="">
                    --------------
                  </option>
                  {districts?.map((item) => {
                    return (
                      <option value={item.DistrictID} key={item.DistrictID}>
                        {item.DistrictName}
                      </option>
                    );
                  })}
                </select>
                <p className="form-error">{errors.district?.message}</p>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="ward">
                  Phường xã
                  <span className="form-label-required">*</span>
                </label>
                <select
                  id="ward"
                  className="order-select form-control"
                  {...register("ward")}
                >
                  <option defaultChecked value="">
                    --------------
                  </option>
                  {wards?.map((item) => {
                    return (
                      <option value={item.WardCode} key={item.WardCode}>
                        {item.WardName}
                      </option>
                    );
                  })}
                </select>
                <p className="form-error">{errors.ward?.message}</p>
              </div>
            </div>
            <div className="col-2"></div>
            <div className="col-5 bill">
              <div className="order-product">
                <h3>SẢN PHẨM ORDER</h3>
                <ul className="order-product-list">
                  {products.current?.map((item) => {
                    return (
                      <li key={item.id} className="order-product-item my-4">
                        <div className="d-flex">
                          <div className="product-img">
                            <img src={item.product.images[0]} alt="product" />
                            <span className="product-quantity">
                              {item.quantity}
                            </span>
                          </div>
                          <div className="ml-3">
                            <h4 className="product-name">
                              {item.product.name}
                            </h4>
                            {!isEmpty(item.sku) && (
                              <div className="f-center-y">
                                Color:
                                {item.sku.color && (
                                  <div
                                    className="product-view-option"
                                    style={{ backgroundColor: item.sku.color }}
                                  ></div>
                                )}
                                {item.sku.size && (
                                  <>
                                    Size:
                                    <p className="product-view-option">
                                      <span>{item.sku.size}</span>
                                    </p>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {isEmpty(item.sku) ? (
                          <div className="ml-2">
                            <p
                              className={`product-price ${
                                item.product.discount > 0 ? "disabled" : ""
                              }`}
                            >
                              {numberWithCommas(
                                item.product.maxPrice * item.quantity
                              )}
                              đ
                            </p>
                            {item.product.discount > 0 && (
                              <p className="product-price">
                                {numberWithCommas(
                                  item.product.maxPrice * item.quantity -
                                    item.product.maxPrice *
                                      item.quantity *
                                      (item.sku.discount / 100)
                                )}
                                đ
                              </p>
                            )}
                          </div>
                        ) : (
                          <div className="ml-2">
                            <p
                              className={`product-price ${
                                item.sku.discount > 0 ? "disabled" : ""
                              }`}
                            >
                              {numberWithCommas(item.sku.price * item.quantity)}
                              đ
                            </p>
                            {item.sku.discount > 0 && (
                              <p className="product-price">
                                {numberWithCommas(
                                  item.sku.price * item.quantity -
                                    item.sku.price *
                                      item.quantity *
                                      (item.sku.discount / 100)
                                )}
                                đ
                              </p>
                            )}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="order-summary">
                <div className="order-summary-detail">
                  <div className="order-summary-item">
                    <span>Tạm tính</span>
                    <span className="price">1.140.000đ</span>
                  </div>
                  <div className="order-summary-item">
                    <span>Phí vận chuyển</span>
                    <span className="price">-</span>
                  </div>
                  <div className="order-summary-item">
                    <span>Phương thức thanh toán</span>
                    <div>
                      <div className="mb-3">
                        <input
                          defaultChecked
                          type="radio"
                          value="cod"
                          id="cod"
                          {...register("paymentOption")}
                        />
                        <label htmlFor="cod" className="ml-2">
                          Thanh toán khi nhận hàng
                        </label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          value="online-payment"
                          id="online-payment"
                          {...register("paymentOption")}
                        />
                        <label htmlFor="online-payment" className="ml-2">
                          Thanh toán bằng thẻ tín dụng
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-summary-total">
                  <div className="order-summary-item">
                    <span>Tổng cộng</span>
                    <span className="price">1.140.000đ</span>
                  </div>
                </div>
                <input
                  type="submit"
                  className="btn btn-primary full-width"
                  value="ĐẶT HÀNG"
                />
                {/* <div>
                  <div className="d-flex py-2">
                    <p className="">Tạm tính</p>
                    <p className="">0 VND</p>
                  </div>
                  <div className="d-flex py-2">
                    <p className="col-3">Phí vận chuyển</p>
                    <p className="col-9">{shippingFee} VND</p>
                  </div>
                </div>
                <div className="d-flex py-2 payment-option">
                  <p className="txt-sm col-3">Phương thức thanh toán</p>
                  <div className="col-2">
                    <input
                      defaultChecked
                      type="radio"
                      value="cod"
                      id="cod"
                      {...register("paymentOption")}
                    />
                    <label htmlFor="cod" className="ml-2">
                      Payment on delivery
                    </label>
                  </div>
                  <div className="col-2">
                    <input
                      type="radio"
                      value="online-payment"
                      id="online-payment"
                      {...register("paymentOption")}
                    />
                    <label htmlFor="online-payment" className="ml-2">
                      Payment by credit
                    </label>
                  </div>
                </div>
                <input
                  type="submit"
                  className="btn btn-primary mt-4"
                  value="Order now"
                /> */}
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Order;
