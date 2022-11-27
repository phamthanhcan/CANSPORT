import { useState } from "react";
import Empty from "../../../shared/components/modules/Empty";
import ProductForm from "../components/ProductForm";

const ProductManage = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="product-manage admin-wrapper">
      {showForm && <ProductForm setShowForm={setShowForm} />}
      <h2 className="admin-title">QUẢN LÝ SẢN PHẨM</h2>
      <div className="admin-actions">
        <input
          className="form-control"
          type="text"
          placeholder="Nhập tên sản phẩm cần tìm"
        />
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          Thêm sản phẩm
        </button>
      </div>

      {/* <Empty /> */}
    </div>
  );
};

export default ProductManage;
