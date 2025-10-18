import React, { useRef, useEffect } from "react";
import { Hands, HAND_CONNECTIONS } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { GestureRecognizer, FilesetResolver, DrawingUtils } from "@mediapipe/tasks-vision";
//"https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22-rc.20250304/+esm";
//"@mediapipe/tasks-vision";
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
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");

    // Set up hands model
    const hands = new Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    hands.onResults((results) => {
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );

      if (results.multiHandLandmarks) {
        for (const landmarks of results.multiHandLandmarks) {
          drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
            color: "#00FF00",
            lineWidth: 2,
          });
          drawLandmarks(canvasCtx, landmarks, {
            color: "#FF0000",
            lineWidth: 1,
          });
        }
      }
      canvasCtx.restore();
    });

    if (typeof videoElement !== "undefined" && videoElement !== null) {
      const camera = new Camera(videoElement, {
        onFrame: async () => {
          await hands.send({ image: videoElement });
        },
        width: 480,
        height: 480,
      });
      camera.start();
    }
  }, []);

    // setup model usage
  
    //wasm path
    const vision = FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22/wasm"
    );

    const gestureRecognizer = new GestureRecognizer.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: "./handgesture_recognizer.task"
    },
    runningMode: "video",
    numHands: 2
    });

/*
    //canvasCtx exist
    //const gestureOutput = document.getElementById("gesture_output");

  // set up recognition
  //gestureRecognizer.setOptions({ runningMode: "VIDEO" });

  let lastVideoTime = -1;
  function renderLoop(){
    //const video = document.getElementById("video");

    if (video.currentTime !== lastVideoTime) {
      const gestureRecognitionResult = gestureRecognizer.recognizeForVideo(video);
      processResult(gestureRecognitionResult);
      lastVideoTime = video.currentTime;
    }

    requestAnimationFrame(() => {
      renderLoop();
    });
  }*/

  // https://ai.google.dev/edge/mediapipe/solutions/vision/gesture_recognizer
  // https://ai.google.dev/edge/api/mediapipe/js/tasks-vision.gesturerecognizer#gesturerecognizercreatefrommodelbuffer
  // https://codepen.io/mediapipe-preview/pen/zYamdVd
  // https://ai.google.dev/edge/mediapipe/solutions/vision/gesture_recognizer/web_js#video
  // score and categoryName of handedness
  return (
    <div className="page p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Practice</h1>
      <p className="mb-6">Try ASL gestures using your camera here.</p>

      <div className="flex flex-col md:flex-row justify-center items-center gap-6">
        {/* Webcam */}
        <div className="border p-4 rounded-2xl shadow-md bg-gray-50">
          <p className="font-semibold mb-2">Webcam Input</p>
          <video
            ref={videoRef}
            className="input_video"
            autoPlay
            playsInline
            muted
            width="480"
            height="480"
          ></video>
        </div>

        {/* Output Canvas */}
        <div className="border p-4 rounded-2xl shadow-md bg-gray-50">
          <p className="font-semibold mb-2">Hand Detection</p>
          <canvas ref={canvasRef} className="output_canvas" width="480" height="480"></canvas>
        </div>
      </div>
    </div>
  );
}

export default Practice;
