// src/pages/MiniSection.js
import React from "react";          // Importing React library      
import { useParams } from "react-router-dom";       // Used for accessing URL parameters
import { lessonsData } from "../data/lessonsData";  // Lesson data (contains title, id, sections, etc.)
import "./style/Page.css";                  // Shared global styles

function MiniSection() {
  // Extract lessonId and sectionId from URL parameters
  const { lessonId, sectionId } = useParams();
  const lesson = lessonsData.find((l) => l.id === lessonId);
  const section = lesson?.sections.find((s) => s.id === sectionId);

  // If lesson or section not found, display a message
  if (!lesson) return <p>Lesson not found.</p>;
  if (!section) return <p>Section not found.</p>;

  return (
    <>
      <div className="page">
        <h1 className="minisection-title">{section.title}</h1>
        <video controls className="minisection-video">
          <source src={section.video} type="video/mp4" />
        </video>

        <div className="sign-grid">
          {section.signs.map((sign) => (
            <div
              key={sign.letter}
              className="sign-card"
            >
              <img src={sign.image} alt={sign.letter} className="sign-image" />
              <h2 className="sign-letter">{sign.letter}</h2>
              <p className="sign-text">{sign.text}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MiniSection;
