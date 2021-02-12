import React, { useState } from "react";
import Cases from "components/Datafetch/Cases";
import Deaths from "components/Datafetch/Deaths";
import color from "components/Colors";
import Chartselect from "components/Chartselect";

const Home = (props) => {
  const [dailyType, updateDailyType] = useState("bar");
  const [totalCaseType, updateTotalCaseDailyType] = useState("line");
  return (
    <div className="page">
      <h1 className="pageTitle">{props.title}</h1>
      <div id="chartgrid">
        <div className="chartContainer">
          <div className="chartTitle">Cases by Specimen Collection Date</div>
          <Cases
            fill={[color.orange, color.blue]}
            type={dailyType}
            label={["dailyCasesbySpecimen", "7 Day Average"]}
            data={["dailyCasesbySpecimen", "daily7DayAvg"]}
            id="1"
          />
          <Chartselect type={["bar", "line"]} updateState={updateDailyType} />
        </div>
        <div className="chartContainer">
          <div className="chartTitle">
            Total Cases by Specimen Collection Date
          </div>
          <Cases
            fill={[color.orange, color.blue]}
            type={totalCaseType}
            label={["Total Cases by Specimen Collection Date", "Recovered"]}
            data={["totalCasesbySpecimen", "recovered"]}
            id="2"
          />
          <Chartselect
            type={["bar", "line"]}
            updateState={updateTotalCaseDailyType}
          />
        </div>
        <div className="chartContainer">
          <div className="chartTitle">Death by Date of Death</div>
          <Deaths
            fill={[color.red]}
            type="bar"
            label={["Death by Date of Death"]}
            data={["deathDate"]}
            id="3"
          />
        </div>
        <div className="chartContainer">
          <div className="chartTitle">Total Deaths</div>
          <Deaths
            fill={[color.red]}
            type="bar"
            label={["Total Deaths by Date of Death"]}
            data={["totalDeathDate"]}
            id="4"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
