// Import core React utilities
import React, { useRef, useEffect } from "react";

// Import MediaPipe Hands library components
import { Hands, HAND_CONNECTIONS } from "@mediapipe/hands";       // Hand-tracking model and hand joint connections
import { Camera } from "@mediapipe/camera_utils";                 // Access to webcam stream
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils"; // Drawing utilities for visualizing hand joints

// Import styling
import "./style/Page.css";

function GestureTest(){

  return;
}

function processResult(){
  console.log("entered process Result");
  return(
    <script>
      console.log("return from procRes");
    </script>
  );
}

function Practice() {
  // React "refs" to directly access DOM elements
  const videoRef = useRef(null);   // For webcam video input
  const canvasRef = useRef(null);  // For drawing hand landmarks output

  // useEffect runs once when the component mounts
  useEffect(() => {
    // Get DOM elements
    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d"); // Used to draw on the canvas

    // ✅ Initialize the MediaPipe Hands solution
    const hands = new Hands({
      // Locate the model files from the CDN
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    // ✅ Set parameters for the hand detection model
    hands.setOptions({
      maxNumHands: 2,               // Detect up to two hands
      modelComplexity: 1,           // 0 = fast, 1 = accurate
      minDetectionConfidence: 0.5,  // Minimum confidence to detect a hand
      minTrackingConfidence: 0.5,   // Minimum confidence to track hand movement
    });

    // ✅ Called every time the model receives results
    hands.onResults((results) => {
      // Save the current state of the canvas
      canvasCtx.save();

      // Clear previous frame
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

      // Draw the camera image first (background)
      canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );

      // Draw landmarks for detected hands
      if (results.multiHandLandmarks) {
        for (const landmarks of results.multiHandLandmarks) {
          // Draw lines connecting hand joints
          drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
            color: "#00FF00",   // Green connection lines
            lineWidth: 3,
          });

          // Draw circles at each landmark point
          drawLandmarks(canvasCtx, landmarks, {
            color: "#FF0000",   // Red dots for joints
            lineWidth: 0.5,
          });
        }
      }

      // Restore canvas to prevent memory buildup
      canvasCtx.restore();
    });

    // ✅ Set up webcam feed and send frames to the model
    if (typeof videoElement !== "undefined" && videoElement !== null) {
      const camera = new Camera(videoElement, {
        onFrame: async () => {
          // Send each video frame to MediaPipe Hands for analysis
          await hands.send({ image: videoElement });
        },
        width: 480,
        height: 480,
      });
      camera.start(); // Start webcam
    }
  }, []); // Empty dependency array ensures this only runs once on component mount

  // ✅ JSX layout of the Practice page
  return (
    <div className="page p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Practice</h1>
      <p className="mb-6">Try ASL gestures using your camera here.</p>

      <div className="flex flex-col md:flex-row justify-center items-center gap-6">
        {/* Webcam Input Panel */}
        <div className="border p-4 rounded-2xl shadow-md bg-gray-50">
          <p className="font-semibold mb-2">Webcam Input</p>
          <video
            ref={videoRef}             // Reference for MediaPipe to access webcam
            className="input_video"
            autoPlay                   // Start playing automatically
            playsInline                // Prevent fullscreen on iPhones
            muted                      // Mute video (no need for audio)
            width="480"
            height="480"
          ></video>
        </div>

        {/* Output Canvas Panel */}
        <div className="border p-4 rounded-2xl shadow-md bg-gray-50">
          <p className="font-semibold mb-2">Hand Detection</p>
          <canvas
            ref={canvasRef}            // Reference for drawing detections
            className="output_canvas"
            width="480"
            height="480"
          ></canvas>
        </div>
      </div>
    </div>
  );
}

// Export component so it can be used in App.js
export default Practice;
