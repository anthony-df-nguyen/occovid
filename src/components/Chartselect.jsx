import React from "react";

const Chartselect = (props) => {
  
  return (
    <div className="chartButtonContainer">
      {props.type.map((type, i) => {
        return (
          <div
            key={i} className="chartTypeButton" onClick={() => {
              localStorage.setItem(props.id,type)
              props.passdown(type);
            }}>
            {type}
          </div>
        );
      })}
    </div>
  );
};

export default Chartselect;