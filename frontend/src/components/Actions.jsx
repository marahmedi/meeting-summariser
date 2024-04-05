import React, { useState } from "react";
import "../styles/Actions.css";
import jiraIcon from "../assets/icons/jira-icon.png";
import downloadIcon from "../assets/icons/download-icon.png";
import viewModeIcon from "../assets/icons/exit.png";
import editModeIcon from "../assets/icons/edit-mode.png";

const Actions = ({handleDownload, handleEdit, handleSave, editMode, setEditMode}) => {

    const handleMode= () => {
        setEditMode(!editMode);

        editMode ? handleEdit(): handleSave()
    }


  return (
    <div className="actions-container">
      <button className="action-btn">
        <img className="action-icon" src={jiraIcon} />
        <span className="button-text">Jira</span>
      </button>
      <button className="action-btn" onClick={handleDownload}>
        <img className="action-icon" src={downloadIcon} />
        <span className="button-text">download</span>
      </button>
      <button className="action-btn" onClick={handleMode}>
        {
          <img
            className="action-icon"
            src={editMode ? viewModeIcon : editModeIcon}
          />
        }
        <span className="button-text">{editMode ? "Exit" : "edit"}</span>
      </button>
    </div>
  );
};

export default Actions;
