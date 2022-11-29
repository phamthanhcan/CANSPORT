import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const ShippingForm = (props) => {
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");

  const validationSchema = Yup.object().shape({
    weight: Yup.string()
      .matches(/\d+/g, "Weight must be numbers")
      .required("Weight is required"),
    width: Yup.string()
      .matches(/\d+/g, "Width must be numbers")
      .required("Width is required"),
    height: Yup.string()
      .matches(/\d+/g, "Height must be numbers")
      .required("Height is required"),
    length: Yup.string()
      .matches(/\d+/g, "Length must be numbers")
      .required("Length is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);
  const { addProduct, goToPrev, product } = props;

  return (
    <div className="d-flex f-center-x">
      <form className="shipping-form" onSubmit={handleSubmit(addProduct)}>
        <div className="form-group d-flex mb-4">
          <label htmlFor="weight">Weight</label>
          <div className="input-group px-3 product-input">
            <input
              type="text"
              className="form-control product-input"
              id="weight"
              aria-describedby="inputGroupPrepend2"
              {...register("weight")}
              defaultValue={product?.weight}
            />
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroupPrepend2">
                gram
              </span>
            </div>
            <p className="txt-error">{errors.weight?.message}</p>
          </div>
        </div>
        <div className="row">
          <div className="form-group d-flex col-4">
            <label htmlFor="height">Height</label>
            <div className="input-group px-3 product-input">
              <input
                type="text"
                className="form-control product-input"
                id="height"
                aria-describedby="inputGroupPrepend2"
                {...register("height")}
                defaultValue={product?.height}
              />
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupPrepend2">
                  cm
                </span>
              </div>
              <p className="txt-error">{errors.height?.message}</p>
            </div>
          </div>
          <div className="form-group d-flex col-4">
            <label htmlFor="length">Length</label>
            <div className="input-group px-3 product-input">
              <input
                type="text"
                className="form-control product-input"
                id="length"
                aria-describedby="inputGroupPrepend2"
                {...register("length")}
                defaultValue={product?.length}
              />
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupPrepend2">
                  cm
                </span>
              </div>
              <p className="txt-error">{errors.length?.message}</p>
            </div>
          </div>
          <div className="form-group d-flex col-4">
            <label htmlFor="width">Width</label>
            <div className="input-group px-3 product-input">
              <input
                type="text"
                className="form-control product-input"
                id="width"
                aria-describedby="inputGroupPrepend2"
                {...register("width")}
                defaultValue={product?.width}
              />
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupPrepend2">
                  cm
                </span>
              </div>
              <p className="txt-error">{errors.width?.message}</p>
            </div>
          </div>
        </div>
        <div className="form-group mt-6 f-space-btw bd-t1 pt-3">
          <input
            type="button"
            value="Prev"
            className="btn btn-outline-dark"
            onClick={() => goToPrev()}
          />
          <input
            className="btn btn-primary"
            type="submit"
            value={`${id ? "Update product" : "Add product"}`}
          />
        </div>
      </form>
    </div>
  );
};

export default ShippingForm;
