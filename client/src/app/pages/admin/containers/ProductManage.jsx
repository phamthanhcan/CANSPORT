import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Empty from "../../../shared/components/modules/Empty";
import ProductForm from "../components/ProductForm";
import { deleteProduct, getListProducts } from "../../home/home.actions";
import Dialog, { DIALOG_TYPE } from "../../../shared/components/modules/Dialog";
import NoImage from "../../../../assets/images/no-image.png";
import editIcon from "../../../../assets/icons/edit.svg";
import deleteIcon from "../../../../assets/icons/trash.svg";
import { numberWithCommas } from "../../../shared/helper/data";

const ProductManage = () => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [search, setSearch] = useState("");
  const [productId, setProductId] = useState("");
  const [page, setPage] = useState(1);

  const products = useSelector((state) => state.product.data);

  console.log(products);

  useEffect(() => {
    dispatch(getListProducts(page - 1, 0, "", search || ""));
  }, [dispatch, page, search]);

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

      {!products?.length ? (
        <Empty />
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Hình ảnh</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Danh mục</th>
              <th>Chỉnh sửa</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr>
                <td>{product.name}</td>
                <td>
                  <img
                    className="category-admin-img"
                    src={product.images[0] || NoImage}
                    alt="img"
                  />
                </td>
                <td>
                  {product.minPrice === product.maxPrice
                    ? `${numberWithCommas(product.minPrice)}đ`
                    : `${numberWithCommas(
                        product.minPrice
                      )}đ - ${numberWithCommas(product.maxPrice)}đ`}
                </td>
                <td>{product.quantity}</td>
                <td>{product.category.name}</td>
                <td>
                  <img src={editIcon} className="action-btn mr-3" alt="edit" />
                  <img
                    src={deleteIcon}
                    className="action-btn delete"
                    alt="delete"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="f-center-x mt-5">
        <Stack spacing={2}>
          <Pagination count={10} variant="outlined" shape="rounded" />
        </Stack>
      </div>
    </div>
  );
};

export default ProductManage;
