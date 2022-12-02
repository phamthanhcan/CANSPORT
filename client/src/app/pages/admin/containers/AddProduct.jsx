import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductForm from "../components/ProductForm";
import ProductNav from "../components/ProductNav";
import ShippingForm from "../components/ShippingForm";
import { getSkuOfProducts } from "../../home/home.actions";
import { isEmpty } from "../../../shared/helper/data";
import { postApi } from "../../../shared/helper/api";
import { useNavigate } from "react-router-dom";

const totalQuantity = (skus) => {
  return skus.reduce((sum, sku) => {
    return sum + +sku.quantity;
  }, 0);
};

const maxDiscount = (skus) => {
  return skus.reduce(function (p, v) {
    return p > +v.discount ? p : +v.discount;
  }, 0);
};

const maxPrice = (skus) => {
  return skus.reduce(function (p, v) {
    return p > +v.price ? p : +v.price;
  }, 0);
};

const minPrice = (skus) => {
  return skus.reduce(function (p, v) {
    return p < +v.price ? p : +v.price;
  }, +skus[0].price);
};

const AddProduct = () => {
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.data);
  const product = products?.find((product) => product.id === id);
  const skusProduct = useSelector((state) => state.sku.data);
  const [currentStep, setCurrentStep] = useState(1);
  const [productInfo, setProductInfo] = useState();
  const [skus, setSkus] = useState();
  const [hasSku, setHasSku] = useState();

  useEffect(() => {
    if (!isEmpty(id)) {
      dispatch(getSkuOfProducts(id || ""));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (skusProduct) {
      setSkus(skusProduct);
    }
  }, [skusProduct]);

  const handleSaveInfo = (data, hasSku) => {
    setProductInfo(data);
    setHasSku(hasSku);
    setCurrentStep(2);
  };

  const handleSaveSku = (data) => {
    setSkus(data);
  };

  const goToPrev = () => {
    setCurrentStep(1);
  };

  const addProduct = (data) => {
    if (!id) {
      postApi(["product"], {
        name: productInfo.name,
        images: productInfo.images,
        category: productInfo.category,
        description: productInfo.description,
        quantity: hasSku ? totalQuantity(skus) : +productInfo.quantity,
        discount: hasSku ? maxDiscount(skus) : +productInfo.discount,
        minPrice: hasSku ? minPrice(skus) : +productInfo.price,
        maxPrice: hasSku ? maxPrice(skus) : +productInfo.price,
        ...data,
        weight: +data.weight,
        width: +data.width,
        height: +data.height,
        lenght: +data.length,
        skus: skus?.map((sku) => {
          return {
            ...sku,
            quantity: +sku.quantity,
            discount: +sku.discount,
            price: +sku.price,
          };
        }),
      })
        .then((res) => navigate("/admin/products"))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <ProductNav currentStep={currentStep} />
      <div className={`${currentStep !== 1 && "hidden"}`}>
        <ProductForm
          id={id}
          product={product}
          handleSaveInfo={handleSaveInfo}
          handleSaveSku={handleSaveSku}
        />
      </div>
      <div className={`${currentStep !== 2 && "hidden"}`}>
        <ShippingForm
          product={product}
          goToPrev={goToPrev}
          addProduct={addProduct}
        />
      </div>
    </div>
  );
};

export default AddProduct;
