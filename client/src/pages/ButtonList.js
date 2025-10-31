import React from 'react';
import setTargetGesture from "./Practice";

function MyButtonList(targetGesture, labels) {
    labels[0] = "Random";
    const buttonLabels = labels;

    const handleButtonClick = (label) => {
        alert(`You clicked: ${label}`);
        //setTargetGesture(label);
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