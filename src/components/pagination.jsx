import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = ({
  itemsCount,
  pageSize,
  currentPage,
  onPageChange,
  onPageNavigation
}) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount < 2) return null;
  const pages = _.range(1, pageCount + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li
          className={
            "page-item" + (currentPage === pages[0] ? " disabled" : "")
          }
        >
          <button
            className="page-link"
            href="#"
            onClick={() => onPageNavigation("previous")}
          >
            &laquo;
          </button>
        </li>
        {pages.map((page) => (
          <li
            className={"page-item" + (page === currentPage ? " active" : "")}
            key={"page-" + page}
          >
            <button
              className="page-link"
              href="#"
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
        <li
          className={
            "page-item" + (currentPage === pageCount ? " disabled" : "")
          }
        >
          <button
            className="page-link"
            href="#"
            onClick={() => onPageNavigation("next")}
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPageNavigation: PropTypes.func.isRequired
};

export default Pagination;
