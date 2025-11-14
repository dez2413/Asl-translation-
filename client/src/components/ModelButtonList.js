import React from 'react';
import {targetModel, setTargetModel} from "../pages/Quiz";

//https://www.w3schools.com/css/css3_buttons.asp

function ModelButtonList(labels) {
    
    const buttonLabels = labels;

    const handleButtonClick = (label) => {

        setTargetModel(label);
        
    };

    return (
        <div>
            {buttonLabels.map((label, index) => (
            <button key={index} onClick={() => handleButtonClick(label)}> 
            Lessons {index +1}
            </button>
        ))}
    </div>
  );
}

export default ModelButtonList;