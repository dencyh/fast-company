import React, { useState } from "react";
import API from "../api/index";

import SearchStatus from "./searchStatus";
import User from "./user";
import UserHeader from "./usersHeader";
import Pagination from "./pagination";

import { paginate } from "../utils/paginate";

const apiUsers = API.users.fetchAll();

const Users = () => {
  const [users, setUsers] = useState(apiUsers);

  const usersCount = users.length;
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const usersCropped = paginate(users, currentPage, pageSize);

  const headers = [
    { text: "Имя", bClass: "col-3" },
    { text: "Качества", bClass: "col-3" },
    { text: "Профессия", bClass: "col" },
    { text: "Встретился, раз", bClass: "col" },
    { text: "Оценка", bClass: "col" },
    { text: "Избранное", bClass: "col" },
    { text: "", bClass: "col" }
  ];

  function handleDeletion(userId) {
    setUsers(users.filter((user) => user._id !== userId));
  }

  function handleBookmark(id) {
    setUsers((prev) =>
      prev.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark };
        } else {
          return user;
        }
      })
    );
  }

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  function handlePageNavigation(direction) {
    if (direction === "next") {
      setCurrentPage(currentPage + 1);
    } else if (direction === "previous") {
      setCurrentPage(currentPage - 1);
    }
  }

  return (
    <>
      <SearchStatus usersCount={usersCount} />
      {users[0] && (
        <table className="table">
          <thead>
            <tr>
              {headers.map((header) => (
                <UserHeader key={header.text} header={header} />
              ))}
            </tr>
          </thead>
          <tbody>
            {usersCropped.map((user) => (
              <User
                key={user._id}
                user={user}
                handleDeletion={handleDeletion}
                handleBookmark={handleBookmark}
              />
            ))}
          </tbody>
        </table>
      )}
      <Pagination
        itemsCount={usersCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onPageNavigation={handlePageNavigation}
      />
    </>
  );
};

export default Users;
