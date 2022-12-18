import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { isEmpty, numberWithCommas } from "../../../shared/helper/data";
import { postApi } from "../../../shared/helper/api";
import { clearCart } from "../cart.actions";

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
  const dispatch = useDispatch();

  const isFromPayment = window.location.search.includes("isFromPayment");

  const user = useSelector((state) => state.auth.data.encode);
  const cart = useSelector((state) => state.cart.data);
  const products = useRef([]);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [services, setServices] = useState([]);
  const [shippingFee, setShippingFee] = useState(0);
  const [totalPriceProduct, setTotalPriceProduct] = useState(0);

  const province = watch("province");
  const district = watch("district");
  const ward = watch("ward");

  const onSubmit = (data) => {
    if (data.paymentOption === "cod") {
      axios
        .post(
          "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create",
          {
            shop_id: 84329,
            payment_type_id: 2,
            required_note: "KHONGCHOXEMHANG",
            return_phone: "0376755120",
            return_address: "Xóm 11",
            return_district_id: 1848,
            return_ward_code: "290625",
            to_name: data.name,
            to_phone: data.phone,
            to_address: data.addressDetail,
            to_ward_code: data.ward,
            to_district_id: +data.district,
            cod_amount: totalPriceProduct,
            weight: getWeight(products.current),
            content: `Dinasour shop send to ${data.name}`,
            length: getLength(products.current),
            width: getWidth(products.current),
            height: getHeight(products.current),
            service_id: services[services.length - 1].service_id,
            service_type_id: services[services.length - 1].service_type_id,
            item: products.current.map((item) => {
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
        .then((res) => {
          const shippingCode = res.data.data.order_code;
          console.log("res", res);

          postApi(["order/create"], {
            user: user._id,
            price: totalPriceProduct,
            shippingFee,
            shippingId: shippingCode,
            address: data.addressDetail,
            province: provinces.find((item) => item.ProvinceID === +province)
              .ProvinceName,
            district: districts.find((item) => item.DistrictID === +district)
              .DistrictName,
            ward: wards.find((item) => item.WardCode === ward).WardName,
            phone: data.phone,
            name: data.name,
            typePay: "cod",
            products: products.current.map((item) => {
              return {
                id: item.id,
                product: item.product.id,
                size: item.size ? item.size.id : null,
                quantity: item.quantity,
              };
            }),
          })
            .then((res) => {
              dispatch(clearCart());
              navigate("/account/purchase");
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    } else {
      navigate("/payment", {
        state: {
          services,
          data: { ...data, shippingFee },
          cartId: cart.id,
          products: products.current,
          totalPrice: totalPriceProduct + shippingFee,
          province: provinces.find((item) => item.ProvinceID === +province)
            .ProvinceName,
          district: districts.find((item) => item.DistrictID === +district)
            .DistrictName,
          ward: wards.find((item) => item.WardCode === ward).WardName,
        },
      });
    }
  };

  useEffect(() => {
    if (cart?.products) {
      products.current = cart.products;
    }
  }, [cart]);

  useEffect(() => {
    if (cart) {
      setTotalPriceProduct(
        cart?.products.reduce((sum, item) => {
          return (
            sum +
            (item.product.price * item.quantity -
              item.product.price *
                item.quantity *
                (item.product.discount / 100))
          );
        }, 0)
      );
    }
  }, [cart]);

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

  useEffect(() => {
    if (services.length) {
      axios
        .post(
          `https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee`,
          {
            from_district_id: 1848,
            service_id: services[services.length - 1].service_id,
            service_type_id: services[services.length - 1].service_type_id,
            to_district_id: +district,
            to_ward_code: ward,
            height: getHeight(products.current),
            length: getLength(products.current),
            weight: getWeight(products.current),
            width: getWidth(products.current),
            coupon: null,
          },
          {
            headers: {
              Token: "6e71122d-5c20-11ec-ac64-422c37c6de1b",
            },
          }
        )
        .then((res) => {
          console.log(res.data.data.total);
          setShippingFee(res.data.data.total);
        })
        .catch((err) => console.error(err));
    }
  }, [services]);

  return (
    <div className="main container">
      <section className="order">
        <h2 className="section-title">SHOPPING ORDER</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="delivery-info col-6">
              <h3>THÔNG TIN NHẬN HÀNG</h3>
              <div className="form-group">
                <label className="form-label" htmlFor="name">
                  Họ và tên <span className="form-label-required">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="name"
                  {...register("name", { required: "Vui lòng nhập tên" })}
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
                  {...register("phone", {
                    required: "Vui lòng nhập số điện thoại",
                  })}
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
                  {...register("addressDetail", {
                    required: "Vui lòng nhập địa chỉ",
                  })}
                ></textarea>
                <p className="form-error">{errors.addressDetail?.message}</p>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="provinces">
                  Tỉnh thành
                  <span className="form-label-required">*</span>
                </label>
                <select
                  id="province"
                  className="order-select form-control"
                  {...register("province", {
                    required: "Vui lòng chọn tỉnh thành",
                  })}
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
                  {...register("district", {
                    required: "Vui lòng chọn quận huyện",
                  })}
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
                  {...register("ward", { required: "Vui lòng chọn phường xã" })}
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
            <div className="col-1"></div>
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
                            {!isEmpty(item.size) && (
                              <div className="f-center-y">
                                {item.size.size && (
                                  <>
                                    Size:
                                    <p className="product-view-option">
                                      <span>{item.size.size}</span>
                                    </p>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="ml-2">
                          <p
                            className={`product-price ${
                              item.product.discount > 0 ? "disabled" : ""
                            }`}
                          >
                            {numberWithCommas(
                              item.product.price * item.quantity
                            )}
                            đ
                          </p>
                          {item.product.discount > 0 && (
                            <p className="product-price">
                              {numberWithCommas(
                                item.product.price * item.quantity -
                                  item.product.price *
                                    item.quantity *
                                    (item.product.discount / 100)
                              )}
                              đ
                            </p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="order-summary">
                <div className="order-summary-detail">
                  <div className="order-summary-item">
                    <span>Tạm tính</span>
                    <span className="price">
                      {numberWithCommas(totalPriceProduct)}đ
                    </span>
                  </div>
                  <div className="order-summary-item">
                    <span>Phí vận chuyển</span>
                    <span className="price">
                      {numberWithCommas(shippingFee)}đ
                    </span>
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
                    <span className="price">
                      {numberWithCommas(totalPriceProduct + shippingFee)}đ
                    </span>
                  </div>
                </div>
                <input
                  type="submit"
                  className="btn btn-primary full-width"
                  value="ĐẶT HÀNG"
                />
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Order;
