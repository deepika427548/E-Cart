import React from "react";
import Sidebar from "./Sidebar";

const AdminLayout = ({ children }) => {
  const menuItems = [
    {
      name: "New Product",
      url: "/admin/product/new",
      icon: "fas fa-plus",
    },
    {
      name: "Products",
      url: "/admin/products",
      icon: "fab fa-product-hunt",
    },
    {
      name: "orders",
      url: "/admin/orders",
      icon: "fas fa-receipt",
    },
    {
      name: "users",
      url: "/admin/users",
      icon: "fas fa-user",
    },
  ];
  return (
    <div>
      <div className="mt-2 mt-4 py-4">
        <h2 className="text-center fw-bolder ">Admin Settings</h2>
      </div>

      <div className="row justify-content-around">
        <div className="col-12 col-lg-3">
          <p>
            <Sidebar menuItems={menuItems} />
          </p>
        </div>
        <div className="col-12 col-lg-8 user-dahboard">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
