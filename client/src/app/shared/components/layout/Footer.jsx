import facebookIcon from "../../../../assets/images/facebookicon.webp";
import youtubeIcon from "../../../../assets/images/youtubeicon.webp";
import zaloIcon from "../../../../assets/images/zaloicon.webp";
import shoppeeIcon from "../../../../assets/images/shoppeeicon.webp";
import tiktokIcon from "../../../../assets/images/tiktokicon.webp";
import bctImg from "../../../../assets/images/bct.webp";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-3">
            <h2 className="footer-title">VỀ CHÚNG TÔI</h2>
            <div className="footer-logo"></div>
            <ul className="footer-socials">
              <li className="social-item">
                <a href="/" className="social-link">
                  <img src={facebookIcon} alt="" />
                </a>
              </li>
              <li className="social-item">
                <a href="/" className="social-link">
                  <img src={shoppeeIcon} alt="" />
                </a>
              </li>
              <li className="social-item">
                <a href="/" className="social-link">
                  <img src={zaloIcon} alt="" />
                </a>
              </li>
              <li className="social-item">
                <a href="/" className="social-link">
                  <img src={tiktokIcon} alt="" />
                </a>
              </li>
              <li className="social-item">
                <a href="/" className="social-link">
                  <img src={youtubeIcon} alt="" />
                </a>
              </li>
            </ul>
            <div className="footer-bct">
              <img src={bctImg} alt="" />
            </div>
          </div>
          <div className="col-3">
            <h2 className="footer-title">THÔNG TIN</h2>
            <ul className="footer-policy">
              <li className="footer-policy-item">
                <a href="/">Chính sách thanh toán</a>
              </li>
              <li className="footer-policy-item">
                <a href="/">Chính sách giao nhận</a>
              </li>
              <li className="footer-policy-item">
                <a href="/">Chính sách đổi trả</a>
              </li>
              <li className="footer-policy-item">
                <a href="/">Chính sách bảo hành</a>
              </li>
              <li className="footer-policy-item">
                <a href="/">Chính sách bảo mật</a>
              </li>
            </ul>
          </div>
          <div className="col-3">
            <h2 className="footer-title">BẢN ĐỒ</h2>
            <div className="footer-map">
              <img
                src="https://bizweb.dktcdn.net/100/108/842/themes/775959/assets/img-bando.jpg?1669601539598"
                alt=""
              />
            </div>
          </div>
          <div className="col-3">
            <h2 className="footer-title">LIÊN HỆ</h2>
            <p>107 Nguyễn Hữu Dật - Hoà Cường Bắc - Hải Châu - TP Đà Nẵng</p>
            <p>Hotline: 0921 194 881</p>
            <p>Zalo bán lẻ: 0352 891 684</p>
            <p>Zalo bán sỉ: 0382 123 321</p>
          </div>
        </div>
        {/* <div className="f-center-x footer-feedback">
          <input
            className="form-control"
            placeholder="Gửi phản ánh cho chúng tôi"
          />
          <button className="btn btn-primary">Gửi</button>
        </div> */}
        <div className="f-center-x mt-5">
          <p>Cung cấp bởi CANSPORT</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
