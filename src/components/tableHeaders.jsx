import React from "react";
import UserHeader from "./tableHeader";
import PropTypes from "prop-types";

const TableHeaders = ({ columns, onSort, selectedSort }) => {
  const handleSort = (item) => {
    if (!item) return;
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === "asc" ? "desc" : "asc"
      });
    } else {
      onSort({ path: item, order: "asc" });
    }
  };
  return (
    <thead>
      <tr>
        {Object.keys(columns).map((key, index) => (
          <UserHeader
            key={columns[key].text + index}
            column={columns[key]}
            onSort={handleSort}
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
