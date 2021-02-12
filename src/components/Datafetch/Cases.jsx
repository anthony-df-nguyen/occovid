import React, { useState, useEffect } from "react";
import { CasesURL } from "Sources";
import { barDefaults, lineDefaults } from "chartJSconfig.js";
import { Bar, Line, datasetKeyProvider } from "react-chartjs-2";

const Cases = (props) => {
  let tempArray = [];
  let finalArray = [];
  let [array, setState] = useState([]);
  useEffect(() => {
    fetch(CasesURL)
      .then((res) => res.json())
      .then((final) => (tempArray = [...final.features]))
      .then(() => {
        console.log(tempArray);
        tempArray.forEach((a) => {
          finalArray.push({
            date: new Date(a.attributes.Date).toLocaleDateString(),
            daily7DayAvg: a.attributes.daily_7day_avg,
            dailyCasesReported: a.attributes.daily_cases_repo,
            dailyCasesbySpecimen: a.attributes.daily_cases_spec,
            homelessCases: a.attributes.homeless_cases,
            jailCases: a.attributes.jail_cases,
            newDailyCasesbySpecimen: a.attributes.new_daily_cases_spec,
            recovered: a.attributes.recovered,
            snfCases: a.attributes.snf_cases,
            totalCasesReported: a.attributes.total_cases_repo,
            totalCasesbySpecimen: a.attributes.total_cases_spec,
            totalDeaths: a.attributes.total_dth,
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
        data: array.map((a) => a[props.data[0]]),
        borderWidth: 1,
        order: 2,
        backgroundColor: props.fill[0],
      },
      {
        label: props.label[1],
        props: 1,
        data: array.map((a) => a[props.data[1]]),
        borderWidth: 1,
        order: 1,
        backgroundColor: props.fill[1],
      },
    ],
  };

  switch (props.type) {
    case "bar":
      return (
        <Bar
          data={myData}
          options={barDefaults}
          datasetKeyProvider={datasetKeyProvider}
        />
      );
      break;
    case "line":
      return (
        <Line
          data={myData}
          options={lineDefaults}
          datasetKeyProvider={datasetKeyProvider}
        />
      );
      break;
    default:
      return (
        <Bar
          data={myData}
          options={barDefaults}
          datasetKeyProvider={datasetKeyProvider}
        />
      );
      break;
  }
};

export default Cases;
