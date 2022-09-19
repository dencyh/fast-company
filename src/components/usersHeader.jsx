import React from "react";
import PropTypes from "prop-types";

const UserHeader = ({ header }) => {
  return (
    <th key={header.text} className={header.bClass}>
      {header.text}
    </th>
  );
};

UserHeader.propTypes = {
  header: PropTypes.shape({
    text: PropTypes.string,
    bClass: PropTypes.string
  })
};

export default UserHeader;
