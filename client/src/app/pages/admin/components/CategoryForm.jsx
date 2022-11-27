import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import NoImage from "../../../../assets/images/no-image.png";
import { addCategory, editCategory } from "../../home/home.actions";
import Loading from "../../../shared/components/modules/LoadingPage";

const CategoryForm = (props) => {
  const { id, setShowForm } = props;
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.category.data);
  const category = categories.find((item) => item.id === id);

  const [img, setImg] = useState(category?.image || "");
  const [status, setStatus] = useState({
    isLoading: false,
    error: null,
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Vui lòng nhập tên danh mục")
      .max(32, "Tên danh mục quá dài"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm(formOptions);

  const uploadImg = useCallback((e) => {
    setStatus((prevStatus) => ({
      ...prevStatus,
      isLoading: true,
    }));
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
        setImg(response?.data?.fileLocation);
        setStatus((prevStatus) => ({
          ...prevStatus,
          isLoading: false,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onSubmit = useCallback(
    (data) => {
      const dataSubmit = {
        name: data.name,
        description: data.description,
        image: img,
      };
      if (id) {
        dispatch(editCategory(id, dataSubmit));
      } else if (img) {
        dispatch(addCategory(dataSubmit));
      }

      setShowForm(false);
    },
    [dispatch, id, img]
  );

  return (
    <div className="ovelay">
      <div className="full-height f-center-y f-center-x">
        <form
          className="category-form bg-white pd-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="txt-bold txt-lg txt-center mb-4">
            {!!id ? "CẬP NHẬT DANH MỤC" : "THÊM MỚI DANH MỤC"}
          </p>
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Tên danh mục <span className="form-label-required">*</span>
            </label>
            <input
              type="text"
              className="form-control category-input"
              id="name"
              {...register("name")}
              defaultValue={category?.name}
            />
            <p className="form-error">{errors.name?.message}</p>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="description">
              Mô tả
            </label>
            <textarea
              className="form-control category-input"
              id="description"
              rows={3}
              {...register("description")}
              defaultValue={category?.description}
            />
            <p className="txt-error">{errors.description?.message}</p>
          </div>
          <div className="form-group">
            <input
              type="file"
              id="image"
              className="hidden"
              accept="image/png, image/jpeg"
              onChange={uploadImg}
            />
            <label className="btn btn-secondary btn-xs" htmlFor="image">
              Chọn ảnh
            </label>
          </div>
          <div className="category-form-img">
            <img src={img || NoImage} alt="" />
            {status.isLoading && <Loading inline />}
          </div>
          <div className="category-form-actions">
            <input
              className="btn btn-secondary mr-3"
              type="button"
              value="Huỷ"
              onClick={() => setShowForm(false)}
            />
            <input
              className="btn btn-primary"
              type="submit"
              value={!!id ? "Cập nhật" : "Thêm mới"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
