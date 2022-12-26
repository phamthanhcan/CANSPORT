import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Loading from "../../../libs/components/Loading";
import noImage from "../../../assets/images/no-image.png";
import { addUser, updateUser } from "../actions";

const UserForm = (props) => {
  const { id, modalAdd, toggleModalAdd } = props;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Tên không được để trống"),
    email: !id
      ? Yup.string()
          .required("Email không được để trống")
          .email("Email không hợp lệ")
      : "",
    phone: Yup.string()
      .required("Số điện thoại không được để trống")
      .matches(
        /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
        "Số điện thoại không hợp lệ"
      ),
    password: !id
      ? Yup.string()
          .required("Mật khẩu không được để trống")
          .min(6, "Mật khẩu phải nhiều hơn 6 ký tự")
      : "",
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const dispatch = useDispatch();

  const users = useSelector((state) => state.user.users);
  const user = users.find((user) => user._id === id);

  console.log({ user });

  const [isLoadingImg, setIsLoadingImg] = useState(false);
  const [img, setImg] = useState(user?.userImage || "");

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

  console.log({ errors });

  const onSubmit = (data) => {
    const dataSubmit = { ...data, userImage: img };
    if (id) {
      console.log("update");
      dispatch(updateUser(id, dataSubmit));
    } else {
      dispatch(addUser(dataSubmit));
    }
    toggleModalAdd();
  };

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
            Tên người dùng
          </label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            id="name"
            placeholder="Tên người dùng"
            defaultValue={user?.name}
            {...register("name")}
          />
          <div className="invalid-feedback">{errors.name?.message}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            id="email"
            placeholder="example@gmail.com"
            defaultValue={user?.email}
            disabled={!!id}
            {...register("email")}
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>
        {!id && (
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Mật khẩu
            </label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              id="password"
              placeholder="**************"
              {...register(`${"password"}`)}
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Số điện thoại
          </label>
          <input
            type="text"
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            id="phone"
            defaultValue={user?.phone}
            {...register("phone")}
          />
          <div className="invalid-feedback">{errors.phone?.message}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Địa chỉ
          </label>
          <input
            type="text"
            className={`form-control ${errors.address ? "is-invalid" : ""}`}
            id="address"
            defaultValue={user?.address}
            {...register("address")}
          />
          <div className="invalid-feedback">{errors.address?.message}</div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={handleSubmit(onSubmit)}
          disabled={isLoadingImg}
        >
          {id ? "Cập nhật" : "Thêm"}
        </Button>{" "}
        <Button color="secondary" onClick={toggleModalAdd}>
          Hủy
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default UserForm;
