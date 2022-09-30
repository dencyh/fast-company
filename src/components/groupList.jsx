import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
  items,
  keyName,
  valueName,
  onItemSelect,
  selectedItem
}) => {
  return (
    <ul className="list-group">
      {Object.keys(items).map((key) => (
        <li
          key={items[key][keyName]}
          className={`list-group-item ${
            items[key] === selectedItem ? "active" : ""
          }`}
          role="button"
          onClick={() => onItemSelect(items[key])}
        >
          {items[key][valueName]}
        </li>
      ))}
    </ul>
  );
};

GroupList.defaultProps = {
  keyName: "_id",
  valueName: "name"
};
GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object.isRequired, PropTypes.array]),
  keyName: PropTypes.string.isRequired,
  valueName: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func,
  selectedItem: PropTypes.object
};

export default GroupList;
