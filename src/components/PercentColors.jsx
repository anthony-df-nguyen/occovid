import React from "react";

function PercentColors(value, context) {
  //console.log(`Max value is ${max} and min value is ${min}`)
  //console.log(`The value passed over is ${value}`)

//   console.log(`
//     Min is: ${min}
//     Band 1 is: ${band1}
//     Band 2 is: ${band2}
//     Band 3 is:  ${band3}
//     Band 4 is: ${band4}
//     Band 5 is:  ${band5}
//      Max is: ${max}
//   `)

  if (context === "highisbad") {
    if (value < 20) {
      return "#009ddb";
    } else if (value > 20 && value <= 40) {
      return "#66c266";
    } else if (value > 40 && value <= 60) {
      return "#ffcc00";
    } else if (value > 60 && value <= 80) {
      return "#ff7c43";
    } else if (value > 80) {
      return "#f95d6a";
    } 
  } else if (context === "highisgood") {
    if (value < 20) {
      return "#f95d6a";
    } else if (value >= 20 && value <= 40) {
      return "#ff7c43";
    } else if (value > 40 && value <= 60) {
      return "#ffcc00";
    } else if (value > 60 && value <= 80) {
      return "#66c266";
    } else if (value > 80) {
      return "#009ddb";
    } 
  } else {
    return "#009ddb";
  }
}

export default PercentColors;
