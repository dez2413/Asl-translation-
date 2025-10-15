import React, { useRef, useEffect } from "react";
import { Hands, HAND_CONNECTIONS } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import "./style/Page.css";

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
            lineWidth: 3,
          });
          drawLandmarks(canvasCtx, landmarks, {
            color: "#FF0000",
            lineWidth: 0.5,
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
