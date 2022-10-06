import React, { useState, useEffect } from "react";
import API from "../api/index";

import PeopleCount from "./peopleCount";
import Pagination from "./pagination";

import { paginate } from "../utils/paginate";
import GroupList from "./groupList";
import Loader from "./loader";
import UserTable from "./userTable";
import _ from "lodash";

const UsersPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [professions, setProfessions] = useState(null);
  const [selectedProf, setSelectedProf] = useState(null);
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });

  const pageSize = 6;
  const [currentPage, setCurrentPage] = useState(1);

  function clearFilters() {
    setSelectedProf(null);
  }

  const filteredUsers = selectedProf
    ? users.filter((user) => user.profession === selectedProf)
    : users;

  const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

  const usersCount = filteredUsers?.length || 0;
  const usersCropped = paginate(sortedUsers, currentPage, pageSize);

  useEffect(() => {
    setIsLoading(true);
    API.users
      .fetchAll()
      .then((data) => setUsers(data))
      .finally(() => setIsLoading(false));

    API.professions.fetchAll().then((data) => setProfessions(data));
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

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

  function handleProfessionSelect(option) {
    if (selectedProf?._id === option._id) {
      setSelectedProf(null);
    } else {
      setSelectedProf(option);
    }
  }

  function handleSort(item) {
    setSortBy(item);
  }

  return (
    <div className="d-flex container">
      {professions && (
        <div className="d-flex flex-column p-4 mt-5">
          <GroupList
            items={professions}
            onItemSelect={handleProfessionSelect}
            selectedItem={selectedProf}
          />
          <button className="btn btn-secondary mt-2" onClick={clearFilters}>
            Очистить
          </button>
        </div>
      )}
      <div className="d-flex flex-column w-100">
        {isLoading ? <Loader /> : <PeopleCount usersCount={usersCount} />}
        {filteredUsers[0] && (
          <UserTable
            data={usersCropped}
            onSort={handleSort}
            selectedSort={sortBy}
            handleDeletion={handleDeletion}
            handleBookmark={handleBookmark}
          />
        )}
        <div className="d-flex justify-content-center">
          <Pagination
            itemsCount={usersCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onPageNavigation={handlePageNavigation}
          />
        </div>
      </div>
    </div>
  );
};

export default UsersPage;