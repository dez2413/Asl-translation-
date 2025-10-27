// src/pages/MiniSection.js
import React, {useState} from "react";          // Importing React library      
import "./style/MiniSection.css"; // Styles specific to MiniSection page
import { useParams } from "react-router-dom";       // Used for accessing URL parameters
import { lessonsData } from "../data/lessonsData";  // Lesson data (contains title, id, sections, etc.)
import "./style/Page.css";                  // Shared global styles

function MiniSection() {
  // Extract lessonId and sectionId from URL parameters
  const { lessonId, sectionId } = useParams();
  const lesson = lessonsData.find((l) => l.id === lessonId);
  const section = lesson?.sections.find((s) => s.id === sectionId);

  const [generated, setGenerated] = useState({}); // store generated diagrams/explanations
  const [loading, setLoading] = useState(null);

  // If lesson or section not found, display a message
  if (!lesson) return <p>Lesson not found.</p>;
  if (!section) return <p>Section not found.</p>;

    // Function to fetch AI-generated content
  const handleGenerate = async (term) => {
    try {
      setLoading(term);
      const response = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ term }),
      });

      const data = await response.json();
      setGenerated((prev) => ({
        ...prev,
        [term]: data,
      }));
    } catch (err) {
      console.error("Error generating ASL content:", err);
    } finally {
      setLoading(null);
    }
  };

  return (
<div className="page">
      <h1 className="minisection-title">{section.title}</h1>
      <video controls className="minisection-video">
        <source src={section.video} type="video/mp4" />
      </video>

      <div className="sign-grid">
        {section.signs.map((sign) => {
          const term = sign.letter || sign.number;
          const aiData = generated[term];
          return (
            <div key={term} className="sign-card">
              <img src={sign.image} alt={term} className="sign-image" />
              <h2 className="sign-letter">{term}</h2>
              <p className="sign-text">{sign.text}</p>

              <button
                className="generate-btn"
                onClick={() => handleGenerate(term)}
                disabled={loading === term}
              >
                {loading === term ? "Generating..." : "Generate AI Diagram"}
              </button>

              {aiData && (
                <div className="ai-result">
                  <img
                    src={aiData.imageUrl}
                    alt={`${term} diagram`}
                    className="ai-image"
                  />
                  <p className="ai-explanation">{aiData.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MiniSection;
