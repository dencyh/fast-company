import React from "react";
import UserHeader from "./tableHeader";
import PropTypes from "prop-types";

const TableHeaders = ({ columns, onSort, selectedSort }) => {
  return (
    <thead>
      <tr>
        {Object.keys(columns).map((key, index) => (
          <UserHeader
            key={columns[key].text + index}
            column={columns[key]}
            onSort={onSort}
            selectedSort={selectedSort}
          />
        ))}
      </tr>
    </thead>
  );
};

TableHeaders.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      bClass: PropTypes.string,
      path: PropTypes.string
    })
  ),
  onSort: PropTypes.func,
  selectedSort: PropTypes.shape({
    path: PropTypes.string,
    order: PropTypes.string
  })
};

export default TableHeaders;
