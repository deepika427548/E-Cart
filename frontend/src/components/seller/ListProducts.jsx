import React, { useEffect } from "react";

import toast from "react-hot-toast";
import Loader from "../Layouts/Loader";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import MetaData from "../Layouts/Metadata";

import { useGetProductsBySellerQuery } from "../../Redux/Api/productsApi";
import SellerLayout from "../Layouts/SellerLayout";

const ListProducts = () => {
  const { data, isLoading, error, refetch } = useGetProductsBySellerQuery();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    refetch();
  }, [error]);

  const setProducts = () => {
    const products = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "asc",
        },

        {
          label: "Action",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    data?.products?.forEach((product) => {
      products.rows.push({
        id: product?._id,
        name: product?.name,
        stock: product?.stock,

        actions: (
          <>
            <Link
              to={`/seller/products/${product?._id}`}
              className="btn btn-outline-primary"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            {/* <Link
              to={`/seller/products/${product?._id}/upload_images`}
              className="btn btn-outline-success ms-2"
            >
              <i className="fa fa-image"></i>
            </Link>
            <button className="btn btn-outline-danger ms-2">
              <i className="fa fa-trash"></i>
            </button> */}

            {/* <Link
              to={`/invoice/order/${order?._id}`}
              className="btn btn-success ms-2"
            >
              <i className="fa fa-print"></i>
            </Link> */}
          </>
        ),
      });
    });
    return products;
  };

  if (isLoading) return <Loader />;

  return (
    <SellerLayout>
      <MetaData title={"All Products"} />
      <h1 className="my-5">{data?.products?.length} Products</h1>
      <MDBDataTable
        data={setProducts()}
        className="px-3"
        bordered
        striped
        hover
      />
    </SellerLayout>
  );
};

export default ListProducts;
