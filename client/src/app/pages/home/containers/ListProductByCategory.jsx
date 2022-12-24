import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductList from "../components/ProductList";
import { getListProducts, getProductByCategory } from "../home.actions";

const ListProductByCategory = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const categories = useSelector((state) => state.category.data) || [];
  const totalItems = useSelector((state) => state.product.totalItems);
  const totalPages = useSelector((state) => state.product.totalPages);
  const products = useSelector((state) => state.product.data);
  const category = categories.find((item) => item.id === id);

  console.log({ products });

  const [page, setPage] = useState(1);

  const handleChangePage = (e, value) => {
    setPage(value);
  };

  useEffect(() => {
    dispatch(getListProducts(page - 1, 0, id, "" || "", true));
  }, [dispatch, page, id]);

  return (
    <main className="main container">
      <h2 className="section-title">DANH MỤC: {category?.name}</h2>
      <p>Tìm thấy {totalItems} sản phẩm</p>
      <ProductList products={products} />
      {!!products?.length && (
        <div className="full-width f-center-x my-5">
          <Pagination
            count={totalPages || 1}
            page={page}
            onChange={handleChangePage}
          />
        </div>
      )}
    </main>
  );
};

export default ListProductByCategory;
