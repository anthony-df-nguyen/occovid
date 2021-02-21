import React, { useState, useContext, useEffect } from "react";
import TimeContext from "components/context/TimeContext";
import color from "globalVars/Colors";
import ModeSelector from "components/ModeSelector";
import { FetchZipData } from "Datafetch/FetchZipData";
import Chart from "components/Chart";
import BuildTable from "components/BuildTable";
import Page from "components/Page";
import ExpandCollapse from "components/ExpandCollapse";

const Zip = (props) => {
  const { time, setTime } = useContext(TimeContext);
  const [array, updateArray] = useState([]);
  const [whichMetric, updateWhichMetric] = useState(() => {
    if (!localStorage.getItem("cityZipLastMode")) {
      return "totalCases";
    } else {
      return localStorage.getItem("cityZipLastMode");
    }
  });
  const [metricName, updateMetricName] = useState(() => {
    if (!localStorage.getItem("cityZipLastModeText")) {
      return "Total Cases";
    } else {
      return localStorage.getItem("cityZipLastModeText");
    }
  });
  const [whichSort, updateWhichSort] = useState("high");

  let finalArraytoUse = [];

  array.forEach((a) => {
    //Figure out which index to get in each

    Object.keys(a).forEach((b, i) => {
      const parseValue = () => {
        if (parseFloat(Object.values(a)[i])) {
          return parseFloat(Object.values(a)[i]);
        } else {
          return 0;
        }
      };
      if (b === whichMetric) {
        finalArraytoUse.push({
          city: Object.values(a)[0],
          value: parseValue(),
          pop: a.population.toLocaleString(),
        });
      }
    });
  });

  //Sort the Array
  switch (whichSort) {
    case "high":
      finalArraytoUse.sort((a, b) => b.value - a.value);
      break;
    case "low":
      finalArraytoUse.sort((a, b) => a.value - b.value);
      break;
    case "name":
      finalArraytoUse.sort((a, b) => {
        return a.city < b.city ? -1 : a.city > b.city ? 1 : 0;
      });
      break;

    default:
      finalArraytoUse.sort((a, b) => b.value - a.value);
      break;
  }

  return (
    <div>
      <FetchZipData function={updateArray} time={time} />
      <Page title="Zip Detail">
        <ExpandCollapse title="Change View Mode/Options" buttontext="Close">
          <ModeSelector
            text="Select a Metric"
            function={[updateWhichMetric, updateMetricName]}
            current={whichMetric}
            storageKey={["cityZipLastMode", "cityZipLastModeText"]}
            options={[
              {
                display: "Case Rate",
                value: "caseRate",
              },
              {
                display: "Death Rate",
                value: "deathRate",
              },
              {
                display: "Cases",
                value: "totalCases",
              },
              {
                display: "Deaths",
                value: "totalDeaths",
              },
              {
                display: "Cases 0-3",
                value: "Cases_0_3",
              },
              {
                display: "Cases 4-9",
                value: "Cases_4_9",
              },
              {
                display: "Cases 10-12",
                value: "Cases_10_12",
              },
              {
                display: "Cases 13-14",
                value: "Cases_13_14",
              },
              {
                display: "Cases 15-18",
                value: "Cases_15_18",
              },
              {
                display: "Cases 0-18",
                value: "Cases_0_18",
              },
            ]}
          />
          <ModeSelector
            text="Sort Data by:"
            function={[updateWhichSort]}
            current={whichSort}
            storageKey={["cityZipLastSort"]}
            options={[
              {
                display: "High to Low",
                value: "high",
              },
              {
                display: "Low to High",
                value: "low",
              },
              {
                display: "Name",
                value: "name",
              },
            ]}
          />
        </ExpandCollapse>

        <div id="cityGrid">
          <BuildTable
            colName={["Zip Code", metricName, "Population"]}
            rows={finalArraytoUse.map((a) => a.city)}
            columns={[
              finalArraytoUse.map((a) => a.value.toLocaleString()),
              finalArraytoUse.map((b) => b.pop),
            ]}
          />
          <Chart
            key="1"
            id="city1"
            switches={["horizontalBar"]}
            date={finalArraytoUse.map((a) => a.city)}
            data={[finalArraytoUse.map((a) => a.value)]}
            fill={[color.red]}
            title={"Total Cases by Specimen Collection"}
            label={["Cases", "Estimated Recovered"]}
          />
        </div>
      </Page>
    </div>
  );
};

export default Zip;
