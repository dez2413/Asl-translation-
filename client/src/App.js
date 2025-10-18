// client/src/App.js      import core React functionality and routing components
import React from "react";
import { Routes, Route } from "react-router-dom";

// Importing the Navbar component
import Navbar from "./components/Navbar";

// Importing page components for routing
import Home from "./pages/Home";
import Lessons from "./pages/Lessons";
import Practice from "./pages/Practice";
import Quiz from "./pages/Quiz";
import Login from "./pages/Login";
import Sign from "./pages/Sign";
import Account from "./pages/Account"

// Importing additional components for nested routes
import LessonDetail from "./pages/LessonDetail";
import MiniSection from "./pages/MiniSection";
// import DictionaryModal from "./pages/DictionaryModal";


// Main App component that sets up routing for the application
function App() {
  return (
  
  <div className = "App">
    {/* Navbar component for navigation */}
    <Navbar />
    
      {/* Defining application routes */}
      <Routes>

        {/* Home route */}
          <Route path="/" element={<Home />} />
          
        {/* Lessons routes with nested routes for lesson details and mini sections */}
            <Route path="/lessons" element={<Lessons />} />
              <Route path="/lessons/:id" element={<LessonDetail />} />
                <Route path="/lessons/:lessonId/:sectionId" element={<MiniSection />} />

        {/* Practice route */}
            <Route path="/practice" element={<Practice />} />

        {/* Quiz route */}
            <Route path="/quiz" element={<Quiz />} />

        {/* Authentication routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/sign" element={<Sign />} />
            
        {/* Account route */}
            <Route path="/account" element={<Account />} />
        </Routes>
    </div>
  );
}

export default App;