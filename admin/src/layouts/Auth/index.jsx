import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { login } from "./actions";
import { useEffect } from "react";

export const isExpriedToken = (token) => {
  if (!token) return true;
  const token_decode = jwt_decode(token);
  if ((token_decode.exp || 0) < Date.now() / 1000) {
    return true;
  } else {
    return false;
  }
};

const Auth = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.data);
  const errorMessage = useSelector((state) => state.auth.error);

  const onSubmit = (data) => {
    console.log(data);
    dispatch(login(data));
  };

  useEffect(() => {
    if (!isExpriedToken(user?.token)) {
      if (user?.encode.role === 1) window.location.href = "/admin";
    }
  }, [user]);

  return (
    <div className="auth">
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="auth-title mb-4">Admin Login</h2>
        <div className="input-group has-validation mb-4">
          <span className="input-group-text">
            <ion-icon name="mail-outline"></ion-icon>
          </span>
          <div className={`form-floating ${errors.email ? "is-invalid" : ""}`}>
            <input
              type="text"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="email"
              placeholder="Email"
              {...register("email", { required: "Email không được để trống!" })}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>
        <div className="input-group has-validation mb-4">
          <span className="input-group-text">
            <ion-icon name="lock-open-outline"></ion-icon>
          </span>
          <div
            className={`form-floating ${errors.password ? "is-invalid" : ""}`}
          >
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              id="password"
              placeholder="Mật khẩu"
              {...register("password", {
                required: "Mật khẩu không được để trống!",
              })}
            />
            <label htmlFor="password">Mật khẩu</label>
          </div>
          <div className="invalid-feedback">{errors.password?.message}</div>
        </div>
        <p className="text-danger">{errorMessage}</p>
        <div className="d-grid">
          <button className="btn btn-primary">ĐĂNG NHẬP</button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
