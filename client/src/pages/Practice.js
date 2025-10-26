import React, { useRef, useEffect, use, useState } from "react";
// control
//hands, hand connections, -> handLandmarker.Hand_connections, createFromModel
// camera, ????????
// drawconnectors, drawlandmarks -> drawingutils
import {
  HandLandmarker,
  //HandLandmarkerOptions,HandLandmarkerResult
  DrawingUtils, //maybe in individual packets
  GestureRecognizer, 
  FilesetResolver,
} from "@mediapipe/tasks-vision";

import hand_landmarker_task from "./hand_landmarker.task";

import "./style/Page.css";

/*set true in
about:config

media.devices.insecure.enabled
media.getusermedia.insecure.enabled
*/

// https://medium.com/@gadharinayan/hand-sign-recognition-system-in-the-front-end-08dcea22c803  
// https://ai.google.dev/edge/api/mediapipe/js/tasks-vision.handlandmarker
// https://ai.google.dev/edge/mediapipe/solutions/vision/hand_landmarker/web_js#video
// https://codepen.io/mediapipe-preview/pen/gOKBGPN?editors=1010
// https://medium.com/@kiyo07/integrating-mediapipe-tasks-vision-for-hand-landmark-detection-in-react-a2cfb9d543c7
// 0.10.17 most popular version of tasks vision
function Practice() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [handPresence, setHandPresence] = useState(null);

  useEffect(() => {
    //const videoElement = videoRef.current;
    //const canvasElement = canvasRef.current;
    //const canvasCtx = canvasElement.getContext("2d");
    let handLandmarker;
    let animationFrameId;
    let gestureRecognizer;

    const initializeHandDetection = async () => {
      console.log("in initHandDetect");
      try{

        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
        );
        handLandmarker = await HandLandmarker.createFromOptions(
          vision, {
            baseOptions: { modelAssetPath: hand_landmarker_task},
            numHands: 2,
            runningMode: "video"
          }
        );
        await initializeGestureRecognizer();
        detectHands();
      } catch (error) {
        console.error(":c error initializing hand detection", error);
      }
    };

    const initializeGestureRecognizer = async () => {
      console.log("in initGestRecog");
      try{
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );

        gestureRecognizer = await GestureRecognizer.createFromOptions(
          vision, {
            baseOptions: { modelAssetPath: "https://storage.googleapis.com/mediapipe-tasks/gesture_recognizer/gesture_recognizer.task"},
            numHands: 2,
            runningMode: "video"
          }
        );
      } catch (error) {
        console.error("error initializing handrecognizer",error);
      }
    }; 

    const drawLandmarks = (landmarksArray, recognizerResult) => {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext("2d");

      // Draw video feed first
      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      if (!landmarksArray || landmarksArray.length === 0) {
        ctx.restore();
        return;
      }

      // Draw landmarks on top of video
      ctx.fillStyle = "lime";
      landmarksArray.forEach(landmarks => {
        landmarks.forEach(point => {
          const x = point.x * canvas.width;
          const y = point.y * canvas.height;
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, 2 * Math.PI);
          ctx.fill();
        });
      });

      // Draw gesture info
      if (
        recognizerResult &&
        recognizerResult.gestures &&
        recognizerResult.gestures.length > 0 &&
        recognizerResult.gestures[0].length > 0
      ) {
        const gesture = recognizerResult.gestures[0][0];
        const name = gesture.categoryName || "Unknown";
        const score = ((gesture.score || 0) * 100).toFixed(1);

        ctx.font = "18px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(`Gesture: ${name} (${score}%)`, 20, 30);
      }

      ctx.restore();
    };


    const detectHands = () => {
      if (!videoRef.current || !handLandmarker) return;

      const detections = handLandmarker.detectForVideo(videoRef.current, performance.now());
      const gestureRecognizerResult = gestureRecognizer.recognizeForVideo(videoRef.current, performance.now());

      if (detections && detections.landmarks && detections.landmarks.length > 0) {
        setHandPresence(true);
        drawLandmarks(detections.landmarks, gestureRecognizerResult);
      } else {
        setHandPresence(false);
      }

      requestAnimationFrame(detectHands);
    };

    const startWebcam = async () => {
      console.log("in startWebcam");
      try{
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        await initializeHandDetection();
        
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    startWebcam();

    return () => {
      console.log("in javascript 1st return");
      if(videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }

      if(handLandmarker) {
        handLandmarker.close();
      }

      if(animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };

//        <div className="practice-camera">
//         {/* Webcam Input Panel */}
//         <div className="webcam-canvas">
//           <p className="webcam-Input">Webcam Input</p>
//           <video
//             ref={videoRef}             // Reference for MediaPipe to access webcam
//             className="input_video"
//             autoPlay                   // Start playing automatically
//             playsInline                // Prevent fullscreen on iPhones
//             muted                      // Mute video (no need for audio)
//             width="480"
//             height="480"
//           >
//           </video>
          
//         </div>

//         {/* Output Canvas Panel */}
//         <div className="webcam-canvas">
//           <p className="practice-description">Hand Detection</p>
//           <canvas
//             ref={canvasRef}            // Reference for drawing detections
//             className="output_canvas"
//             width="480"
//             height="480"
//           ></canvas>
//         </div>
//       </div>
//     </div>
//   );
// }
  }, []);
  return (
    <div className="page p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Practice</h1>
      <p className="mb-6">Try ASL gestures using your camera here.</p>

      <div className="flex flex-col md:flex-row justify-center items-center gap-6">

        {/* Webcam */}
        {/* Output Canvas */}
        {/* Gesture testing */}
        <>
          <h1> Hand There? {handPresence? "Yes" : "No"}</h1>
          <div style={{ position: "relative"}}>

            <video 
              ref={videoRef} 
              muted
              autoPlay 
              playsInline>
            </video>
            <canvas ref={canvasRef} style={{
              width:"600px",
              height: "480px"
            }}>
            </canvas>
          </div>
        </>
        
      </div>
    </div>
  );
}
// change to 
// const Practice = () => {
//  code  
// };
export default Practice;
