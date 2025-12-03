import React ,{useState, useEffect, useContext } from "react"; // Import core React library
import { useLocation, Link } from "react-router-dom"; // Used for routing between pages
import "./style/Page.css"; // Shared global styles
import "./style/Lesson.css"; // Lesson-specific styles
import { lessonsData } from "../data/lessonsData"; // Lesson data (contains title, id, sections, etc.)
import book_icon from "../assets/book.png"; // Book icon for the dictionary link
import axios from "axios";
import { AuthContext } from "../context/AuthContext";


function Lessons() {
  // Get user information passed from login via React Router state
  const location = useLocation();
  
  const { user } = useContext(AuthContext);
  const [progress, setProgress] = useState(null);
  

useEffect(() => {
  if (!user) return;

  axios.post("http://localhost:5000/getProgress", { email: user.email })
    .then((res) => setProgress(res.data));
}, [user]);


  return (
    <div className="page">
      {/* Page Header */}
      <h1 >Lessons</h1>
      <p>Welcome, {location.state?.id || "Guest"}!</p>

      {/* Main lesson container */}
      <div className="lessons-container">
        {/* Loop through each lesson from lessonsData */}
        {lessonsData.map((lesson) => (
          <div key={lesson.id} className="lesson-card">

            {/* Lesson card header with title and dictionary link */}
            <div className="lesson-card-header">

              {/* Lesson title */}
              <h2 className="lesson-title">{lesson.title}</h2>

              {/* Dictionary link with icon */}
              <div className="lesson-dictionary">
                <img src={book_icon} alt="book icon" className="dictionary-icon" />
                <Link
                  to={`/lessons/${lesson.id}/dictionary`}
                  className="dictionary-link"
                >
                  Dictionary
                </Link>
              </div>
            </div>

            {/* Decorative underline */}
            <div className="lesson-divider"></div>

            {/* Lesson description */}
            <p className="lesson-description">{lesson.description}</p>

            {/* Section list (mini-lessons or subtopics) */}
            <div className="lesson-sections">
              {lesson.sections.map(section => {
                const current = progress?.[lesson.id]?.[section.id] || 0;
                const total = section.signs.length;
                const percent = Math.floor((current / total) * 100);

              return (
                <Link key={section.id} to={`/lessons/${lesson.id}/${section.id}`} className="lesson-section-card">
                  <h3>{section.title}</h3>

                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${percent}%` }}></div>
                  </div>
                  <p>{percent}% completed</p>
                </Link>
              );
            })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Lessons;
