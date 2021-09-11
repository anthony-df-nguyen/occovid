/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import { TimeContext } from "components/context/TimeContext";
import color from "globalVars/Colors";
import Timeselect from "components/Timeselect";
import { Line } from "react-chartjs-2";
import CityCompareChart from "components/CityCompare/CityCompareChart.jsx";

import { FetchVariantWeekly } from "Datafetch/FetchVariantWeekly";
import { FetchVariantAges } from "Datafetch/FetchVariantAges";
import Chart from "components/Chart";
import Widget from "components/Widget";
import Page from "components/Page";

const Variant = (props) => {
  const [time, setTime] = useContext(TimeContext);
  const [array, updateArray] = useState([]);

  //Weekly Variant Breakdown
  let alpha = array.map((row) => row.alpha);
  let beta = array.map((row) => row.beta);
  let delta = array.map((row) => row.delta);
  let deltaAY = array.map((row) => row.deltaay);
  let epsilon = array.map((row) => row.epsilon);
  let gamma = array.map((row) => row.gamma);
  let iota = array.map((row) => row.iota);
  let theta = array.map((row) => row.theta);
  let lambda = array.map((row) => row.lambda);
  let mu = array.map((row) => row.mu);
  let labels = [
    "Alpha",
    "Beta",
    "Delta",
    "DeltaAY",
    "Epsilon",
    "Gamma",
    "Iota",
    "Theta",
    "Lambda",
    "Mu",
    "Other",
  ];

  //Variant by Ages
  const [ageArray, updateAgeArray] = useState([]);
     console.log(ageArray);


  const variantColors = [
    color.blue,
    color.green,
    color.red,
    color.orange,
    color.yellow,
    color.pink,
    color.grayblue,
    color.lightpurple,
    color.gray,
    color.grayblue,
    "#666",
  ];

  return (
    <div>
      {<FetchVariantWeekly function={updateArray} time={time} />}
      {<FetchVariantAges function={updateAgeArray} time={time} />}
      <Page title="Variant Detail">
        <Timeselect />
        <div id="fullPageChart">
          <CityCompareChart
            key="1"
            id="comparecities"
            date={array.map((row) => row.date)}
            data={[
              alpha,
              beta,
              delta,
              deltaAY,
              epsilon,
              gamma,
              iota,
              theta,
              lambda,
              mu,
            ]}
            fill={variantColors}
            title={"Variant Results by Disease Weak"}
            label={labels}
            switches={["line"]}
          />
        </div>
        <br></br>
        <div className="pageTitle">Cumulative Variant Results by Age Group</div>
        <div id="chartGrid">
          <Chart
            key="2"
            id="age011"
            date={labels}
            data={[ageArray[0]]}
            fill={[variantColors]}
            title={"Age 0 - 11"}
            label={["Cases"]}
            switches={["horizontalBar", "bar", "doughnut"]}></Chart>
          <Chart
            key="3"
            id="age1217"
            date={labels}
            data={[ageArray[1]]}
            fill={[variantColors]}
            title={"Age  12 - 17"}
            label={["Cases"]}
            switches={["horizontalBar", "bar", "doughnut"]}></Chart>
          <Chart
            key="4"
            id="age1834"
            date={labels}
            data={[ageArray[2]]}
            fill={[variantColors]}
            title={"Age 18 - 34"}
            label={["Cases"]}
            switches={["horizontalBar", "bar", "doughnut"]}></Chart>
          <Chart
            key="5"
            id="age3554"
            date={labels}
            data={[ageArray[3]]}
            fill={[variantColors]}
            title={"Age 35 - 54"}
            label={["Cases"]}
            switches={["horizontalBar", "bar", "doughnut"]}></Chart>
          <Chart
            key="6"
            id="age5564"
            date={labels}
            data={[ageArray[4]]}
            fill={[variantColors]}
            title={"Age 55 - 64"}
            label={["Cases"]}
            switches={["horizontalBar", "bar", "doughnut"]}></Chart>
          <Chart
            key="7"
            id="age6574"
            date={labels}
            data={[ageArray[5]]}
            fill={[variantColors]}
            title={"Age 65 - 74"}
            label={["Cases"]}
            switches={["horizontalBar", "bar", "doughnut"]}></Chart>
          <Chart
            key="8"
            id="age7584"
            date={labels}
            data={[ageArray[6]]}
            fill={[variantColors]}
            title={"Age 75 - 84"}
            label={["Cases"]}
            switches={["horizontalBar", "bar", "doughnut"]}></Chart>
          <Chart
            key="9"
            id="age85"
            date={labels}
            data={[ageArray[7]]}
            fill={[variantColors]}
            title={"Age 85+"}
            label={["Cases"]}
            switches={["horizontalBar", "bar", "doughnut"]}></Chart>
        </div>
        <br></br>
        <div className="primaryText">
          <p>
            Multiple variants of the virus that causes COVID-19 have been
            identified globally during the COVID-19 pandemic. Variants are
            determined by their genetic sequences. It's important to understand
            that genetic mutations of the virus that causes COVID-19,
            SARS-CoV-2, are expected, and that there are many strains of the
            virus. Community clinical laboratories and HCA’s Public Health
            Laboratory are sequencing a sample of cases to better track and
            respond to the pandemic. These cases do not represent the total
            number of infections due to the strains that may be circulating
            around Orange County. As of September 1st, 135,885 samples have been
            sequenced in California. In August 2021, 5% of cases in California
            were sequenced, and this percent is expected to increase in coming
            weeks as more data becomes available. In July 2021, 13% of cases in
            California were sequenced. This is the number of sequences submitted
            to the data repository GISAID and is not a complete list of
            sequences completed to date. Figures shown in this tab will be
            updated on Thursdays.
          </p>
          <br></br>
          <p>
            *"Delta" variant = B.1.617.2.
          </p>
        </div>
      </Page>
    </div>
  );
};

export default Variant;
