import React, { useState, useContext } from "react";
import { TimeContext } from "components/context/TimeContext";
import color from "globalVars/Colors";
import Timeselect from "components/Timeselect";
import {
  FetchTesting,
  lastTotalPCR,
  lastDailyTests,
} from "Datafetch/FetchTesting";
import { FetchHosTriggers, lastTPP } from "Datafetch/FetchHosTriggers";
import {
  FetchSerology,
  lastTotalSero,
  lastDailySero,
  lastPosSero,
} from "Datafetch/FetchSerology";
import Chart from "components/Chart";
import Widget from "components/Widget";
import Page from "components/Page";
import ExpandCollapse from "components/ExpandCollapse";

const Testing = (props) => {
  const [time, setTime] = useContext(TimeContext);
  const [array, updateArray] = useState([]);
  const [seroArray, updateSeroArray] = useState([]);
  const [hosArray, updateHosArray] = useState([]);

  let testPosArray = [];

  hosArray.filter((a) => {
    if (a.testPos) {
      testPosArray.push(a.testPos);
    }
  });

  return (
    <div>
      <FetchTesting function={updateArray} time={time} />
      <FetchSerology function={updateSeroArray} time={time} />

      <FetchHosTriggers function={updateHosArray} time={time} />
      <Page title="PCR and Serology Tests">
        <div className="widgetGrid">
          <Widget
            title={"Total PCR Tests"}
            stat={lastTotalPCR}
            color={color.blue}
          />
          <Widget
            title={"Daily PCR Tests Received"}
            stat={lastDailyTests}
            color={color.green}
          />
          <Widget
            title={"PCR Test Positivity %"}
            stat={lastTPP + "%"}
            color={color.red}
          />
        </div>

        <div className="widgetGrid" style={{ marginTop: "-2rem" }}>
          <Widget
            title={"Total Serology Tests"}
            stat={lastTotalSero}
            color={color.blue}
          />
          <Widget
            title={"Daily Serology Tests Received"}
            stat={lastDailySero}
            color={color.green}
          />
          <Widget
            title={"Serology Test Positivity %"}
            stat={lastPosSero + "%"}
            color={color.red}
          />
        </div>
        <Timeselect />
        <ExpandCollapse nogear={true} title="PCR Tests Graphs" buttontext="Hide" opendefault={true} charticon={true} >
          <div id="chartGrid">
            <Chart
              key="1"
              id="test1"
              date={array.map((a) => a.date)}
              data={[array.map((b) => b.cumuTestbySpec)]}
              fill={[color.blue]}
              title={"Cumulative PCR Tests by Specimen Collection Date"}
              label={["Tests"]}
              switches={["bar", "line"]}
            />
            <Chart
              key="4"
              id="test4"
              date={hosArray.map((a) => a.date)}
              data={[
                hosArray.map((b) => b.testPos),
                hosArray.map((b) => b.pos7Avg),
              ]}
              fill={[color.yellow, color.blue]}
              title={"Testing Positivity Percent"}
              label={["Positive %", "7 Day Avg"]}
              switches={["bar", "line"]}
            />
            <Chart
              key="2"
              id="test2"
              date={array.map((a) => a.date)}
              data={[array.map((b) => b.daily_test_repo)]}
              fill={[color.green]}
              title={"Daily Tests Reported"}
              label={["Tests"]}
              switches={["bar", "line"]}
            />
            <Chart
              key="3"
              id="test3"
              date={array.map((a) => a.date)}
              data={[array.map((b) => b.daily_pos_spec)]}
              fill={[color.red]}
              title={"Daily Positive Tests Reported"}
              label={["Tests"]}
              switches={["bar", "line"]}
            />
            <Chart
              key="5"
              id="test5"
              date={array.map((a) => a.date)}
              data={[array.map((b) => b.daily_spec)]}
              fill={[color.red]}
              title={"Daily Specimens"}
              label={["Tests"]}
              switches={["bar", "line"]}
            />
          </div>
        </ExpandCollapse>
        <ExpandCollapse nogear={true} title="Serology Tests Graphs" buttontext="Hide" opendefault={true} charticon={true}>
          <div id="chartGrid">
            <Chart
              key="1"
              id="sero1"
              date={seroArray.map((a) => a.date)}
              data={[seroArray.map((b) => b.totalSeroTest)]}
              fill={[color.blue]}
              title={"Cumulative Serology Tests by Specimen Collection Date"}
              label={["Tests"]}
              switches={["bar", "line"]}
            />
            <Chart
              key="2"
              id="sero2"
              date={seroArray.map((a) => a.date)}
              data={[seroArray.map((b) => b.dailySeroSpec)]}
              fill={[color.green]}
              title={"Daily Serology Tests by Specimen Collection Date"}
              label={["Tests"]}
              switches={["bar", "line"]}
            />
            <Chart
              key="3"
              id="sero3"
              date={seroArray.map((a) => a.date)}
              data={[seroArray.map((b) => b.seroPosPerc)]}
              fill={[color.red]}
              title={"Serology Positivity %"}
              label={["Tests"]}
              switches={["bar", "line"]}
            />
          </div>
        </ExpandCollapse>
      </Page>
    </div>
  );
};

export default Testing;
