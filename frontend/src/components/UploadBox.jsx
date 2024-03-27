import '../styles/UploadBox.css'

const UploadBox = () => {
    const handleFileChange = (e) => {
        if (e.target.files) {
            const selectedFile = e.target.files[0];
            uploadFile(selectedFile);
        }
    };

    const uploadFile = (fileToUpload) => {
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
            .then((data) => console.log(data))
            .catch((error) => console.error(error));
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
        </div>
    );
};


export default UploadBox
