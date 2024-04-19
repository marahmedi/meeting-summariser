import React, { useState } from "react";
import UploadBox from "./components/UploadBox";
import Carousel from "./components/Carousel";

function App() {
  // const mockData = {
  //   user_stories: [
  //     {
  //       id: 1,
  //       title: "User Story 1",
  //       description: "This is the description for User Story 1.",
  //       acceptance_criteria: ["Acceptance criteria 1.1", "Acceptance criteria 1.2", "Acceptance criteria 1.3"]
  //     },
  //     {
  //       id: 2,
  //       title: "User Story 2",
  //       description: "This is the description for User Story 2.",
  //       acceptance_criteria: ["Acceptance criteria 2.1", "Acceptance criteria 2.2"]
  //     },
  //     {
  //       id: 3,
  //       title: "User Story 3",
  //       description: "This is the description for User Story 3.",
  //       acceptance_criteria: ["Acceptance criteria 3.1"]
  //     },
  //     {
  //       id: 4,
  //       title: "User Story 4",
  //       description: "This is the description for User Story 4.",
  //       acceptance_criteria: ["Acceptance criteria 4.1", "Acceptance criteria 4.2", "Acceptance criteria 4.3", "Acceptance criteria 4.4"]
  //     },
  //     {
  //       id: 5,
  //       title: "User Story 5",
  //       description: "This is the description for User Story 5.",
  //       acceptance_criteria: ["Acceptance criteria 5.1", "Acceptance criteria 5.2"]
  //     }
  //   ]
  // };

  // Usage in your component:
  // const [data, setData] = useState(mockData);

  const [uploadComplete, setUploadComplete] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [progress, setProgress] = useState(0);
  return (
    <div className="App">
      {!uploadComplete && (
        <>
          <UploadBox
            setUploadComplete={setUploadComplete}
            setResponseData={setResponseData}
            setProgress={setProgress}
            progress={progress}
          />
        </>
      )}
      {uploadComplete && progress && <Carousel data={responseData} />}
      {/* <Carousel data={mockData}/> */}
    </div>
  );
}

export default App;
