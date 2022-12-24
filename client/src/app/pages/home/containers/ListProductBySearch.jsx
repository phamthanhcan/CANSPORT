import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useQuery from "../../../shared/hooks/useQuery";
import ProductList from "../components/ProductList";
import { getListProducts } from "../home.actions";

const ListProductBySearch = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  const searchQuery = query.get("q");

  const totalItems = useSelector((state) => state.product.totalItems);
  const totalPages = useSelector((state) => state.product.totalPages);
  const products = useSelector((state) => state.product.data);

  const [page, setPage] = useState(1);

  const handleChangePage = (e, value) => {
    setPage(value);
  };

  useEffect(() => {
    dispatch(getListProducts(page - 1, 0, "", searchQuery || "", true));
  }, [dispatch, page, searchQuery]);

  return (
    <main className="main container">
      {totalItems === 0 ? (
        <p className="search-result-quantity">
          Không có kết quả tìm kiếm với từ khoá "{searchQuery}"
        </p>
      ) : (
        <p className="search-result-quantity">
          Có {totalItems} kết quả tìm kiếm với từ khoá "{searchQuery}"
        </p>
      )}
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

export default ListProductBySearch;
