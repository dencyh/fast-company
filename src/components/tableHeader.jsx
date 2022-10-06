import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const TableHeader = ({ column, onSort, selectedSort }) => {
  const icons = {
    asc: <i className="bi bi-caret-up-fill"></i>,
    desc: <i className="bi bi-caret-down-fill"></i>
  };
  const [sortIcon, setSortIcon] = useState(icons.acs);

  const handleSort = (item) => {
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === "asc" ? "desc" : "asc"
      });
    } else {
      onSort({ path: item, order: "asc" });
    }
  };

  useEffect(() => {
    if (selectedSort.path !== column.path) return setSortIcon("");
    setSortIcon(icons[selectedSort.order]);
  }, [selectedSort]);

  return (
    <th
      key={column.text}
      onClick={column.path ? () => handleSort(column.path) : undefined}
      role={column.path ? "button" : ""}
      className={column.bClass}
    >
      {column.text}
      <span>{sortIcon}</span>
    </th>
  );
};

TableHeader.propTypes = {
  column: PropTypes.object,
  onSort: PropTypes.func,
  selectedSort: PropTypes.object
};

export default TableHeader;
