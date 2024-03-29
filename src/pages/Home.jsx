/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import color from "globalVars/Colors";
import { TimeContext } from "components/context/TimeContext";
import Widget from "components/Widget";
import { ocpop } from "globalVars/populations";
import FetchCountyTier from "Datafetch/FetchCountyTier";
import FetchVaccineDate from "Datafetch/FetchVaccineDate";
import {
  FetchCases,
  lastTotalCases,
  lastDailyReported,
  lastRecovered,
} from "Datafetch/FetchCases";
import {
  FetchDeaths,
  lastTotalDeaths,
  lastDailyReportedDeath,
} from "Datafetch/FetchDeaths";
import { FetchHospitals, lastHos, lastICU } from "Datafetch/FetchHospitals";
import { FetchHospitalVax } from "Datafetch/FetchHosVax";
import {
  FetchHosTriggers,
  lastHosRateChange,
  lastVentsAvailable,
  lastBedsAdj,
  lastBedsUnadj,
} from "Datafetch/FetchHosTriggers";
import { FetchVaccines } from "Datafetch/FetchVaccines";
import {
  FetchTesting,
  lastTotalPCR,
  lastDailyTests,
} from "Datafetch/FetchTesting";
import {
  FetchCAMetrics,
  lastCaseRate,
  lastPositiveRate,
  lastHealthEquity,
  lastTestRate,
} from "Datafetch/FetchCAMetrics";
import FetchVaccineTier from "Datafetch/FetchVaccineTier";
import ReactSpeedometer from "react-d3-speedometer";
import Page from "components/Page";

import FindAVaccine from "components/FindAVaccine";


