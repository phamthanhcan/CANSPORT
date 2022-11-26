import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

import { regex } from "../../shared/constants/regex";

const Register = () => {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Vui lòng nhập tên"),
    lastName: Yup.string().required("Vui lòng nhập họ"),
    phone: Yup.string()
      .matches(regex.phoneNumber, "Số điện thoại không hợp lệ")
      .required("Vui lòng nhập số điện thoại"),
    email: Yup.string()
      .required("Vui lòng nhập email")
      .email("Email không hợp lệ"),
    password: Yup.string()
      .min(6, "Mật khẩu phải nhiều hơn 6 ký tự")
      .required("Vui lòng nhập mật khẩu"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Nhập lại mật khẩu không chính xác"
    ),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="auth">
      <div className="container">
        <h1 className="auth-title">TẠO TÀI KHOẢN</h1>
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label className="form-label" htmlFor="firstName">
                  Tên<span className="form-label-required">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="firstName"
                  {...register("firstName")}
                />
                <span className="form-error">{errors.firstName?.message}</span>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="lastName">
                  Họ<span className="form-label-required">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="lastName"
                  {...register("lastName")}
                />
                <span className="form-error">{errors.lastName?.message}</span>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="phone">
                  Số điện thoại<span className="form-label-required">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="phone"
                  {...register("phone")}
                />
                <span className="form-error">{errors.phone?.message}</span>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email<span className="form-label-required">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="email"
                  {...register("email")}
                />
                <span className="form-error">{errors.email?.message}</span>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="password">
                  Mật khẩu<span className="form-label-required">*</span>
                </label>
                <input
                  className="form-control"
                  type="password"
                  id="password"
                  {...register("password")}
                />
                <span className="form-error">{errors.password?.message}</span>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="confirmPassword">
                  Nhập lại mật khẩu
                  <span className="form-label-required">*</span>
                </label>
                <input
                  className="form-control"
                  type="password"
                  id="confirmPassword"
                  {...register("confirmPassword")}
                />
                <span className="form-error">
                  {errors.confirmPassword?.message}
                </span>
              </div>
            </div>
          </div>
          <button className="btn btn-secondary mr-3">Quay lại</button>
          <button className="btn btn-primary">Đăng ký</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
