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
import Navbar from "../../../components/Navbar";
import { getListUser } from "../actions";
import noImage from "../../../assets/images/no-image.png";
import Empty from "../../../libs/components/Empty";

const UserManage = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.user.users);
  const totalPages = useSelector((state) => state.user.totalPages);

  const [search, setSearch] = useState("");
  const [modalDelete, setModalDelete] = useState(false);
  const toggleModalDelete = () => setModalDelete(!modalDelete);
  const [modalAdd, setModalAdd] = useState(false);
  const toggleModalAdd = () => setModalAdd(!modalAdd);
  const [idSelected, setIdSelected] = useState(null);
  const [page, setPage] = useState(1);

  const userSelected = users.find((user) => user._id === idSelected);

  const handleChangePage = (e, value) => {
    setPage(value);
  };

  const handleDeleteUser = () => {};

  useEffect(() => {
    dispatch(getListUser(page - 1, 10, "", true));
  }, [dispatch, page]);

  return (
    <div>
      <Navbar title="KHÁCH HÀNG" />
      <div className="wrapper">
        <>
          <div className="d-flex justify-content-between mb-2">
            <input
              className="form-control"
              placeholder="Nhập tên người dùng cần tìm kiếm..."
              style={{ width: 300 }}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button onClick={toggleModalAdd}>+ Thêm người dùng</Button>
          </div>
          {users.length ? (
            <Row>
              <div className="col">
                <Card className="shadow">
                  <CardHeader className="border-0">
                    <h3 className="mb-0">Người dùng</h3>
                  </CardHeader>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Hình ảnh</th>
                        <th scope="col">Tên người dùng</th>
                        <th scope="col">Email</th>
                        <th scope="col">Điện thoại</th>
                        <th scope="col">Địa chỉ</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {users?.map((user) => (
                        <tr key={user._id}>
                          <th scope="row">
                            <img
                              alt="..."
                              src={user.userImage || noImage}
                              style={{
                                width: 80,
                                height: 80,
                                objectFit: "contain",
                              }}
                            />
                          </th>
                          <td>
                            <span>{user.name}</span>
                          </td>
                          <td>
                            <span>{user.email}</span>
                          </td>
                          <td>
                            <span>{user.phone}</span>
                          </td>
                          <td>
                            <span>{user.address}</span>
                          </td>
                          <td>
                            <div className="d-flex">
                              <button
                                className="btn"
                                onClick={() => {
                                  setIdSelected(user._id);
                                  toggleModalAdd();
                                }}
                              >
                                <ion-icon name="create-outline"></ion-icon>
                              </button>
                              <button
                                className="btn"
                                onClick={() => {
                                  setIdSelected(user._id);
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
          Bạn có chắc chắn muốn xóa người dùng này?
        </ModalHeader>
        <ModalBody>
          <img
            style={{ width: 100, height: 100 }}
            className="mr-3"
            src={userSelected?.imageUser}
            alt=""
          />
          <span>{userSelected?.name}</span>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleDeleteUser}>
            Xác nhận
          </Button>{" "}
          <Button color="secondary" onClick={toggleModalDelete}>
            Hủy
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UserManage;
