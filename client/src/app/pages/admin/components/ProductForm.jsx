import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getListCategory } from "../../home/home.actions";
import NoImage from "../../../../assets/images/no-image.png";
import SkuForm from "./SkuForm";
import axios from "axios";
import Loading from "../../../shared/components/modules/LoadingPage";
import SizeForm from "./SizeForm";

const ProductForm = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hasSizeSelection, setHasSizeSelection] = useState(false);
  const [img, setImg] = useState("");
  const [isEmptySize, setIsEmptySize] = useState(true);
  const [status, setStatus] = useState({
    isLoading: false,
    error: null,
  });

  const categories = useSelector((state) => state.category.data);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const handleSaveSizes = (data, isEmptySize) => {
    setIsEmptySize(isEmptySize);
    props.handleSaveSizes(data);
  };

  const onSubmit = (data) => {
    if (hasSizeSelection && isEmptySize) {
      alert("Vui lòng nhập size");
      return;
    }
    props.handleSaveInfo({ ...data, images: img }, hasSizeSelection);
  };

  const uploadImage = (e) => {
    setStatus((prevStatus) => ({
      ...prevStatus,
      isLoading: true,
    }));
    console.log("upload img");

    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("file", file);
    axios
      .post("http://localhost:7000/uploadiu", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        setImg(response?.data?.fileLocation);
        setStatus((prevStatus) => ({
          ...prevStatus,
          isLoading: false,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    dispatch(getListCategory());
  }, [dispatch]);

  return (
    <div className="f-center-x f-center-y">
      <div className="product-form">
        <form className="pd-5 bg-white" onSubmit={handleSubmit(onSubmit)}>
          <p className="txt-bold txt-lg txt-center mb-4">THÊM MỚI SẢN PHẨM</p>
          <div className="row">
            <div className="col-8">
              <div className="form-group">
                <label className="form-label" htmlFor="name">
                  Tên sản phẩm<span className="form-label-required">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="name"
                  {...register("name", {
                    required: "Vui lòng nhập tên sản phẩm",
                  })}
                />
                <p className="form-error">{errors.name?.message}</p>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="description">
                  Mô tả
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="3"
                  {...register("description")}
                ></textarea>
              </div>
              <div className="mb-2 f-center-y">
                <span className="form-label mr-3">THÊM SIZE</span>
                <label className="toggle" htmlFor="toggle-btn">
                  <input
                    className="toggle-input hidden"
                    type="checkbox"
                    id="toggle-btn"
                    checked={hasSizeSelection}
                    onChange={() => setHasSizeSelection(!hasSizeSelection)}
                  />
                  <div className="toggle-fill"></div>
                </label>
              </div>

              <div className="row">
                <div className={`${hasSizeSelection ? "col-6" : "col-4"}`}>
                  <div className="form-group ">
                    <label className="form-label">Giá</label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      min="0"
                      {...register("price", {
                        required: "Vui lòng nhập giá",
                      })}
                    />
                    <p className="form-error">{errors.price?.message}</p>
                  </div>
                </div>
                <div className={`${hasSizeSelection ? "col-6" : "col-4"}`}>
                  <div className="form-group ">
                    <label className="form-label">Khuyến mãi</label>
                    <input
                      type="number"
                      className="form-control"
                      id="discount"
                      min="0"
                      max="100"
                      {...register("discount")}
                    />
                  </div>
                </div>
                {!hasSizeSelection ? (
                  <div className="col-4">
                    <div className="form-group">
                      <label className="form-label" htmlFor="quantity">
                        Số lượng
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="quantity"
                        min="0"
                        {...register("quantity", {
                          required: "Vui lòng nhập số lượng",
                        })}
                      />
                      <p className="form-error">{errors.quantity?.message}</p>
                    </div>
                  </div>
                ) : (
                  <div className="col-12">
                    <SizeForm handleSaveSizes={handleSaveSizes} />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="category">
                  Danh mục
                </label>
                <select
                  className="form-control"
                  id="category"
                  {...register("category")}
                >
                  {categories?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group col-4 f-center-y f-col">
              <input
                type="file"
                id="image"
                className="hidden"
                accept="image/png, image/jpeg, .webp"
                onChange={uploadImage}
                // {...register("image", { required: "Vui lòng thêm ảnh" })}
              />
              <label className="btn btn-secondary btn-xs" htmlFor="image">
                Chọn ảnh
              </label>
              <div className="category-form-img mt-5 form-group">
                <img src={img || NoImage} alt="" />
                {status.isLoading && <Loading inline />}
                <p className="form-error">{errors.image?.message}</p>
              </div>
            </div>
          </div>
          <div className="category-form-actions">
            <input
              className="btn btn-secondary mr-3"
              type="button"
              value="Huỷ"
              onClick={() => navigate("/admin/products")}
            />
            <input className="btn btn-primary" type="submit" value="Thêm mới" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
