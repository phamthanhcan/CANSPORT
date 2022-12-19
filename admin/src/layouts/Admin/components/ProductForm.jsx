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
import noImage from "../../../assets/images/no-image.png";
import { getCategory } from "../actions";
import SizeForm from "./SizeForm";
import Loading from "../../../libs/components/Loading";

const ProductForm = (props) => {
  const { id, modalAdd, toggleModalAdd } = props;
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm();

  const [img, setImg] = useState("");
  const [hasSize, setHasSize] = useState(false);
  const [sizes, setSizes] = useState([
    { id: uuidv4(), size: "", quantity: "" },
  ]);
  const [isLoadingImg, setIsLoadingImg] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const products = useSelector((state) => state.product.products);
  const product = products?.find((item) => item._id === id);
  const categories = useSelector((state) => state.category.categories);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const onSubmitProductInfo = (data) => {
    console.log(data);
    setCurrentStep(2);
  };

  const onSubmitAll = (data) => {};

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

  return (
    <Modal isOpen={modalAdd} toggle={toggleModalAdd}>
      <ModalHeader toggle={toggleModalAdd}>
        {id ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
      </ModalHeader>
      <ModalBody>
        <form
          onSubmit={handleSubmit(onSubmitProductInfo)}
          hidden={currentStep !== 1}
        >
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
          <div className="form-floating">
            <select
              className="form-select"
              id="category"
              aria-label="Floating label select example"
              {...register("category")}
            >
              {categories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            <label htmlFor="category">Danh mục</label>
          </div>
          <Row className="mt-3">
            <Col xs={`${hasSize ? "6" : "4"}`}>
              <div className="mb-3">
                <input
                  type="text"
                  className={`form-control ${errors.price ? "is-invalid" : ""}`}
                  id="price"
                  placeholder="Giá"
                  defaultValue={product?.price}
                  {...register("price", {
                    required: "Giá không được để trống!",
                  })}
                />
                <div className="invalid-feedback">{errors.price?.message}</div>
              </div>
            </Col>
            <Col xs={`${hasSize ? "6" : "4"}`}>
              <div className="mb-3">
                <input
                  type="text"
                  className={`form-control ${
                    errors.discount ? "is-invalid" : ""
                  }`}
                  id="discount"
                  placeholder="Khuyến mãi"
                  defaultValue={product?.discount}
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
                  <input
                    type="text"
                    className={`form-control ${
                      errors.quantity ? "is-invalid" : ""
                    }`}
                    id="quantity"
                    placeholder="Số lượng"
                    defaultValue={product?.quantity}
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
        </form>
        {hasSize && currentStep === 1 && (
          <SizeForm sizes={sizes} setSizes={setSizes} />
        )}

        <form onSubmit={handleSubmit2(onSubmitAll)} hidden={currentStep !== 2}>
          <h3 className="fs-6">Thông tin vận chuyển </h3>
          <div className="mb-3 mt-4">
            <label htmlFor="weight" className="form-label">
              Khối lượng (gram)
            </label>
            <input
              type="number"
              className={`form-control ${errors.weight ? "is-invalid" : ""}`}
              id="weight"
              placeholder="khối lượng"
              defaultValue={product?.weight}
              {...register2("weight", {
                required: "Khối lượng không được để trống!",
              })}
            />
            <div className="invalid-feedback">{errors.weight?.message}</div>
          </div>
          <div className="mb-3 mt-4">
            <label htmlFor="height" className="form-label">
              Chiều cao (cm)
            </label>
            <input
              type="number"
              className={`form-control ${errors.height ? "is-invalid" : ""}`}
              id="height"
              placeholder="Chiều cao"
              defaultValue={product?.height}
              {...register2("height", {
                required: "Chiều cao không được để trống!",
              })}
            />
            <div className="invalid-feedback">{errors.height?.message}</div>
          </div>
          <div className="mb-3 mt-4">
            <label htmlFor="length" className="form-label">
              Chiều dài (cm)
            </label>
            <input
              type="number"
              className={`form-control ${errors.length ? "is-invalid" : ""}`}
              id="length"
              placeholder="Chiều cao"
              defaultValue={product?.length}
              {...register2("length", {
                required: "Chiều cao không được để trống!",
              })}
            />
            <div className="invalid-feedback">{errors.length?.message}</div>
          </div>
          <div className="mb-3 mt-4">
            <label htmlFor="width" className="form-label">
              Chiều rộng (cm)
            </label>
            <input
              type="number"
              className={`form-control ${errors.width ? "is-invalid" : ""}`}
              id="width"
              placeholder="Chiều cao"
              defaultValue={product?.width}
              {...register2("width", {
                required: "Chiều cao không được để trống!",
              })}
            />
            <div className="invalid-feedback">{errors.width?.message}</div>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggleModalAdd}>
          Hủy
        </Button>
        <Button
          color="primary"
          onClick={handleSubmit(onSubmitProductInfo)}
          hidden={currentStep !== 1}
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
        <Button color="warning" hidden={currentStep !== 2}>
          Thêm sản phẩm
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ProductForm;
