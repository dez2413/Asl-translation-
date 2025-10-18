import React from "react";
import {useLocation, Link} from "react-router-dom";
import "./style/Page.css";
import "./style/Lesson.css"
import { lessonsData } from "../data/lessonsData";

function Lessons() {
  const location = useLocation();
  
  return (
    <div className="page">
      <h1>Lessons</h1>
      <p>Welcome, {location.state?.id || "Guest"}!</p>
      <div className="lesson">
      
          {lessonsData.map((lesson) => (
            <Link
              key={lesson.id}
              to={`/lessons/${lesson.id}`}
              className="lesson-id"
            >
              <h2 className="=lesson-title">{lesson.title}</h2>
               <div className="lesson-underline"></div>
              <p className="=lesson-description">{lesson.description}</p>
            </Link>
          ))}
        </div>
      
      
    </div>
  );
}

export default Lessons;