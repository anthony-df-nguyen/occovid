import React from "react";

function PercentColors(value, context,band1,band2,band3,band4,band5) {
  //console.log(`Max value is ${max} and min value is ${min}`)
  //console.log(`The value passed over is ${value}`)

  // console.log(`
  //   Band 1 is: ${band1}
  //   Band 2 is: ${band2}
  //   Band 3 is: ${band3}
  //   Band 4 is: ${band4}
  // `)

  if (context === "highisbad") {
    if (value < band1) {
      return "#009ddb";
    } else if (value > band1 && value <= band2) {
      return "#66c266";
    } else if (value > band2 && value <= band3) {
      return "#665191";
    } else if (value > band3 && value <= band4) {
      return "#ffcc00";
    }else if (value > band4 && value <= band5) {
      return "#ff7c43";
    } else if (value > band5) {
      return "#f95d6a";
    } 
  } else if (context === "highisgood") {
    if (value < band1) {
      return "#f95d6a";
    } else if (value >= band1 && value <= band2) {
      return "#ff7c43";
    } else if (value > band2 && value <= band3) {
      return "#ffcc00";
    } else if (value > band3 && value <= band4) {
      return "#665191";
    } else if (value > band4 && value <= band5) {
      return "#66c266";
    } else if (value > band5) {
      return "#009ddb";
    } 
  } else {
    return "#009ddb";
  }
}

export default PercentColors;
