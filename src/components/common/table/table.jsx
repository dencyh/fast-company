import React from "react";
import TableBody from "./tableBody";
import TableHeaders from "./tableHeaders";
import PropTypes from "prop-types";

const Table = ({ onSort, selectedSort, columns, data, children }) => {
  return (
    <table className="table">
      {children || (
        <>
          <TableHeaders {...{ columns, onSort, selectedSort }} />
          <TableBody {...{ columns, data }} />
        </>
      )}
    </table>
  );
};

Table.propTypes = {
  onSort: PropTypes.func,
  selectedSort: PropTypes.shape({
    path: PropTypes.string,
    order: PropTypes.string
  }),
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  columns: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  children: PropTypes.array
};

export default Table;