const Home = (props) => {
  const [time, setTime] = useContext(TimeContext);
  const [array, updateArray] = useState([]);
  const [array2, update2Array] = useState([]);
  const [array3, update3Array] = useState([]);
  const [array4, update4Array] = useState([]);
  const [array5, update5Array] = useState([]);

  const [array6, update6Array] = useState([]);
  const [array7, update7Array] = useState([]);
    const [hosVax, updateHosVax] = useState([]);
    const [icuStat, updateICUStat] = useState([]);
  const [vaccineDate, updateVaccineDate] = useState("Getting last update date...");
  const peopleOneDose = array5[0];
  const fullVaccinated = array5[1];
  const [maxCaseRate, updateCaseMax] = useState(14);
  const [maxPosRate, updatePosMax] = useState(10);
  const [maxEqRate, updateEqMax] = useState(10);
  const [tier, updateTier] = useState();
  const [tierColor, updatetTierColor] = useState();
  const [vaxTier,updateVaxTier] = useState();

  useEffect(() => {
    let a = lastCaseRate > 14 ? lastCaseRate + 2 : 14;
    updateCaseMax(a);
  }, [lastCaseRate]);
  useEffect(() => {
    let a = lastPositiveRate > 10 ? lastPositiveRate + 2 : 10;
    updatePosMax(a);
  }, [lastPositiveRate]);
  useEffect(() => {
    let a = lastHealthEquity > 10 ? lastHealthEquity + 2 : 10;
    updateEqMax(a);
  }, [lastHealthEquity]);
  const getTierText = () => {
    switch (tier) {
      case "Fully Open":
        return "Fully Open";
      case "4":
        return "Widespread (Tier 1)";
      case "3":
        return "Substantial (Tier 2)";
      case "2":
        return "Moderate (Tier 3)";
      case "1":
        return "Minimal (Tier 4)";
      default:
        return "Fetching tier...";
    }
  };
  useEffect(() => {
    switch (tier) {
      case "Fully Open":
        updatetTierColor(color.green);
        break;
      case "4":
        updatetTierColor(color.purple);
        break;
      case "3":
        updatetTierColor(color.red);
        break;
      case "2":
        updatetTierColor(color.orange);
        break;
      case "1":
        updatetTierColor(color.yellow);
        break;
      default:
        updatetTierColor(color.white);
        break;
    }
  }, [tier]);

    const totalPPL1Dose = parseInt(peopleOneDose);
    const totalPPL1Perc = parseFloat((totalPPL1Dose / ocpop) * 100).toFixed(1);

    const totalPPL = parseInt(fullVaccinated);
    const totallPPLPerc = parseFloat((totalPPL / ocpop) * 100).toFixed(1);

  return (
    <div>
      <Page title="OCCOVID19 Summary">
        <FetchCases function={updateArray} time={time} />
        <FetchDeaths function={update2Array} time={time} />
        <FetchHosTriggers function={update3Array} time={time} />
        <FetchHospitals function={update4Array} time={time} />
        <FetchHospitalVax
          function={updateHosVax}
          function2={updateICUStat}
          time={time}
        />
        <FetchVaccines function={update5Array} time={time} />
        <FetchTesting function={update6Array} time={time} />
        <FetchCountyTier function={updateTier} />
        <FetchCAMetrics time={time} function={update7Array} />
        <FetchVaccineDate function={updateVaccineDate} />

        <FetchVaccineTier function={updateVaxTier} />
        <div className="homeWidgetGrid">
          <Link to="/cases">
            {" "}
            <div id="item1">
              <div className="innerDiv">
                <div className="widgetTitle t1">Cases</div>
                <div className="subFlex">
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
                  <Widget
                    title={"Recovered"}
                    stat={lastRecovered}
                    color={color.blue}
                  />
                </div>
              </div>
            </div>
          </Link>
          <Link to="/deaths">
            <div id="item2">
              <div className="innerDiv">
                <div className="widgetTitle t2">Deaths</div>
                <div className="subFlex">
                  <Widget
                    title={"Total Deaths"}
                    stat={lastTotalDeaths}
                    color={color.red}
                  />
                  <Widget
                    title={"Daily Reported"}
                    stat={lastDailyReportedDeath}
                    color={color.red}
                  />
                </div>
              </div>
            </div>
          </Link>
          <Link to="/hospitalizations">
            <div id="item3">
              <div className="innerDiv">
                <div id="hosWidget">
                  <div className="widgetTitle t3">Hospitalized</div>
                  <div className="subFlex">
                    <Widget
                      title={"Hospitalized"}
                      stat={lastHos}
                      color={color.yellow}
                    />
                    <Widget title={"ICU"} stat={lastICU} color={color.red} />
                    <Widget
                      title={"Change in 3 Day Avg"}
                      stat={lastHosRateChange + "%"}
                      color={color.pink}
                    />
                    <Widget
                      title="% Hospitalized Unvaccinated"
                      stat={icuStat[0]}
                      color={color.orange}
                    />
                    <Widget
                      title="% of ICU Admits Unvaccinated"
                      stat={icuStat[1]}
                      color={color.red}
                    />
                    <Widget
                      title={"Vents Available"}
                      stat={lastVentsAvailable + "%"}
                      color={color.blue}
                    />
                    <Widget
                      title={"Adult Beds Available"}
                      stat={lastBedsAdj + "%"}
                      color={color.red}
                    />
                    {/* <Widget
                      title={"Beds Avail. Unadjusted"}
                      stat={lastBedsUnadj + "%"}
                      color={color.red}
                    /> */}
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link to="/vaccinations">
            <div id="item4">
              <div className="innerDiv">
                <div id="hosWidget">
                  <div className="widgetTitle t4">
                    Vaccinated
                    <p>{vaccineDate}</p>
                  </div>

                  <div className="subFlex">
                    <Widget
                      title={"Vaccine Eligibility"}
                      stat={vaxTier}
                      color={color.purple}
                    />
                    <Widget
                      title={"OC Population"}
                      stat={ocpop.toLocaleString()}
                      color={color.blue}
                    />
                    <Widget
                      title={"Fully Vaccinated (All Brands) "}
                      stat={`${totalPPL.toLocaleString()} | ${totallPPLPerc}%`}
                      color={color.green}
                    />
                    <Widget
                      title={"People w/ at Least 1 Dose (All Brands)"}
                      stat={`${parseInt(
                        totalPPL1Dose
                      ).toLocaleString()}  | ${totalPPL1Perc}%`}
                      color={color.green}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link to="/testing">
            <div id="item5">
              <div className="innerDiv">
                <div id="hosWidget">
                  <div className="widgetTitle t5">Tests</div>
                  <div className="subFlex">
                    <Widget
                      title={"Total PCR Tests"}
                      stat={lastTotalPCR}
                      color={color.blue}
                    />
                    <Widget
                      title={"Weekly Tests Received"}
                      stat={lastDailyTests}
                      color={color.green}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/whatsopen">
            <div className="innerDiv">
              <div className="widgetTitle">
                State Metrics
                <p>Updated Tuesdays</p>
              </div>
              <div className="subFlex">
                <Widget
                  title={"Current Tier"}
                  stat={getTierText()}
                  color={tierColor}
                />
                <Widget
                  title={"Tests per 100k"}
                  stat={lastTestRate}
                  color={color.blue}
                />
              </div>
              <div className="widgetGrid">
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
                    customSegmentStops={[0, 2, 6, 10, maxCaseRate]}
                    forceRender={true}
                    needleColor={"#999"}
                  />
                </div>
                <div className="gaugeContainer">
                  <div className="chartTitle">Test Positivity Rate</div>
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
            </div>
          </Link>
        </div>
      </Page>
    </div>
  );
};

export default Home;
