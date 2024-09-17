import React from "react";

import { Route } from "react-router-dom";
import Home from "../Home";
import ProductDetails from "../Product/ProductDetails";
import Login from "../User/Login";
import SignUp from "../User/SignUp";
import Profile from "../UserProfile/Profile";
import UpdateUser from "../UserProfile/UpdateUser";
import ProtectedRoute from "../User/ProtectedRoute";
import UploadAvtar from "../UserProfile/UploadAvtar";
import UpdatePassword from "../UserProfile/UpdatePassword";
import Cart from "../Cart/Cart";
import Shipping from "../Cart/Shipping";
import ConfirmOrder from "../Cart/ConfirmOrder";

import PaymentMethod from "../Cart/PaymentMethod";
import MyOrder from "../Orders/MyOrder";
import OrderDetails from "../Orders/OrderDetails";

const UserRoutes = () => {
  return (
    <>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/me/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/me/update_Profile"
        element={
          <ProtectedRoute>
            <UpdateUser />
          </ProtectedRoute>
        }
      />
      <Route
        path="/me/upload_avatar"
        element={
          <ProtectedRoute>
            <UploadAvtar />
          </ProtectedRoute>
        }
      />
      <Route
        path="/me/update_password"
        element={
          <ProtectedRoute>
            <UpdatePassword />
          </ProtectedRoute>
        }
      />
      <Route path="/cart" element={<Cart />} />
      <Route
        path="/shipping"
        element={
          <ProtectedRoute>
            <Shipping />
          </ProtectedRoute>
        }
      />
      <Route
        path="/confirm_order"
        element={
          <ProtectedRoute>
            <ConfirmOrder />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment_method"
        element={
          <ProtectedRoute>
            <PaymentMethod />
          </ProtectedRoute>
        }
      />
      <Route
        path="/me/orders"
        element={
          <ProtectedRoute>
            <MyOrder />
          </ProtectedRoute>
        }
      />
      <Route
        path="/me/order/:id"
        element={
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        }
      />
    </>
  );
};

export default UserRoutes;
