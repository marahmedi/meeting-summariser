import React from 'react'
import '../styles/Header.css'


const Header = () => {
  return (
    <div className='HeaderContainer'>
      <h1 className='Header'>Upload and attach your meeting audio below</h1>
        <h2 className='SubHeader'> Supported files: mp4</h2>
    </div>
  )
}

export default Header
