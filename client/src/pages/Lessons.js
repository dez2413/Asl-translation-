import React from "react";           // Importing React library
import {useLocation, Link} from "react-router-dom";  // For accessing location and internal navigation links
import "./style/Page.css";            // General page styling
import "./style/Lesson.css"        // Lesson page specific styling
import { lessonsData } from "../data/lessonsData"; // Importing lessons data

function Lessons() {
  // Access location to retrieve passed state (e.g., user email)
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