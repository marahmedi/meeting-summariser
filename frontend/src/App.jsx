import React, { useState } from 'react';
import UploadBox from './components/UploadBox'
import Carousel from './components/Carousel'


function App() {
  const [uploadComplete, setUploadComplete] = useState(false)
  const [responseData, setResponseData] = useState(null);
  const [progress, setProgress] = useState(0);
  return (
    <div className="App">
      {!uploadComplete && 
        <>
          <UploadBox 
            setUploadComplete={setUploadComplete}
            setResponseData={setResponseData}
            setProgress={setProgress}
            progress={progress}
          />
        </>
      }
      {uploadComplete && progress && <Carousel data={responseData}/>}
    </div>
  )
}

export default App