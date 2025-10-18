// src/pages/LessonDetail.js
import React from "react";
import { useParams, Link } from "react-router-dom";
import { lessonsData } from "../data/lessonsData";


function LessonDetail() {
  const { id } = useParams();
  const lesson = lessonsData.find((l) => l.id === id);

  if (!lesson) return <p>Lesson not found.</p>;

  return (
      <div className="p-8">
        <h1 className="text-3xl font-bold">{lesson.title}</h1>
        <p className="text-gray-600 mb-6">{lesson.description}</p>

        <div className="flex justify-end mb-4">
          <Link
            to={`/lessons/${id}/dictionary`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            📚 Dictionary
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lesson.sections.map((section) => (
            <Link
              key={section.id}
              to={`/lessons/${id}/${section.id}`}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg"
            >
              <h2 className="text-xl font-semibold">{section.title}</h2>
            </Link>
          ))}
        </div>
      </div>
  );
}

export default LessonDetail;
