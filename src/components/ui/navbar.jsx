import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { selectCurrentUser } from "../../redux/usersSlice";
import NavProfile from "./navProfile";

const Navbar = () => {
  const currentUser = useSelector(selectCurrentUser);

  const location = useLocation();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container fs-5">
        <div className="navbar-nav">
          <Link
            className={`nav-link text-primary ${
              location.pathname === "/" ? "active" : ""
            }`}
            to="/"
          >
            Main
          </Link>
          <Link
            className={`nav-link text-primary ${
              location.pathname === "/users" ? "active" : ""
            }`}
            to="/users"
          >
            Users
          </Link>
        </div>
        <div className="navbar-nav">
          {currentUser ? (
            <NavProfile />
          ) : (
            <Link
              className={`nav-link text-primary ${
                location.pathname === "/" ? "active" : ""
              }`}
              to="/login"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
