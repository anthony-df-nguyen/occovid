/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
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
  let epsilon = array.map((row) => row.epsilon);
  let gamma = array.map((row) => row.gamma);
  let iota = array.map((row) => row.iota);
  let theta = array.map((row) => row.theta);
  let lambda = array.map((row) => row.lambda);
  let labels = [
    "Alpha",
    "Beta",
    "Delta",
    "Epsilon",
    "Gamma",
    "Iota",
    "Theta",
    "Lambda","Other"
  ];

  //Variant by Ages
  const [ageArray, updateAgeArray] = useState([]);
  let age011 = [
    ageArray.alpha0_11,
    ageArray.beta0_11,
    ageArray.delta0_11,
    ageArray.epsilon0_11,
    ageArray.gamma0_11,
    ageArray.iota0_11,
    ageArray.theta0_11,
    ageArray.lambda0_11,
    ageArray.other0_11,
  ];
  let age1217 = [
    ageArray.alpha12_17,
    ageArray.beta12_17,
    ageArray.delta12_17,
    ageArray.epsilon12_17,
    ageArray.gamma12_17,
    ageArray.iota12_17,
    ageArray.theta12_17,
    ageArray.lambda12_17,
    ageArray.other12_17,
  ];
  let age1834 = [
    ageArray.alpha18_34,
    ageArray.beta18_34,
    ageArray.delta18_34,
    ageArray.epsilon18_34,
    ageArray.gamma18_34,
    ageArray.iota18_34,
    ageArray.theta18_34,
    ageArray.lambda18_34,
    ageArray.other18_34,
  ];
  let age3554 = [
    ageArray.alpha35_54,
    ageArray.beta35_54,
    ageArray.delta35_54,
    ageArray.epsilon35_54,
    ageArray.gamma35_54,
    ageArray.iota35_54,
    ageArray.theta35_54,
    ageArray.lambda35_54,
    ageArray.other35_54,
  ];
  let age55_64 = [
    ageArray.alpha55_64,
    ageArray.beta55_64,
    ageArray.delta55_64,
    ageArray.epsilon55_64,
    ageArray.gamma55_64,
    ageArray.iota55_64,
    ageArray.theta55_64,
    ageArray.lambda55_64,
    ageArray.other55_64,
  ];
  let age65_74 = [
    ageArray.alpha65_74,
    ageArray.beta65_74,
    ageArray.delta65_74,
    ageArray.epsilon65_74,
    ageArray.gamma65_74,
    ageArray.iota65_74,
    ageArray.theta65_74,
    ageArray.lambda65_74,
    ageArray.other65_74,
  ];
  let age75_84 = [
    ageArray.alpha75_84,
    ageArray.beta75_84,
    ageArray.delta75_84,
    ageArray.epsilon75_84,
    ageArray.gamma75_84,
    ageArray.iota75_84,
    ageArray.theta75_84,
    ageArray.lambda75_84,
    ageArray.other75_84,
  ];
  let age85 = [
    ageArray.alpha85plus,
    ageArray.beta85plus,
    ageArray.delta85plus,
    ageArray.epsilon85plus,
    ageArray.gamma85plus,
    ageArray.iota85plus,
    ageArray.theta85plus,
    ageArray.lambda85plus,
    ageArray.other85plus,
  ];

  const variantColors = [
    color.blue,
    color.green,
    color.red,
    color.yellow,
    color.pink,
    color.grayblue,
    color.orange,
    color.lightpurple,
    color.gray,
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
            data={[alpha, beta, delta, epsilon, gamma, iota, theta, lambda]}
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
            data={[age011]}
            fill={[variantColors]}
            title={"Age 0 - 11"}
            label={["Cases"]}
            switches={["horizontalBar", "bar", "doughnut"]}></Chart>
          <Chart
            key="3"
            id="age1217"
            date={labels}
            data={[age1217]}
            fill={[variantColors]}
            title={"Age  12 - 17"}
            label={["Cases"]}
            switches={["horizontalBar", "bar", "doughnut"]}></Chart>
          <Chart
            key="4"
            id="age1834"
            date={labels}
            data={[age1834]}
            fill={[variantColors]}
            title={"Age 18 - 34"}
            label={["Cases"]}
            switches={["horizontalBar", "bar", "doughnut"]}></Chart>
          <Chart
            key="5"
            id="age3554"
            date={labels}
            data={[age3554]}
            fill={[variantColors]}
            title={"Age 35 - 54"}
            label={["Cases"]}
            switches={["horizontalBar", "bar", "doughnut"]}></Chart>
          <Chart
            key="6"
            id="age5564"
            date={labels}
            data={[age55_64]}
            fill={[variantColors]}
            title={"Age 55 - 64"}
            label={["Cases"]}
            switches={["horizontalBar", "bar", "doughnut"]}></Chart>
          <Chart
            key="7"
            id="age6574"
            date={labels}
            data={[age65_74]}
            fill={[variantColors]}
            title={"Age 65 - 74"}
            label={["Cases"]}
            switches={["horizontalBar", "bar", "doughnut"]}></Chart>
          <Chart
            key="8"
            id="age7584"
            date={labels}
            data={[age75_84]}
            fill={[variantColors]}
            title={"Age 75 - 84"}
            label={["Cases"]}
            switches={["horizontalBar", "bar", "doughnut"]}></Chart>
          <Chart
            key="9"
            id="age85"
            date={labels}
            data={[age85]}
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
            around Orange County. As of August 5, 90,382 samples have been
            sequenced in California. In July 2021, 1% of cases in California
            were sequenced, and this percent is expected to increase in coming
            weeks as more data becomes available. In June 2021, 14% of cases in
            California were sequenced. This is the number of sequences submitted
            to the data repository GISAID and is not a complete list of
            sequences completed to date.
          </p>
          <br></br>
          <p>
            *Delta variant includes sublineages B.1.617.2, B.1.617.2.1 (AY.1),
            B.1.617.2.2 (AY.2), and B.1.617.2.3 (AY.3).
          </p>
        </div>
      </Page>
    </div>
  );
};

export default Variant;
