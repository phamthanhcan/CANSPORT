import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../../../App";
import BannerSlide from "../components/BannerSlide";
import CategoryCarousel from "../components/CategoryCarousel";
import Policy from "../components/Policy";
import { getListProducts } from "../home.actions";
import NoImage from "../../../../assets/images/no-image.png";
import { numberWithCommas } from "../../../shared/helper/data";
import ProductList from "../components/ProductList";
import { Pagination } from "@mui/material";

const Home = () => {
  const search = useContext(AppContext);
  const dispatch = useDispatch();

  const products = useSelector((state) => state.product.data);
  const totalPages = useSelector((state) => state.product.totalPages);

  const [page, setPage] = useState(1);

  const handleChangePage = (e, value) => {
    setPage(value);
  };

  useEffect(() => {
    dispatch(getListProducts());
  }, [dispatch]);

  return (
    <>
      <BannerSlide />
      <Policy />
      <main className="main container">
        {/* <h2>Danh mục sản phẩm</h2>
        <CategoryCarousel /> */}
        <section className="product-list">
          <h2 className="section-title">DANH SÁCH SẢN PHẨM</h2>
          <ProductList products={products} />
          {/* {!!products?.length && (
            <div className="full-width f-center-x my-5">
              <Pagination
                count={totalPages || 1}
                page={page}
                onChange={handleChangePage}
              />
            </div>
          )} */}
        </section>
      </main>
    </>
  );
};

export default Home;
