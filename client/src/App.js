import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Lessons from "./pages/Lessons";
import Practice from "./pages/Practice";
import Quiz from "./pages/Quiz";
import Login from "./pages/Login";
import Sign from "./pages/Sign";
import Account from "./pages/Account"
import LessonDetail from "./pages/LessonDetail";
import MiniSection from "./pages/MiniSection";
// import DictionaryModal from "./pages/DictionaryModal";

function App() {
  return (
  
  <div className = "App">
    <Navbar />
      <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/lessons" element={<Lessons />} />
              <Route path="/lessons/:id" element={<LessonDetail />} />
                <Route path="/lessons/:lessonId/:sectionId" element={<MiniSection />} />

            <Route path="/practice" element={<Practice />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign" element={<Sign />} />
            <Route path="/account" element={<Account />} />
        </Routes>
    </div>
  );
}

export default App;