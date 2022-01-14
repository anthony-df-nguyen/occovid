/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react'
import {TimeContext}  from 'components/context/TimeContext'
import color from 'globalVars/Colors'
import Timeselect from 'components/Timeselect'
import {
  FetchHospitals,
  lastHos,
  lastICU
} from 'Datafetch/FetchHospitals'
import {
  FetchHosTriggers,
  lastHosRateChange,
  lastVentsAvailable,
  lastBedsAdj,
  lastBedsUnadj
} from 'Datafetch/FetchHosTriggers'
import { FetchHospitalVax } from "Datafetch/FetchHosVax";
import Chart from 'components/Chart'
import Widget from 'components/Widget'
import Page from 'components/Page'


const Hospitalization = props => {
  const [ time, setTime ] = useContext(TimeContext)
  const [array, updateArray] = useState([])
  const [triggerArray, updateTrigger] = useState([])
  const [hosVax,updateHosVax] = useState([])
  const [icuStat,updateICUStat] = useState([])

  return (
    <div>
      <FetchHospitalVax
        function={updateHosVax}
        function2={updateICUStat}
        time={time}
      />
      <FetchHosTriggers function={updateTrigger} time={time} />
      <FetchHospitals function={updateArray} time={time} />
      <Page title="Hospitalizations">
        <div className="widgetGrid">
          <Widget title={"Hospitalized"} stat={lastHos} color={color.yellow} />
          <Widget title={"ICU"} stat={lastICU} color={color.red} />
          <Widget
            title={"Change in 3 Day Avg"}
            stat={lastHosRateChange + "%"}
            color={color.purple}
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
        <Timeselect />
        <div id="chartGrid">
          <Chart
            key="1"
            id="hospital1"
            date={array.map((a) => a.date)}
            data={[
              array.map((b) => b.hospital),
              array.map((b) => b.icu),
              array.map((b) => b.hos7Avg),
            ]}
            fill={[color.yellow, color.red, color.blue]}
            title={"Hospitalized"}
            label={["Hospitalized", "ICU", "7 Day Avg"]}
            switches={["bar", "line"]}
          />
          <Chart
            key="hosvax"
            id="hospital1"
            date={hosVax.map((a) => a.date)}
            data={[hosVax.map((b) => b.vax), hosVax.map((b) => b.unvax)]}
            fill={[color.blue, color.red]}
            title={"Hospitalized by Vax Status"}
            label={["Fully Vaxed", "Unvaxed"]}
            switches={["bar", "line"]}>
            <p className="chartNote">
              This data set contains recent hospitalization reports from a
              subset of hospitals in Orange County. Data is preliminary and
              subject to change due to delays in reporting. Updated weekly.
              Fully vaccinated is defined as positive specimen &gt; 14 days
              after final dose of vaccine series. Specimen collection date is
              used when admit date is unknown.
            </p>
          </Chart>
          <Chart
            key="2"
            id="hospital2"
            date={array.map((a) => a.date)}
            data={[
              array.map((b) => b.hosChange),
              array.map((b) => b.dailyHosAvg),
            ]}
            fill={[color.yellow, color.blue]}
            title={"Change in Hospitalization"}
            label={["Hospitalized", "7 Day Avg"]}
            switches={["bar", "line"]}
          />
          <Chart
            key="3"
            id="hospital3"
            date={array.map((a) => a.date)}
            data={[
              array.map((b) => b.icuChange),
              array.map((b) => b.dailyICUAvg),
            ]}
            fill={[color.red, color.blue]}
            title={"Change in ICU"}
            label={["ICU", "7 Day Avg"]}
            switches={["bar", "line"]}
          />
          <Chart
            key="4"
            id="hospital4"
            date={triggerArray.map((a) => a.date)}
            data={[triggerArray.map((b) => b.ventsAvail)]}
            fill={[color.red]}
            title={"% Ventilators Available"}
            label={["Vents Available"]}
            switches={["bar", "line"]}
          />
          <Chart
            key="5"
            id="hospital5"
            date={triggerArray.map((a) => a.date)}
            data={[triggerArray.map((b) => b.bedsAvailAdj)]}
            fill={[color.orange]}
            title={"Beds Available Adjusted"}
            label={["Beds"]}
            switches={["bar", "line"]}
          />
          <Chart
            key="6"
            id="hospital6"
            date={triggerArray.map((a) => a.date)}
            data={[triggerArray.map((b) => b.bedAvailUnaAdj)]}
            fill={[color.orange]}
            title={"Beds Available Unadjusted"}
            label={["Beds"]}
            switches={["bar", "line"]}
          />
        </div>
      </Page>
    </div>
  );
}

export default Hospitalization
