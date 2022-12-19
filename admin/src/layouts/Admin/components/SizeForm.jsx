import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Table } from "reactstrap";
import { v4 as uuidv4 } from "uuid";

const SizeForm = (props) => {
  const { sizes, setSizes } = props;

  const handleChangeAddSize = () => {
    if (sizes.some((item) => !item.size || !item.quantity)) {
      alert("Vui lòng không được để trống size hoặc số lượng");
    } else {
      setSizes((prevSizes) => [
        ...prevSizes,
        { id: uuidv4(), size: "", quantity: "" },
      ]);
    }
  };

  const handleChangeInput = (e, id, type) => {
    setSizes((prevSizes) =>
      prevSizes.map((item) => {
        if (item.id === id) {
          if (type === "size") {
            return { ...item, size: e.target.value };
          }
          if (type === "quantity") {
            return { ...item, quantity: e.target.value };
          }
        } else return item;
      })
    );
  };

  const handleDeleteSize = (id) => {
    const index = sizes.findIndex((item) => item.id === id);
    const sizesTemp = [...sizes];
    sizesTemp.splice(index, 1);
    setSizes(sizesTemp);
  };

  return (
    <>
      <Table bordered>
        <thead>
          <tr>
            <th>Size</th>
            <th>Số lượng</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sizes?.map((item) => (
            <tr key={item.id}>
              <td>
                <input
                  className="form-control"
                  defaultValue={item?.size}
                  onChange={(e) => handleChangeInput(e, item.id, "size")}
                />
              </td>
              <td>
                <input
                  className="form-control"
                  defaultValue={item?.quantity}
                  onChange={(e) => handleChangeInput(e, item.id, "quantity")}
                />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteSize(item.id)}
                >
                  <ion-icon
                    name="trash-outline"
                    style={{ fontSize: 20 }}
                  ></ion-icon>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <button className="btn btn-sm btn-primary" onClick={handleChangeAddSize}>
        +Thêm size
      </button>
    </>
  );
};

export default SizeForm;
