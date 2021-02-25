import React, { useState, useContext, useEffect } from "react";
import { TimeContext } from "components/context/TimeContext";
import color from "globalVars/Colors";
import Timeselect from "components/Timeselect";
import {
  FetchCAMetrics,
  lastCaseRate,
  lastPositiveRate,
  lastHealthEquity,
  lastTestRate,
} from "Datafetch/FetchCAMetrics";
import Chart from "components/Chart";
import Widget from "components/Widget";
import ReactSpeedometer from "react-d3-speedometer";
import FetchWhatsOpenJson from "Datafetch/FetchWhatsOpenJson";
import { tier } from "globalVars/Sources";
import BuildTable from "components/BuildTable";
import Page from "components/Page";

const WhatsOpen = (props) => {
  const [time, setTime] = useContext(TimeContext);
  const [array, updateArray] = useState([]);
  const [tableArray, updateTableArray] = useState([]);
  const [maxCaseRate, updateCaseMax] = useState(10);
  const [maxPosRate, updatePosMax] = useState(10);
  const [maxEqRate, updateEqMax] = useState(10);

  useEffect(() => {
    let a = lastCaseRate > 10 ? lastCaseRate + 2 : 10;
    updateCaseMax(a);
  });
  useEffect(() => {
    let a = lastPositiveRate > 10 ? lastPositiveRate + 2 : 10;
    updatePosMax(a);
  });
  useEffect(() => {
    let a = lastHealthEquity > 10 ? lastHealthEquity + 2 : 10;
    updateEqMax(a);
  });

  return (
    <div>
      <FetchWhatsOpenJson function={updateTableArray} tier={tier} />
      <FetchCAMetrics time={time} function={updateArray} />
      <Page title="CADPH Metrics">
        <div className="widgetGrid">
          <Widget
            title={"Daily Case Rate"}
            stat={lastCaseRate}
            color={color.yellow}
          />
          <Widget
            title={"Test Positivity Rate"}
            stat={lastPositiveRate + "%"}
            color={color.red}
          />
          <Widget
            title={"Health Equity Quartile %"}
            stat={lastHealthEquity + "%"}
            color={color.purple}
          />
          <Widget
            title={"Tests per 100k"}
            stat={lastTestRate}
            color={color.blue}
          />
        </div>
        <div className="widgetGrid" style={{ marginTop: "-2rem" }}>
          <div className="gaugeContainer">
            <div className="chartTitle">Adj. Case Rate per 100k</div>
            <ReactSpeedometer
              value={lastCaseRate}
              minValue={0}
              maxValue={maxCaseRate}
              segments={4}
              segmentColors={[
                color.gold,
                color.orange,
                color.red,
                color.purple,
              ]}
              customSegmentStops={[0, 1, 4, 7, maxCaseRate]}
              forceRender={true}
              needleColor={"#999"}
            />
          </div>
          <div className="gaugeContainer">
            <div className="chartTitle">Tests per 100K</div>
            <ReactSpeedometer
              value={lastPositiveRate}
              minValue={0}
              maxValue={maxPosRate}
              segments={4}
              segmentColors={[
                color.gold,
                color.orange,
                color.red,
                color.purple,
              ]}
              customSegmentStops={[0, 2, 5, 8, maxPosRate]}
              forceRender={true}
              needleColor={"#999"}
              currentValueText={lastPositiveRate + "%"}
            />
          </div>
          <div className="gaugeContainer">
            <div className="chartTitle">Healthy Equity Quart %</div>
            <ReactSpeedometer
              value={lastHealthEquity}
              minValue={0}
              maxValue={maxEqRate}
              segments={4}
              segmentColors={[
                color.gold,
                color.orange,
                color.red,
                color.purple,
              ]}
              customSegmentStops={[0, 2.2, 5.3, 8, maxEqRate]}
              forceRender={true}
              needleColor={"#999"}
              currentValueText={lastHealthEquity + "%"}
            />
          </div>
        </div>
        <Timeselect />
        <div id="chartGrid">
          <Chart
            key="1"
            id="whatopen1"
            switches={["bar", "line"]}
            date={array.map((a) => a.date)}
            data={[array.map((c) => c.dailyCaseRate)]}
            fill={[color.red]}
            title={"CADPH Daily Case Rate"}
            label={["Case Rate"]}>
            <p className="chartNote">Updated once a week</p>
          </Chart>
          <Chart
            key="2"
            id="whatopen2"
            switches={["bar", "line"]}
            date={array.map((a) => a.date)}
            data={[array.map((c) => c.positiveRate)]}
            fill={[color.orange]}
            title={"CADPH Positivity Rate"}
            label={["Positivity Rate"]}>
            <p className="chartNote">Updated once a week</p>
          </Chart>
          <Chart
            key="3"
            id="whatopen3"
            switches={["bar", "line"]}
            date={array.map((a) => a.date)}
            data={[array.map((c) => c.healthEquity)]}
            fill={[color.purple]}
            title={"CADPH Health Equity "}
            label={["Positivity Rate"]}>
            <p className="chartNote">Updated once a week</p>
          </Chart>
          <Chart
            key="4"
            id="whatopen4"
            switches={["bar", "line"]}
            date={array.map((a) => a.date)}
            data={[array.map((c) => c.testsPer100k)]}
            fill={[color.green]}
            title={"CADPH Tests per 100k "}
            label={["Tests"]}>
            <p className="chartNote">Updated once a week</p>
          </Chart>
        </div>
        <br></br>
        <BuildTable
          colName={["Sector", "Status"]}
          rows={tableArray.map((a) => a.name)}
          columns={[tableArray.map((a) => a.desc)]}
        />
      </Page>
    </div>
  );
};

export default WhatsOpen;
