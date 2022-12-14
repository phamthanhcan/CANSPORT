import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { isEmpty, numberWithCommas } from "../../../shared/helper/data";
import { postApi } from "../../../shared/helper/api";
import { clearCart } from "../cart.actions";
import LoadingPage from "../../../shared/components/modules/LoadingPage";

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

  useEffect(() => {
    if (isFromPayment) {
      const data = JSON.parse(localStorage.getItem("data") || "{}");
      const products = JSON.parse(localStorage.getItem("products") || "{}");
      const services = JSON.parse(localStorage.getItem("services") || "{}");
      const provinceLS = JSON.parse(localStorage.getItem("province") || "{}");
      const districtLS = JSON.parse(localStorage.getItem("district") || "{}");
      const wardLS = JSON.parse(localStorage.getItem("ward") || "{}");

      console.log({
        user: user._id,
        price: products.reduce((sum, item) => {
          return (
            sum +
            (item.product.price * item.quantity -
              item.product.price *
                item.quantity *
                (item.product.discount / 100))
          );
        }, 0),
        shippingFee: data.shippingFee,
        shippingId: "test",
        address: data.addressDetail,
        province: provinceLS,
        district: districtLS,
        ward: wardLS,
        phone: data.phone,
        name: data.name,
        typePay: "online-payment",
        products: products.map((item) => {
          return {
            id: item.id,
            product: item.product.id,
            sku: item.sku ? item.sku.id : null,
            quantity: item.quantity,
          };
        }),
      });

      // postApi(["order/create"], {
      //   user: user._id,
      //   price: products.reduce((sum, item) => {
      //     return (
      //       sum +
      //       (item.product.price * item.quantity -
      //         item.product.price *
      //           item.quantity *
      //           (item.product.discount / 100))
      //     );
      //   }, 0),
      //   shippingFee: data.shippingFee,
      //   shippingId: "test",
      //   address: data.addressDetail,
      //   province: provinceLS,
      //   district: districtLS,
      //   ward: wardLS,
      //   phone: data.phone,
      //   name: data.name,
      //   typePay: "online-payment",
      //   products: products.map((item) => {
      //     return {
      //       id: item.id,
      //       product: item.product.id,
      //       sku: item.sku ? item.sku.id : null,
      //       quantity: item.quantity,
      //     };
      //   }),
      // })
      //   .then((res) => {
      //     dispatch(clearCart());
      //   })
      //   .catch((err) => console.error(err));
    }
  }, []);

  const user = useSelector((state) => state.auth.data.encode);
  const userDetail = useSelector((state) => state.user.data);
  const isLoading = useSelector((state) => state.user.isLoading);
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
      postApi(["order/create"], {
        user: user._id,
        price: totalPriceProduct,
        shippingFee,
        shippingId: "test",
        address: data.addressDetail,
        province: provinces.find((item) => item.ProvinceID === +province)
          .ProvinceName,
        district: districts.find((item) => item.DistrictID === +district)
          .DistrictName,
        ward: wards.find((item) => item.WardCode === ward).WardName,
        phone: data.phone,
        name: data.name,
        service: {
          id: services[services.length - 1].service_id,
          typeId: services[services.length - 1].service_type_id,
        },
        typePay: "cod",
        products: products.current.map((item) => {
          return {
            id: item._id,
            product: item.product._id,
            size: item.size ? item.size._id : null,
            quantity: item.quantity,
          };
        }),
        wardId: +ward,
        districtId: +district,
        provinceId: +province,
        weight: getWeight(products.current),
        length: getLength(products.current),
        width: getWidth(products.current),
        height: getHeight(products.current),
      })
        .then((res) => {
          dispatch(clearCart());
          toast.success("?????t h??ng th??nh c??ng!");
          navigate("/account/purchase");
        })
        .catch((err) => toast.error("C?? l???i! ?????t h??ng kh??ng th??nh c??ng"));
      axios.post(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create",
        {
          shop_id: 84329,
          payment_type_id: 2,
          required_note: "KHONGCHOXEMHANG",
          return_phone: "0376755120",
          return_address: "X??m 11",
          return_district_id: 1848,
          return_ward_code: "290625",
          to_name: data.name,
          to_phone: data.phone,
          to_address: data.addressDetail,
          to_ward_code: data.ward,
          to_district_id: +data.district,
          cod_amount: totalPriceProduct,
          weight: getWeight(products.current),
          content: `CANSPORT send to ${data.name}`,
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
      );
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
            Token: "3203fd77-7a41-11ed-a2ce-1e68bf6263c5",
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
              Token: "3203fd77-7a41-11ed-a2ce-1e68bf6263c5",
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
              Token: "3203fd77-7a41-11ed-a2ce-1e68bf6263c5",
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
              Token: "3203fd77-7a41-11ed-a2ce-1e68bf6263c5",
            },
          }
        )
        .then((res) => {
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
              Token: "3203fd77-7a41-11ed-a2ce-1e68bf6263c5",
            },
          }
        )
        .then((res) => {
          setShippingFee(res.data.data.total);
        })
        .catch((err) => console.error(err));
    }
  }, [services]);

  return (
    <div className="main container">
      <section className="order">
        <h2 className="section-title">SHOPPING ORDER</h2>
        {isLoading ? (
          <LoadingPage />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="delivery-info col-6">
                <h3>TH??NG TIN NH???N H??NG</h3>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">
                    H??? v?? t??n <span className="form-label-required">*</span>
                  </label>
                  <input
                    defaultValue={userDetail?.name}
                    className="form-control"
                    type="text"
                    id="name"
                    {...register("name", { required: "Vui l??ng nh???p t??n" })}
                  />
                  <p className="form-error">{errors.name?.message}</p>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">
                    S??? ??i???n tho???i
                    <span className="form-label-required">*</span>
                  </label>
                  <input
                    defaultValue={userDetail?.phone}
                    className="form-control"
                    type="text"
                    id="phone"
                    {...register("phone", {
                      required: "Vui l??ng nh???p s??? ??i???n tho???i",
                    })}
                  />
                  <p className="form-error">{errors.phone?.message}</p>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="addressDetail">
                    ?????a ch??? chi ti???t
                    <span className="form-label-required">*</span>
                  </label>
                  <textarea
                    defaultValue={userDetail?.address}
                    className="form-control"
                    id="addressDetail"
                    {...register("addressDetail", {
                      required: "Vui l??ng nh???p ?????a ch???",
                    })}
                  ></textarea>
                  <p className="form-error">{errors.addressDetail?.message}</p>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="provinces">
                    T???nh th??nh
                    <span className="form-label-required">*</span>
                  </label>
                  <select
                    id="province"
                    className="order-select form-control"
                    {...register("province", {
                      required: "Vui l??ng ch???n t???nh th??nh",
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
                    Qu???n huy???n
                    <span className="form-label-required">*</span>
                  </label>
                  <select
                    id="district"
                    className="order-select form-control"
                    {...register("district", {
                      required: "Vui l??ng ch???n qu???n huy???n",
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
                    Ph?????ng x??
                    <span className="form-label-required">*</span>
                  </label>
                  <select
                    id="ward"
                    className="order-select form-control"
                    {...register("ward", {
                      required: "Vui l??ng ch???n ph?????ng x??",
                    })}
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
                  <h3>S???N PH???M ORDER</h3>
                  <ul className="order-product-list">
                    {products.current?.map((item) => {
                      return (
                        <li key={item._id} className="order-product-item my-4">
                          <div className="d-flex">
                            <div className="product-img">
                              <img src={item.product.image} alt="product" />
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
                              ??
                            </p>
                            {item.product.discount > 0 && (
                              <p className="product-price">
                                {numberWithCommas(
                                  item.product.price * item.quantity -
                                    item.product.price *
                                      item.quantity *
                                      (item.product.discount / 100)
                                )}
                                ??
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
                      <span>T???m t??nh</span>
                      <span className="price">
                        {numberWithCommas(totalPriceProduct)}??
                      </span>
                    </div>
                    <div className="order-summary-item">
                      <span>Ph?? v???n chuy???n</span>
                      <span className="price">
                        {numberWithCommas(shippingFee)}??
                      </span>
                    </div>
                    <div className="order-summary-item">
                      <span>Ph????ng th???c thanh to??n</span>
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
                            Thanh to??n khi nh???n h??ng
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
                            Thanh to??n b???ng th??? t??n d???ng
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="order-summary-total">
                    <div className="order-summary-item">
                      <span>T???ng c???ng</span>
                      <span className="price">
                        {numberWithCommas(totalPriceProduct + shippingFee)}??
                      </span>
                    </div>
                  </div>
                  <input
                    type="submit"
                    className="btn btn-primary full-width"
                    value="?????T H??NG"
                  />
                </div>
              </div>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};

export default Order;
