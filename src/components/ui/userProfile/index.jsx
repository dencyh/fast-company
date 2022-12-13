import React from "react";
import PropTypes from "prop-types";
import PersonalInfo from "./personalInfo";
import QualitiesCard from "./qualitiesCard";
import MeetingsCard from "./meetingsCard";
import CommentSection from "../comments/commentSection";
import CommentsProvider from "../../../hooks/useComments";

const UserCard = ({ user }) => {
  if (!user) return null;

  return (
    <div className="container">
      <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
          <PersonalInfo user={user} />
          <QualitiesCard qualities={user.qualities} />
          <MeetingsCard meetings={user.completedMeetings} />
        </div>
        <CommentsProvider>
          <CommentSection />
        </CommentsProvider>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserCard;
