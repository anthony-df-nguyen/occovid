import React from "react";

const Chartselect = (props) => {
  //console.log(props)
  return (
    <div className="chartButtonContainer">
      {props.type.map((type, i) => {
        return (
          <div
            key={i} className="chartTypeButton" onClick={() => {
              console.log('Should be setting it to', type)
              props.updateState(type);
            }}>
            {type}
          </div>
        );
      })}
    </div>
  );
};

export default Chartselect;
