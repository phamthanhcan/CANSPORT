import { useCallback } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

const Login = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Vui lòng nhập email")
      .email("Email không hợp lệ"),
    password: Yup.string().required("Vui lòng nhập mật khẩu"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = useCallback(() => {}, []);

  return (
    <div className="auth">
      <div className="container">
        <h1 className="auth-title">ĐĂNG NHẬP</h1>
        <div className="row">
          <div className="col-6">
            <form
              className="auth-form bg-gray"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h2 className="auth-form-title">ĐĂNG NHẬP</h2>
              <p className="auth-form-description">
                Nếu bạn có tài khoản, xin vui lòng đăng nhập
              </p>
              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email<span className="form-label-required">*</span>
                </label>
                <input
                  className="form-control auth-input"
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
                  className="form-control auth-input"
                  type="password"
                  id="password"
                  {...register("password")}
                />
                <span className="form-error">{errors.password?.message}</span>
              </div>
              <button className="btn btn-primary">Đăng nhập</button>
              <button className="btn btn-sm">Quên mật khẩu?</button>
            </form>
          </div>
          <div className="col-6">
            <div className="auth-form bg-gray">
              <h2 className="auth-form-title">KHÁCH HÀNG MỚI</h2>
              <p className="auth-form-description">
                Bằng cách tạo một tài khoản với cửa hàng của chúng tôi , bạn sẽ
                có thể thực hiện những quy trình mua hàng nhanh hơn , lưu trữ
                nhiều địa chỉ gửi hàng , xem và theo dõi đơn đặt hàng của bạn
                trong tài khoản của bạn và nhiều hơn nữa .
              </p>
              <button className="btn btn-primary">Tạo tài khoản</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
