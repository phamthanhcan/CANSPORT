import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Empty from "../../../shared/components/modules/Empty";
import ProductForm from "../components/ProductForm";
import { deleteProduct, getListProducts } from "../../home/home.actions";
import Dialog, { DIALOG_TYPE } from "../../../shared/components/modules/Dialog";

const ProductManage = () => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [search, setSearch] = useState("");
  const [productId, setProductId] = useState("");
  const [page, setPage] = useState(1);

  const products = useSelector((state) => state.product.data);

  useEffect(() => {
    dispatch(getListProducts(page - 1, 0, "", search || ""));
  }, [dispatch, page]);

  useEffect(() => {
    if (products) {
      setShowDialog(false);
      setShowForm(false);
      setProductId("");
    }
  }, [products]);

  const handleDelete = () => {
    dispatch(deleteProduct(productId));
  };

  const handleChange = (e, value) => {
    setPage(value);
  };

  const handleSearch = () => {
    setPage(1);
    dispatch(getListProducts(0, 0, "", search));
  };

  return (
    <div className="product-manage admin-container">
      {showForm && (
        <ProductForm id={productId} handleCancel={() => setShowForm(false)} />
      )}
      {showDialog && (
        <Dialog
          header="Bạn có chắc chắn muốn xóa sản phẩm này?"
          type={DIALOG_TYPE.CONFIRM}
          afterClosed={() => {
            setShowDialog(false);
            setProductId("");
          }}
          handleConfirm={() => handleDelete()}
        />
      )}
      <h2 className="admin-title">QUẢN LÝ SẢN PHẨM</h2>
      <div className="admin-actions">
        <input
          className="form-control"
          type="text"
          placeholder="Nhập tên sản phẩm cần tìm"
        />
        <Link
          to="/admin/products/add"
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          Thêm sản phẩm
        </Link>
      </div>

      {/* <Empty /> */}
    </div>
  );
};

export default ProductManage;
