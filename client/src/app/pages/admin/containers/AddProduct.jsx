import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import ProductForm from "../components/ProductForm";
import ProductNav from "../components/ProductNav";
import ShippingForm from "../components/ShippingForm";
import { getSkuOfProducts } from "../../home/home.actions";
import { isEmpty } from "../../../shared/helper/data";
import { postApi } from "../../../shared/helper/api";

const totalQuantity = (sizes) => {
  return sizes.reduce((sum, size) => {
    return sum + +size.quantity;
  }, 0);
};

const AddProduct = () => {
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.data);
  const product = products?.find((product) => product.id === id);
  const [currentStep, setCurrentStep] = useState(1);
  const [productInfo, setProductInfo] = useState();
  const [sizes, setSizes] = useState(null);
  const [hasSize, setHasSize] = useState(false);

  useEffect(() => {
    if (!isEmpty(id)) {
      dispatch(getSkuOfProducts(id || ""));
    }
  }, [dispatch, id]);

  const handleSaveInfo = (data, hasSize) => {
    setProductInfo(data);
    setHasSize(hasSize);
    setCurrentStep(2);
  };

  console.log(sizes);

  const handleSaveSizes = (data) => {
    setSizes(data);
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
        quantity: hasSize ? totalQuantity(sizes) : +productInfo.quantity,
        discount: +productInfo.discount,
        price: +productInfo.price,
        ...data,
        weight: +data.weight,
        width: +data.width,
        height: +data.height,
        length: +data.length,
        sizes: sizes,
      })
        .then((res) => {
          navigate("/admin/products");
          toast.success("Thêm sản phẩm thành công!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
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
          handleSaveSizes={handleSaveSizes}
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
