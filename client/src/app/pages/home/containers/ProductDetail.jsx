import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addProductCart, clearCart } from "../../cart/cart.actions";
import Policy from "../components/Policy";
import { getProductDetail } from "../home.actions";
import LoadingPage from "../../../shared/components/modules/LoadingPage";
import NoImage from "../../../../assets/images/no-image.png";
import { isEmpty, numberWithCommas } from "../../../shared/helper/data";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const product = useSelector((state) => state.product.productDetail);
  // const isLoading = useSelector((state) => state.cart.isLoading);
  const isLoadingProduct = useSelector((state) => state.product.isLoading);
  const isLoadingSizes = useSelector((state) => state.size.isLoading);
  const sizes = useSelector((state) => state.size.data);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [amountProduct, setAmountProduct] = useState(1);

  const size = watch("size");

  const onSubmit = () => {
    if (isEmpty(user)) {
      navigate("/login");
      return;
    }
    if (product.sizes?.length && !size) {
      toast.error("Vui lòng chọn size!");
      return;
    }
    dispatch(addProductCart(product.id, size, amountProduct, user.encode._id));
  };

  const changeInputQuantity = (value) => {
    setAmountProduct(value);
  };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   if (isEmpty(user)) {
  //     navigate("/login");
  //     return;
  //   }
  //   if (skus.length && isEmpty(selectedSku)) {
  //     alert("Vui lòng chọn phân loại hàng");
  //   } else {
  //     setIsSubmited(true);
  //     dispatch(
  //       addProductCart(
  //         id,
  //         skus.length ? selectedSku.id : null,
  //         amountProduct,
  //         user.encode._id
  //       )
  //     );
  //   }
  // };

  const onChangeQuantity = (amount) => {
    if (+amountProduct + amount <= 0) {
      setAmountProduct(1);
    } else {
      setAmountProduct((prev) => +prev + amount);
    }
  };

  // const changeInputQuantity = (value) => {
  //   setAmountProduct(value);
  // };

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch, id]);

  if (isLoadingProduct || isLoadingSizes) {
    return <LoadingPage />;
  }

  return (
    <>
      {product && (
        <div className="product-view">
          <div className="container">
            <div className="row gutter-sm">
              <div className="col-9">
                <div className="row gutter-sm">
                  <div className="col-6">
                    <img
                      className="product-view-img"
                      src={product?.image || NoImage}
                      alt=""
                    />
                  </div>
                  <div className="col-6">
                    <h2 className="product-view-name">{product?.name}</h2>
                    <p className="product-view-id">
                      MÃ SẢN PHẨM: {product?.id}
                    </p>
                    <div className="product-price view">
                      <p
                        className={`product-price-${
                          product.discount > 0 ? "origin" : "current"
                        }`}
                      >
                        {numberWithCommas(product?.price)}đ
                      </p>
                      {product?.discount > 0 && (
                        <p className="product-price-current">
                          {numberWithCommas(
                            product?.price -
                              product?.price * (product?.discount / 100)
                          )}
                          đ
                        </p>
                      )}
                    </div>
                    {product.sizes?.length > 0 && (
                      <>
                        <h3 className="product-view-label">CHỌN SIZE</h3>
                        <ul className="product-view-options">
                          {product.sizes?.map((item, index) => (
                            <li
                              key={index}
                              className={`product-view-option ${
                                item._id === size ? "active" : ""
                              }`}
                            >
                              <input
                                type="radio"
                                className="hidden"
                                key={index}
                                id={item._id}
                                value={item._id}
                                {...register("size", {
                                  required: true,
                                })}
                              />
                              <label className="size-label" htmlFor={item._id}>
                                {item.size}
                              </label>
                              <span className="icon-check">
                                <ion-icon name="checkmark-outline"></ion-icon>
                              </span>
                            </li>
                          ))}
                        </ul>
                        <button className="badge badge-sm mb-5">
                          Hướng dẫn chọn size
                        </button>
                      </>
                    )}
                    <h3 className="product-view-label mt-5">CHỌN SỐ LƯỢNG</h3>
                    <div className="choose-quantity">
                      <button
                        className="btn-quantity"
                        onClick={() =>
                          setAmountProduct((prev) => {
                            return prev > 1 ? prev - 1 : prev;
                          })
                        }
                      >
                        -
                      </button>
                      <input
                        className="form-control quantity"
                        value={amountProduct}
                        min="1"
                        type="number"
                        {...register("quantity")}
                      />
                      <button
                        className="btn-quantity"
                        onClick={() => setAmountProduct((prev) => prev + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button className="btn btn-primary mt-5" onClick={onSubmit}>
                      MUA NGAY
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <Policy column />
              </div>
            </div>
            <div className="product-collateral">
              <ul className="product-tab-list">
                <li className="product-tab-item">
                  <button className="product-tab-btn">CHI TIẾT SẢN PHẨM</button>
                </li>
                <li className="product-tab-item">
                  <button className="product-tab-btn">
                    HƯỚNG DẪN MUA HÀNG
                  </button>
                </li>
                <li className="product-tab-item">
                  <button className="product-tab-btn">CÁCH CHỌN SIZE</button>
                </li>
                <li className="product-tab-item">
                  <button className="product-tab-btn">
                    CHÍNH SÁCH HOÀN TRẢ
                  </button>
                </li>
              </ul>
              <div className="product-tab-content">
                <div className="product-tabpane"></div>
                <div className="product-tabpane"></div>
                <div className="product-tabpane"></div>
                <div className="product-tabpane"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
