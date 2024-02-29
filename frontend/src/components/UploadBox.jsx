import React from 'react'
import '../styles/UploadBox.css'
import image from '../assets/uploadImage.png'

const UploadBox = () => {
      return (
          <div className='UploadBox'>
              <div className='image-container'>
                  <img className={'image'} src={image} alt='user'/>
              </div>
              <h1 className='ClickOrUpload'> Click here to Upload or Drag and Drop </h1>
              <h2 className='MaxFileSize'> Max file size: 10MB </h2>
          </div>
      )
}

export default UploadBox
