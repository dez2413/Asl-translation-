// src/pages/MiniSection.js
import React, { useState } from "react";
import YouTube from "react-youtube";
import "./style/MiniSection.css";
import { useParams } from "react-router-dom";
import { lessonsData } from "../data/lessonsData";
import "./style/Page.css";
import DictionaryModal from "./DictionaryModal";
import book_icon from "../assets/book.png"; // Book icon for the dictionary link

function MiniSection() {
  const { lessonId, sectionId } = useParams();
  const lesson = lessonsData.find((l) => l.id === lessonId);
  const section = lesson?.sections.find((s) => s.id === sectionId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDictionary, setShowDictionary] = useState(false); // ✅ toggle state

  if (!lesson) return <p>Lesson not found.</p>;
  if (!section) return <p>Section not found.</p>;

  const currentSign = section.signs[currentIndex];

  const videoOptions = {
    height: "390",
    width: "640",
    playerVars: {
      start: section.start || 0,
      end: section.end || 0,
      autoplay: 0,
      controls: 1,
    },
  };

  const nextSign = () => {
    if (currentIndex < section.signs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSign = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="page">
      <div className="minisection-header">
        <h1 className="minisection-title">{section.title}</h1>
        <button
          className="dictionary-button"
          onClick={() => setShowDictionary(true)}
        >
          <img src={book_icon} alt="book icon" className="dictionary-icon" />
           Dictionary
        </button>
      </div>

      {section.videoId ? (
        <div className="video-container">
          <YouTube videoId={section.videoId} opts={videoOptions} />
        </div>
      ) : (
        <p>No video available for this section.</p>
      )}

      <div className="sign-card">
        <img src={currentSign.image} alt={currentSign.letter} className="sign-image" />
        <h2 className="sign-letter">{currentSign.letter}</h2>
        <p className="sign-text">{currentSign.text}</p>
      </div>

      <div className="nav-buttons">
        <button onClick={prevSign} disabled={currentIndex === 0} className="nav-button">
          ⬅ Previous
        </button>
        <button
          onClick={nextSign}
          disabled={currentIndex === section.signs.length - 1}
          className="nav-button"
        >
          Next ➡
        </button>
      </div>

      <p className="progress-indicator">
        {currentIndex + 1} / {section.signs.length}
      </p>

      {/* ✅ Dictionary Modal */}
      {showDictionary && (
        <div className="dictionary-overlay">
          <div className="dictionary-content">
            <button
              className="close-button"
              onClick={() => setShowDictionary(false)}
            >
              ✖ Close
            </button>
            <DictionaryModal lessonId={lessonId} />
          </div>
        </div>
      )}
    </div>
  );
}

export default MiniSection;
