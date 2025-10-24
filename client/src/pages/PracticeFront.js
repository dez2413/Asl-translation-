import React from "react";
import "./style/Practice.css";
import { CameraScript } from "./PracticeBack";

function Practice() {
 try {
    console.log("before return");
    return (
      <div className="page">

      <head>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="./style/Practice.css"/>

        <link href="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css" rel="stylesheet"/>
        <script src="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/vision_bundle.js" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js" type="text/javascript"></script>
      </head>

        <h1>MediaPipe HandLandmarker</h1>
        
          <h2>Webcam continuousdetection</h2>
          <p>Hold your hand in front of your webcam to get real-time hand landmarker detection.<br/>Click <b>enable webcam</b> below and grant access to the webcam if prompted.</p>

          <section id="demos">

            <p>Remember to enable web cam</p>
            
            <div id="liveView" class="camView">
              <button id="webcamButton">Enable Webcam</button>
              <video id="webcam" autoplay muted width="640" height="480"></video>
            </div>
          </section>

      </div>
    );
    } finally {
      console.log("the beginning of javascript/react");

        // JavaScript Portion
        const video = document.getElementById('webcam');
        const liveView = document.getElementById('liveView');
        const demosSection = document.getElementById('demos');
        const enableWebcamButton = document.getElementById('webcamButton');

        // Check if webcam access is supported.
        async function getUserMediaSupported() {
          return !!(navigator.mediaDevices &&
            navigator.mediaDevices.getUserMedia);
        }

        // If webcam supported, add event listener to button for when user
        // wants to activate it to call enableCam function which we will 
        // define in the next step.
        if (getUserMediaSupported()) {
          enableWebcamButton.addEventListener('click', enableCam);
        } else {
          console.warn('getUserMedia() is not supported by your browser');
        }

        // Placeholder function for next step. Paste over this in the next step.
        function enableCam(event) {
          // Hide the button once clicked.
          event.target.classList.add('removed');  
              
          // getUsermedia parameters to force video but not audio.
          const constraints = {
            video: true
          };

          // Activate the webcam stream.
          navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
            video.srcObjesct = stream;
              video.addEventListener('loadeddata', predictWebcam);
          });

        }

        // Placeholder function for next step.
        function predictWebcam() {
        }

      console.log("the end of javascript/react");
    }
}


/*<script src="./PracticeBack.js" defer></script>*/
/*<script type="module" src="./PracticeBack.js"></script>
        <script>
          CameraScript();
        </script>*/ 

export default Practice;