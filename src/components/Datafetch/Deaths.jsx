import React, { useState, useEffect } from "react";
import { DeathsURL } from "Sources";
import { barDefaults, lineDefaults } from "chartJSconfig.js";
import { Bar, Line, datasetKeyProvider } from "react-chartjs-2";
const Deaths = (props) => {
  let tempArray = [];
  let finalArray = [];
  let [array, setState] = useState([]);
  useEffect(() => {
    fetch(DeathsURL)
      .then((res) => res.json())
      .then((final) => (tempArray = [...final.features]))
      .then(() => {
        //console.log(tempArray);
        tempArray.forEach((a) => {
          finalArray.push({
            date: new Date(a.attributes.date).toLocaleDateString(),
            dailyReportedDeath: a.attributes.daily_dth,
            deathDate: a.attributes.dth_date,
            homelessDeath: a.attributes.homeless_dth,
            jailDeath: a.attributes.jail_dth,
            snfDeath: a.attributes.snf_dth,
            totalDeath: a.attributes.total_dth,
            totalDeathDate: a.attributes.total_dth_date,
          });
        });
      })
      .then((b) => {
        setState(finalArray);
      });
  }, []);

  let myData = {
    labels: array.map((a) => a.date),
    datasets: [
      {
        label: props.label[0],
        key: 0,
        data: array.map((a) => a[props.data[0]]),
        borderWidth: 1,
        backgroundColor: props.fill[0],
      },
      {
        label: props.label[1],
        props: 1,
        data: array.map((a) => a[props.data[1]]),
        borderWidth: 1,
        backgroundColor: props.fill[1] + "22",
      },
    ],
  };

  switch (props.type) {
    case "bar":
      return <Bar data={myData} options={barDefaults} />;
      break;
    case "line":
      return <Line data={myData} options={lineDefaults} />;
      break;
    default:
      return <Bar data={myData} options={barDefaults} />;
      break;
  }
};

export default Deaths;
