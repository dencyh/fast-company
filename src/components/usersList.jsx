import React, { useState } from "react";
import API from "../api/index";

import SearchStatus from "./searchStatus";
import User from "./user";
import UserHeaders from "./usersHeaders";

const apiUsers = API.users.fetchAll();

const Users = () => {
  const [users, setUsers] = useState(apiUsers);

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

  return (
    <>
      <SearchStatus usersCount={users.length} />
      {users[0] && (
        <table className="table">
          <thead>
            <tr>
              {headers.map((header) => (
                <UserHeaders key={header.text} header={header} />
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <User
                key={user._id}
                handleDeletion={handleDeletion}
                user={user}
                handleBookmark={handleBookmark}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;
