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

const SkuForm = (props) => {
  const { handleCancelSku, handleSaveSku } = props;

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const {
    fields: colorFields,
    append: colorAppend,
    remove: colorRemove,
  } = useFieldArray({ control, name: "colors" });
  const {
    fields: sizeFields,
    append: sizeAppend,
    remove: sizeRemove,
  } = useFieldArray({ control, name: "sizes" });
  const {
    fields: skuFields,
    append: skuAppend,
    remove: skuRemove,
    replace: skuReplace,
    update: skuUpdate,
  } = useFieldArray({ control, name: "skus" });

  const colors = watch("colors");
  const sizes = watch("sizes");
  const skus = watch("skus");

  const [applyForAll, setApplyForAll] = useState(false);
  const [isEmptySku, setIsEmptySku] = useState(true);
  const imgs = useRef([]);

  const handleChangeColorSize = () => {
    if (colors.find((color) => color.name && !color.image)) {
      toast.error("Vui lòng thêm ảnh cho mỗi màu sắc!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    const arr = [];
    if (
      !isEmptyArray(colors.map((item) => item.name)) ||
      !isEmptyArray(sizes.map((item) => item.name))
    ) {
      if (
        !isEmptyArray(colors.map((item) => item.name)) &&
        !isEmptyArray(sizes.map((item) => item.name))
      ) {
        colors.forEach((color) => {
          if (color.name) {
            sizes.forEach((size) => {
              if (size.name) {
                arr.push({
                  color: color.name,
                  size: size.name,
                  quantity: null,
                  discount: null,
                  price: null,
                });
              }
            });
          }
        });
      } else {
        (!isEmptyArray(sizes?.map((item) => item.name))
          ? sizes
          : colors
        ).forEach((item) => {
          console.log(colors);
          if (item.name) {
            arr.push({
              color: isEmptyArray(colors?.map((item) => item.name))
                ? ""
                : item.name,
              size: isEmptyArray(sizes?.map((item) => item.name))
                ? ""
                : item.name,
              quantity: null,
              discount: null,
              price: null,
            });
          }
        });
      }
    }
    skuReplace(arr);
  };

  const onSubmit = (data) => {
    if (colors.find((color) => color.name && !color.image)) {
      toast.error("Vui lòng thêm ảnh cho mỗi màu sắc!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (!applyForAll) {
      if (!isEmptyArray(colors?.map((item) => item.name))) {
        const temp = data.skus.map((sku) => {
          return {
            ...sku,
            image: imgs.current.find((item) =>
              item.includes(
                colors.find((color) => color.name === sku.color).image[0].name
              )
            ),
          };
        });
        handleSaveSku(temp);
        toast.success("Thêm sku thành công!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      const temp = data.skus.map((sku) => {
        return {
          ...sku,
          price: data.price,
          quantity: data.quantity,
          discount: data.discount || "0",
          image: !isEmptyArray(colors?.map((item) => item.name))
            ? imgs.current?.find((item) =>
                item.includes(
                  colors.find((color) => color.name === sku.color).image[0].name
                )
              )
            : null,
        };
      });
      handleSaveSku(temp);
      toast.success("Thêm sku thành công!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    if (
      isEmptyArray(skus?.map((item) => item.color)) &&
      isEmptyArray(skus?.map((item) => item.size))
    ) {
      setIsEmptySku(true);
    } else {
      setIsEmptySku(false);
    }
  }, [skus]);

  const uploadImg = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("http://localhost:7000/uploadiu", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const temp = [...imgs.current];
        temp.push(response?.data?.fileLocation);
        imgs.current = temp;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sku-form">
      <div className="row">
        <div className="col-7 sku-options">
          <h3 className="sku-title">Màu sắc</h3>
          <ul className="options-list">
            {colorFields.map((item, index) => (
              <li className="option-item">
                <Controller
                  render={({ field }) => <input type="color" {...field} />}
                  name={`colors.${index}.name`}
                  control={control}
                />
                <input
                  type="file"
                  className="ml-3 txt-xs"
                  {...register(`colors[${index}].image`)}
                  onChange={(e) => uploadImg(e)}
                />
                <button
                  type="button"
                  onClick={() => {
                    colorRemove(index);
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
            onClick={() => colorAppend({ name: "#000000", image: null })}
          >
            <img src={plusIcon} alt="add" />
            <span className="txt-xs ml-1">Thêm màu sắc</span>
          </button>
        </div>
        <div className="col-3 sku-options">
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
            onClick={() => sizeAppend({ name: "", image: null })}
          >
            <img src={plusIcon} alt="add" />
            <span className="txt-xs ml-1">Thêm size</span>
          </button>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-primary btn-xs mt-3 mb-3"
        onClick={handleChangeColorSize}
      >
        + Cập nhật thông tin
      </button>
      <div className="form-group f-center-y mb-4">
        <input
          type="checkbox"
          checked={applyForAll}
          id="all"
          onChange={() => setApplyForAll(!applyForAll)}
        />
        <label htmlFor="all" className="txt-sm ml-3">
          Áp dụng số lượng, giá, khuyến mãi cho tất cả
        </label>
      </div>
      {applyForAll ? (
        <div className="row mb-3">
          <div className="form-group col-4">
            <label className="form-label" htmlFor="quantity">
              Số lượng
            </label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              min="0"
              {...register("quantity", {
                required: applyForAll ? "This feild is required" : false,
              })}
            />
            <p className="txt-error">{errors.quantity?.message}</p>
          </div>
          <div className="form-group col-4">
            <label className="form-label" htmlFor="price">
              Giá
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              min="0"
              {...register("price", {
                required: applyForAll ? "This feild is required" : false,
              })}
            />
            <p className="txt-error">{errors.price?.message}</p>
          </div>
          <div className="form-group col-4">
            <label className="form-label" htmlFor="discount">
              Khuyến mãi(%)
            </label>
            <input
              type="number"
              className="form-control"
              id="discount"
              {...register("discount", {
                required: applyForAll ? "This feild is required" : false,
              })}
            />
            <p className="txt-error">{errors.discount?.message}</p>
          </div>
        </div>
      ) : (
        !!skuFields.length && (
          <table className="table">
            <thead>
              <tr>
                {!isEmptyArray(skus.map((item) => item.color)) && (
                  <td>Màu sắc</td>
                )}
                {!isEmptyArray(skus.map((item) => item.size)) && <td>Size</td>}
                <td>Số lượng</td>
                <td>Khuyến mãi</td>
                <td>Giá</td>
              </tr>
            </thead>
            <tbody>
              {skuFields.map((item, index) => {
                console.log(`skus[${index}].size`);
                return (
                  <tr key={item.id}>
                    {!isEmptyArray(skus.map((item) => item.color)) && (
                      <td>
                        <input
                          className="form-control"
                          readOnly
                          {...register(`skus[${index}].color`)}
                        />
                      </td>
                    )}
                    {!isEmptyArray(skus.map((item) => item.size)) && (
                      <td>
                        <input
                          className="form-control"
                          readOnly
                          {...register(`skus[${index}].size`)}
                        />
                      </td>
                    )}
                    <td>
                      <input
                        className={`pd-2 full-width form-control  ${
                          errors.skus?.[index]?.quantity ? "is-invalid" : ""
                        }`}
                        {...register(`skus[${index}].quantity`, {
                          required: !applyForAll,
                        })}
                      />
                    </td>
                    <td>
                      <input
                        className={`pd-2 full-width form-control ${
                          errors.skus?.[index]?.discount ? "is-invalid" : ""
                        }`}
                        {...register(`skus[${index}].discount`, {
                          required: !applyForAll,
                        })}
                      />
                    </td>
                    <td>
                      <input
                        className={`pd-2 full-width form-control ${
                          errors.skus?.[index]?.price ? "is-invalid" : ""
                        }`}
                        {...register(`skus[${index}].price`, {
                          required: !applyForAll,
                        })}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )
      )}
      <div className="form-group f-center-x my-5">
        <button
          className="btn btn-secondary btn-xs mr-3"
          onClick={handleCancelSku}
        >
          Huỷ
        </button>
        <button
          className="btn btn-primary btn-xs"
          disabled={isEmptySku}
          onClick={handleSubmit(onSubmit)}
        >
          Thêm
        </button>
      </div>
    </div>
  );
};

export default SkuForm;
