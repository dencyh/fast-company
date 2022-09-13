import React from "react";
import Bookmark from "./bookmark";
import Quality from "./quality";

const User = (props) => {
  const {user, handleBookmark} = props;
  return (
    <tr>
      <td>{user.name}</td>
      <td>
        {user.qualities.map((quality) => (
          <Quality key={quality._id} quality={quality} />
        ))}
      </td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate}</td>
      <td className='text-center pointer'>
        <Bookmark user={user} onBookmark={handleBookmark} />
      </td>
      <td>
        <button className='btn btn-danger' onClick={() => props.handleDeletion(user._id)}>
          delete
        </button>
      </td>
    </tr>
  );
};

export default User;
