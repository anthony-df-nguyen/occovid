import React, { useState, useEffect } from "react";
import { Bar, HorizontalBar, Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { chartpadding, stackedpiedefaults } from "globalVars/chartJSconfig.js";
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

  const [customLegendDisplay, updateCustomLegend] = useState(() => {
    if (currentType == "doughnut") {
      return "block";
    } else {
      return "none";
    }
  });

    useEffect(() => {
        let mounted = true;
          if (currentType == 'doughnut' && mounted) {
                updateCustomLegend('block')
          } else if (mounted) {
              updateCustomLegend('none')
          }
        return (() => {
            mounted = false;
        })
  }, [currentType]);

  let dataObject = {
    labels: props.labels,
    datasets: [
      {
        label: props.label[0],
        data: props.data[0],
        backgroundColor: props.fill,
        borderColor: "transparent",
      },
      {
        label: props.label[1],
        data: props.data[1],
        backgroundColor: props.fill.map((a) => a + "69"),
        borderColor: "transparent",
        borderWidth: 0,
      },
    ],
  };

  const dataLabels = {
    anchor: "end",
    align: "end",
    offset: 0,
    color: "#999999",
    display: function display(context) {
      if (context.chart.width > 600) {
        return "auto";
      } else {
        return false;
      }
    },
  };
  const stackedMultiBar = {
    legend: {
      display: true,
      position: "bottom",
      align: "center",
      labels: { boxWidth: 20, fontColor: "#999" },
    },
    plugins: {
      datalabels: dataLabels,
    },
    layout: {
      padding: chartpadding,
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          stacked: true,
          ticks: {
            fontColor: "#999999",
            min: 0,
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          stacked: true,
          ticks: {
            fontColor: "#999999",
          },
        },
      ],
    },
    tooltips: {
      mode: "index",
      axis: "y",
    },
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
        return <Doughnut data={dataObject} options={stackedpiedefaults} />;
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
      <div id="customRaceAgeLegend" style={{ display: customLegendDisplay }}>
        <div
          style={{ display: "inline", backgroundColor: "#009ddb" }}
          className="customLegend">
          
              </div>
              <p>Over 65</p>
        <div
          style={{
            display: "inline",
            backgroundColor: "#009ddb69",
            marginLeft: "10px",
          }}
          className="customLegend">
         
              </div>
               <p>Under 65</p>
      </div>
      {props.children}
    </div>
  );
};

export default ChartNonStacked;
