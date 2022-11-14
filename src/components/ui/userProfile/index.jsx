import React from "react";
import { useHistory, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import PersonalInfo from "./personalInfo";
import QualitiesCard from "./qualitiesCard";
import MeetingsCard from "./meetingsCard";
import CommentSection from "./commentSection";

const UserPage = ({ user }) => {
  if (!user) return null;

  const { _id, name, profession, qualities, completedMeetings, rate } = user;

  const history = useHistory();
  const { id } = useParams();
  const handleBack = () => {
    history.push("/users");
  };

  return (
    <div className="container">
      <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
          <PersonalInfo {...{ _id, name, profession: profession.name, rate }} />
          <QualitiesCard qualities={qualities} />
          <MeetingsCard completedMeetings={completedMeetings} />
        </div>
        <CommentSection pageId={_id} />
      </div>
    </div>
  );
};

UserPage.propTypes = {
  user: PropTypes.object
};

export default UserPage;
