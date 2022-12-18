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
import { useCallback, useEffect, useState } from "react";
import { addCategory, deleteCategory, getCategory } from "../actions";
import noImage from "../../../assets/images/no-image.png";
import axios from "axios";
import { useForm } from "react-hook-form";
import CategoryForm from "../components/CategoryForm";

const CategoryManage = () => {
  const [modalDelete, setModalDelete] = useState(false);
  const toggleModalDelete = () => setModalDelete(!modalDelete);
  const [modalAdd, setModalAdd] = useState(false);
  const toggleModalAdd = () => setModalAdd(!modalAdd);
  const [idCategory, setIdCategory] = useState(null);
  const [search, setSearch] = useState("");

  const categoriesFilter = () => {
    return categories.filter((category) =>
      search.trim()
        ? category.name.toLowerCase().includes(search.toLowerCase().trim())
        : true
    );
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.admin.categories);
  const categorySelect = categories?.filter(
    (category) => category._id === idCategory
  )[0];

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
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Danh mục</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
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
                    <tr>
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
