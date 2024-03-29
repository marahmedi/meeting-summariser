import React, { useState } from 'react';
import '../styles/Carousel.css';

const textItems = [
  'Welcome to our website!',
  'Explore our latest products.',
  'Stay tuned for exciting updates!',
  // Add more text items as needed
]

const Carousel = ({data}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % textItems.length);
  };

  const handleDownload = () => {
    // Implement your download logic here (if applicable)
  };

  return (
    <div className="carousel-parent">
      <p className="text-item">{data[currentIndex]}</p>
      <button className="left-arrow" onClick={handlePrev}>&#8592;</button>
      <button className="download-button"onClick={handleDownload}>Download</button>
      <button className="right-arrow" onClick={handleNext}>&#8594;</button>
    </div>
  );
};

export default Carousel;