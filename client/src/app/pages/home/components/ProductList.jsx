import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PageRenderer from "../../../shared/hoc/PageRenderer";
import ProductItem from "./ProductItem";

const ProductListTpl = (props) => {
  const { data } = props;

  return (
    <div className="row">
      {data.map((product) => (
        <div className="col-3" key={product.id}>
          <Link to={`/product/${product.id}`}>
            <ProductItem data={product} />
          </Link>
        </div>
      ))}
    </div>
  );
};

const ProductListRenderer = PageRenderer(ProductListTpl);

const ProductList = (props) => {
  const { products } = props;
  const isLoading = useSelector((state) => state.product.isLoading);

  return <ProductListRenderer isLoading={isLoading} data={products} />;
};

export default ProductList;
