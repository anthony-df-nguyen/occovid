import React from "react";

const MultiWidget = (props) => {
  return (
    <div className="widget">
      <div className="statName">{props.title}</div>
      <div style={{ marginTop: "10px",textAlign:'left'}}>
        {props.stat.map((row, i) => {
          return (
            <div key={i} className="grid2force">
              <p className="statName">{props.subtitle[i]}: &nbsp;</p>
              <div
                className="stat"
                style={{ color: props.color[i], marginTop: "0" }}>
                {row}
              </div>
            </div>
          );
        })}
      </div>
      {/* <div className="stat" style={{ color: props.color }}>
        {props.stat}
      </div> */}
    </div>
  );
};

export default MultiWidget;
