import React from "react";
import "./style/About.css";

import team1 from "../assets/team1.jpg";
import team2 from "../assets/team2.jpg";
import team3 from "../assets/team3.jpg";
import sprintOverview from "../assets/Gantt.png";

function About() {
  return (
    <div className="about-page">

      {/* --- TITLE --- */}
      <h1 className="about-title">Meet The Team</h1>
      <p className="about-subtitle">
        Our team created ASL Translate to make learning American Sign Language interactive,
        accessible, and engaging using hand tracking and personalized lessons.
      </p>

      {/* --- TEAM SECTION --- */}
      <div className="team-section">

        <div className="team-card fade-in">
          <img src={team1} alt="Desiree" className="team-photo" />
          <h3 className="team-name">Desiree</h3>
          <p className="team-desc">
            Frontend developer and designer. Built interactive UI, dictionary,
            lessons, and major components of the camera + gesture interface.
          </p>
        </div>

        <div className="team-card fade-in delay-1">
          <img src={team2} alt="Tiare" className="team-photo" />
          <h3 className="team-name">Tiare</h3>
          <p className="team-desc">
            Machine learning & gesture model developer. Created hand-tracking
            models, Mediapipe integrations, and ASL detection logic.
          </p>
        </div>

        <div className="team-card fade-in delay-2">
          <img src={team3} alt="Thaddeus" className="team-photo" />
          <h3 className="team-name">Thaddeus</h3>
          <p className="team-desc">
            Backend & database engineer. Built MongoDB systems, authentication,
            progress tracking, and helped create frontend lessons.
          </p>
        </div>
      </div>

      {/* --- USER STUDY SECTION --- */}
      <div className="section-block fade-in">
        <h2 className="section-title">User Study</h2>
        <p className="section-text">
          Our target audience includes ASL learners motivated by family, work,
          or personal interest. We analyzed user feedback from existing ASL apps,
          conducted survey studies, and interviewed members of the Deaf community
          to understand needs such as camera-guided feedback, accessible lessons,
          and progress tracking.
        </p>
        <p className="section-text">
          User tasks included: watching instructional videos, practicing signs with
          the camera, reviewing dictionary words, and completing short quizzes.
        </p>
      </div>

      {/* --- FUNCTION SECTION --- */}
      <div className="section-block fade-in delay-1">
        <h2 className="section-title">System Functions</h2>
        <ul className="section-list">
          <p>Camera recognition of ASL gestures using Mediapip Interactive lessons
             with videos and practice activities Database-backed progress tracking 
             stored per user dictionary of ASL words with examples future one-on-one
              instructor practice sessions</p>
        </ul>
      </div>

      {/* --- PROTOTYPES SECTION --- */}
      <div className="section-block fade-in delay-2">
        <h2 className="section-title">Prototypes</h2>
        <p className="section-text">
          Over time we built multiple UI and backend prototypes, including:
        </p>
        <ul className="section-list">
          <p>Wireframes for lessons, quiz, and camera testing pages early 
            hand-tracking demo with basic ABC detection mockup ASL dictionary 
            with sample videos functional prototype integrating login, lessons, and camera</p>
        </ul>
      </div>

      {/* --- SPRINT SECTION --- */}
      <div className="section-block fade-in delay-3">
        <h2 className="section-title">Project Sprints</h2>

        <div className="sprint-container">

          {/* LEFT - TEXT */}
          <div className="sprint-left">

            <h3 className="sprint-subtitle">Sprint 1: Database + Camera + Frontend Setup</h3>
            <ul className="section-list">
              <li>Database setup – Thaddeus & Desiree</li>
              <li>Camera / Hand Detection – Tiare & Desiree</li>
              <li>Frontend Setup – Desiree</li>
            </ul>

            <h3 className="sprint-subtitle">Sprint 2: Hand Detection + Lessons + Login</h3>
            <ul className="section-list">
              <li>Hand Detection – Tiare & Desiree</li>
              <li>Database + Login – Thaddeus & Desiree</li>
              <li>Frontend Lessons – Desiree</li>
            </ul>

            <h3 className="sprint-subtitle">Sprint 3: Gesture Model + Dictionary + UI</h3>
            <ul className="section-list">
              <li>Model Making – Tiare & Desiree</li>
              <li>Dictionary / Lessons – Desiree</li>
              <li>UI Elements – Thaddeus</li>
            </ul>

            <h3 className="sprint-subtitle">Sprint 4: Model + Review + Final Integration</h3>
            <ul className="section-list">
              <li>Model Maker – Tiare</li>
              <li>Progress / Review – Desiree</li>
              <li>Reviewer / Helper – Thaddeus</li>
            </ul>

          </div>

          {/* RIGHT - IMAGE */}
          <div className="sprint-right">
            <img 
              src={sprintOverview} 
              alt="Sprint Overview" 
              className="sprint-image" 
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default About;
