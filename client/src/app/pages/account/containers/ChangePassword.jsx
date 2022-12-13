import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { editUserInfor, getUserInfor } from "../account.actions";
import AvatarImg from "../../../../assets/images/avatar.png";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.data?.encode._id);
  const user = useSelector((state) => state.user.data);

  console.log(user);

  const onSubmit = (data) => {};

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
            </div>
            <div className="form-group">
              <label htmlFor="name">Nhập mật khẩu mới</label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                {...register("newPassword")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Xác nhận mật khẩu</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                {...register("confirmPassword")}
              />
            </div>

            <input type="submit" className="btn btn-primary" value="XÁC NHẬN" />
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
