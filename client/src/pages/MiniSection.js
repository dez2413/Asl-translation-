// src/pages/MiniSection.js
import React, { useState } from "react";
import YouTube from "react-youtube";
import "./style/MiniSection.css";
import { useParams } from "react-router-dom";
import { lessonsData } from "../data/lessonsData";
import "./style/Page.css";

function MiniSection() {
  const { lessonId, sectionId } = useParams();
  const lesson = lessonsData.find((l) => l.id === lessonId);
  const section = lesson?.sections.find((s) => s.id === sectionId);

  // ✅ Hooks must go before any early returns
  const [currentIndex, setCurrentIndex] = useState(0);

  // Early returns AFTER hooks
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
      <h1 className="minisection-title">{section.title}</h1>

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
    </div>
  );
}

export default MiniSection;
