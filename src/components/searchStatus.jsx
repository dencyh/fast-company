import React from "react";
import plural from "plural-ru";

const SearchStatus = ({ usersCount }) => {
  function showPeopleCount() {
    const subject = plural(usersCount, "человек", "человека", "человек");
    const predicate = plural.verb(usersCount, "тусанет", "тусанут", "тусанет");
    const message =
      usersCount > 0
        ? `${usersCount} ${subject} ${predicate} с тобой сегодня`
        : "Никто с тобой не тусанет";
    return message;
  }

  return (
    <h1 className="m-2">
      <span className={usersCount ? "badge bg-primary" : "badge bg-danger"}>
        {showPeopleCount()}
      </span>
    </h1>
  );
};

export default SearchStatus;
