import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState} from 'react';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Lessons from "./pages/Lessons";
import Practice from "./pages/Practice";
import Quiz from "./pages/Quiz";
import Login from "./pages/Login";
import Sign from "./pages/Sign";

function App() {
  return (
    <div className = "App">
        <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Sign" element={<Sign />} />
        </Routes>
        </Router>
    </div>
  );
}

export default App;