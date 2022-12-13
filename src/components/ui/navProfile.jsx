import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const NavProfile = () => {
  const { currentUser } = useAuth();
  const [show, setShow] = useState(false);
  const toggleMenu = () => setShow((prev) => !prev);

  return (
    <div className="dropdown">
      <div
        className="btn dropdown-toggle d-flex align-items-center"
        aria-label="dropdown button"
        role="button"
        onClick={toggleMenu}
      >
        <div className="me-2">{currentUser.name}</div>
        <img
          src={currentUser.image}
          className="img-responsive  rounded-circle shadow-1-strong me-3"
          alt="avatar"
          width="40"
          height="40"
        />
      </div>
      <div className={`w-100 dropdown-menu ${show ? "show" : ""}`}>
        <Link to={`/users/${currentUser._id}`} className="dropdown-item">
          Profile
        </Link>
        <Link to="/logout" className="dropdown-item">
          Logout
        </Link>
      </div>
    </div>
  );
};

export default NavProfile;
