import React, { useState } from "react"; // ✅ Import useState
import "./style/MiniSection.css"; // Reuse existing CSS if applicable
import "./style/DictionaryModal.css"; // New CSS for DictionaryModal
import { useParams } from "react-router-dom"; // React Router hook
import { lessonsData } from "../data/lessonsData"; // Import lessons data
import "./style/Page.css"; // General page styles

function DictionaryModal() {
  // Get lessonId from URL parameters
  const { lessonId } = useParams();
  const lesson = lessonsData.find((l) => l.id === lessonId);

  // Hooks must go before conditionals
  const [openIndex, setOpenIndex] = useState(null);

  // Early return if lesson not found
  if (!lesson) return <p>Lesson not found.</p>;

  // Function to toggle sign details
  const toggleSign = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="page">
      <h1 className="Dictionary-title">{lesson.title} Dictionary</h1>

      <div className="dictionary-grid">
        {lesson.sections

        //only include sections that have signs
          .filter((section) => section.signs && section.signs.length > 0)

          //flatten signs from all sections into a single array
          .flatMap((section) =>

            //map over each sign in the section
            section.signs.map((sign, i) => (

              //render each sign card
              <div
                key={sign.letter || sign.number || i}
                className={`dictionary-card ${openIndex === i ? "expanded" : ""}`}
                onClick={() => toggleSign(i)}
              >
                <img
                  src={sign.image}
                  alt={sign.letter || sign.number}
                  className="dictionary-image"
                />
                <div className="dictionary-details">
                  <h2 className="dictionary-letter">
                    {sign.letter || sign.number}
                  </h2>
                  <p className="dictionary-text">{sign.text}</p>
                </div>
              </div>
            ))
          )}
      </div>
    </div>
  );
}

export default DictionaryModal;
