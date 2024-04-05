import React, { useState } from "react";
import "../styles/UploadBox.css";
import LoadingBar from "./LoadingBar";

const UploadBox = ({ setUploadComplete, setResponseData, setProgress, progress }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      uploadFile(selectedFile);
    }
  };
  const uploadFile = (fileToUpload) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress > 90) {
        clearInterval(interval);
      }
      setProgress(progress);
    }, 500);

    setErrorMessage(null);
    const formData = new FormData();
    formData.append("audio_file", fileToUpload);

    setFileName(fileToUpload.name);

    fetch("http://localhost:5000/upload_audio", {
      method: "POST",
      body: formData,
      headers: {
        // No need to set content-length, it's handled by fetch automatically
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUploadComplete(true);
        setResponseData(data);
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorMessage("Your upload has failed. Please try again.");
      });
  };

  return (
    <div className="container">
      <div className="upload-box">
        <h3>Import your audio file</h3>
        <p id="max-file-size"> Max file size: 10MB </p>
        <div className="choose-file-btn">
          <p className="upload-text">Choose file</p>
          <input type="file" id="fileInput" onChange={handleFileChange} />
        </div>
        <div className="file-status">
          {progress > 0 && !errorMessage && (
            <LoadingBar fileName={fileName} progress={progress} />
          )}
          {errorMessage && <p className="error-msg">{errorMessage}</p>}
          {progress == 100 && <p id="success">Generating user stories .</p>}
        </div>
      </div>
    </div>
  );
};

export default UploadBox;
