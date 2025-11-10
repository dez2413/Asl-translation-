import React, { useRef, useEffect, useState } from "react";
import {
  HandLandmarker,
  //HandLandmarkerOptions,HandLandmarkerResult
  GestureRecognizer, 
  FilesetResolver,
} from "@mediapipe/tasks-vision";

import MyButtonList from "../components/ButtonList";

import hand_landmarker_task from "./hand_landmarker.task";
import recognizerTask from "./handgesture_recognizer.task";
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

// https://github.com/google-ai-edge/mediapipe/issues/5997
// https://github.com/google-ai-edge/mediapipe/blob/master/mediapipe/tasks/python/metadata/metadata_writers/metadata_writer.py
// https://github.com/google-ai-edge/mediapipe/tree/master/mediapipe/tasks/python/metadata/metadata_writers
// https://ai.google.dev/edge/mediapipe/solutions/customization/gesture_recognizer
// https://ai.google.dev/edge/mediapipe/solutions/customization/gesture_recognizerhttps://ai.google.dev/edge/mediapipe/solutions/customization/gesture_recognizer
export let targetGesture = ""; 

export function setTargetGesture(goal){
  targetGesture = goal;
};

function Practice() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const resultRef = useRef(null);

  const [handPresence, setHandPresence] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [currentGesture, setCurrentGesture] = useState(null);
  const [goalUpdater, setGoalUpdater] = useState(null);

      const gestureList = [
      {
        gestureName: "None",
        mastery: 1
      },
      {
        gestureName: "Closed_Fist",
        mastery: 0
      },
      {
        gestureName: "Open_Palm",
        mastery: 0
      },
      {
        gestureName: "Pointing_Up",
        mastery: 0
      },
      {
        gestureName: "Thumb_Down",
        mastery: 0
      },
      {
        gestureName: "Thumb_Up",
        mastery: 0
      },
      {
        gestureName: "Victory",
        mastery: 0
      },
      {
        gestureName: "ILoveYou",
        mastery: 0
      }
    ];
    let testArray = gestureList;
    console.log(testArray[0]);
    console.log(testArray[1]);
    console.log(testArray[2]);
    console.log(testArray[3]);
    console.log(gestureList[4]);
    console.log(gestureList[5]);
    
    let targetIndex = 0;
    let categoryNames = ["None", "Closed_Fist", "Open_Palm", "Pointing_Up", "Thumb_Down", "Thumb_Up", "Victory", "ILoveYou"];
    let categoryHistory = [1, 0, 0, 0, 0, 0, 0, 0];

  useEffect(() => {
    let handLandmarker;
    let animationFrameId;
    let gestureRecognizer;

    let firstCategoryName;
    let firstCategoryScore;
    let firstHandedness;
    let firstIndexFingerCoor;
    let firstIndexFingerCoorWorld;

    let secondCategoryName;
    let secondCategoryScore;
    let secondHandedness;
    let secondIndexFingerCoor;
    let secondIndexFingerCoorWorld;

    let oldPositionHandNine = [0,0,0];
    let newPositionHandNine;

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
            baseOptions: { 
            //modelAssetPath: "https://storage.googleapis.com/mediapipe-tasks/gesture_recognizer/gesture_recognizer.task"},
            modelAssetPath: recognizerTask},
            numHands: 2,
            runningMode: "video"
          }
        );
      } catch (error) {
        console.error("error initializing handrecognizer",error);
      }
    }; 

    const drawLandmarks = (landmarksArray, recognizerResult) => {
      console.log("in drawLandmarks");
      const canvas = canvasRef.current;
      const canvasCtx = canvas.getContext('2d');
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
      canvasCtx.fillStyle = 'white';

      const canvasRes = resultRef.current;
      const canvasResCtx = canvasRes.getContext('2d');
      canvasResCtx.clearRect(0, 0, canvasRes.width, canvasRes.height);
      canvasResCtx.fillStyle = 'white';

      landmarksArray.forEach(landmarks => {
        landmarks.forEach(landmark => {
          const x = landmark.x * canvas.width;
          const y = landmark.y * canvas.height;

          canvasCtx.beginPath();
          canvasCtx.arc(x, y, 5, 0, 2*Math.PI);
          canvasCtx.fill();
        });

        canvasCtx.font = '10px Arial';
        canvasCtx.fillStyle = 'white';
        canvasCtx.textAlign = 'center';

        canvasResCtx.font = '10px Arial';
        canvasResCtx.fillStyle = 'white';
        canvasResCtx.textAlign = 'center';
        
        // top = 0
        // left = 0
        // right = 0.9
        // bottom = 0.9
        // by seeing camera view
        // through experience it is flipped
        
        if(recognizerResult.gestures[0] !== undefined){

          firstCategoryName = recognizerResult.gestures[0][0].categoryName;
          firstCategoryScore = parseFloat(recognizerResult.gestures[0][0].score * 100).toFixed(2);
          firstHandedness = recognizerResult.handednesses[0][0].displayName;
          firstIndexFingerCoor = recognizerResult.landmarks[0][8].x;
          firstIndexFingerCoorWorld = recognizerResult.landmarks[0][8].x;

          if(Math.abs(oldPositionHandNine[0] - recognizerResult.landmarks[0][9].x) > 0.03){
            canvasCtx.fillText("x/Horizontal Moves", (canvas.width / 8), canvas.height / 3);
          }
          if(Math.abs(oldPositionHandNine[1] - recognizerResult.landmarks[0][9].y) > 0.03){
            canvasCtx.fillText("y/Vertical Moves", (canvas.width / 8), (canvas.height / 3)+(canvas.height/9));
          }
          if(Math.abs(oldPositionHandNine[2] - recognizerResult.landmarks[0][9].z) > 0.03){
            canvasCtx.fillText("z/Depth Moves", (canvas.width / 8), (canvas.height / 3)+((2*canvas.height)/9));
          }

          oldPositionHandNine = [
              recognizerResult.landmarks[0][9].x, 
              recognizerResult.landmarks[0][9].y,
              recognizerResult.landmarks[0][9].z
            ];

          if(recognizerResult.gestures[1] !== undefined){
          secondCategoryName = recognizerResult.gestures[1][0].categoryName;
          secondCategoryScore = parseFloat(recognizerResult.gestures[1][0].score * 100).toFixed(2);
          secondHandedness = recognizerResult.handednesses[1][0].displayName;
          secondIndexFingerCoor = recognizerResult.landmarks[1][8].x;
          secondIndexFingerCoorWorld = recognizerResult.landmarks[1][8].x;
          }
        }
        else{
          firstCategoryName ="None";
          firstCategoryScore = 0;
          firstHandedness = "No Hand";
          firstIndexFingerCoor = 0;
          firstIndexFingerCoorWorld = 0;

          secondCategoryName ="None";
          secondCategoryScore = 0;
          secondHandedness = "No Hand";
          secondIndexFingerCoor = 0;
          secondIndexFingerCoorWorld = 0;
        }
        
        canvasCtx.fillText(firstCategoryName, canvas.width / 4, canvas.height / 8);
        canvasCtx.fillText(firstCategoryScore, canvas.width / 2, canvas.height / 8);
        canvasCtx.fillText(firstHandedness, (canvas.width / 4)*3, canvas.height / 8);

        // testing 2nd canvas
        canvasResCtx.fillText(firstCategoryName, canvas.width / 4, canvas.height / 8);
        canvasResCtx.fillText(firstCategoryScore, canvas.width / 2, canvas.height / 8);
        canvasResCtx.fillText(firstHandedness, (canvas.width / 4)*3, canvas.height / 8);
        
        // testing target gesture to current gesture

        console.log("ExpTarget" + targetGesture);

        canvasResCtx.fillText("Target:"+ targetGesture, canvas.width / 4, 4*canvas.height / 8);
        
        if(firstCategoryName === "None"){
          
          canvasResCtx.fillText(firstCategoryName, canvas.width / 4, 6*canvas.height / 8);
          setIsCorrect("None");
          setCurrentGesture(firstCategoryName);
        
        } else if(firstCategoryName === targetGesture){
          
          canvasResCtx.fillText("Correct!"+firstCategoryName, canvas.width / 4, 6*canvas.height / 8);
          setIsCorrect("Correct!");
          setCurrentGesture(firstCategoryName);
        
        }else{
          
          canvasResCtx.fillText("Try Again!"+firstCategoryName, canvas.width / 4, 6*canvas.height / 8);
          setIsCorrect("Incorrect! Try Again");
          setCurrentGesture(firstCategoryName);
        
        }

        canvasCtx.fillText(firstIndexFingerCoor, (canvas.width / 4), (canvas.height / 8)*5.5);
        canvasCtx.fillText(firstIndexFingerCoorWorld, (canvas.width / 4)*3, (canvas.height / 8)*5.5);

        canvasCtx.fillText(secondCategoryName, canvas.width / 4, (canvas.height / 8)+(canvas.height/8));
        canvasCtx.fillText(secondCategoryScore, canvas.width / 2, (canvas.height / 8)+(canvas.height/8));
        canvasCtx.fillText(secondHandedness, (canvas.width / 4)*3, (canvas.height / 8)+(canvas.height/8));

        canvasCtx.fillText(secondIndexFingerCoor, (canvas.width / 4), ((canvas.height / 8)*5.5)+(canvas.height/8));
        canvasCtx.fillText(secondIndexFingerCoorWorld, (canvas.width / 4)*3, ((canvas.height / 8)*5.5)+(canvas.height/8));
      });
    };

    const detectHands = () => {
      console.log("in detectHands");
      if(videoRef.current && videoRef.current.readyState >= 2){
        const detections = handLandmarker.detectForVideo(videoRef.current, performance.now());
        setHandPresence(detections.handednesses.length > 0);
        
        const gestureRecognizerResult = gestureRecognizer.recognizeForVideo(videoRef.current, performance.now());

        //if detections.landmarks is array of landmarks object
        if(detections.landmarks){
          drawLandmarks(detections.landmarks, gestureRecognizerResult);
        }
      }

      setGoalUpdater(targetGesture);
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
  /*
  //webcam
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
  // output canvas
  <div className="border p-4 rounded-2xl shadow-md bg-gray-50">
          <p className="font-semibold mb-2">Hand Detection</p>
          <canvas ref={canvasRef} className="output_canvas" width="480" height="480"></canvas>
        </div>
  
  */
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
          <h1> Hand Presence: {handPresence? "Yes" : "No"}</h1>
          <h1> Target: {goalUpdater} | Current: {currentGesture}</h1>
          <h1> {isCorrect} </h1>
          <h1>{MyButtonList(categoryNames)}</h1>
          <div style={{ position: "relative"}}>
            <video ref={videoRef} autoPlay playsInline></video>
            <canvas ref={canvasRef} style={{
              //backgroundColor: "black",
              width:"640px",
              height: "480px"
            }}>
            </canvas>
            <canvas ref={resultRef} style={{
              //backgroundColor: "black",
              width:"640px",
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
