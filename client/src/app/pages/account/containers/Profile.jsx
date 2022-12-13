import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { editUserInfor, getUserInfor } from "../account.actions";
import AvatarImg from "../../../../assets/images/avatar.png";

const Profile = () => {
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
            <h2 className="section-title">THÔNG TIN CÁ NHÂN</h2>
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                {...register("email")}
                defaultValue={user?.email}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Họ và tên</label>
              <input
                type="text"
                className="form-control"
                id="name"
                {...register("name")}
                defaultValue={user?.name}
              />
              <p className="txt-error">{errors.name?.message}</p>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="address">Địa chỉ</label>
              <input
                type="text"
                className="form-control"
                id="address"
                {...register("address")}
                defaultValue={user?.address || ""}
              />
              <p className="txt-error">{errors.address?.message}</p>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="dob">Birthday</label>
              <input
                type="date"
                className="form-control"
                id="dob"
                {...register("dob")}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="phone">Số điện thoại</label>
              <input
                type="number"
                className="form-control"
                id="phone"
                {...register("phone")}
                defaultValue={user?.phone}
              />
              <p className="txt-error">{errors.phone?.message}</p>
            </div>
            <div className="form-check form-check-inline">
              <input
                defaultChecked={!user?.gender}
                className="form-check-input"
                type="radio"
                id="male"
                value={true}
                {...register("gender")}
              />
              <label className="form-check-label" htmlFor="male">
                Nam
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                defaultChecked={user?.gender}
                className="form-check-input"
                type="radio"
                id="female"
                value={false}
                {...register("gender")}
              />
              <label className="form-check-label" htmlFor="female">
                Nữ
              </label>
            </div>
            <div className="form-group pt-5">
              <input
                type="submit"
                className="btn btn-primary full-width"
                value="Cập nhật thông tin"
              />
            </div>
          </form>
        </div>
        <div className="col-4 profile-select-avatar">
          <img
            className="profile-img"
            alt="avatar"
            src={user?.userImage || AvatarImg}
          />
          <input className="mt-4" type="file" onChange={uploadImg} />
        </div>
      </div>
    </>
  );
};

export default Profile;
