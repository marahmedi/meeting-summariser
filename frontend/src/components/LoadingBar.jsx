import React from "react";
import '../styles/LoadingBar.css'

const LoadingBar = ({ fileName, progress }) => {
  return (
    <div className="loading-bar-container">
      <p className="file-name">{`Uploading ${fileName}`}</p>
      <div className="loading-bar">
        <div className="progress-bar" style={{ width: `${progress}%` }}>
          {`${progress}%`}
        </div>
      </div>
    </div>
  );
};

export default LoadingBar;
