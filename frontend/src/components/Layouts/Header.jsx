// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Search from "./Search";
// import { useGetUserProfileQuery } from "../../Redux/Api/userApi";
// import { useSelector } from "react-redux";
// import { useLogoutMutation } from "../../Redux/Api/authApi";

// const Header = () => {
//   const navigate = useNavigate();
//   const { isLoading } = useGetUserProfileQuery();

//   const [logout, { data }] = useLogoutMutation();
//   console.log(data);

//   const { user } = useSelector((state) => state.auth);
//   const { cartItems } = useSelector((state) => state.cart);

//   const logoutHandler = async () => {
//     await logout().unwrap();
//     navigate(0); //refresh the page
//   };

//   return (
//     <nav className="navbar row">
//       <div className="col-12 col-md-3 ps-5">
//         <div className="navbar-brand">
//           <Link to="/">
//             <img src="/images/1.png" alt=" Logo" />
//           </Link>
//         </div>
//       </div>
//       {/* search bar */}
//       <div className="col-12 col-md-6 mt-2 mt-md-0">
//         <Search />
//       </div>
//       <div className="col-12 col-md-3 mt-4 mt-md-0 text-center d-flex">
//         <Link to="/cart" style={{ textDecoration: "none" }}>
//           <div className="container cart-section d-flex align-items-center justify-content-center">
//             <span id="cart" className="ms-1">
//               {" "}
//               Cart{" "}
//             </span>
//             <span className="ms-1" id="cart_count">
//               {cartItems?.length}
//             </span>
//           </div>
//         </Link>
//         {user ? (
//           <div className="ms-1 dropdown">
//             <button
//               className="btn dropdown-toggle text-white"
//               type="button"
//               id="dropDownMenuButton"
//               data-bs-toggle="dropdown"
//               aria-expanded="false"
//             >
//               <figure className="avatar avatar-nav">
//                 <img
//                   src={
//                     user?.avatar
//                       ? user?.avatar?.url
//                       : "/images/defaultprofile.jpg"
//                   }
//                   alt="User Avatar"
//                   className="rounded-circle"
//                 />
//               </figure>
//               <span>{user.name}</span>
//             </button>
//             <div
//               className="dropdown-menu w-100"
//               aria-labelledby="dropDownMenuButton"
//             >
//               {user?.role === "admin" && (
//                 <Link className="dropdown-item" to="/admin/dashboard">
//                   {" "}
//                   Dashboard{" "}
//                 </Link>
//               )}
//                {user?.role === "seller" && (
//                 <Link className="dropdown-item" to="/seller/dashboard">
//                   {" "}
//                   Dashboard{" "}
//                 </Link>
//               )}

//               <Link className="dropdown-item" to="/me/orders">
//                 {" "}
//                 Orders{" "}
//               </Link>

//               <Link className="dropdown-item" to="/me/profile">
//                 {" "}
//                 Profile{" "}
//               </Link>

//               <Link
//                 className="dropdown-item text-danger"
//                 to="/"
//                 onClick={logoutHandler}
//               >
//                 Logout{" "}
//               </Link>
//             </div>
//           </div>
//         ) : (
//           !isLoading && (
//             <Link to="/login" className="btn ms-1" id="login_btn">
//               {" "}
//               Login{" "}
//             </Link>
//           )
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Header;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import { useGetUserProfileQuery } from "../../Redux/Api/userApi";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../Redux/Api/authApi";
import { toggleDarkMode } from "../../Redux/features/darkModeSlice"; // Import the action

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading } = useGetUserProfileQuery();
  const [logout, { data }] = useLogoutMutation();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { mode } = useSelector((state) => state.darkMode); // Access dark mode state

  const logoutHandler = async () => {
    await logout().unwrap();
    navigate(0); //refresh the page
  };

  const handleThemeToggle = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3 ps-5">
        <div className="navbar-brand">
          <Link to="/">
            <img src="/images/1.png" alt="Logo" />
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center d-flex align-items-center justify-content-end">
        {/* Cart Section */}
        <Link to="/cart" style={{ textDecoration: "none" }}>
          <div className="container cart-section d-flex align-items-center justify-content-center">
            <span id="cart" className="ms-1">
              Cart
            </span>
            <span className="ms-1" id="cart_count">
              {cartItems?.length}
            </span>
          </div>
        </Link>

        {/* Theme Toggle Button */}
        <button
          className="btn ms-3"
          onClick={handleThemeToggle}
          aria-label="Toggle Theme"
        >
          <i
            className={`fas ${
              mode ? "fa-sun text-warning" : "fa-moon text-dark"
            }`}
            style={{ fontSize: "1.5rem" }}
          ></i>
        </button>

        {/* User Profile / Login */}
        {user ? (
          <div className="ms-3 dropdown">
            <button
              className="btn dropdown-toggle text-white"
              type="button"
              id="dropDownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <figure className="avatar avatar-nav">
                <img
                  src={
                    user?.avatar
                      ? user?.avatar?.url
                      : "/images/defaultprofile.jpg"
                  }
                  alt="User Avatar"
                  className="rounded-circle"
                />
              </figure>
              <span>{user.name}</span>
            </button>
            <div
              className="dropdown-menu w-100"
              aria-labelledby="dropDownMenuButton"
            >
              {user?.role === "admin" && (
                <Link className="dropdown-item" to="/admin/dashboard">
                  Dashboard
                </Link>
              )}
              {user?.role === "seller" && (
                <Link className="dropdown-item" to="/seller/dashboard">
                  Dashboard
                </Link>
              )}
              <Link className="dropdown-item" to="/me/orders">
                Orders
              </Link>
              <Link className="dropdown-item" to="/me/profile">
                Profile
              </Link>
              <Link
                className="dropdown-item text-danger"
                to="/"
                onClick={logoutHandler}
              >
                Logout
              </Link>
            </div>
          </div>
        ) : (
          !isLoading && (
            <Link to="/login" className="btn ms-3" id="login_btn">
              Login
            </Link>
          )
        )}
      </div>
    </nav>
  );
};

export default Header;
