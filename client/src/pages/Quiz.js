// Page for gesture recognition, requires a web camera input to funtion
// Requires internet connection for imports

// IMPORTS

// React & mediapipe imports

import React, { useRef, useEffect, useState } from "react";
import {
  HandLandmarker,
  GestureRecognizer, 
  FilesetResolver
} from "@mediapipe/tasks-vision";

// buttons and style import

import MyButtonList from "../components/QuizButtonList";
import ModelButtonList from "../components/QuizModelButtonList";
import "./style/Page.css";

// tasks-vision models

import AFmodel from "./taskModels/AF.task";
import GLmodel from "./taskModels/GL.task";
import MSmodel from "./taskModels/MS.task";
import TZmodel from "./taskModels/TZ.task";
import NumModel from "./taskModels/0-10.task";
import hand_landmarker_task from "./taskModels/hand_landmarker.task";


// TEST BUILD BROWSER CONFIG

/*For test builds in firefox/mozilla:

In "about:config" page, set to "true":
  
  media.devices.insecure.enabled
  media.getusermedia.insecure.enabled
*/


// EXPORTS for button functions

export let targetGesture = ""; 
export function setTargetGesture(goal){
  targetGesture = goal;
};


export let modelIndex = null;
export function setModelIndex(index){
  modelIndex = index;
}; 

// MODEL ARRAY

let handModels = [AFmodel, GLmodel, MSmodel, TZmodel, NumModel];

// MAIN Quiz FUNCTION

