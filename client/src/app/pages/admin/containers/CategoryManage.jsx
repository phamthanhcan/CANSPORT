import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Empty from "../../../shared/components/modules/Empty";
import CategoryForm from "../components/CategoryForm";
import Dialog, { DIALOG_TYPE } from "../../../shared/components/modules/Dialog";
import { deleteCategory, getListCategory } from "../../home/home.actions";
import NoImage from "../../../../assets/images/no-image.png";

const CategoryManage = () => {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.category.data);
  const [showDialog, setShowDialog] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [search, setSearch] = useState("");

  const handleDeleteCategory = useCallback(() => {
    dispatch(deleteCategory(categoryId));
  }, [dispatch, categoryId]);

  const getCategoriesFilter = useCallback(() => {
    return categories
      ? categories.filter(
          (category) =>
            category.status === true &&
            (search
              ? category.name.toLowerCase().includes(search.toLowerCase())
              : true)
        )
      : [];
  }, [categories, search]);

  useEffect(() => {
    dispatch(getListCategory());
  }, [dispatch]);

  return (
    <div className="category-manage admin-wrapper">
      {showForm && <CategoryForm id={categoryId} setShowForm={setShowForm} />}
      {showDialog && (
        <Dialog
          header="Bạn có chắc chắn muốn xoá danh mục này?"
          type={DIALOG_TYPE.CONFIRM}
          afterClosed={() => {
            setShowDialog(false);
            setCategoryId("");
          }}
          handleConfirm={() => {
            handleDeleteCategory();
            setShowDialog(false);
          }}
        />
      )}
      <h2 className="admin-title">DANH MỤC SẢN PHẨM</h2>
      <div className="admin-actions">
        <input
          className="form-control"
          type="text"
          placeholder="Nhập tên danh mục cần tìm"
          onChange={(e) => setSearch(e.target.value || "")}
        />
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          Thêm danh mục
        </button>
      </div>
      {!getCategoriesFilter().length ? (
        <Empty />
      ) : (
        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>Ảnh</th>
                <th>Tên danh mục</th>
                <th>Mô tả</th>
                <th>Chỉnh sửa</th>
              </tr>
            </thead>
            <tbody>
              {getCategoriesFilter().map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      style={{ height: 100, width: 100 }}
                      src={item.image || NoImage}
                      alt=""
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        setShowDialog(true);
                        setCategoryId(item.id);
                      }}
                    >
                      Xoá
                    </button>
                    <button
                      className="btn btn-primary btn-sm ml-3"
                      onClick={() => {
                        setShowForm(true);
                        setCategoryId(item.id);
                      }}
                    >
                      Cập nhật
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CategoryManage;
