// src/pages/MiniSection.js
import React from "react";
import { useParams } from "react-router-dom";
import { lessonsData } from "../data/lessonsData";

function MiniSection() {
  const { lessonId, sectionId } = useParams();
  const lesson = lessonsData.find((l) => l.id === lessonId);
  const section = lesson?.sections.find((s) => s.id === sectionId);

  if (!section) return <p>Section not found.</p>;

  return (
    <>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">{section.title}</h1>
        <video controls className="w-full rounded-xl shadow mb-6">
          <source src={section.video} type="video/mp4" />
        </video>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {section.signs.map((sign) => (
            <div
              key={sign.letter}
              className="bg-white p-4 rounded-xl shadow flex flex-col items-center"
            >
              <img src={sign.image} alt={sign.letter} className="w-40 h-40" />
              <h2 className="text-2xl font-semibold mt-2">{sign.letter}</h2>
              <p className="text-gray-600 mt-2 text-center">{sign.text}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MiniSection;
