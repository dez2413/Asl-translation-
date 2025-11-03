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
import MiniSection from "./pages/MiniSection";
import DictionaryModal from "./pages/DictionaryModal";

// Importing ProtectedRoute component for route protection
import ProtectedRoute from "./components/ProtectedRoute";

// Importing AuthProvider for authentication context
import { AuthProvider } from "./context/AuthContext";


// Main App component that sets up routing for the application
function App() {
  return (
  
 <AuthProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/lessons"
            element={
              <ProtectedRoute>
                <Lessons />
              </ProtectedRoute>
            }
          />
          <Route
            path="/practice"
            element={
              <ProtectedRoute>
                <Practice />
              </ProtectedRoute>
            }
          />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign" element={<Sign />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route path="/lessons/:lessonId/:sectionId" element={<MiniSection />} />
          <Route path="/lessons/:lessonId/dictionary" element={<DictionaryModal />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;