import React from "react";
import Navbar from "../components/ui/navbar";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="container">{children}</div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
