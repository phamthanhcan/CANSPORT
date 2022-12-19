import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../../components/Navbar";
import {
  Button,
  Card,
  CardHeader,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";
import { useEffect, useState } from "react";
import { deleteCategory, getCategory } from "../actions";
import noImage from "../../../assets/images/no-image.png";
import CategoryForm from "../components/CategoryForm";
import Loading from "../../../libs/components/Loading";
import Empty from "../../../libs/components/Empty";

const CategoryManage = () => {
  const [modalDelete, setModalDelete] = useState(false);
  const toggleModalDelete = () => setModalDelete(!modalDelete);
  const [modalAdd, setModalAdd] = useState(false);
  const toggleModalAdd = () => setModalAdd(!modalAdd);
  const [idCategory, setIdCategory] = useState(null);
  const [search, setSearch] = useState("");

  const categoriesFilter = () => {
    return categories?.filter((category) =>
      search.trim()
        ? category.name.toLowerCase().includes(search.toLowerCase().trim())
        : true
    );
  };

  const dispatch = useDispatch();

  const categories = useSelector((state) => state.category.categories);
  const categorySelect = categories?.filter(
    (category) => category._id === idCategory
  )[0];
  const isLoading = useSelector((state) => state.category.isLoading);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const handleDeleteCategory = () => {
    dispatch(deleteCategory(idCategory));
    toggleModalDelete();
  };

  return (
    <>
      <Navbar title="DANH MỤC" />
      <div className="wrapper">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="d-flex justify-content-between mb-2">
              <input
                className="form-control"
                placeholder="Nhập danh mục cần tìm kiếm..."
                style={{ width: 300 }}
                onChange={(e) => setSearch(e.target.value)}
              />

              <Button
                onClick={() => {
                  setIdCategory(null);
                  toggleModalAdd();
                }}
              >
                + Thêm danh mục
              </Button>
            </div>
            {categoriesFilter().length ? (
              <Row>
                <div className="col">
                  <Card className="shadow">
                    <CardHeader className="border-0">
                      <h3 className="mb-0">Danh mục</h3>
                    </CardHeader>
                    <Table
                      className="align-items-center table-flush"
                      responsive
                    >
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Hình ảnh</th>
                          <th scope="col">Tên danh mục</th>
                          <th scope="col">Mô tả</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {categoriesFilter()?.map((category) => (
                          <tr key={category._id}>
                            <th scope="row">
                              <img
                                alt="..."
                                src={category.image || noImage}
                                style={{
                                  width: 80,
                                  height: 80,
                                  objectFit: "contain",
                                }}
                              />
                            </th>
                            <td>
                              <span>{category.name}</span>
                            </td>
                            <td>
                              <span>{category.description}</span>
                            </td>
                            <td>
                              <button
                                className="btn"
                                onClick={() => {
                                  setIdCategory(category._id);
                                  toggleModalAdd();
                                }}
                              >
                                <ion-icon name="create-outline"></ion-icon>
                              </button>
                              <button
                                className="btn"
                                onClick={() => {
                                  setIdCategory(category._id);
                                  toggleModalDelete();
                                }}
                              >
                                <ion-icon name="trash-outline"></ion-icon>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card>
                </div>
              </Row>
            ) : (
              <Empty />
            )}
          </>
        )}
      </div>
      <Modal isOpen={modalDelete} toggle={toggleModalDelete}>
        <ModalHeader toggle={toggleModalDelete}>
          Bạn có chắc chắn muốn xóa danh mục này?
        </ModalHeader>
        <ModalBody>
          <img className="mr-3" src={categorySelect?.image} alt="" />
          <span>{categorySelect?.name}</span>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleDeleteCategory}>
            Xác nhận
          </Button>{" "}
          <Button color="secondary" onClick={toggleModalDelete}>
            Hủy
          </Button>
        </ModalFooter>
      </Modal>
      {modalAdd && (
        <CategoryForm
          id={idCategory}
          modalAdd={modalAdd}
          toggleModalAdd={toggleModalAdd}
        />
      )}
    </>
  );
};

export default CategoryManage;
