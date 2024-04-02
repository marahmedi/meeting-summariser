import React, { useState } from 'react';
import '../styles/UploadBox.css'


const UploadBox = ({setUploadComplete, setResponseData}) => {
    const [errorMessage, setErrorMessage] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files) {
            const selectedFile = e.target.files[0];
            uploadFile(selectedFile);
        }
        };

    const uploadFile = (fileToUpload) => {
        setErrorMessage(null);
        const formData = new FormData();
        formData.append('audio_file', fileToUpload);

        fetch('http://localhost:5000/upload_audio', {
            method: 'POST',
            body: formData,
            headers: {
                // No need to set content-length, it's handled by fetch automatically
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            setUploadComplete(true);
            setResponseData(data);
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
            setErrorMessage('Your upload has failed. Please try again.');
        });
    };
            

    return (
        <div className='UploadBox'>
            <label htmlFor="fileInput">
                <input type="file"
                       id="fileInput"
                       onChange={handleFileChange}
                       style={{display:'none'}}
                />
                <p className='UploadText'>Click here to upload your file! 📂</p>
            </label>
            <h2 className='MaxFileSize'> Max file size: 10MB </h2>
            {errorMessage && <p className='ErrorMessage'>{errorMessage}</p>}
        </div>
    );
};

export default UploadBox;