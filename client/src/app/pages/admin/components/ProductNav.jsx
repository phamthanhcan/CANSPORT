const ProductNav = ({ currentStep }) => {
  return (
    <ul className="d-flex pd-3 f-center-x">
      <li className={`px-4 txt-demi ${currentStep === 1 ? "txt-green" : ""}`}>
        Thông tin sản phẩm
      </li>
      <p className="txt-green txt-bold">{">>"}</p>
      <li className={`px-4 txt-demi ${currentStep === 2 ? "txt-green" : ""}`}>
        Thông tin vận chuyển
      </li>
    </ul>
  );
};

export default ProductNav;
