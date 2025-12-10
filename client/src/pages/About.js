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
            Machine learning & gesture model developer. Created
            models used in gesture detection, Mediapipe integrations, and custom gesture detection models.
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
          <p>Camera recognition of ASL gestures using Mediapipe. Lessons
            with interactive activities. Database-stored progress tracking  
            per individual user. Dictionary of ASL words with examples and easy access. Future one-on-one
            instructor practice sessions.</p>
        </ul>
      </div>

      {/* --- PROTOTYPES SECTION --- */}
      <div className="section-block fade-in delay-2">
        <h2 className="section-title">Prototypes</h2>
        <p className="section-text">
          Over time we built multiple UI and backend prototypes, including:
        </p>
        <ul className="section-list">
          <p>Wireframes for lessons, quiz, and camera testing pages. Early 
            hand-tracking demo with basic ABC detection. Mockup ASL dictionary 
            with sample videos. Functional prototype integrating login, lessons, and camera.
            Due to testing, we have a python-only gesture recognition prototype, 
            a legacy API hand detection prototype, and the current version
            that has the gesture recognition function and is compatible with 
            the other object detection API in its suite.
            </p>
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

      {/* --- Sprint 1 --- */}
      <div className="section-block fade-in delay-2">
        <h2 className="section-title">Sprint 1</h2>
        <p className="section-text">
          Database + Camera + Frontend Setup
        </p>
        <ul className="section-list">
          <p> Very much a prototype stage, 
          we began testing different databases and methods 
          of creating a site capable of loading the prototype
          gesture recognition program, connecting to a database backend,
          and able to load and update pages.
          <br /><br />
          While the MongoDB and Node.js setup stayed until the end, the hand recognition model
          and recognizer had to adapt. A connection between the page and
          the database was also established along with a demo login page.
          </p>
        </ul>
      </div>

      {/* --- Sprint 2 --- */}
      <div className="section-block fade-in delay-2">
        <h2 className="section-title">Sprint 2</h2>
        <p className="section-text">
          Hand Detection + Lessons + Login
        </p>
        <ul className="section-list">
          <p>
          Testing of three different hand recognition API: tflite, Mediapipe
          Hands, and Mediapipe Tasks-Visions. The testing was done from 
          the familiarity of the previous python program to tflite, the use
          of Mediapipe in python to Mediapipe Hands, and finally the latest 
          version of Mediapipe under Google, Tasks-Visions. 
          <br /><br />
          We also worked on the design, page layout and implementation of
          basic lessons, using pictures, videos, descriptions. Skills like
          web editing, photo editing, and video implementation were used.
          <br /><br />
          A functional login page that interacts with the database was also made.
          The input of login details prompts and checks the database for existance.
          Once the login details are found, the user is redirected and allowed access.
          </p>
        </ul>
      </div>

      {/* --- Sprint 3 --- */}
      <div className="section-block fade-in delay-2">
        <h2 className="section-title">Sprint 3</h2>
        <p className="section-text">
          Gesture Model + Dictionary + User Interface
        </p>
        <ul className="section-list">
          <p>
          Most of the sprint was spent trying to implement a gesture recognition
          section, expand the lessons to include an easily accessible and readable
          dictionary, and explore different user interfaces for the sign-up/log-in 
          page and lessons. After implementing a gesture recognition section, it 
          was time to get the model making program to work.
          </p>
        </ul>
      </div>

      {/* --- Sprint 4 --- */}
      <div className="section-block fade-in delay-2">
        <h2 className="section-title">Sprint 4</h2>
        <p className="section-text">
          Model Making + Review + Final Integration
        </p>
        <ul className="section-list">
          <p>
          At this point it was mostly bug review and trying to get the 
          model making program to work. A few final design choices like separate
          gesture models to create less confusion between overlapping/similar gestures
          and to match lessons. Documentation, code comments, clean-up, and a progress 
          tracker for lessons. Also added spaces for future lessons/functions.
          </p>
        </ul>
      </div>

      {/* --- Model Making --- */}
      <div className="section-block fade-in delay-2">
        <h2 className="section-title">How to make a custom hand gesture model</h2>
        <p className="section-text">
          Software and Installations
        </p>
        <ul className="section-list">
          <p>
          <a href="PipInstallationModelMaker.txt">Pip List, Python, and Device Information</a>
          <br /><br /><br />
          </p>
        </ul>

        <p className="section-text">
          Protobuf Installation
        </p>
        <ul className="section-list">
          <p>
          1. Install only protobuf without any other dependencies to version 4.21.1 or the latest version
          <br /><br />
          2. In File Explorer, navigate to "c:\users\coder\appdata\local\programs\python\python39\lib\site-packages\google\protobuf\internal"
          <br /><br />
          3. Save the "builder.py" file to an easily accessible folder, it will be a temporary location
          <br /><br />
          4. Install witout dependencies again protobuf version 3.19.x, for my machine it is version 3.19.6
          <br /><br />
          5. In File Explorer, navigate to "c:\users\coder\appdata\local\programs\python\python39\lib\site-packages\google\protobuf\internal" again. 
          <br /><br />
          6. Move the previously saved "builder.py" file to the folder opened in step 5.
          <br /><br /><br />
          </p>
        </ul>

        <p className="section-text">
          Mediapipe Metadata Writers Set-Up
        </p>
        <ul className="section-list">
          <p>
          1. In File Explorer, navigate to "C:\Users\Coder\AppData\Local\Programs\Python\Python39\Lib\site-packages\mediapipe\tasks\python\metadata\metadata_writers"
          <br /><br />
          2. Make a copy of "writer_utils.py", and save it as a backup of the original file installed. This copy should remain untouched and remain in a place different from the current location.
          <br /><br />
          3. From "model_asset_bundle_utils.py" copy and insert imports, variables, classes, and functions into the "writer_utils.py" in the same folder. Remember to follow syntax and put imports and variables at the beginning, and any added classes and functions at the end after the original class and functions.
          In essence, anything the "model_asset_bundle_utils.py" file was in charge of can also be done when the "writer_utils.py" file is used.
          <br /><br />
          4. Save the modified "writer_utils.py", and ensure no modifications were done to "model_asset_bundle_utils.py" and the backup of "writer_utils.py".
          <br /><br /><br />
          </p>
        </ul>

        <p className="section-text">
          Dataset for Model Set-Up
        </p>
        <ul className="section-list">
          <p>
          Modified version of Google Colab's gesture_recognizer notebook but for local machines: 
          <a href="gesture_recognizer.ipynb">Gesture Recognizer Model Maker Notebook</a>
          <br /><br />
          Put a dataset in the "rps_data_sample" folder in form of 
          one folder with pictures of the gesture to be recognized 
          and a folder labeled "none" with examples of a hand making gestures to not be recognized. 
          Make sure to label the folders according to the gesture. Mediapipe can manage with 100-200 pictures per folder, 
          but there may be a limit depending on the specifications of the machine used.
          Ensure the dataset folder and the "gesture_recognizer.ipynb" file are in the same directory.
          <br /><br /><br />
          </p>
        </ul>

        <p className="section-text">
          Warnings While Running Notebook
        </p>
        <ul className="section-list">
          <p>
          There will be 3 expected warning errors:
          <br /><br />
          &gt; "An error occurred: module 'importlib.metadata' has no attribute 'packages_distributions"
          <br />
          &gt; google.api_core and Python 3.9: outdated installation, update recommended
          <br />
          &gt; TensorFlow Addons: End of Life reached, now unsupported installation. Update dependencies with other installations. 
          Change TensorFlow or Tensorflow Addon version.
          <br /><br />
          These are warnings of compatibility or current support status and should
          not prevent the code from running.
          <br /><br />
          After the code runs, the output should be two folders with "exported_model" 
          and "exported_model_2" in the name. The model that works with Google's 
          tasks-vision API is the "gesture_recognizer.task" file in each folder. 
          Two models are produced, but the default model is in the "exported_model" folder.
          </p>
        </ul>
      </div>

    </div>
  );
}

export default About;