function Quiz() {
  
  // REFERENCES for video and canvas

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const resultRef = useRef(null);

  // USESTATE variable for hand, gesture, target, and string information

  const [handPresence, setHandPresence] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [currentGesture, setCurrentGesture] = useState(null);
  const [goalUpdater, setGoalUpdater] = useState(null); 
  const [currentString, setCurrentString] = useState(null);

  /* ARRAYS & STRING
  modelList sets index for handModels
  Names arrays are for labels
  tempString is for setting the currentString */

  let modelList = [0, 1, 2, 3, 4];
  let modelNames = ["A-F", "G-L", "M-S", "T-Z", "0-10"];
  let targetNames = ["Random", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
                    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  let numNames = ["0","1","2","3","4","5","6","7","8","9","10"];
  let tempString = "String: ";
  


  // USEEFFECT function

  useEffect(() => {
    
    // array for storing gesturerecognize variables for each model
    let recognizerList = [null,null,null,null,null];
    
    // variables for drawing hand landmark
    
    let handLandmarker;
    let animationFrameId;

    // variables for identifying gesture data for 1st hand

    let firstCategoryName;
    let firstCategoryScore;
    let firstHandedness;
    let firstIndexFingerCoor;
    let firstIndexFingerCoorWorld;

    // TEST variables for 2nd hand data and overall movement

    let secondCategoryName;
    let secondCategoryScore;
    let secondHandedness;
    let secondIndexFingerCoor;
    let secondIndexFingerCoorWorld;

    let oldPositionHandNine = [0,0,0];



    /* function to intialize hand detection
      also runs:
        initializeGestureRecognizer
        detectHands
    */

    const initializeHandDetection = async () => {
      //console.log("in initHandDetect");

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
        console.error("error initializing hand detection: ", error);
      }
    }; // initializeHandDetection end



    /* function to intialize gesture recognizer
      creates one gestureRecognizer per model
    */

    const initializeGestureRecognizer = async () => {
      //console.log("in initGestRecog");
      
      try{

        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );

        for(let i = 0; i < recognizerList.length; i++){
          recognizerList[i] = await GestureRecognizer.createFromOptions(
              vision, {
                baseOptions: { 
                modelAssetPath: handModels[i]},
                numHands: 2,
                runningMode: "video"
              }
            );
        }

      } catch (error) {
        console.error("error initializing gestureRecognizer: ",error);
      }
    }; // initializeGestureRecognizer end



    /* function to draw hand landmarks
      responsible for canvas output and variable change of useState variable
    */

    const drawLandmarks = (landmarksArray, recognizerResult, connections) => {
      //console.log("in drawLandmarks");

      // 1st(main) canvas variables and clear past landmarks

      const canvas = canvasRef.current;
      const canvasCtx = canvas.getContext('2d');
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
      canvasCtx.fillStyle = 'white';

      // 2nd(test) canvas variable and clear past landmarks

      const canvasRes = resultRef.current;
      const canvasResCtx = canvasRes.getContext('2d');
      canvasResCtx.clearRect(0, 0, canvasRes.width, canvasRes.height);
      canvasResCtx.fillStyle = 'white';


      // drawing handlandmark for detected hand and updating hand & gesture output

      landmarksArray.forEach(landmarks => {
        landmarks.forEach(landmark => {
          const x = landmark.x * canvas.width;
          const y = landmark.y * canvas.height;

          canvasCtx.beginPath();
          canvasCtx.arc(x, y, 5, 0, 2*Math.PI);
          canvasCtx.fill();
        });



        // canvas style

        canvasCtx.font = '10px Arial';
        canvasCtx.fillStyle = 'white';
        canvasCtx.textAlign = 'center';

        canvasResCtx.font = '10px Arial';
        canvasResCtx.fillStyle = 'white';
        canvasResCtx.textAlign = 'center';


        // if no results/initial recognizer, ensure shown variables not null

        if(recognizerResult == null){
          firstCategoryName ="None";
          firstCategoryScore = 0;
          firstHandedness = "No";
          firstIndexFingerCoor = 0;
          firstIndexFingerCoorWorld = 0;

          secondCategoryName ="None";
          secondCategoryScore = 0;
          secondHandedness = "No";
          secondIndexFingerCoor = 0;
          secondIndexFingerCoorWorld = 0;
        }
        
        // if there is a result from recognizer, save possible output

        if(recognizerResult.gestures[0] !== undefined){

          firstCategoryName = recognizerResult.gestures[0][0].categoryName;
          firstCategoryScore = parseFloat(recognizerResult.gestures[0][0].score * 100).toFixed(2);
          firstHandedness = recognizerResult.handednesses[0][0].displayName;
          firstIndexFingerCoor = recognizerResult.landmarks[0][8].x;
          firstIndexFingerCoorWorld = recognizerResult.landmarks[0][8].x;

          // Movement checker in test canvas

          if(Math.abs(oldPositionHandNine[0] - recognizerResult.landmarks[0][9].x) > 0.03){
            canvasResCtx.fillText("x/Horizontal Moves", (canvas.width / 8), canvas.height / 3);
          }
          if(Math.abs(oldPositionHandNine[1] - recognizerResult.landmarks[0][9].y) > 0.03){
            canvasResCtx.fillText("y/Vertical Moves", (canvas.width / 8), (canvas.height / 3)+(canvas.height/9));
          }
          if(Math.abs(oldPositionHandNine[2] - recognizerResult.landmarks[0][9].z) > 0.03){
            canvasResCtx.fillText("z/Depth Moves", (canvas.width / 8), (canvas.height / 3)+((2*canvas.height)/9));
          }

          oldPositionHandNine = [
            recognizerResult.landmarks[0][9].x, 
            recognizerResult.landmarks[0][9].y,
            recognizerResult.landmarks[0][9].z
            ];
          
          // saving output for 2nd hand

          if(recognizerResult.gestures[1] !== undefined){
            secondCategoryName = recognizerResult.gestures[1][0].categoryName;
            secondCategoryScore = parseFloat(recognizerResult.gestures[1][0].score * 100).toFixed(2);
            secondHandedness = recognizerResult.handednesses[1][0].displayName;
            secondIndexFingerCoor = recognizerResult.landmarks[1][8].x;
            secondIndexFingerCoorWorld = recognizerResult.landmarks[1][8].x;
          }
        }
        else{

          // results for no recognizer

          firstCategoryName ="None";
          firstCategoryScore = 0;
          firstHandedness = "No";
          firstIndexFingerCoor = 0;
          firstIndexFingerCoorWorld = 0;

          secondCategoryName ="None";
          secondCategoryScore = 0;
          secondHandedness = "No";
          secondIndexFingerCoor = 0;
          secondIndexFingerCoorWorld = 0;
        }
        

        // 1st Hand output in main canvas

        canvasCtx.fillText(firstCategoryName, canvas.width / 4, canvas.height / 8);
        canvasCtx.fillText("Confidence: " + firstCategoryScore, canvas.width / 2, canvas.height / 8);
        canvasCtx.fillText(firstHandedness + " Hand", (canvas.width / 4)*3, canvas.height / 8);

        // 1st Hand output in test canvas

        canvasResCtx.fillText(firstCategoryName, canvas.width / 4, canvas.height / 8);
        canvasResCtx.fillText(firstCategoryScore, canvas.width / 2, canvas.height / 8);
        canvasResCtx.fillText(firstHandedness, (canvas.width / 4)*3, canvas.height / 8);
        

        //console.log("ExpTarget" + targetGesture);

        // target gesture system output in test canvas

        canvasResCtx.fillText("Target:"+ targetGesture, canvas.width / 4, 4*canvas.height / 8);

        // target and useState variables update & output in test canvas

        if(firstCategoryName === "None"){
          
          canvasResCtx.fillText(firstCategoryName, canvas.width / 4, 6*canvas.height / 8);
          
          setIsCorrect("");
          setCurrentGesture(firstCategoryName);
          setCurrentString(tempString);
        
        } else if(firstCategoryName === targetGesture){

          canvasResCtx.fillText("Correct!" + firstCategoryName, canvas.width / 4, 6*canvas.height / 8);
          
          tempString = tempString + firstCategoryName;
          setCurrentString(tempString);
          setIsCorrect("Correct!");
          setCurrentGesture(firstCategoryName);
          setTargetGesture("Choose!");

        }else{
          
          canvasResCtx.fillText("Try Again!" + firstCategoryName, canvas.width / 4, 6*canvas.height / 8);
          
          setIsCorrect("Incorrect! Try Again");
          setCurrentGesture(firstCategoryName);
          setCurrentString(tempString);

        }

        // index finger coordinate and 2nd Hand test statements

        /*
        canvasCtx.fillText(firstIndexFingerCoor, (canvas.width / 4), (canvas.height / 8)*5.5);
        canvasCtx.fillText(firstIndexFingerCoorWorld, (canvas.width / 4)*3, (canvas.height / 8)*5.5);

        canvasResCtx.fillText(secondCategoryName, canvas.width / 4, (canvas.height / 8)+(canvas.height/8));
        canvasResCtx.fillText(secondCategoryScore, canvas.width / 2, (canvas.height / 8)+(canvas.height/8));
        canvasResCtx.fillText(secondHandedness, (canvas.width / 4)*3, (canvas.height / 8)+(canvas.height/8));

        canvasResCtx.fillText(secondIndexFingerCoor, (canvas.width / 4), ((canvas.height / 8)*5.5)+(canvas.height/8));
        canvasResCtx.fillText(secondIndexFingerCoorWorld, (canvas.width / 4)*3, ((canvas.height / 8)*5.5)+(canvas.height/8));
        */

      }); // landmarksArray.forEach end

    }; // drawLandmarks end



    /* function to detectHands
      responsible for detecting hand landmarks and connections
      uses the gestureRecognizer to create a recognizerResult for hand recognition 
    */

    const detectHands = () => {
      //console.log("in detectHands");
      
      if(videoRef.current && videoRef.current.readyState >= 2){
        
        // hand detection results in detections & check Hand Presence

        const detections = handLandmarker.detectForVideo(videoRef.current, performance.now());
        setHandPresence(detections.handednesses.length > 0);
        
        //console.log("in quizModelInd" + modelIndex);

        /* depending on the state of the modelIndes(# or null)
          creates the corresponding gestureRecognizer results
          and draws the hand landmarks
        */

        if(modelIndex != null){

          let gestureRecognizerResult = recognizerList[modelIndex].recognizeForVideo(videoRef.current, performance.now());
          
          if(detections.landmarks){
            drawLandmarks(detections.landmarks, gestureRecognizerResult, detections.HAND_CONNECTIONS);
          }

        } else {

          setModelIndex(0);
          let gestureRecognizerResult = recognizerList[0].recognizeForVideo(videoRef.current, performance.now());
          
          if(detections.landmarks){
            drawLandmarks(detections.landmarks, gestureRecognizerResult, detections.HAND_CONNECTIONS);
          }
        }

      }// if webcam available end

      // update animation and target gesture

      setGoalUpdater(targetGesture);
      requestAnimationFrame(detectHands);

    }; // detectHands end



    // function to start webcam

    const startWebcam = async () => {
      //console.log("in startWebcam");
      
      try{
        
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        await initializeHandDetection();
        
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }

    }; // startWebcam end

    startWebcam();

    // return function

    return () => {
      //console.log("in javascript 1st return");
      
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

  }, []);

  // html page return

  return (
    <div className="page p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Practice</h1>
      <p className="mb-6">Show off you knowledge!</p>

      <div className="flex flex-col md:flex-row justify-center items-center gap-6">

        {/* Webcam */}
        {/* Output Canvas */}
        {/* Gesture testing */}
        <>
          <p> Hand Presence: {handPresence? "Yes" : "No"} | Lesson: {modelNames[modelIndex]}
            <br /> {currentString} </p>
          
          <h1>Target: {goalUpdater} | Current: {currentGesture} | {isCorrect}</h1>
          <br /> 
          <p>{ModelButtonList(modelList)} 
            <br /> {MyButtonList(targetNames)}
          </p>
          
          <div style={{ position: "relative"}}>
            
            <video ref={videoRef} autoPlay playsInline></video>
            
            <canvas ref={canvasRef} style={{
              backgroundColor: "black",
              width:"640px",
              height: "480px"
            }}>
            </canvas>
            
            <canvas ref={resultRef} style={{
              //backgroundColor: "black",
              display: "none",
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

export default Quiz;
