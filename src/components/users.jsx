import React, {useState} from "react";
import API from "../api/index";
import plural from "plural-ru";

const users = API.users.fetchAll();

const Users = () => {
  const [visibleUsers, setVisibleUsers] = useState(users);

  function handleDeletion(userId) {
    setVisibleUsers(visibleUsers.filter((user) => user._id !== userId));
  }

  function showPeopleCount() {
    const number = visibleUsers.length;
    const subject = plural(number, "человек", "человека", "человек");
    const predicate = plural.verb(number, "тусанет", "тусанут", "тусанет");
    const message = number > 0 ? `${number} ${subject} ${predicate} с тобой сегодня` : "Никто с тобой не тусанет";
    return message;
  }

  const thead = (
    <thead>
      <tr>
        <th className='col-3' scope='col'>
          Имя
        </th>
        <th className='col-3' scope='col'>
          Качества
        </th>
        <th className='col' scope='col'>
          Профессия
        </th>
        <th className='col' scope='col'>
          Встретился, раз
        </th>
        <th className='col' scope='col'>
          Оценка
        </th>
        <th className='col' scope='col'></th>
      </tr>
    </thead>
  );

  const tbody = (
    <tbody>
      {visibleUsers.map((user) => (
        <tr key={user._id}>
          <td>{user.name}</td>
          <td>
            {user.qualities.map((quality) => (
              <span key={quality._id} className={"badge bg-" + quality.color + " m-1"}>
                {quality.name}
              </span>
            ))}
          </td>
          <td>{user.profession.name}</td>
          <td>{user.completedMeetings}</td>
          <td>{user.rate}</td>
          <td>
            <button className='btn btn-danger' onClick={() => handleDeletion(user._id)}>
              delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
  const table = (
    <table className='table'>
      {thead}
      {tbody}
    </table>
  );

  function renderTableData() {
    return visibleUsers[0] ? table : "";
  }

  function renderHeaderText() {
    return <span className={visibleUsers[0] ? "badge bg-primary" : "badge bg-danger"}>{showPeopleCount()}</span>;
  }

  return (
    <>
      <h1 className='m-2'>{renderHeaderText()}</h1>
      {renderTableData()}
    </>
  );
};

export default Users;
