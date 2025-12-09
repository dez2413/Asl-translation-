// Given a list:
// Creates and styles the buttons that change the gesture target
// Remember to import functions that will activate on click

import React from 'react';
import {targetGesture, setTargetGesture} from "../pages/Quiz";

function MyButtonList(labels) {

    const buttonLabels = labels;

    // button style

    const buttonStyle = {
        color: "#7a30c4ff",
        border: "2px solid #d6ced8ff",
        borderRadius: "6px"
    };

    // button click

    const handleButtonClick = (label) => {

        // If random set random target gesture from list
        // else set target gesture normally

        if(label === "Random"){
            const randomInt = Math.floor(Math.random() * (labels.length - 1) + 1);
            setTargetGesture(buttonLabels[randomInt]);
        } else {
            setTargetGesture(label);
        }
        
    };

    return (
        <div>
            {buttonLabels.map((label, index) => (
            <button 
            style={buttonStyle} 
            key={index} onClick={() => handleButtonClick(label)}>
            {label}
            </button>
        ))}
    </div>
  );
}

export default MyButtonList;