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
  const { handleCancelSku } = props;

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

  const handleChangeColorSize = useCallback(() => {
    let arr = [];

    if (
      !isEmptyArray(colors?.map((item) => item.name)) ||
      !isEmptyArray(sizes?.map((item) => item.name))
    ) {
      if (
        !isEmptyArray(colors?.map((item) => item.name)) &&
        !isEmptyArray(sizes?.map((item) => item.name))
      ) {
        colors.forEach((color) => {
          if (color.name) {
            if (color.name) {
              sizes.forEach((size) => {
                if (size.name) {
                  arr.push({
                    color: color.name,
                    size: size.name,
                  });
                }
              });
            }
          }
        });
      }
    } else {
      (!isEmptyArray(sizes?.map((item) => item.name)) ? sizes : colors).forEach(
        (item) => {
          if (item.name) {
            arr.push({
              color: !isEmptyArray(colors?.map((item) => item.name))
                ? ""
                : item.name,
              size: !isEmptyArray(sizes?.map((item) => item.name))
                ? item.name
                : "",
            });
          }
        }
      );
    }

    skuReplace(arr);
  }, [colors, sizes, skuReplace]);

  const onSubmit = (data) => {};

  return (
    <form className="sku-form pd-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="f-center-x">
        <ul className="col-7">
          <h3 className="txt-bold txt-lg mb-4">MÀU SẮC</h3>
          {colorFields.map((item, index) => (
            <li key={item.id} className="f-center-y mb-3">
              <Controller
                render={({ field }) => (
                  <input type="color" className="mr-3" {...field} />
                )}
                name={`colors.${index}.name`}
                control={control}
              />
              <button type="button" onClick={() => colorRemove(index)}>
                X
              </button>
            </li>
          ))}
          <button
            className="btn btn-primary btn-xs mt-2"
            type="button"
            onClick={() => colorAppend({ name: "#000000" })}
          >
            + Thêm màu sắc
          </button>
        </ul>
        <ul className="col-5">
          <h3 className="txt-bold txt-lg mb-4">SIZE</h3>
          {sizeFields.map((item, index) => (
            <li key={item.id}>
              <Controller
                render={({ field }) => <input className="mr-3" {...field} />}
                name={`sizes.${index}.name`}
                control={control}
              />
              <button onClick={() => sizeRemove(index)}>X</button>
            </li>
          ))}
          <button
            type="button"
            className="btn btn-primary btn-xs mt-2"
            onClick={() => sizeAppend({ name: "" })}
          >
            + Thêm size
          </button>
        </ul>
      </div>
      <button
        className="btn btn-primary btn-sm"
        type="button"
        onClick={handleChangeColorSize}
      >
        Thêm thông tin
      </button>
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
              {...register("price")}
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
              {...register("quantity")}
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
          <table className="admin-table">
            <thead>
              <tr>
                {!isEmptyArray(skus.map((item) => item.color)) && (
                  <td>Màu sắc</td>
                )}
                {!isEmptyArray(skus.map((item) => item.size)) && <td>Size</td>}
                <td>Số lượng</td>
                <td>Giá</td>
                <td>Khuyến mãi</td>
              </tr>
            </thead>
            <tbody>
              {skuFields.map((item, index) => (
                <tr key={item.id}>
                  {!isEmptyArray(skus.map((item) => item.color)) && (
                    <td>
                      <input
                        className="pd-2 form-control"
                        readOnly
                        {...register(`skus[${index}].color`)}
                      />
                    </td>
                  )}
                  {!isEmptyArray(skus.map((item) => item.size)) && (
                    <td>
                      <input
                        className="pd-2 form-control"
                        readOnly
                        {...register(`skus[${index}].size`)}
                      />
                    </td>
                  )}
                  <td>
                    <input
                      type="text"
                      className={`pd-2 form-control`}
                      {...register(`skus[${index}].quantity`, {
                        required: !applyForAll,
                      })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className={`pd-2 form-control`}
                      {...register(`skus[${index}].price`, {
                        required: !applyForAll,
                      })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className={`pd-2 form-control`}
                      {...register(`skus[${index}].discount`, {
                        required: !applyForAll,
                      })}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}

      <div className="f-center-x mt-5">
        <input
          className="btn btn-secondary btn-sm mr-3"
          type="button"
          value="Huỷ"
          onClick={handleCancelSku}
        />
        <input
          className="btn btn-secondary btn-sm mr-3"
          type="reset"
          value="Reset"
        />
        <input className="btn btn-primary btn-sm" type="submit" value="Thêm" />
      </div>
    </form>
  );
};

export default SkuForm;
