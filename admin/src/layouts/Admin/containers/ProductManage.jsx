import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Navbar from "../../../components/Navbar";
import Empty from "../../../libs/components/Empty";
import Loading from "../../../libs/components/Loading";
import { deleteProduct, getCategory, getListProducts } from "../actions";
import noImage from "../../../assets/images/no-image.png";
import { numberWithCommas } from "../../../libs/helper";
import ProductForm from "../components/ProductForm";

const ProductManage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const totalPages = useSelector((state) => state.product.totalPages);
  const isLoading = useSelector((state) => state.product.isLoading);
  const categories = useSelector((state) => state.category.categories);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [idSelected, setIdSelected] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
  const toggleModalDelete = () => setModalDelete(!modalDelete);
  const [modalAdd, setModalAdd] = useState(false);
  const toggleModalAdd = () => setModalAdd(!modalAdd);

  const productSelected = products?.filter(
    (product) => product._id === idSelected
  )[0];

  const handleDeleteProduct = () => {
    dispatch(deleteProduct(idSelected));
    toggleModalDelete();
  };

  const productsFilter = () => {
    return products?.filter((product) =>
      search.trim()
        ? product.name.toLowerCase().includes(search.toLowerCase().trim())
        : true
    );
  };

  const handleChangePage = (e, value) => {
    setPage(value);
  };

  useEffect(() => {
    dispatch(getListProducts(page - 1, 0, "", "" || "", true));
  }, [dispatch, page]);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  return (
    <>
      <Navbar title="SẢN PHẨM" />
      <div className="wrapper">
        <>
          <div className="d-flex justify-content-between mb-2">
            <input
              className="form-control"
              placeholder="Nhập sản phẩm cần tìm kiếm..."
              style={{ width: 300 }}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button onClick={toggleModalAdd}>+ Thêm sản phẩm</Button>
          </div>
          {products.length ? (
            <Row>
              <div className="col">
                <Card className="shadow">
                  <CardHeader className="border-0">
                    <h3 className="mb-0">Sản phẩm</h3>
                  </CardHeader>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Hình ảnh</th>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Giá</th>
                        <th scope="col" style={{ width: 90 }}>
                          Số lượng
                        </th>
                        <th scope="col">Danh mục</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {productsFilter()?.map((product) => (
                        <tr key={product._id}>
                          <th scope="row">
                            <img
                              alt="..."
                              src={product.image || noImage}
                              style={{
                                width: 80,
                                height: 80,
                                objectFit: "contain",
                              }}
                            />
                          </th>
                          <td>
                            <span>{product.name}</span>
                          </td>
                          <td>
                            <span>{numberWithCommas(product.price)}đ</span>
                          </td>
                          <td>
                            <p className="text-center">{product.quantity}</p>
                          </td>
                          <td>
                            <span>{product.category.name}</span>
                          </td>
                          <td>
                            <div className="d-flex">
                              <button
                                className="btn"
                                onClick={() => {
                                  setIdSelected(product._id);
                                  toggleModalAdd();
                                }}
                              >
                                <ion-icon name="create-outline"></ion-icon>
                              </button>
                              <button
                                className="btn"
                                onClick={() => {
                                  setIdSelected(product._id);
                                  toggleModalDelete();
                                }}
                              >
                                <ion-icon name="trash-outline"></ion-icon>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <CardFooter>
                    <div className="d-flex justify-content-center">
                      <Pagination
                        count={totalPages}
                        variant="outlined"
                        shape="rounded"
                        onChange={handleChangePage}
                      />
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </Row>
          ) : (
            <Empty />
          )}
        </>
      </div>
      <Modal isOpen={modalDelete} toggle={toggleModalDelete}>
        <ModalHeader toggle={toggleModalDelete}>
          Bạn có chắc chắn muốn xóa sản phẩm này?
        </ModalHeader>
        <ModalBody>
          <img
            style={{ width: 100, height: 100 }}
            className="mr-3"
            src={productSelected?.image}
            alt=""
          />
          <span>{productSelected?.name}</span>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleDeleteProduct}>
            Xác nhận
          </Button>{" "}
          <Button color="secondary" onClick={toggleModalDelete}>
            Hủy
          </Button>
        </ModalFooter>
      </Modal>
      {modalAdd && (
        <ProductForm
          categories={categories}
          id={idSelected}
          setId={setIdSelected}
          modalAdd={modalAdd}
          toggleModalAdd={toggleModalAdd}
        />
      )}
    </>
  );
};

export default ProductManage;
