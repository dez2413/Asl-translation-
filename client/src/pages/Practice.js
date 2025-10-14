import React from "react";
import "./style/Page.css";

const video1 = document.getElementsByClassName('input_video1')[0];
const out1 = document.getElementsByClassName('output1')[0];
const controlsElement1 = document.getElementsByClassName('control1')[0];
const canvasCtx1 = out1.getContext('2d');
const fpsControl = new FPS();

function Practice() {
  return (
    <div className="page">
      <h1>Practice</h1>
      <p>Try ASL gestures using your camera here.</p>
    
        <div class="column">
          <article class="panel is-info">
            <p class="panel-heading">
              Webcam Input
            </p>
            <div class="panel-block">
              <video class="input_video3"></video>
            </div>
          </article>
        </div>

        <div class="column">
          <article class="panel is-info">
            <p class="panel-heading">
              Mediapipe Hands Detection
            </p>
            <div class="panel-block">
              <canvas class="output3" width="480px" height="480px"></canvas>
            </div>
          </article>
        </div>
    
    </div>
  );
}

function onResultsHands(results) {
  document.body.classList.add('loaded');
  fpsControl.tick();

  canvasCtx1.save();
  canvasCtx1.clearRect(0, 0, out1.width, out1.height);
  canvasCtx1.drawImage(
      results.image, 0, 0, out1.width, out1.height);
  if (results.multiHandLandmarks && results.multiHandedness) {
    for (let index = 0; index < results.multiHandLandmarks.length; index++) {
      const classification = results.multiHandedness[index];
      const isRightHand = classification.label === 'Right';
      const landmarks = results.multiHandLandmarks[index];
      drawConnectors(
          canvasCtx1, landmarks, HAND_CONNECTIONS,
          {color: isRightHand ? '#EBD51C' : '#D280FF'}),
      drawLandmarks(canvasCtx1, landmarks, {
        color: isRightHand ? '#EBD51C'  : '#D280FF',
        fillColor: isRightHand ? '#FF0000' : '#00FF00',
        radius: (x) => {
          return lerp(x.from.z, -0.15, .1, 10, 1);
        }
      });
    }
  }
  canvasCtx1.restore();
}

const hands = new Hands({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.1/${file}`;
}});
hands.onResults(onResultsHands);

const camera = new Camera(video1, {
  onFrame: async () => {
    await hands.send({image: video1});
  },
  width: 480,
  height: 480
});
camera.start();

new ControlPanel(controlsElement1, {
      selfieMode: true,
      maxNumHands: 2,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    })
    .add([
      new StaticText({title: 'MediaPipe Hands'}),
      fpsControl,
      new Toggle({title: 'Selfie Mode', field: 'selfieMode'}),
      new Slider(
          {title: 'Max Number of Hands', field: 'maxNumHands', range: [1, 4], step: 1}),
      new Slider({
        title: 'Min Detection Confidence',
        field: 'minDetectionConfidence',
        range: [0, 1],
        step: 0.01
      }),
      new Slider({
        title: 'Min Tracking Confidence',
        field: 'minTrackingConfidence',
        range: [0, 1],
        step: 0.01
      }),
    ])
    .on(options => {
      video1.classList.toggle('selfie', options.selfieMode);
      hands.setOptions(options);
    });

export default Practice;
