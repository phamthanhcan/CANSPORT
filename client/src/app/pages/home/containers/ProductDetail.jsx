import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addProductCart, clearCart } from "../../cart/cart.actions";
import Policy from "../components/Policy";
import {
  getListProducts,
  getProductDetail,
  getSkuOfProducts,
} from "../home.actions";
import LoadingPage from "../../../shared/components/modules/LoadingPage";
import NoImage from "../../../../assets/images/no-image.png";
import { isEmpty, numberWithCommas } from "../../../shared/helper/data";
import { useRef } from "react";
import Carousel from "../components/CarouselImage";
import CarouselImage from "../components/CarouselImage";

const getColors = (skus) => {
  const arr = [];
  skus?.forEach((sku) => {
    if (sku.color && !arr.includes(sku.color)) {
      arr.push(sku.color);
    }
  });

  return arr;
};

const getSizes = (skus) => {
  const arr = [];
  skus?.forEach((sku) => {
    if (sku.size && !arr.includes(sku.size)) {
      arr.push(sku.size);
    }
  });
  return arr;
};

const getImages = (skus, product) => {
  const arr = product?.images;
  skus?.forEach((sku) => {
    if (sku.image && !arr.includes(sku.image)) {
      arr.push(sku.image);
    }
  });
  return arr;
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const product = useSelector((state) => state.product.data);
  const isLoading = useSelector((state) => state.cart.isLoading);
  const isLoadingProduct = useSelector((state) => state.product.isLoading);
  const isLoadingSkus = useSelector((state) => state.sku.isLoading);
  const skus = useSelector((state) => state.sku.data);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [colors, setColors] = useState();
  const [sizes, setSizes] = useState();
  const [imgs, setImgs] = useState();
  const [currentSku, setCurrentSku] = useState(null);
  const [amountProduct, setAmountProduct] = useState(1);
  const [selectedSku, setSelectedSku] = useState(null);
  const [isSubmited, setIsSubmited] = useState(false);

  const imgRef = useRef(null);

  const handleChangeSku = (color, size) => {
    if (color) {
      imgRef.current.src = skus.find((sku) => sku.color === color)?.image;
    }
    setCurrentSku({
      ...currentSku,
      color: color || currentSku?.color,
      size: size || currentSku?.size,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (skus.length && isEmpty(selectedSku)) {
      alert("Vui lòng chọn phân loại hàng");
    } else {
      setIsSubmited(true);
      dispatch(
        addProductCart(
          id,
          skus.length ? selectedSku.id : null,
          amountProduct,
          user.encode._id
        )
      );
    }
  };

  const isNoQuantity = (color, size) => {
    let result = false;
    skus.forEach((sku) => {
      if (sku.color === color && sku.size === size && sku.quantity === 0) {
        result = true;
      }
    });
    return result;
  };

  const onChangeQuantity = (amount) => {
    if (+amountProduct + amount <= 0) {
      setAmountProduct(1);
    }
    if (skus.length) {
      if (isEmpty(selectedSku)) {
        alert("Vui longf chọn phân loại hàng");
      } else if (
        +amountProduct + amount <= selectedSku.quantity &&
        +amountProduct + amount >= 1
      ) {
        setAmountProduct(+amountProduct + amount);
      }
    } else {
      if (
        +amountProduct + amount <= product.quantity &&
        +amountProduct + amount >= 1
      ) {
        setAmountProduct(+amountProduct + amount);
      }
    }
  };

  const changeInputQuantity = (value) => {
    setAmountProduct(value);
  };

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getSkuOfProducts(id));

    return () => {
      // dispatch(clearCart());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setColors(getColors(skus));
      setSizes(getSizes(skus));
      setImgs(getImages(skus, product));
    }
  }, [product, skus]);

  useEffect(() => {
    if (!isEmpty(currentSku)) {
      if (colors.length && sizes.length) {
        const skuTemp = skus.find(
          (sku) =>
            sku.color === currentSku.color && sku.size === currentSku.size
        );
        setSelectedSku(skuTemp);
      } else if (colors.length) {
        const skuTemp = skus.find((sku) => sku.color === currentSku.color);
        setSelectedSku(skuTemp);
      } else if (sizes.length) {
        const skuTemp = skus.find((sku) => sku.size === currentSku.size);
        setSelectedSku(skuTemp);
      }
    }
  }, [currentSku]);

  const onClickImg = (img) => {
    imgRef.current.src = img;
  };

  if (isLoadingProduct || isLoadingSkus) {
    return <LoadingPage />;
  }

  return (
    <>
      <div className="product-view">
        <div className="container">
          <div className="row gutter-sm">
            <div className="col-9">
              <div className="row gutter-sm">
                <div className="col-6">
                  <img
                    className="product-view-img"
                    ref={imgRef}
                    src={imgs ? imgs[0] : NoImage}
                    alt=""
                  />
                  {/* {imgs?.length > 1 && (
                    <CarouselImage imgs={imgs} onClickImg={onClickImg} />
                  )} */}
                </div>
                <div className="col-6">
                  <h2 className="product-view-name">{product?.name}</h2>
                  <p className="product-view-id">MÃ SẢN PHẨM: {product?.id}</p>
                  <p className="product-view-price">
                    {product?.minPrice &&
                      numberWithCommas(product?.minPrice || 0)}
                    đ
                  </p>
                  {/* <span className="product-view-status">HÀNG CÓ SẴN</span> */}
                  <h3 className="product-view-label">CHỌN SIZE</h3>
                  <ul className="product-view-options">
                    {sizes?.map((size, index) => (
                      <li
                        key={index}
                        className={`product-view-option ${
                          currentSku?.size === size ? "active" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          className="hidden"
                          key={index}
                          id={size}
                          checked={currentSku?.size === size}
                          value={size}
                          {...register("size")}
                          onChange={() =>
                            !isNoQuantity(currentSku?.color, size) &&
                            handleChangeSku("", size)
                          }
                        />
                        <label
                          className={`size-label ${
                            isNoQuantity(currentSku?.color, size)
                              ? "disabled"
                              : ""
                          }`}
                          htmlFor={size}
                        >
                          {size}
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
                  <h3 className="product-view-label">CHỌN SIZE</h3>
                  <ul className="product-view-options">
                    {colors?.map((color, index) => (
                      <li
                        key={index}
                        className={`product-view-option ${
                          currentSku?.color === color ? "active" : ""
                        }`}
                      >
                        <input
                          key={index}
                          type="radio"
                          className="hidden"
                          id={color}
                          checked={currentSku?.color === color}
                          {...register("color")}
                          onChange={() => handleChangeSku(color, "")}
                        />
                        <label
                          className="color-label"
                          style={{ backgroundColor: color }}
                          htmlFor={color}
                        ></label>
                        <span className="icon-check">
                          <ion-icon name="checkmark-outline"></ion-icon>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <h3 className="product-view-label mt-5">CHỌN SỐ LƯỢNG</h3>
                  <div className="choose-quantity">
                    <button
                      className="btn-quantity"
                      onClick={() => onChangeQuantity(-1)}
                    >
                      -
                    </button>
                    <input
                      className="form-control quantity"
                      value={amountProduct}
                      min="1"
                      type="number"
                      onChange={(e) => changeInputQuantity(e.target.value)}
                      onBlur={(e) =>
                        onChangeQuantity(+e.target.value - +amountProduct)
                      }
                    />
                    <button
                      className="btn-quantity"
                      onClick={() => onChangeQuantity(+1)}
                    >
                      +
                    </button>
                  </div>
                  <button className="btn btn-primary mt-5">MUA NGAY</button>
                </div>
              </div>
            </div>
            <div className="col-3">
              <Policy column />
            </div>
          </div>
          {/* <div className="product-collateral">
            <ul className="product-tab-list">
              <li className="product-tab-item">
                <button className="product-tab-btn">CHI TIẾT SẢN PHẨM</button>
              </li>
              <li className="product-tab-item">
                <button className="product-tab-btn">HƯỚNG DẪN MUA HÀNG</button>
              </li>
              <li className="product-tab-item">
                <button className="product-tab-btn">CÁCH CHỌN SIZE</button>
              </li>
              <li className="product-tab-item">
                <button className="product-tab-btn">CHÍNH SÁCH HOÀN TRẢ</button>
              </li>
            </ul>
            <div className="product-tab-content">
              <div className="product-tabpane"></div>
              <div className="product-tabpane"></div>
              <div className="product-tabpane"></div>
              <div className="product-tabpane"></div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
