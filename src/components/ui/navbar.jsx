import React from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { path: "/", title: "main" },
  { path: "/auth", title: "login" },
  { path: "/users", title: "users" }
];

const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav fs-5">
            {navItems.map((item) => (
              <Link
                className={`nav-link text-capitalize ${
                  location.pathname === item.path ? "active" : ""
                }`}
                key={item.title}
                to={item.path}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
