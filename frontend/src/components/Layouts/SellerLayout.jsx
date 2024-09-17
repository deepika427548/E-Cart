import React from "react";
import Sidebar from "./Sidebar";

const SellerLayout = ({ children }) => {
  const menuItems = [
    {
      name: "New Product",
      url: "/seller/product/new",
      icon: "fas fa-plus",
    },
    {
      name: "Products",
      url: "/seller/products",
      icon: "fab fa-product-hunt",
    },
    
    
  ];
  return (
    <div>
      <div className="mt-2 mt-4 py-4">
        <h2 className="text-center fw-bolder ">Seller Settings</h2>
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

export default SellerLayout;
