/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { TimeContext } from "components/context/TimeContext";
import color from "globalVars/Colors";
import Timeselect from "components/Timeselect";
import { Line } from "react-chartjs-2";
import CityCompareChart from "components/CityCompare/CityCompareChart.jsx";

import { FetchVariantWeekly } from "Datafetch/FetchVariantWeekly";
import Chart from "components/Chart";
import Widget from "components/Widget";
import Page from "components/Page";

const Variant = (props) => {
  const [time, setTime] = useContext(TimeContext);
  //console.log("file: Cases.jsx ~ line 22 ~ Cases ~ time", time);
  const [array, updateArray] = useState([]);
  let alpha = array.map((row) => row.alpha);
  let beta = array.map((row) => row.beta);
  let delta = array.map((row) => row.delta);
  let epsilon = array.map((row) => row.epsilon);
  let gamma = array.map((row) => row.gamma);
  let iota = array.map((row) => row.iota);
  let theta = array.map((row) => row.theta);
  let lambda = array.map((row) => row.lambda);
  let labels = ["Alpha","Beta","Delta","Epsilon","Gamma","Iota","Theta","Lambda"]

  //console.log('caseVaxArray: ', caseVaxArray);

  return (
    <div>
      {<FetchVariantWeekly function={updateArray} time={time} />}
      <Page title="Variant Detail">
        <Timeselect />
        <div id="fullPageChart">
          <CityCompareChart
            key="1"
            id="comparecities"
            date={array.map((row) => row.date)}
            data={[alpha, beta, delta, epsilon, gamma, iota, theta, lambda]}
            fill={[
              color.blue,
              color.green,
              color.red,
              color.purple,
              color.yellow,
              color.darkblue,
              color.yellow,
              color.dark,
            ]}
            title={"Variant Results by Disease Weak"}
            label={labels}
            switches={["line"]}
          />
        </div>
        <br></br>
        <p>
          Multiple variants of the virus that causes COVID-19 have been
          identified globally during the COVID-19 pandemic. Variants are
          determined by their genetic sequences. It's important to understand
          that genetic mutations of the virus that causes COVID-19, SARS-CoV-2,
          are expected, and that there are many strains of the virus. Community
          clinical laboratories and HCA’s Public Health Laboratory are
          sequencing a sample of cases to better track and respond to the
          pandemic. These cases do not represent the total number of infections
          due to the strains that may be circulating around Orange County. As of
          August 5, 90,382 samples have been sequenced in California. In July
          2021, 1% of cases in California were sequenced, and this percent is
          expected to increase in coming weeks as more data becomes available.
          In June 2021, 14% of cases in California were sequenced. This is the
          number of sequences submitted to the data repository GISAID and is not
          a complete list of sequences completed to date.
        </p>
        <br></br>
        <p>
          *Delta variant includes sublineages B.1.617.2, B.1.617.2.1 (AY.1),
          B.1.617.2.2 (AY.2), and B.1.617.2.3 (AY.3).
        </p>
      </Page>
    </div>
  );
};

export default Variant;
