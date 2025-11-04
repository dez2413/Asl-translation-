import React, { useState } from "react";
import { lessonsData } from "../data/lessonsData";
import "./style/MiniSection.css";

function DictionaryModal({ lessonId }) {
  const lesson = lessonsData.find((l) => l.id === lessonId);
  const [openIndex, setOpenIndex] = useState(null);

  if (!lesson) return <p>Lesson not found.</p>;

  const toggleSign = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="dictionary-page">
      <h2 className="Dictionary-title">{lesson.title} Dictionary</h2>
      <div className="sign-grid">
        {lesson.sections
          .filter((section) => section.signs && section.signs.length > 0)
          .flatMap((section) =>
            section.signs.map((sign, i) => (
              <div
                key={sign.letter || sign.number || i}
                className={`sign-card ${openIndex === i ? "expanded" : ""}`}
                onClick={() => toggleSign(i)}
              >
                <img
                  src={sign.image}
                  alt={sign.letter || sign.number}
                  className="sign-image"
                />
                <div className="sign-details">
                  <h2 className="sign-letter">{sign.letter || sign.number}</h2>
                  <p className="sign-text">{sign.text}</p>
                </div>
              </div>
            ))
          )}
      </div>
    </div>
  );
}

export default DictionaryModal;
