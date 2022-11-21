import React from "react";
import PropTypes, { string } from "prop-types";
import Bookmark from "../common/bookmark";
import Qualities from "./qualities";
import Table, { TableBody, TableHeaders } from "../common/table";
import { Link } from "react-router-dom";
import Profession from "./profession";

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
      component: (user) => <Qualities qualities={user.qualities} />
    },

    {
      text: "Профессия",
      bClass: "col",
      path: "profession.name",
      component: (user) => <Profession id={user.profession} />
    },
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
