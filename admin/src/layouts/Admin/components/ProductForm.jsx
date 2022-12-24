import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import noImage from "../../../assets/images/no-image.png";
import { addProduct, getCategory } from "../actions";
import SizeForm from "./SizeForm";
import Loading from "../../../libs/components/Loading";
import { useRef } from "react";
import { postApi } from "../../../libs/api";
import { toast } from "react-toastify";

const totalQuantity = (sizes) => {
  return sizes.reduce((sum, size) => {
    return sum + +size.quantity;
  }, 0);
};

const ProductForm = (props) => {
  const { id, setId, modalAdd, toggleModalAdd, categories } = props;

  const dispatch = useDispatch();

  const validationProductInfoSchema = Yup.object().shape({
    name: Yup.string().trim().required("Tên sản phẩm không được để trống"),
    price: Yup.number()
      .typeError("Giá phải là số")
      .min(1000, "Giá phải lớn hơn 1,000đ")
      .required("Giá không được để trống"),
    discount: Yup.number()
      .typeError("Khuyến mãi phải là số")
      .min(0, "Khuyến mãi phải là từ 0-100")
      .max(100, "Khuyến mãi phải là từ 0-100"),
    quantity: Yup.number()
      .typeError("Số lượng phải là số")
      .min(1, "Số lượng không được nhỏ hơn 1"),
    category: Yup.string().required("Danh mục không được để trống"),
  });

  const formProductInfoOptions = {
    resolver: yupResolver(validationProductInfoSchema),
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formProductInfoOptions);

  const validationShippingSchema = Yup.object().shape({
    weight: Yup.number()
      .typeError("Khối lượng phải là số")
      .min(1, "Khối lượng phải lớn hơn 1")
      .required("Khối lượng không được để trống"),
    height: Yup.number()
      .typeError("Chiều cao phải là số")
      .min(1, "Chiều cao phải lớn hơn 1")
      .required("Chiều cao không được để trống"),
    length: Yup.number()
      .typeError("Chiều dài phải là số")
      .min(1, "Chiều dài phải lớn hơn 1")
      .required("Chiều dài không được để trống"),
    width: Yup.number()
      .typeError("Chiều rộng phải là số")
      .min(1, "Chiều rộng phải lớn hơn 1")
      .required("Chiều rộng không được để trống"),
  });

  const formShippingOptions = {
    resolver: yupResolver(validationShippingSchema),
  };
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm(formShippingOptions);

  const products = useSelector((state) => state.product.products);
  const product = products?.find((item) => item._id === id);

  const [img, setImg] = useState(product?.image || "");
  const [hasSize, setHasSize] = useState(product?.sizes.length ? true : false);
  const [sizes, setSizes] = useState(
    product?.sizes.length
      ? product.sizes.map((size) => ({
          id: size._id,
          size: size.size,
          quantity: size.quantity,
        }))
      : [{ id: uuidv4(), size: "", quantity: 1 }]
  );
  const [isLoadingImg, setIsLoadingImg] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const productInfo = useRef(null);

  const checkEmptySizes = () => {
    return sizes.some((item) => !item.size || !item.quantity);
  };

  const onSubmitProductInfo = (data) => {
    if ((hasSize && checkEmptySizes()) || !sizes.length) {
      alert("Vui lòng không để trống size hoặc số lượng");
      return;
    }
    if (hasSize) {
      productInfo.current = {
        ...data,
        quantity: totalQuantity(sizes),
        image: img,
        sizes,
      };
    } else {
      productInfo.current = { ...data, image: img };
    }
    setCurrentStep(2);
  };

  const onSubmitAll = (data) => {
    console.log({ ...data, ...productInfo.current });
    if (!id) {
      dispatch(addProduct({ ...data, ...productInfo.current }));
      toggleModalAdd();
    } else {
      console.log("cập nhật", { ...data, ...productInfo.current });
    }
  };

  const uploadImg = useCallback((e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("file", file);
    setIsLoadingImg(true);
    axios
      .post("http://localhost:7000/uploadiu", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setImg(response?.data?.fileLocation);
        setIsLoadingImg(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoadingImg(false);
      });
  }, []);

  useEffect(() => {
    return () => {
      setId(null);
    };
  }, []);

  return (
    <Modal isOpen={modalAdd} toggle={toggleModalAdd}>
      <ModalHeader toggle={toggleModalAdd}>
        {id ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
      </ModalHeader>
      <ModalBody>
        <div hidden={currentStep !== 1}>
          <div className="mb-3 d-flex align-items-center">
            <div className="form-img">
              <img src={img || noImage} alt="" />
              {isLoadingImg && <Loading />}
            </div>
            <input
              type="file"
              className="form-control form-control-sm"
              onChange={uploadImg}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Tên sản phẩm
            </label>
            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              id="name"
              placeholder="Tên sản phẩm"
              defaultValue={product?.name}
              {...register("name", {
                required: "Tên sản phẩm không được để trống!",
              })}
            />
            <div className="invalid-feedback">{errors.name?.message}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Mô tả
            </label>
            <textarea
              className="form-control"
              id="description"
              rows="3"
              defaultValue={product?.description}
              {...register("description")}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Danh mục
            </label>
            <select
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              id="category"
              {...register("category")}
              defaultValue={product?.category._id}
            >
              <option selected disabled value="">
                Chọn danh mục...
              </option>
              {categories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">{errors.category?.message}</div>
          </div>
          <Row className="mt-3">
            <Col xs={`${hasSize ? "6" : "4"}`}>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Giá
                </label>
                <input
                  type="number"
                  className={`form-control ${errors.price ? "is-invalid" : ""}`}
                  id="price"
                  placeholder="Giá"
                  defaultValue={product?.price || 1000}
                  {...register("price", {
                    required: "Giá không được để trống!",
                    min: (value) => {
                      if (value < 1000)
                        return "Giá sản phẩm nhỏ nhất là 1,000đ";
                    },
                  })}
                />
                <div className="invalid-feedback">{errors.price?.message}</div>
              </div>
            </Col>
            <Col xs={`${hasSize ? "6" : "4"}`}>
              <div className="mb-3">
                <label htmlFor="discount" className="form-label">
                  Khuyến mãi
                </label>
                <input
                  type="number"
                  className={`form-control ${
                    errors.discount ? "is-invalid" : ""
                  }`}
                  id="discount"
                  placeholder="Khuyến mãi"
                  defaultValue={product?.discount || 0}
                  {...register("discount")}
                />
                <div className="invalid-feedback">
                  {errors.discount?.message}
                </div>
              </div>
            </Col>
            {!hasSize && (
              <Col xs="4">
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Số lượng
                  </label>
                  <input
                    type="number"
                    className={`form-control ${
                      errors.quantity ? "is-invalid" : ""
                    }`}
                    id="quantity"
                    placeholder="Số lượng"
                    defaultValue={product?.quantity || 1}
                    {...register("quantity", {
                      required: "Số lượng không được để trống!",
                    })}
                  />
                  <div className="invalid-feedback">
                    {errors.quantity?.message}
                  </div>
                </div>
              </Col>
            )}
          </Row>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="hasSize"
              checked={hasSize}
              onChange={() => setHasSize(!hasSize)}
            />
            <label className="form-check-label" htmlFor="hasSize">
              Thêm size
            </label>
          </div>
        </div>
        {hasSize && currentStep === 1 && (
          <SizeForm sizes={sizes} setSizes={setSizes} />
        )}

        <div hidden={currentStep !== 2}>
          <h3 className="fs-6">Thông tin vận chuyển </h3>
          <div className="mb-3 mt-4">
            <label htmlFor="weight" className="form-label">
              Khối lượng (gram)
            </label>
            <input
              type="number"
              className={`form-control ${errors2.weight ? "is-invalid" : ""}`}
              id="weight"
              placeholder="khối lượng"
              defaultValue={product?.weight}
              {...register2("weight")}
            />
            <div className="invalid-feedback">{errors2.weight?.message}</div>
          </div>
          <div className="mb-3 mt-4">
            <label htmlFor="height" className="form-label">
              Chiều cao (cm)
            </label>
            <input
              type="number"
              className={`form-control ${errors2.height ? "is-invalid" : ""}`}
              id="height"
              placeholder="Chiều cao"
              defaultValue={product?.height}
              {...register2("height")}
            />
            <div className="invalid-feedback">{errors2.height?.message}</div>
          </div>
          <div className="mb-3 mt-4">
            <label htmlFor="length" className="form-label">
              Chiều dài (cm)
            </label>
            <input
              type="number"
              className={`form-control ${errors2.length ? "is-invalid" : ""}`}
              id="length"
              placeholder="Chiều dài"
              defaultValue={product?.length}
              {...register2("length")}
            />
            <div className="invalid-feedback">{errors2.length?.message}</div>
          </div>
          <div className="mb-3 mt-4">
            <label htmlFor="width" className="form-label">
              Chiều rộng (cm)
            </label>
            <input
              type="number"
              className={`form-control ${errors2.width ? "is-invalid" : ""}`}
              id="width"
              placeholder="Chiều rộng"
              defaultValue={product?.width}
              {...register2("width")}
            />
            <div className="invalid-feedback">{errors2.width?.message}</div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggleModalAdd}>
          Hủy
        </Button>
        <Button
          color="primary"
          onClick={handleSubmit(onSubmitProductInfo)}
          hidden={currentStep !== 1}
          disabled={isLoadingImg}
        >
          Tiếp theo
        </Button>
        <Button
          color="primary"
          onClick={() => setCurrentStep(1)}
          hidden={currentStep !== 2}
        >
          Quay lại
        </Button>
        <Button
          color="primary"
          onClick={handleSubmit2(onSubmitAll)}
          hidden={currentStep !== 2}
        >
          {id ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ProductForm;
