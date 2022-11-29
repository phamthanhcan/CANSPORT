import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getListCategory } from "../../home/home.actions";
import NoImage from "../../../../assets/images/no-image.png";
import SkuForm from "./SkuForm";

const ProductForm = (props) => {
  const { handleCancel } = props;
  const dispatch = useDispatch();

  const [showSkuForm, setShowSkuForm] = useState(false);
  const [hasSku, setHasSku] = useState(false);
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

  const handleSaveSku = (data) => {
    props.handleCancelSku(data);
    setShowSkuForm(false);
  };

  const onSubmit = (data) => {
    props.handleSaveInfo({ ...data }, hasSku);
  };

  const uploadImage = () => {};

  useEffect(() => {
    dispatch(getListCategory());
  }, [dispatch]);

  return (
    <div className="f-center-x f-center-y">
      <div className="product-form">
        <form
          className={`pd-5 bg-white ${showSkuForm ? "hidden" : ""}`}
          onSubmit={handleSubmit(onSubmit)}
        >
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
                  {...register("name")}
                />
                <p className="form-error">{errors.name?.message}</p>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="description">
                  Mô tả<span className="form-label-required">*</span>
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="3"
                  {...register("description")}
                ></textarea>
                <p className="form-error">{errors.description?.message}</p>
              </div>
              <div className="form-group f-center-y">
                <span className="form-label mr-3">SKU</span>
                <label className="toggle" htmlFor="toggle-btn">
                  <input
                    className="toggle-input hidden"
                    type="checkbox"
                    id="toggle-btn"
                    checked={hasSku}
                    onChange={() => setHasSku(!hasSku)}
                  />
                  <div className="toggle-fill"></div>
                </label>
              </div>
              {!hasSku ? (
                <div className="row">
                  <div className="form-group col-4">
                    <label className="form-label">Giá</label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      min="0"
                      {...register("price")}
                    />
                    <p className="form-error">{errors.price?.message}</p>
                  </div>
                  <div className="form-group col-4">
                    <label className="form-label" htmlFor="quantity">
                      Số lượng
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="quantity"
                      min="0"
                      {...register("quantity")}
                    />
                    <p className="form-error">{errors.quantity?.message}</p>
                  </div>
                  <div className="form-group col-4">
                    <label className="form-label">Khuyến mãi</label>
                    <input
                      type="number"
                      className="form-control"
                      id="discount"
                      min="0"
                      max="100"
                      {...register("discount")}
                    />
                    <p className="form-error">{errors.price?.message}</p>
                  </div>
                </div>
              ) : (
                <button
                  className="btn btn-primary btn-xs mb-5"
                  onClick={() => setShowSkuForm(true)}
                >
                  + Thêm sku
                </button>
              )}
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
                accept="image/png, image/jpeg"
              />
              <label className="btn btn-secondary btn-xs" htmlFor="image">
                Chọn ảnh
              </label>
              <div className="category-form-img mt-5">
                <img src={NoImage} alt="" />
                {/* {status.isLoading && <Loading inline />} */}
              </div>
            </div>
          </div>
          <div className="category-form-actions">
            <input
              className="btn btn-secondary mr-3"
              type="button"
              value="Huỷ"
              onClick={handleCancel}
            />
            <input className="btn btn-primary" type="submit" value="Thêm mới" />
          </div>
        </form>
        <div className={`bg-white ${!showSkuForm ? "hidden" : ""}`}>
          <SkuForm
            handleSaveSku={handleSaveSku}
            handleCancelSku={() => setShowSkuForm(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
