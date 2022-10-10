import React from "react";
import PropTypes, { string } from "prop-types";
import Bookmark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";
import TableBody from "./tableBody";
import TableHeaders from "./tableHeaders";
import { Link } from "react-router-dom";

const UserTable = ({
  data,
  onSort,
  selectedSort,
  handleBookmark,
  handleDeletion
}) => {
  const columns = [
    {
      text: "Имя",
      bClass: "col-3",
      path: "name",
      component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>
    },
    {
      text: "Качества",
      bClass: "col-3",
      path: "",
      component: (user) => <QualitiesList qualities={user.qualities} />
    },

    { text: "Профессия", bClass: "col", path: "profession.name" },
    { text: "Встретился, раз", bClass: "col", path: "completedMeetings" },
    { text: "Оценка", bClass: "col", path: "rate" },
    {
      text: "Избранное",
      bClass: "col",
      path: "bookmark",
      component: (user) => (
        <Bookmark user={user} onBookmark={() => handleBookmark(user._id)} />
      )
    },
    {
      text: "",
      bClass: "col",
      path: "",
      component: (user) => (
        <button
          className="btn btn-danger"
          onClick={() => handleDeletion(user._id)}
        >
          delete
        </button>
      )
    }
  ];
  return (
    <Table>
      <TableHeaders {...{ columns, onSort, selectedSort }} />
      <TableBody {...{ columns, data }} />
    </Table>
    // <Table {...{ data, onSort, selectedSort, columns }} />
  );
};

UserTable.propTypes = {
  data: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.shape({
    path: string,
    order: string
  }).isRequired,
  handleBookmark: PropTypes.func.isRequired,
  handleDeletion: PropTypes.func.isRequired
};

export default UserTable;
