import React, { useState, useEffect, useContext } from "react";
import TimeContext from "components/context/TimeContext";
import color from "globalVars/Colors";
import Timeselect from "components/Timeselect";

import {
  FetchCases,
  lastTotalCases,
  lastDailyReported,
  lastRecovered,
  lastHomeless,
  lastJail,
  lastSNF,
} from "Datafetch/FetchCases";
import { FetchCAMetrics } from "Datafetch/FetchCAMetrics";
import Chart from "components/Chart";
import Widget from "components/Widget";
import Page from "components/Page";

const Cases = (props) => {
  const { time, setTime } = useContext(TimeContext);
  const [array, updateArray] = useState([]);


  return (
    <div>
      {<FetchCases function={updateArray} time={time} />}
      <Page title="Case Detail">
        <div className="widgetGrid">
          <Widget
            title={"Total Cases (PCR)"}
            stat={lastTotalCases}
            color={color.gold}
          />
          <Widget
            title={"Daily PCR Reported"}
            stat={lastDailyReported}
            color={color.red}
          />
          <Widget title={"Recovered"} stat={lastRecovered} color={color.blue} />
          <Widget
            title={"Homeless Cases"}
            stat={lastHomeless}
            color={color.purple}
          />
          <Widget title={"Jail Cases"} stat={lastJail} color={color.yellow} />
          <Widget title={"SNF Cases"} stat={lastSNF} color={color.pink} />
        </div>
        <Timeselect />
        <div id="chartGrid">
          <Chart
            key="2"
            id="case2"
            switches={["bar", "line"]}
            date={array.map((a) => a.date)}
            data={[
              array.map((b) => b.totalCasesbySpecimen),
              array.map((b) => b.recovered),
            ]}
            fill={[color.gold, color.blue]}
            title={"Total Cases by Specimen Collection"}
            label={["Cases", "Estimated Recovered"]}
          />
          <Chart
            key="3"
            id="case3"
            switches={["bar", "line"]}
            date={array.map((a) => a.date)}
            data={[
              array.map((b) => b.dailyCasesbySpecimen),
              array.map((b) => b.daily7DayAvg),
            ]}
            fill={[color.orange, color.blue]}
            title={"Daily Cases by Specimen Collection Date"}
            label={["Cases", "7 Day Avg"]}
          ></Chart>

          <Chart
            key="1"
            id="case1"
            switches={["bar", "line"]}
            date={array.map((a) => a.date)}
            data={[
              array.map((b) => b.dailyCasesReported),
              array.map((b) => b.dailyCasesReported7DayAvg),
            ]}
            fill={[color.red, color.blue]}
            title={"Daily Cases Reported"}
            label={["Daily Cases Reported", "7 Day Avg"]}
          />
          <Chart
            key="4"
            id="case4"
            switches={["bar", "line"]}
            date={array.map((a) => a.date)}
            data={[array.map((b) => b.homelessCases)]}
            fill={[color.purple]}
            title={"Homeless Cases"}
            label={["Cases"]}
          />
          <Chart
            key="5"
            id="case5"
            switches={["bar", "line"]}
            date={array.map((a) => a.date)}
            data={[array.map((b) => b.snfCases)]}
            fill={[color.pink]}
            title={"Skilled Nursing Facility Cases"}
            label={["Cases"]}
          />
          <Chart
            key="6"
            id="case6"
            switches={["bar", "line"]}
            date={array.map((a) => a.date)}
            data={[array.map((b) => b.jailCases)]}
            fill={[color.yellow]}
            title={"Jail Cases"}
            label={["Cases"]}
          />
        </div>
      </Page>
    </div>
  );
};

export default Cases;
