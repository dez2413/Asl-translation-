// src/pages/MiniSection.js
import React from "react";          // Importing React library   
import "./style/MiniSection.css"; // Styles specific to MiniSection page
import { useParams } from "react-router-dom";       // Used for accessing URL parameters
import { lessonsData } from "../data/lessonsData";  // Lesson data (contains title, id, sections, etc.)
import "./style/Page.css";                  // Shared global styles

function DictionaryModal() {
  // Extract lessonId and sectionId from URL parameters
  const { lessonId } = useParams();
  const lesson = lessonsData.find((l) => l.id === lessonId);


  // If lesson or section not found, display a message
  if (!lesson) return <p>Lesson not found.</p>;


  return (
    <>
      <div className="page">
        <h1 className="Dictionary-title">{lesson.title}</h1>

        {/* <div className="sign-grid">
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
        </div> */}
      </div>
    </>
  );
}

export default DictionaryModal;
