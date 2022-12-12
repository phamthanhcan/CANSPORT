import { useForm } from "react-hook-form";

const UserForm = (props) => {
  const { id } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {};

  return (
    <div className="user-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="form-title">
          {id ? "CẬP NHẬT KHÁCH HÀNG" : "THÊM KHÁCH HÀNG"}
        </h3>
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            className="form-control"
            id="email "
            {...register("email", { required: "Vui lòng nhập email!" })}
          />
          <p className="form-error">{errors?.email?.message}</p>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Mật khẩu
          </label>
          <input
            className="form-control"
            id="password "
            {...register("password", { required: "Vui lòng nhập mật khẩu!" })}
          />
          <p className="form-error">{errors?.password?.message}</p>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="name">
            Họ và tên
          </label>
          <input
            className="form-control"
            id="name "
            {...register("name", {
              required: "Vui lòng nhập mật họ và tên!",
            })}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="address">
            Địa chỉ
          </label>
          <input
            className="form-control"
            id="address "
            {...register("address")}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="dob">
            Ngày sinh
          </label>
          <input
            type="date"
            className="form-control"
            id="dob"
            {...register("dob")}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="phone">
            Số điện thoại
          </label>
          <input className="form-control" id="phone" {...register("phone")} />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="gender">
            Giới tính
          </label>
          <div>
            <div className="f-center-y">
              <input
                type="radio"
                id="male"
                value={true}
                {...register("gender")}
              />
              <label className="form-check-label" htmlFor="male">
                Nam
              </label>
            </div>
            <div className="f-center-y">
              <input
                type="radio"
                id="female"
                value={false}
                {...register("gender")}
              />
              <label className="form-check-label" htmlFor="female">
                Nữ
              </label>
            </div>
          </div>
        </div>
        <div className="form-actions">
          <button className="btn btn-secondary mr-3">Hủy</button>
          <button className="btn btn-primary">Thêm</button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
