// Given a list:
// Creates and styles the buttons that change the hand recognition model
// Remember to import functions that will activate on click

import React from 'react';
import {modelIndex, setModelIndex} from '../pages/Quiz';

function ModelButtonList(labels) {
 
    const buttonLabels = labels;
    const modelName = ["A-F", "G-L", "M-S", "T-Z", "PaperScissorsRock"];

    // button style

    const buttonStyle = {
        color: "#7a30c4ff",
        border: "2px solid #ffffffff",
        borderRadius: "10px"
    };

    // button click action

    const handleButtonClick = (label) => {

        setModelIndex(label);
        console.log("modelIndex"+label);
        
    };

    return (
        <div>
        {buttonLabels.map((label, index) => (
            <button 
                style={buttonStyle}
                key={index} onClick={() => handleButtonClick(label)}> 
                {modelName[index]}
            </button>
        ))}
    </div>
  );
}

export default ModelButtonList;