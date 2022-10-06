import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ column, onSort }) => {
  return (
    <th
      key={column.text}
      onClick={column.path ? () => onSort(column.path) : undefined}
      role={column.path ? "button" : ""}
      className={column.bClass}
    >
      {column.text}
    </th>
  );
};

TableHeader.propTypes = {
  column: PropTypes.shape({
    text: PropTypes.string,
    bClass: PropTypes.string,
    path: PropTypes.string
  }),
  onSort: PropTypes.func
};

export default TableHeader;
