import React, { useState, useEffect } from "react";
import { CasesURL } from "Sources";
import { Bar } from "react-chartjs-2";

const Cases = () => {
  let tempArray = [];
  let casesArray = [];

  let [array, setState] = useState([]);
  useEffect(() => {
    fetch(CasesURL)
      .then((res) => res.json())
      .then((final) => (tempArray = [...final.features]))
      .then(() => {
        tempArray.forEach((a) => {
          casesArray.push({
            date: new Date(a.attributes.Date).toLocaleDateString(),
            reported: a.attributes.total_cases_repo,
            byspecimendate: a.attributes.total_cases_spec,
          });
        });
      })
      .then((b) => {
        setState(casesArray);
      });
  }, []);
  let myData = {
    labels: array.map((a) => a.date),
    datasets: [
      {
        label: "Cases",
        data: array.map((a) => a.reported),
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <Bar data={myData} />
    </div>
  );
};

export default Cases;
