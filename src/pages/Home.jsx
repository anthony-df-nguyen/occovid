import React from "react";
import Page from "components/Page";
import Cases from "components/Datafetch/Cases";
import Deaths from "components/Datafetch/Deaths";
import color from "components/Colors";

const dataDonut = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const Home = (props) => {
  return (
    <div className="page">
      <h1 className="pageTitle">{props.title}</h1>
      <Page />
      <div id="chartgrid">
        <div className="chartContainer">
          <div className="chartTitle">Cases by Specimen Collection Date</div>
          <Cases
            fill={[color.orange, color.blue]}
            type="bar"
            label={["dailyCasesbySpecimen", "7 Day Average"]}
            data={["dailyCasesbySpecimen", "daily7DayAvg"]}
          />
        </div>
        <div className="chartContainer">
          <div className="chartTitle">
            Total Cases by Specimen Collection Date
          </div>
          <Cases
            fill={[color.orange, color.blue]}
            type="bar"
            label={["Total Cases by Specimen Collection Date", "Recovered"]}
            data={["totalCasesbySpecimen", "recovered"]}
          />
        </div>
        <div className="chartContainer">
          <div className="chartTitle">Death by Date of Death</div>
          <Deaths
            fill={[color.red]}
            type="bar"
            label={["Death by Date of Death"]}
            data={["deathDate"]}
          />
        </div>
        <div className="chartContainer">
          <div className="chartTitle">Total Deaths</div>
          <Deaths
            fill={[color.red]}
            type="bar"
            label={["Total Deaths by Date of Death"]}
            data={["totalDeathDate"]}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
