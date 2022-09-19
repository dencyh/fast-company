import React from "react";

const UserHeaders = ({ header }) => {
  return (
    <th key={header.text} className={header.bClass}>
      {header.text}
    </th>
  );
};

export default UserHeaders;
