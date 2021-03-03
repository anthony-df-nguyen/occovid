import React, { useState } from "react";
import { Bar, HorizontalBar, Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  nonstackedMultiBar,
  piedefaults,
  stackedMultiBar,
} from "globalVars/chartJSconfig.js";
import Chartselect from "components/Chartselect";

const ChartNonStacked = (props) => {
  //Set initial state to saved memory
  const [currentType, updateType] = useState(() => {
    if (props.switches.length > 1) {
      if (!localStorage.getItem(props.id)) {
        return "bar";
      } else {
        return localStorage.getItem(props.id);
      }
    } else {
      return props.switches[0];
    }
  });

  let dataObject = {
    labels: props.labels,
    datasets: [
      {
        label: props.label[0],
        data: props.data[0],
        backgroundColor: props.fill,
      },
      {
        label: props.label[1],
        data: props.data[1],
        backgroundColor: props.fill.map((a) => a + "69"),
        borderColor: "#ffffff",
        borderWidth: 0,
      },
    ],
  };

  let onlyOneData = {
    labels: props.labels,
    datasets: [
      {
        label: props.label[0],
        data: props.data[0].map((a, i) => a + props.data[1][i]),
        backgroundColor: props.fill,
      },
    ],
  };

  //Render the Type of Chart Based on Type
  function renderChart(currentType) {
    switch (currentType) {
      case "bar":
        return <Bar data={dataObject} options={stackedMultiBar} />;
        break;
      case "horizontalBar":
        return <HorizontalBar data={dataObject} options={stackedMultiBar} />;
        break;
      case "doughnut":
        return <Doughnut data={onlyOneData} options={piedefaults} />;
        break;
      default:
        return <Bar data={dataObject} options={stackedMultiBar} />;
        break;
    }
  }
  return (
    <div className="chartContainer" id={props.id}>
      <div className="chartTitle">{props.title}</div>
      <Chartselect type={props.switches} passdown={updateType} id={props.id} />
      {renderChart(currentType)}
      {props.children}
    </div>
  );
};

export default ChartNonStacked;
