import React, { useState } from "react";
import "../styles/Card.css";

const Card = ({
  currentIndex,
  editMode,
  data,
  editedTitle,
  setEditedTitle,
  editedDescription,
  setEditedDescription,
  editedCriteria,
  setEditedCriteria,
  setEditMode,
}) => {

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setEditedDescription(e.target.value);
  };

  const handleCriteriaChange = (index, e) => {
    const updatedCriteria = [...editedCriteria];
    updatedCriteria[index] = e.target.value;
    setEditedCriteria(updatedCriteria);
  };

  return (
    <div
      className={editMode ? "edit-text-item" : "text-item"}
      onClick={() => setEditMode(true)}
    >
      <div key={data.user_stories[currentIndex].id}>
        <h2 id="card-title">
          <b>Title:</b>{" "}
          {editMode ? (
            <input
              name="title"
              type="text"
              value={editedTitle}
              placeholder={editedTitle}
              onChange={handleTitleChange}
              className={"user-edit"}
            />
          ) : (
            data.user_stories[currentIndex].title
          )}
        </h2>
        <p id="card-description">
          {editMode ? (
            <input
              name="description"
              type="text"
              value={editedDescription}
              onChange={handleDescriptionChange}
              className={"user-edit"}
            />
          ) : (
            data.user_stories[currentIndex].description
          )}
        </p>
        <div className="card-criteria">
          Acceptance criteria
          <ul>
            {data.user_stories[currentIndex].acceptance_criteria.map(
              (criteria, index) => (
                <li key={index}>
                  {editMode ? (
                    <input
                      name="criteria"
                      id={index}
                      value={editedCriteria[index]}
                      type="text"
                      onChange={(e) => handleCriteriaChange(index, e)}
                      className={"user-edit"}
                      style={{ marginBottom: "10px" }}
                    />
                  ) : (
                    criteria
                  )}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Card;
