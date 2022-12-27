import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { editUserInfor, getUserInfor } from "../account.actions";
import AvatarImg from "../../../../assets/images/avatar.png";
import { regex } from "../../../shared/constants/regex";
import LoadingPage from "../../../shared/components/modules/LoadingPage";

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.data?.encode._id);
  const user = useSelector((state) => state.user.data);
  const isLoading = useSelector((state) => state.user.isLoading);

  const [img, setImg] = useState(user?.userImage || "");
  const [isLoadingImg, setIsLoadingImg] = useState("");

  console.log(user);

  const onSubmit = (data) => {
    dispatch(editUserInfor(user?.id, { ...data, userImage: img }));
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
    dispatch(getUserInfor(userId));
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
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
                  className="form-control disabled"
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
                <label htmlFor="phone">Số điện thoại</label>
                <input
                  type="number"
                  className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  id="phone"
                  {...register("phone", {
                    pattern: {
                      value: regex.phoneNumber,
                      message: "Số điện thoại không hợp lệ",
                    },
                  })}
                  defaultValue={user?.phone}
                />
                <p className="txt-error">{errors.phone?.message}</p>
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
            <img className="profile-img" alt="avatar" src={img || AvatarImg} />
            <input
              className="mt-4"
              type="file"
              accept=".png, .jpg, .webp"
              onChange={uploadImg}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
