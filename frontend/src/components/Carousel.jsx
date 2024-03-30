import React, { useState } from 'react';
import { jsPDF } from "jspdf";
import '../styles/Carousel.css';

const Carousel = ({data}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text(data[currentIndex], 10, 10);
    doc.save("stories.pdf");
  };

  return (
    <div className="carousel-parent">
      <p className="text-item">{data[currentIndex]}</p>
      <button className="left-arrow" onClick={handlePrev}>&#8592;</button>
      <button className="download-button" onClick={handleDownload}>Download</button>
      <button className="right-arrow" onClick={handleNext}>&#8594;</button>
    </div>
  );
};

export default Carousel;