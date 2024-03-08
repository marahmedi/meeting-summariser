import React from 'react'
import '../styles/UploadBox.css'
import image from '../assets/uploadImage.png'
import { useState } from 'react'
import LoadingBar from 'react-top-loading-bar';

const UploadBox = () => {
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleFileChange = (e) => {
      if (e.target.files) {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setProgress(20); // Set progress of bar
        // Upload the file immediately (you can customize this logic)
        uploadFile(selectedFile);
        setProgress(100);
        e.target.value = null; // Reset the file input value after upload
      }
    };
  
    const uploadFile = (fileToUpload) => {
     
      console.log('Uploading file:', fileToUpload.name);
      setProgress(30);
      fetch('https://httpbin.org/post', {
        method: 'POST',
        body: fileToUpload, // Set headers manually for single file upload
        headers: {
          'content-type': fileToUpload.type,
          'content-length': `${fileToUpload.size}`, // Headers need to be a string
        },
       })
       .then((response) => response.json())
       .then((data) => console.log(data))
       .catch((error) => console.error(error));
       setProgress(50);
    };
      return (
          <div className='UploadBox'>
              <div className='image-container'>
                  <img className={'image'} src={image} alt='user'/>
          </div>
          <label htmlFor="fileInput">
              <input type="file" 
              id="fileInput"
              onChange={handleFileChange}
              style={{display:'none'}}
              />
              <p className='UploadText'>Click here to upload your file! 📂</p>
              </label>
              <h2 className='MaxFileSize'> Max file size: 10MB </h2>
              <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
          </div>
      )
}

export default UploadBox
