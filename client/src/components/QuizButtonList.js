import React from 'react';
import {targetGesture, setTargetGesture} from "../pages/Quiz";

//https://www.w3schools.com/css/css3_buttons.asp

function MyButtonList(labels) {

    
    // if labels[0] is none
    labels[0] = "Random";
    const buttonLabels = labels;

    const handleButtonClick = (label) => {

        if(label === "Random"){
            
            // get random number for random gesture
            const randomInt = Math.floor(Math.random() * (labels.length - 1) + 1);
            //console.log("randomInt:"+randomInt);
            setTargetGesture(buttonLabels[randomInt]);
        } else {
            setTargetGesture(label);
        }
        
    };

    return (
        <div>
            {buttonLabels.map((label, index) => (
            <button key={index} onClick={() => handleButtonClick(label)}>
            {label}
            </button>
        ))}
    </div>
  );
}

export default MyButtonList;