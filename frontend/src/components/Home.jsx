import React, { useEffect } from "react";
import { useGetAllProductsQuery } from "../Redux/Api/productsApi.js";
import ProductItem from "./Product/ProductItem.jsx";
import toast from "react-hot-toast";
import CustomPagination from "./Layouts/CustomPagination.jsx";
import { useSearchParams } from "react-router-dom";
import Carousel from "./Layouts/Carousel.jsx";
import Filter from "./Layouts/Filter.jsx";
import Loader from "./Layouts/Loader.jsx";

function Home() {
  let [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const keyword = searchParams.get("keyword") || "";
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const category = searchParams.get("category");
  const ratings = searchParams.get("ratings");

  const params = { page, keyword };

  min !== null && (params.min = min);
  max !== null && (params.max = max);
  category !== null && (params.category = category);
  ratings !== null && (params.ratings = ratings);

  const { data, error, isLoading, isError } = useGetAllProductsQuery(params);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);

  const columnSize = keyword ? 4 : 3;
  if (isLoading) return <Loader />;

  return (
    <div className="row">
      {keyword && (
        <div className="col-6 col-md-3 mt-3">
          <Filter />
        </div>
      )}
      {!keyword && <Carousel />}
      <div className={keyword ? "col-12 col-md-9" : "col-12 col-md-12"}>
        <h1 id="products_heading" className="text-secondary">
          {keyword
            ? `(${data?.product?.length}) Product found with Keyword ${keyword}`
            : "Latest Products"}
        </h1>

        <section id="products" className="mt-5">
          <div className="row">
            {/* Product Item 1 */}
            {data?.product?.map((product) => (
              <ProductItem product={product} columnSize={columnSize} />
            ))}

            {/* End Product Item 1 */}
          </div>
        </section>

        <CustomPagination
          resPerPage={data?.rePerPage}
          filteredProductCount={data?.filteredProductCount}
        />
      </div>
    </div>
  );
}

export default Home;
