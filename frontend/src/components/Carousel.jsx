import { useState } from 'react';
import { jsPDF } from "jspdf";
import '../styles/Carousel.css';

const Carousel = ({data}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.user_stories.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.user_stories.length) % data.user_stories.length);
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    const story = data.user_stories[currentIndex];
    const storyText = `Title: ${story.title}\nDescription: ${story.description}\nAcceptance Criteria:\n${story.acceptance_criteria.map(criteria => '\u2022 ' + criteria).join('\n')}`;
    const lines = doc.splitTextToSize(storyText, 180);
    doc.text(lines, 10, 10);
    
    doc.setProperties({
      title: story.title,
    });
  
    doc.save(`${story.title}.pdf`);
  };
  
  const handleDownloadAll = () => {
    const doc = new jsPDF();
    data.user_stories.forEach((story, index) => {
      const storyText = `Title: ${story.title}\nDescription: ${story.description}\nAcceptance Criteria:\n${story.acceptance_criteria.map(criteria => '\u2022 ' + criteria).join('\n')}`;
      const lines = doc.splitTextToSize(storyText, 180);
      doc.text(lines, 10, 10);
      if (index < data.user_stories.length - 1) {
        doc.addPage();
      }
    });
  
    doc.setProperties({
      title: "All Stories",
    });
  
    doc.save("all_stories.pdf");
  };

  return (
    <div className="carousel-parent">
    <div className="left-arrow" onClick={handlePrev}>&#8592;</div>
    <div className="text-item">
      <div key={data.user_stories[currentIndex].id}>
        <h2>Title: {data.user_stories[currentIndex].title}</h2>
        <p>Description {data.user_stories[currentIndex].description}</p>
        <ul> Acceptance Criteria:
          {data.user_stories[currentIndex].acceptance_criteria.map((criteria, index) => (
            <li key={index}> {criteria}</li>
          ))}
        </ul>
      </div>
    </div>
    <div className="download-button" onClick={handleDownload}>Download</div>
    <div className="download-all-button" onClick={handleDownloadAll}>Download All</div>
    <div className="right-arrow" onClick={handleNext}>&#8594;</div>
    <div className="pagination">
      {data.user_stories.map((_, index) => (
        <span key={index} className={`dot ${index === currentIndex ? 'active' : ''}`}></span>
      ))}
    </div>
  </div>
  );
};

export default Carousel;