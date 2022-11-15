import React from "react";

const CommentPlaceholder = () => {
  return (
    <div className="d-flex flex-start placeholder-glow">
      <div
        className="me-3 card-text placeholder bg-secondary"
        style={{
          width: "65px",
          height: "65px",
          borderRadius: "50%"
        }}
      ></div>
      <div className="flex-grow-1 flex-shrink-1">
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <div className="col-5 d-flex gap-2">
              <p className="mb-1 small col-5 placeholder bg-secondary"></p>
              <p className="mb-1 small col-4 placeholder bg-secondary"></p>
            </div>
            <button className="btn btn-sm text-primary d-flex align-items-center">
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
          <p className="small mb-0 placeholder col-11 bg-secondary"></p>
          <p className="small mb-0 placeholder col-10 bg-secondary"></p>
        </div>
      </div>
    </div>
  );
};

export default CommentPlaceholder;
