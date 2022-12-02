import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../../../App";
import BannerSlide from "../components/BannerSlide";
import CategoryCarousel from "../components/CategoryCarousel";
import Policy from "../components/Policy";
import { getListProducts } from "../home.actions";
import NoImage from "../../../../assets/images/no-image.png";
import { numberWithCommas } from "../../../shared/helper/data";

const Home = () => {
  const search = useContext(AppContext);
  const dispatch = useDispatch();

  const products = useSelector((state) => state.product.data);
  console.log(products);

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
        <div className="row product-list">
          {products && (
            <>
              <div className="col-3">
                <div className="product">
                  <div className="product-img">
                    <img
                      src={products[4]?.images[0] || NoImage}
                      alt="product"
                    />
                  </div>
                  <div className="product-info">
                    <p className="product-id">
                      Mã sỉ lẽ: <span>1299212</span>
                    </p>
                    <p className="product-price">
                      Giá: {numberWithCommas(products[4]?.maxPrice)}đ
                    </p>
                    <p className="product-status">HÀNG CÓ SẴN</p>
                    {products[4].skus?.map((item) => (
                      <span className="product-size">{item.size}</span>
                    ))}
                    <p className="product-name">{products[4]?.name}</p>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="product">
                  <div className="product-img">
                    <img
                      src={products[4]?.images[0] || NoImage}
                      alt="product"
                    />
                  </div>
                  <div className="product-info">
                    <p className="product-id">
                      Mã sỉ lẽ: <span>1299212</span>
                    </p>
                    <p className="product-price">
                      Giá: {numberWithCommas(products[4]?.maxPrice)}đ
                    </p>
                    <p className="product-status">HÀNG CÓ SẴN</p>
                    {products[4].skus?.map((item) => (
                      <span className="product-size">{item.size}</span>
                    ))}
                    <p className="product-name">{products[4]?.name}</p>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="product">
                  <div className="product-img">
                    <img
                      src={products[4]?.images[0] || NoImage}
                      alt="product"
                    />
                  </div>
                  <div className="product-info">
                    <p className="product-id">
                      Mã sỉ lẽ: <span>1299212</span>
                    </p>
                    <p className="product-price">
                      Giá: {numberWithCommas(products[4]?.maxPrice)}đ
                    </p>
                    <p className="product-status">HÀNG CÓ SẴN</p>
                    {products[4].skus?.map((item) => (
                      <span className="product-size">{item.size}</span>
                    ))}
                    <p className="product-name">{products[4]?.name}</p>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="product">
                  <div className="product-img">
                    <img
                      src={products[4]?.images[0] || NoImage}
                      alt="product"
                    />
                  </div>
                  <div className="product-info">
                    <p className="product-id">
                      Mã sỉ lẽ: <span>1299212</span>
                    </p>
                    <p className="product-price">
                      Giá: {numberWithCommas(products[4]?.maxPrice)}đ
                    </p>
                    <p className="product-status">HÀNG CÓ SẴN</p>
                    {products[4].skus?.map((item) => (
                      <span className="product-size">{item.size}</span>
                    ))}
                    <p className="product-name">{products[4]?.name}</p>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="product">
                  <div className="product-img">
                    <img
                      src={products[4]?.images[0] || NoImage}
                      alt="product"
                    />
                  </div>
                  <div className="product-info">
                    <p className="product-id">
                      Mã sỉ lẽ: <span>1299212</span>
                    </p>
                    <p className="product-price">
                      Giá: {numberWithCommas(products[4]?.maxPrice)}đ
                    </p>
                    <p className="product-status">HÀNG CÓ SẴN</p>
                    {products[4].skus?.map((item) => (
                      <span className="product-size">{item.size}</span>
                    ))}
                    <p className="product-name">{products[4]?.name}</p>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="product">
                  <div className="product-img">
                    <img
                      src={products[4]?.images[0] || NoImage}
                      alt="product"
                    />
                  </div>
                  <div className="product-info">
                    <p className="product-id">
                      Mã sỉ lẽ: <span>1299212</span>
                    </p>
                    <p className="product-price">
                      Giá: {numberWithCommas(products[4]?.maxPrice)}đ
                    </p>
                    <p className="product-status">HÀNG CÓ SẴN</p>
                    {products[4].skus?.map((item) => (
                      <span className="product-size">{item.size}</span>
                    ))}
                    <p className="product-name">{products[4]?.name}</p>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="product">
                  <div className="product-img">
                    <img
                      src={products[4]?.images[0] || NoImage}
                      alt="product"
                    />
                  </div>
                  <div className="product-info">
                    <p className="product-id">
                      Mã sỉ lẽ: <span>1299212</span>
                    </p>
                    <p className="product-price">
                      Giá: {numberWithCommas(products[4]?.maxPrice)}đ
                    </p>
                    <p className="product-status">HÀNG CÓ SẴN</p>
                    {products[4].skus?.map((item) => (
                      <span className="product-size">{item.size}</span>
                    ))}
                    <p className="product-name">{products[4]?.name}</p>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="product">
                  <div className="product-img">
                    <img
                      src={products[4]?.images[0] || NoImage}
                      alt="product"
                    />
                  </div>
                  <div className="product-info">
                    <p className="product-id">
                      Mã sỉ lẽ: <span>1299212</span>
                    </p>
                    <p className="product-price">
                      Giá: {numberWithCommas(products[4]?.maxPrice)}đ
                    </p>
                    <p className="product-status">HÀNG CÓ SẴN</p>
                    {products[4].skus?.map((item) => (
                      <span className="product-size">{item.size}</span>
                    ))}
                    <p className="product-name">{products[4]?.name}</p>
                  </div>
                </div>
              </div>
            </>
          )}
          <button className="btn-load-more btn btn-primary mt-5 mb-5">
            Xem thêm
          </button>
        </div>
      </main>
    </>
  );
};

export default Home;
