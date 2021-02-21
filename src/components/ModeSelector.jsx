import React, { useState, useContext } from "react";

//Required Props
// props.current = The current value that is being passed by the parent. Helps to set first active class
// prop.storageKey = array of 2 localStorage keys to save settings on clicks. The first item is the metric value, the 2nd is the displayed metric name in normal format
// props.function = array of 2 stateUpdate functions from the parent. First function updates metric value, 2nd updates metric value name for the parent state
// props.options = array of objects, each paired by display name and value


const ModeSelector = (props) => {
  const [selectedMetric, updateMetric] = useState(props.current);

  function updateMode(metricvalue, nameofmetric) {
    //Update the menu's state to set the active style
    updateMetric(metricvalue);

    //Save the mode and the displayed mode name into localstorage using specified keys
    localStorage.setItem(props.storageKey[0], metricvalue);
    if (props.storageKey[1]) {
        localStorage.setItem(props.storageKey[1], nameofmetric);
    }


    //When a button is clicked, update the parent state metric and displayname
    props.function[0](metricvalue);
    if (props.function[1]) {
         props.function[1](nameofmetric);
    }
 
  }
  return (
    <div className="modeSelector">
      <div className="uiButtonInstruction">{props.text}</div>
      <div className="uiParent">
        <div className="uiButtonContainer">
          {
            //Generate X buttons based on what's passed in
            props.options.map((row, i) => {
                  return (
                    <a
                      key={i}
                      className={selectedMetric == row.value ? "active" : null}
                      onClick={() => updateMode(row.value, row.display)}
                    >
                      {row.display}
                    </a>
                  )
                })
              }
        </div>
      </div>
    </div>
  );
};

export default ModeSelector;
 