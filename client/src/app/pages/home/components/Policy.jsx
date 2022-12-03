const Policy = ({ column }) => {
  return (
    <section className={`section-policy ${column ? "" : "pt-5"}`}>
      <div className={`${column ? "" : "container"}`}>
        <div className={`row no-gutter ${column ? "column" : ""}`}>
          <div className={`policy ${column ? "col-12" : "col-3"}`}>
            <div className="policy-img">
              <img
                src="https://bizweb.dktcdn.net/100/108/842/themes/775959/assets/money.png?1667956229553"
                alt=""
              />
            </div>
            <div className="policy-content">
              <h3 className="policy-title">KHÔNG SỢ HẾT SIZE</h3>
              <p className="policy-description">
                Do chẳng cần đợi nhân viên chốt đơn
              </p>
            </div>
          </div>
          <div className={`policy ${column ? "col-12" : "col-3"}`}>
            <div className="policy-img">
              <img
                src="https://bizweb.dktcdn.net/100/108/842/themes/775959/assets/phone1.png?1667956229553"
                alt=""
              />
            </div>
            <div className="policy-content">
              <h3 className="policy-title">GIAO HÀNG TOÀN QUỐC</h3>
              <p className="policy-description">Gửi luôn trong ngày</p>
            </div>
          </div>
          <div className={`policy ${column ? "col-12" : "col-3"}`}>
            <div className="policy-img">
              <img
                src="https://bizweb.dktcdn.net/100/108/842/themes/775959/assets/return.png?1667956229553"
                alt=""
              />
            </div>
            <div className="policy-content">
              <h3 className="policy-title">THANH TOÁN LINH HOẠT</h3>
              <p className="policy-description">Tiền mặt/CK/Ví điện tử/thẻ</p>
            </div>
          </div>
          <div className={`policy ${column ? "col-12" : "col-3"}`}>
            <div className="policy-img">
              <img
                src="https://bizweb.dktcdn.net/100/108/842/themes/775959/assets/ship.png?1667956229553"
                alt=""
              />
            </div>
            <div className="policy-content">
              <h3 className="policy-title">ĐỔI SIZE THOẢI MÁI</h3>
              <p className="policy-description">Đến khi anh em hài lòng</p>
            </div>
          </div>
          {column && (
            <>
              <div className={`policy ${column ? "col-12" : "col-3"}`}>
                <div className="policy-img">
                  <img
                    src="https://bizweb.dktcdn.net/100/108/842/themes/775959/assets/qthd2_img.png?1669601315603"
                    alt=""
                  />
                </div>
                <div className="policy-content">
                  <h3 className="policy-title">BẢO HÀNH TRỌN ĐỜI</h3>
                  <p className="policy-description">
                    Lại dễ dàng chỉ cần đọc SĐT
                  </p>
                </div>
              </div>
              <div className={`policy ${column ? "col-12" : "col-3"}`}>
                <div className="policy-img">
                  <img
                    src="https://bizweb.dktcdn.net/100/108/842/themes/775959/assets/policy_6.png?1669601315603"
                    alt=""
                  />
                </div>
                <div className="policy-content">
                  <h3 className="policy-title">LUÔN LUÔN TRI ÂN</h3>
                  <p className="policy-description">
                    Nhiều phần quà hấp dẫn cho anh em
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Policy;
