import React, { useState } from 'react';
import UploadBox from './components/UploadBox'
import Header from './components/Header'
import Carousel from './components/Carousel'


function App() {
  const [uploadComplete, setUploadComplete] = useState(false)
  const [responseData, setResponseData] = useState(null);
  return (
    <div className="App">
      {!uploadComplete && 
        <>
          <Header/>
          <UploadBox 
            setUploadComplete={setUploadComplete}
            setResponseData={setResponseData}
          />
        </>
      }
      {uploadComplete && <Carousel data={responseData}/>}
    </div>
  )
}

export default App