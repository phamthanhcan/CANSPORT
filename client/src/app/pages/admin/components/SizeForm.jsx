import axios from "axios";
import { useEffect, useRef } from "react";
import { useCallback, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { toast } from "react-toastify";

import plusIcon from "../../../../assets/icons/plus-circle.svg";
import deleteIcon from "../../../../assets/icons/x.svg";

const isEmptyArray = (arr) => {
  if (!arr?.length) return true;
  let result = true;
  arr.forEach((item) => {
    if (item) {
      result = false;
    }
  });
  return result;
};

const SizeForm = (props) => {
  const { handleSaveSizes } = props;

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const {
    fields: sizeFields,
    append: sizeAppend,
    remove: sizeRemove,
  } = useFieldArray({ control, name: "sizes" });

  const sizes = watch("sizes");

  const onSubmit = (data) => {
    handleSaveSizes(
      data.sizes.map((item) => {
        return { size: item.name, quantity: item.quantity };
      })
    );
    toast.success("Thêm size thành công!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="sku-form">
      <div className="sku-options">
        <h3 className="sku-title">Size</h3>
        <ul className="options-list">
          {sizeFields.map((item, index) => (
            <li className="option-item">
              <Controller
                render={({ field }) => (
                  <input key={index} className="input-size" {...field} />
                )}
                name={`sizes.${index}.name`}
                control={control}
              />
              <button
                type="button"
                onClick={() => {
                  sizeRemove(index);
                }}
              >
                <img src={deleteIcon} alt="delete" />
              </button>
            </li>
          ))}
        </ul>
        <button
          className="btn-add-option"
          type="button"
          onClick={() => sizeAppend({ name: "" })}
        >
          <img src={plusIcon} alt="add" />
          <span className="txt-xs ml-1">Thêm size</span>
        </button>
      </div>
      {sizes?.length > 0 && (
        <>
          <table>
            <thead>
              <tr>
                <td>Size</td>
                <td>Số lượng</td>
              </tr>
            </thead>
            <tbody>
              {sizes.map((item, index) => {
                if (item.name) {
                  return (
                    <tr>
                      <td>
                        <input
                          readOnly
                          value={item.name}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          className={`form-control ${
                            errors.sizes?.[index]?.quantity ? "is-invalid" : ""
                          }`}
                          {...register(`sizes[${index}].quantity`, {
                            required: true,
                          })}
                        />
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
          <button
            className="btn btn-primary btn-xs"
            disabled={isEmptyArray(sizes.map((item) => !!item.name))}
            onClick={handleSubmit(onSubmit)}
          >
            Thêm size
          </button>
        </>
      )}
    </div>
  );
};

export default SizeForm;
