import { useState } from "react";
import { jsPDF } from "jspdf";
import "../styles/Carousel.css";
import Actions from "./Actions";

const Carousel = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.user_stories.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + data.user_stories.length) % data.user_stories.length
    );
  };

  const handleSave = () => {};

  const handleEdit = () => {};

  const handleDownload = () => {
    const doc = new jsPDF();
    const story = data.user_stories[currentIndex];
    const storyText = `Title: ${story.title}\nDescription: ${
      story.description
    }\nAcceptance Criteria:\n${story.acceptance_criteria
      .map((criteria) => "\u2022 " + criteria)
      .join("\n")}`;
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
      const storyText = `Title: ${story.title}\nDescription: ${
        story.description
      }\nAcceptance Criteria:\n${story.acceptance_criteria
        .map((criteria) => "\u2022 " + criteria)
        .join("\n")}`;
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
      <div className="actions-parent">
        <Actions
          handleDownload={handleDownload}
          handleEdit={handleEdit}
          handleSave={handleSave}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      </div>
      <div className="left-arrow" onClick={handlePrev}>
        &#8592;
      </div>
      <div className={editMode ? "edit-text-item" : "text-item"}>
        <div key={data.user_stories[currentIndex].id}>
          <h2 id="card-title">
            <>
              <b>Title:</b> {data.user_stories[currentIndex].title}
            </>
          </h2>

          <p id="card-description">
            {data.user_stories[currentIndex].description}
          </p>
          <div className="card-criteria">
            Acceptance criteria
            <ul>
              {data.user_stories[currentIndex].acceptance_criteria.map(
                (criteria, index) => (
                  <li key={index}> {criteria}</li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="right-arrow" onClick={handleNext}>
        &#8594;
      </div>
      <div className="footer">
        <div className="pagination">
          {data.user_stories.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
        <div className="download-all-button" onClick={handleDownloadAll}>
          Download All
        </div>
      </div>
    </div>
  );
};

export default Carousel;
