/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { TimeContext } from "components/context/TimeContext";
import ModeSelector from "components/ModeSelector";
import { FetchCityData } from "Datafetch/FetchCityData";
import { FetchZipData } from "Datafetch/FetchZipData";
import Chart from "components/Chart";
import BuildTable from "components/BuildTable";
import Page from "components/Page";
import ExpandCollapse from "components/ExpandCollapse";
import { ContextColors } from "components/ContextColors";

const CityZip = (props) => {
  const [time, setTime] = useContext(TimeContext);

  const [cityOrZip, updateCityOrZip] = useState(() => {
    if (!localStorage.getItem("mapCityorZip")) {
      return "city";
    } else {
      return localStorage.getItem("mapCityorZip");
    }
  });

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

  let preSortColorArray = [];
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
        preSortColorArray.push({
          city: Object.values(a)[0],
          value: parseValue(),
          pop: a.population.toLocaleString(),
        });
      }
    });
  });

  //console.log(finalArraytoUse)
  const max = Math.max(...preSortColorArray.map((row) => row.value));
  const min = Math.min(...preSortColorArray.map((row) => row.value));
  let finalArraytoUse = preSortColorArray.map((row) => {
    return {
      ...row,
      color: ContextColors(row.value, "highisbad", max, min),
    };
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

  let chartType;
  let width = window.innerWidth;
  if (width > 1400) {
    chartType = "bar";
  } else {
    chartType = "horizontalBar";
  }

  return (
    <div>
      {cityOrZip === "city" ? (
        <FetchCityData function={updateArray} time={time} />
      ) : (
        <FetchZipData function={updateArray} time={time} />
      )}
      <Page title="City/Zip Detail">
        <ExpandCollapse title="Change View Mode/Options" buttontext="Close">
          <ModeSelector
            text="City or Zip"
            current={cityOrZip}
            function={[updateCityOrZip]}
            storageKey={["mapCityorZip"]}
            options={[
              {
                display: "City",
                value: "city",
              },
              {
                display: "Zip",
                value: "zip",
              },
            ]}
          />
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
            colName={["City/Zip", metricName, "Population"]}
            rows={finalArraytoUse.map((a) => a.city)}
            columns={[
              finalArraytoUse.map((a) => a.value.toLocaleString()),
              finalArraytoUse.map((b) => b.pop),
            ]}
          />
          <Chart
            className="overrideBackground"
            key="1"
            id="city1"
            switches={[chartType]}
            date={finalArraytoUse.map((a) => a.city)}
            data={[finalArraytoUse.map((a) => a.value)]}
            fill={[finalArraytoUse.map((a) => a.color)]}
            title={"Total Cases by Specimen Collection"}
            label={["Cases", "Estimated Recovered"]}
          />
        </div>
      </Page>
    </div>
  );
};

export default CityZip;
