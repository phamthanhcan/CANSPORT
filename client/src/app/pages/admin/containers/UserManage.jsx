import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Empty from "../../../shared/components/modules/Empty";
import { getListUser } from "../admin.actions";
import NoImage from "../../../../assets/images/no-image.png";
import editIcon from "../../../../assets/icons/edit.svg";
import deleteIcon from "../../../../assets/icons/trash.svg";
import { Pagination, Stack } from "@mui/material";
import UserForm from "../components/UserForm";

const UserManage = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.usersData.data);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(getListUser());
  }, [dispatch]);

  return (
    <div className="admin-container user-manage">
      <h2 className="admin-title">QUẢN LÝ KHÁCH HÀNG</h2>
      {showForm ? (
        <UserForm />
      ) : (
        <>
          <div className="admin-actions">
            <input
              className="form-control"
              type="text"
              placeholder="Nhập tên sản phẩm cần tìm"
              onChange={(e) => setSearch(e.target.value || "")}
            />
            <button
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
            >
              Thêm khách hàng
            </button>
          </div>
          {!users ? (
            <Empty />
          ) : (
            <>
              <table>
                <thead>
                  <tr>
                    <th className="pd-3" scope="col">
                      Ảnh đại diện
                    </th>
                    <th className="pd-3" scope="col">
                      Họ và tên
                    </th>
                    <th className="pd-3" scope="col">
                      Email
                    </th>
                    <th className="pd-3" scope="col">
                      Địa chỉ
                    </th>
                    <th className="pd-3" scope="col">
                      Số điện thoại
                    </th>
                    <th className="pd-3" scope="col">
                      Giới tính
                    </th>
                    <th className="pd-3" scope="col">
                      Ngày sinh
                    </th>
                    <th className="pd-3" scope="col">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr>
                      <td>
                        <img
                          className="user-image"
                          src={user?.userImage || NoImage}
                          alt="user avatar"
                        />
                      </td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.address}</td>
                      <td>{user.phone}</td>
                      <td>{user.gender}</td>
                      <td>{user.dob}</td>
                      <td>
                        <button
                          className="mr-3"
                          style={{ width: 20, height: 20 }}
                        >
                          <img
                            src={editIcon}
                            className="action-btn mr-3"
                            alt="edit"
                          />
                        </button>
                        <button>
                          <img
                            src={deleteIcon}
                            className="action-btn delete"
                            alt="delete"
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="f-center-x mt-5">
                <Stack spacing={2}>
                  <Pagination count={10} variant="outlined" shape="rounded" />
                </Stack>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default UserManage;
