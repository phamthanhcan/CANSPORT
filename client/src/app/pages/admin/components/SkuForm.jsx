import { useEffect } from "react";
import { useCallback, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

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

  const handleChangeColorSize = () => {
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
          if (item.name) {
            arr.push({
              color: !isEmptyArray(colors?.map((item) => item.name))
                ? ""
                : item.name,
              size: !isEmptyArray(sizes?.map((item) => item.name))
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
    if (!applyForAll) {
      handleSaveSku(data.skus);
      console.log(data.skus);
    } else {
      const temp = data.skus.map((sku) => {
        return {
          ...sku,
          price: data.price,
          quantity: data.quantity,
          discount: data.discount || "0",
        };
      });
      handleSaveSku(temp);
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

  return (
    <div className="sku-form">
      <div className="row no-gutter f-center-x">
        <div className="col-6 sku-col">
          <h5 className="sku-title">MÀU SẮC</h5>
          <ul className="add-list">
            {colorFields.map((item, index) => (
              <li key={item.id} className="color-item">
                <Controller
                  render={({ field }) => <input type="color" {...field} />}
                  name={`colors.${index}.name`}
                  control={control}
                />
                <button type="button" onClick={() => colorRemove(index)}>
                  <ion-icon name="close-circle-outline"></ion-icon>
                </button>
              </li>
            ))}
          </ul>
          <div className="f-center-x">
            <button
              className="btn-add"
              type="button"
              onClick={() => colorAppend({ name: "#000000" })}
            >
              <ion-icon name="add-circle-outline"></ion-icon>
            </button>
          </div>
        </div>
        <div className="col-6 sku-col">
          <h5 className="sku-title">SIZE</h5>
          <ul className="add-list">
            {sizeFields.map((item, index) => (
              <li key={item.id} className="size-item">
                <Controller
                  render={({ field }) => <input className="mr-1" {...field} />}
                  name={`sizes.${index}.name`}
                  control={control}
                />
                <button onClick={() => sizeRemove(index)}>
                  <ion-icon name="close-circle-outline"></ion-icon>
                </button>
              </li>
            ))}
          </ul>
          <div className="f-center-x">
            <button
              type="button"
              className="btn-add"
              onClick={() => sizeAppend({ name: "" })}
            >
              <ion-icon name="add-circle-outline"></ion-icon>
            </button>
          </div>
        </div>
      </div>
      <div className="f-center-x mt-3">
        <button
          className="btn btn-primary btn-xs"
          type="button"
          onClick={handleChangeColorSize}
        >
          Cập nhật thông tin
        </button>
      </div>
      <div className="form-group f-center-y mt-3">
        <label className="toggle" htmlFor="all">
          <input
            className="toggle-input hidden"
            type="checkbox"
            id="all"
            checked={applyForAll}
            onChange={() => setApplyForAll(!applyForAll)}
          />
          <div className="toggle-fill"></div>
        </label>
        <span className="form-label ml-3">
          Áp dụng số lượng, giá, khuyến mãi cho tất cả sku
        </span>
      </div>
      {applyForAll ? (
        <div className="row">
          <div className="form-group col-4">
            <label className="form-label">Giá</label>
            <input
              type="number"
              className="form-control"
              id="price"
              min="0"
              {...register("price", {
                required: applyForAll ? "Vui lòng nhập giá" : false,
              })}
            />
            <p className="form-error">{errors.price?.message}</p>
          </div>
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
                required: applyForAll ? "Vui lòng nhập số lượng" : false,
              })}
            />
            <p className="form-error">{errors.quantity?.message}</p>
          </div>
          <div className="form-group col-4">
            <label className="form-label">Khuyến mãi</label>
            <input
              type="number"
              className="form-control"
              id="discount"
              min="0"
              max="100"
              {...register("discount")}
            />
            <p className="form-error">{errors.price?.message}</p>
          </div>
        </div>
      ) : (
        !!skuFields.length && (
          <table className="sku-table">
            <thead>
              <tr>
                {!isEmptyArray(skus.map((item) => item.color)) && (
                  <td>Màu sắc</td>
                )}
                {!isEmptyArray(skus.map((item) => item.size)) && <td>Size</td>}
                <td>Số lượng</td>
                <td>Giá</td>
                <td style={{ width: 90 }}>Khuyến mãi</td>
              </tr>
            </thead>
            <tbody>
              {skuFields.map((item, index) => (
                <tr key={item.id}>
                  {!isEmptyArray(skus.map((item) => item.size)) && (
                    <td>
                      <input
                        className="form-control"
                        readOnly
                        {...register(`skus[${index}].size`)}
                      />
                    </td>
                  )}
                  {!isEmptyArray(skus.map((item) => item.color)) && (
                    <td>
                      <input
                        className="form-control"
                        readOnly
                        {...register(`skus[${index}].color`)}
                      />
                    </td>
                  )}
                  <td>
                    <input
                      type="number"
                      min="0"
                      className={`form-control ${
                        errors.skus?.[index]?.quantity ? "is-invalid" : ""
                      } `}
                      {...register(`skus[${index}].quantity`, {
                        required: !applyForAll,
                      })}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      className={`form-control  ${
                        errors.skus?.[index]?.price ? "is-invalid" : ""
                      }`}
                      {...register(`skus[${index}].price`, {
                        required: !applyForAll,
                      })}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      min="0"
                      max="100"
                      {...register(`skus[${index}].discount`)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}

      <div className="f-center-x mt-5">
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
