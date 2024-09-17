import React from "react";
import Sidebar from "./Sidebar";

const UserLayout = ({ children }) => {
  const menuItems = [
    {
      name: "Profile",
      url: "/me/Profile",
      icon: "fas fa-user",
    },
    {
      name: "Update Profile",
      url: "/me/update_Profile",
      icon: "fas fa-user",
    },
    {
      name: "Upload Avatar",
      url: "/me/upload_avatar",
      icon: "fas fa-user-circle",
    },
    {
      name: "Update Password",
      url: "/me/update_password",
      icon: "fas fa-lock",
    },
  ];
  return (
    <div>
      <div className="mt-2 mt-4 py-4">
        <h2 className="text-center fw-bolder ">User Settings</h2>
      </div>

      <div className="container">
        <div className="row justify-content-around">
          <div className="col-12 col-lg-3">
            <p>
              <Sidebar menuItems={menuItems} />
            </p>
          </div>
          <div className="col-12 col-lg-8 user-dahboard">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
