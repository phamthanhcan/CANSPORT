import { useState } from "react";
import { Button } from "reactstrap";
import Navbar from "../../../components/Navbar";

const ProductManage = () => {
  const [search, setSearch] = useState();

  return (
    <>
      <Navbar title="SẢN PHẨM" />
      <div className="wrapper">
        <div className="d-flex justify-content-between mb-2">
          <input
            className="form-control"
            placeholder="Nhập sản phẩm cần tìm kiếm..."
            style={{ width: 300 }}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Button>+ Thêm sản phẩm</Button>
        </div>
      </div>
    </>
  );
};

export default ProductManage;
