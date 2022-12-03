import Policy from "../components/Policy";

const ProductDetail = () => {
  return (
    <>
      <div className="product-view">
        <div className="container">
          <div className="row gutter-sm">
            <div className="col-9">
              <div className="row gutter-sm">
                <div className="col-6">
                  <img
                    className="product-view-img"
                    src="https://bizweb.dktcdn.net/thumb/grande/100/108/842/products/189-b0bd19df-a3fe-44ac-a213-9f4a3c84a3d5.jpg?v=1669815257237"
                    alt=""
                  />
                </div>
                <div className="col-6">
                  <h2 className="product-view-name">
                    Giày Bóng Đá TQ Puma Ultra 1.4 Sakura Trắng Hồng FG
                  </h2>
                  <p className="product-view-id">MÃ SẢN PHẨM: 22112902</p>
                  <p className="product-view-price">780.000đ</p>
                  {/* <span className="product-view-status">HÀNG CÓ SẴN</span> */}
                  <h3 className="product-view-label">CHỌN SIZE</h3>
                  <ul className="product-view-options">
                    <li className="product-view-option">
                      <button className="">38</button>
                    </li>
                    <li className="product-view-option">
                      <button className="">39</button>
                    </li>
                    <li className="product-view-option">
                      <button className="">40</button>
                    </li>
                    <li className="product-view-option">
                      <button className="">41</button>
                    </li>
                    <li className="product-view-option">
                      <button className="">42</button>
                    </li>
                  </ul>
                  <button className="badge badge-sm mb-5">
                    Hướng dẫn chọn size
                  </button>
                  <h3 className="product-view-label">CHỌN SIZE</h3>
                  <ul className="product-view-options">
                    <li
                      className="product-view-option"
                      style={{ backgroundColor: "#d04d63" }}
                    ></li>
                    <li
                      className="product-view-option"
                      style={{ backgroundColor: "#312313" }}
                    ></li>
                    <li
                      className="product-view-option"
                      style={{ backgroundColor: "#543123" }}
                    ></li>
                    <li
                      className="product-view-option"
                      style={{ backgroundColor: "#cad123" }}
                    ></li>
                  </ul>
                  <h3 className="product-view-label mt-5">CHỌN SỐ LƯỢNG</h3>
                  <div className="choose-quantity">
                    <button className="btn-quantity">+</button>
                    <input
                      className="form-control quantity"
                      value="0"
                      min="0"
                      type="number"
                    />
                    <button className="btn-quantity">-</button>
                  </div>
                  <button className="btn btn-primary mt-5">MUA NGAY</button>
                </div>
              </div>
            </div>
            <div className="col-3">
              <Policy column />
            </div>
          </div>
          <div className="product-collateral">
            <ul className="product-tab-list">
              <li className="product-tab-item">
                <button className="product-tab-btn">CHI TIẾT SẢN PHẨM</button>
              </li>
              <li className="product-tab-item">
                <button className="product-tab-btn">HƯỚNG DẪN MUA HÀNG</button>
              </li>
              <li className="product-tab-item">
                <button className="product-tab-btn">CÁCH CHỌN SIZE</button>
              </li>
              <li className="product-tab-item">
                <button className="product-tab-btn">CHÍNH SÁCH HOÀN TRẢ</button>
              </li>
            </ul>
            <div className="product-tab-content">
              <div className="product-tabpane"></div>
              <div className="product-tabpane"></div>
              <div className="product-tabpane"></div>
              <div className="product-tabpane"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
