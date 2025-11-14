// src/pages/MiniSection.js
/**
 * MiniSection
 * ----------------
 * A small, focused page that shows a subset (a "mini section") of signs for
 * a lesson. This component reads `lessonId` and `sectionId` from the URL via
 * react-router's `useParams`, looks up the corresponding data in
 * `lessonsData`, and renders a video (if provided) plus a card for the
 * currently selected sign. Navigation buttons allow stepping through signs.
 *
 * Inputs / dependencies:
 *  - URL params: `lessonId`, `sectionId`
 *  - `lessonsData` (static data imported from ../data/lessonsData)
 *  - `react-youtube` for embedding videos
 *
 * Behavior / notes:
 *  - Uses local state `currentIndex` to track which sign is active.
 *  - Performs early returns if lesson/section are not found (after hooks).
 *  - Navigation buttons are disabled at the bounds.
 */
import React, { useState } from "react"; // React and useState hook for state
import YouTube from "react-youtube"; // YouTube embed component
import "./style/MiniSection.css"; // styles for this page's mini section
import { useParams } from "react-router-dom"; // read URL params
import { lessonsData } from "../data/lessonsData"; // static lesson content
import "./style/Page.css"; // shared page styles

function MiniSection() {
  // read lesson and section identifiers from the URL
  const { lessonId, sectionId } = useParams();

  // find the lesson data by id; data shape assumed from lessonsData
  const lesson = lessonsData.find((l) => l.id === lessonId);
  // use optional chaining in case lesson is undefined
  const section = lesson?.sections.find((s) => s.id === sectionId);

  // Hooks must be called before any early returns
  // currentIndex controls which sign from `section.signs` is displayed
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDictionary, setShowDictionary] = useState(false); // ✅ toggle state

  // Early returns: render helpful messages if the requested data is missing
  if (!lesson) return <p>Lesson not found.</p>;
  if (!section) return <p>Section not found.</p>;

  // Guard: assume section.signs exists and has at least one entry
  const currentSign = section.signs[currentIndex];

  // Options passed to the YouTube player instance. The `start`/`end`
  // values are pulled from the section if present, otherwise default to 0.
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

  // Advance to the next sign, but don't exceed bounds
  const nextSign = () => {
    if (currentIndex < section.signs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Go back to the previous sign, but don't go below zero
  const prevSign = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="page">
      {/* Section title */}
      <h1 className="minisection-title">{section.title}</h1>

      {/* Video: only rendered if a videoId is provided in the section data */}
      {section.videoId ? (
        <div className="video-container">
          <YouTube videoId={section.videoId} opts={videoOptions} />
        </div>
      ) : (
        <p>No video available for this section.</p>
      )}

      {/* Card showing the current sign image, letter, and description/text */}
      <div className="sign-card">
        <img src={currentSign.image} alt={currentSign.letter} className="sign-image" />
        <h2 className="sign-letter">{currentSign.letter}</h2>
        <p className="sign-text">{currentSign.text}</p>
      </div>

      {/* Navigation buttons: previous/next with disabled state at bounds */}
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

      {/* Simple progress indicator: current position / total signs */}
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
