import React, { useEffect, useState } from "react";
import AdminLayout from "../Layouts/AdminLayout";
import toast from "react-hot-toast";
import Loader from "../Layouts/Loader";
import { Link, useParams } from "react-router-dom";
import MetaData from "../Layouts/Metadata";
import {
  useOrderDetailsQuery,
  useUpdateOrderMutation,
} from "../../Redux/Api/orderApi";

const ProcessOrder = () => {
  const [status, setStatus] = useState("");
  const params = useParams();
  const { data, refetch } = useOrderDetailsQuery(params?.id);
  const order = data?.order || {};

  const [updateOrder, { error, isSuccess, isLoading: isUpdating }] =
    useUpdateOrderMutation();

  const {
    shippingInfo,
    orderedItems = [],
    paymentInfo,
    user,
    totalAmount,
    orderStatus,
  } = order;

  const isPaid = paymentInfo?.status === "paid" ? true : false;

  useEffect(() => {
    if (orderStatus) {
      setStatus(orderStatus);
    }
  }, [orderStatus]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Order Updated");
      refetch();
    }
  }, [error, isSuccess, refetch]);

  //   >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const updateOrderHandler = (id) => {
    const data = { status };
    updateOrder({ id, body: data });
  };

  return (
    <AdminLayout>
      <MetaData title={"Process Order"} />
      <div className="row d-flex justify-content-around">
        <div className="col-12 col-lg-8 order-details">
          <h3 className="mt-5 mb-4">Order Details</h3>

          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th scope="row">ID</th>
                <td>{order?._id}</td>
              </tr>
              <tr>
                <th scope="row">Order Status</th>
                <td className={isPaid ? "greenColor" : "redColor"}>
                  <b>{orderStatus}</b>
                </td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 mb-4">Shipping Info</h3>
          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th scope="row">Name</th>
                <td>{user?.name}</td>
              </tr>
              <tr>
                <th scope="row">Phone No</th>
                <td>{shippingInfo?.phoneNo} </td>
              </tr>
              <tr>
                <th scope="row">Address</th>
                <td>{shippingInfo?.address}</td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 mb-4">Payment Info</h3>
          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th scope="row">Status</th>
                <td className={isPaid ? "greenColor" : "redColor"}>
                  <b>{paymentInfo?.status}</b>
                </td>
              </tr>
              <tr>
                <th scope="row">Method</th>
                <td>{order?.paymentMethod} </td>
              </tr>
              <tr>
                <th scope="row">Stripe ID</th>
                <td> {paymentInfo?.id || "NIL"} </td>
              </tr>
              <tr>
                <th scope="row">Amount Paid</th>
                <td> {totalAmount}</td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 my-4">Order Items:</h3>

          <hr />
          <div className="cart-item my-1">
            {orderedItems && orderedItems.length > 0 ? (
              orderedItems.map((item, index) => (
                <div className="row my-5" key={index}>
                  <div className="col-4 col-lg-2">
                    <img
                      src={item?.image}
                      alt={item?.name}
                      height="45"
                      width="65"
                    />
                  </div>

                  <div className="col-5 col-lg-5">
                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                  </div>

                  <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                    <p>{item.price}</p>
                  </div>

                  <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                    <p> {`${item.quantity} Piece(s)`}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No items found</p>
            )}
          </div>
          <hr />
        </div>

        <div className="col-12 col-lg-3 mt-5">
          <h4 className="my-4">Status</h4>

          <div className="mb-3">
            <select
              className="form-select"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              S<option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

          <button
            className="btn btn-primary w-100"
            disabled={isUpdating}
            onClick={() => updateOrderHandler(order?._id)}
          >
            {isUpdating ? "Updating..." : "Update Status"}
          </button>

          {/* <h4 className="mt-5 mb-3">Order Invoice</h4>
          <a href="#" className="btn btn-success w-100">
            <i className="fa fa-print"></i> Generate Invoice
          </a> */}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProcessOrder;
