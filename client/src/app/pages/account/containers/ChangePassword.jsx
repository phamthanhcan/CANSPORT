import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { editUserInfor, getUserInfor } from "../account.actions";
import AvatarImg from "../../../../assets/images/avatar.png";
import { putApi } from "../../../shared/helper/api";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .min(6, "Mật khẩu phải nhiều hơn 6 ký tự")
      .required("Không được để trống trường này"),
    newPassword: Yup.string()
      .min(6, "Mật khẩu phải nhiều hơn 6 ký tự")
      .required("Không được để trống trường này"),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("newPassword"), null],
        "Xác nhận mật khẩu không chính xác"
      )
      .required("Không được để trống trường này"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.data?.encode._id);
  const user = useSelector((state) => state.user.data);

  const [isSubmited, setIsSubmited] = useState(false);

  const onSubmit = (data) => {
    putApi([`user/${userId}/change-password`], {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    })
      .then((res) => {
        setIsSubmited(true);
        toast.success("Đổi mật khẩu thành công!");
      })
      .catch((err) => {
        setIsSubmited(true);
        toast.error(err.response?.data?.message);
      });
  };

  const uploadImg = (e) => {
    // const file = e.target.files[0];
    // const formData = new FormData();
    // formData.append("file", file);
    // axios
    //   .post("http://localhost:7009/uploadiu", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   })
    //   .then((response) => {
    //     dispatch(
    //       editUserInfor(userId, {
    //         ...user,
    //         userImage: response?.data?.fileLocation,
    //       })
    //     );
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  useEffect(() => {
    dispatch(getUserInfor(userId));
  }, [dispatch]);
  return (
    <>
      <div className="row profile">
        <div className="col-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="section-title">THAY ĐỔI MẬT KHẨU</h2>
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Mật khẩu cũ
              </label>
              <input
                type="password"
                className="form-control"
                id="oldPassword"
                {...register("oldPassword")}
              />
              <p className="form-error">{errors.oldPassword?.message}</p>
            </div>
            <div className="form-group">
              <label htmlFor="name">Nhập mật khẩu mới</label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                {...register("newPassword")}
              />
              <p className="form-error">{errors.newPassword?.message}</p>
            </div>
            <div className="form-group">
              <label htmlFor="name">Xác nhận mật khẩu</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                {...register("confirmPassword")}
              />
              <p className="form-error">{errors.confirmPassword?.message}</p>
            </div>

            <input type="submit" className="btn btn-primary" value="XÁC NHẬN" />
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
