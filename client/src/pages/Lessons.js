import React from "react";
import {useLocation} from "react-router-dom";
import "./style/Page.css";
import "./style/Lesson.css"

function Lessons() {
  const location = useLocation();
  
  return (
    <div className="page">
      <h1>Lessons</h1>
      <p>Welcome, {location.state?.id || "Guest"}!</p>

      
      
    </div>
  );
}

export default Lessons;