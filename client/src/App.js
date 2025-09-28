import React, { useEffect, useState } from 'react';

function App() {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    fetch('/api/lessons')
      .then(res => res.json())
      .then(data => setLessons(data));
  }, []);

  return (
    <div>
      <h1>ASL Learner Tool</h1>
      <ul>
        {lessons.map(lesson => (
          <li key={lesson.id}>
            {lesson.title} <img src={lesson.image} alt={lesson.title} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;