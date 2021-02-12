import React from "react";
import Cases from "components/Datafetch/Cases";
import color from "components/Colors";

const CasesPage = (props) => {
  return (
    <div className="page">
      <h1 className="pageTitle">{props.title}</h1>
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
      </div>
    </div>
  );
};

export default CasesPage;
