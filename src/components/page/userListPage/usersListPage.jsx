import React, { useState, useEffect } from "react";
import PeopleCount from "../../ui/peopleCount";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import Loader from "../../common/loader";
import UserTable from "../../ui/userTable";
import _ from "lodash";
import TextField from "../../common/forms/textField";
import { useUser } from "../../../hooks/useUsers";
import { useProfessions } from "../../../hooks/useProfessions";
import { useAuth } from "../../../hooks/useAuth";

const UsersListPage = () => {
  const { users } = useUser();
  const { professions, loading: professionsLoading } = useProfessions();
  const { currentUser } = useAuth();

  const [selectedProf, setSelectedProf] = useState(null);
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });

  const pageSize = 6;
  const [currentPage, setCurrentPage] = useState(1);

  function clearFilters() {
    setSelectedProf(null);
  }

  const [query, setQuery] = useState("");

  function filterUsers(data) {
    const filteredUsers = query
      ? data.filter((user) =>
          user.name.toLowerCase().includes(query.toLowerCase())
        )
      : selectedProf
      ? data.filter((user) => user.profession._id === selectedProf._id)
      : data;

    return filteredUsers.filter((user) => user._id !== currentUser._id);
  }

  const filteredUsers = filterUsers(users);

  const handleSearch = ({ value }) => {
    setSelectedProf(null);
    setQuery(value);
  };

  const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

  const usersCount = filteredUsers?.length || 0;
  const usersCropped = paginate(sortedUsers, currentPage, pageSize);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  function handleDeletion(userId) {
    console.log(userId);
  }

  function handleBookmark(id) {
    // setUsers((prev) =>
    //   prev.map((user) => {
    //     if (user._id === id) {
    //       return { ...user, bookmark: !user.bookmark };
    //     } else {
    //       return user;
    //     }
    //   })
    // );
    console.log(users);
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
      setQuery("");
    }
  }

  function handleSort(item) {
    setSortBy(item);
  }

  if (!professions && professionsLoading) return <Loader />;
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
        <PeopleCount usersCount={usersCount} />
        <TextField
          placeholder="Поиск по имени"
          name="search"
          onChange={handleSearch}
          value={query}
        />
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

export default UsersListPage;
