import React from "react";
import PropTypes from "prop-types";
import PersonalInfo from "./personalInfo";
import QualitiesCard from "./qualitiesCard";
import MeetingsCard from "./meetingsCard";
import CommentSection from "../comments/commentSection";

const UserPage = ({ user }) => {
  if (!user) return null;

  const { _id, name, profession, qualities, completedMeetings, rate } = user;

  return (
    <div className="container">
      <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
          <PersonalInfo {...{ _id, name, profession: profession.name, rate }} />
          <QualitiesCard qualities={qualities} />
          <MeetingsCard meetings={completedMeetings} />
        </div>
        <CommentSection />
      </div>
    </div>
  );
};

UserPage.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserPage;
