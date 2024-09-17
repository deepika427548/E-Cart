import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../User/ProtectedRoute";
import Dashboard from "../seller/Dashboard";
import ListProducts from "../seller/ListProducts";
import NewProducts from "../seller/NewProducts";
import UpdateProduct from "../seller/UpdateProduct";

const SellerRoutes = () => {
  return (
    <>
      <Route
        path="/seller/dashboard"
        element={
          <ProtectedRoute seller={true}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/seller/products"
        element={
          <ProtectedRoute seller={true}>
            <ListProducts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/seller/product/new"
        element={
          <ProtectedRoute seller={true}>
            <NewProducts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/seller/products/:id"
        element={
          <ProtectedRoute seller={true}>
            <UpdateProduct />
          </ProtectedRoute>
        }
      />
    </>
  );
};

export default SellerRoutes;
