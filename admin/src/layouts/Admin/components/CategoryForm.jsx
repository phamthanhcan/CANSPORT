import axios from "axios";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import noImage from "../../../assets/images/no-image.png";
import Loading from "../../../libs/components/Loading";
import { addCategory, editCategory } from "../actions";

const CategoryForm = ({ id, modalAdd, toggleModalAdd }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const categories = useSelector((state) => state.category.categories);
  const category = categories?.find((item) => item._id === id);
  const [img, setImg] = useState(category?.image || "");
  const [isLoadingImg, setIsLoadingImg] = useState(false);

  const onSubmit = (data) => {
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
    toggleModalAdd();
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
  return (
    <Modal isOpen={modalAdd} toggle={toggleModalAdd}>
      <ModalHeader toggle={toggleModalAdd}>
        {id ? "Cập nhật danh mục" : "Thêm danh mục"}
      </ModalHeader>
      <ModalBody>
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
            Tên danh mục
          </label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            id="name"
            placeholder="Tên danh mục"
            defaultValue={category?.name}
            {...register("name", {
              required: "Tên danh mục không được để trống!",
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
            defaultValue={category?.description}
            {...register("description")}
          ></textarea>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit(onSubmit)}>
          {id ? "Cập nhật" : "Thêm"}
        </Button>{" "}
        <Button color="secondary" onClick={toggleModalAdd}>
          Hủy
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CategoryForm;
