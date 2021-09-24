import React, { useState, useContext } from 'react'
import color from 'globalVars/Colors'
import Timeselect from "components/Timeselect";
import { FetchCaseDemo } from 'Datafetch/FetchCaseDemo'
import { FetchDeathDemo } from 'Datafetch/FetchDeathDemo'
import { FetchYouthCases } from 'Datafetch/FetchYouthCases'
import { FetchAgeCases } from 'Datafetch/FetchAgeCases'
import Chart from 'components/Chart'
import { ageLabels, ageColors } from 'globalVars/chartJSconfig'
import { TimeContext } from "components/context/TimeContext";
import CityCompareChart from "components/CityCompare/CityCompareChart.jsx";
import {
  ocpop, age0_17_pop,
  age18_24_pop,
  age25_34_pop,
  age35_44_pop,
  age45_54_pop,
  age55_64_pop,
  age65_74_pop,
  age75_84_pop,
  age85_pop,
} from 'globalVars/populations'
import BuildTable from 'components/BuildTable'
import Page from 'components/Page'

const Age = props => {
    const [time, setTime] = useContext(TimeContext);
  const [ageCase, updateAgeCaseArray] = useState([])
  const [ageDeath, updateAgeDeathArray] = useState([])
  const [youthCases, updateYouthCaseArray] = useState([])
  const [caseRateAge,updateCaseRateAge] = useState([])
  const youngColorAll = ['#f95d6a', '#ffa600', '#ff7c43', '#a05195', '#2f4b7c']

  const ageCaseArray = [
    ageCase.case_0_17,
    ageCase.case_18_24,
    ageCase.case_25_34,
    ageCase.case_35_44,
    ageCase.case_45_54,
    ageCase.case_55_64,
    ageCase.case_65_74,
    ageCase.case_75_84,
    ageCase.Case_85,
    ageCase.case_unk_age
  ]
  const ageDeathArray = [
    ageDeath.dth_0_17,
    ageDeath.dth_18_24,
    ageDeath.dth_25_34,
    ageDeath.dth_35_44,
    ageDeath.dth_45_54,
    ageDeath.dth_55_64,
    ageDeath.dth_65_74,
    ageDeath.dth_75_84,
    ageDeath.dth_85,
    ageDeath.dth_unk_age
  ]
  const fatalityArray = ageDeathArray.map((a, i) => {
    return parseFloat((a / ageCaseArray[i]) * 100).toFixed(1)
  })
  const [age03, age49, age1012, age1314, age1518] = youthCases

  const allKnownAgesCases = ageCaseArray[0] + ageCaseArray[1] + ageCaseArray[2] + ageCaseArray[3] + ageCaseArray[4] + ageCaseArray[5] + ageCaseArray[6] + ageCaseArray[7] + ageCaseArray[8]

  const allKnownAgeDeaths = ageDeathArray[1] + ageDeathArray[2] + ageDeathArray[3] + ageDeathArray[4] + ageDeathArray[5] + ageDeathArray[6] + ageDeathArray[7] + ageDeathArray[8];

  let ageTableRows = [...ageLabels]
  ageTableRows.pop()
  let agePopArray = [age0_17_pop,
    age18_24_pop,
    age25_34_pop,
    age35_44_pop,
    age45_54_pop,
    age55_64_pop,
    age65_74_pop,
    age75_84_pop,
    age85_pop]
  let ageCol2 = []
  let ageCol3 = []
  let ageCol4 = []
  ageCaseArray.forEach((a, i) => {
    if (i < ageCaseArray.length - 1) {
      let population = agePopArray[i].toLocaleString();
      let popPerc = (parseFloat((agePopArray[i] / ocpop) * 100).toFixed(1)) + '%';
      ageCol2.push(`${population}<br>${popPerc}`)
      ageCol3.push((parseFloat((a / allKnownAgesCases) * 100).toFixed(1)) + '%')
      ageCol4.push((parseFloat((a / agePopArray[i]) * 100).toFixed(1)) + '%')
    }
  })

  let ageDeathCol2 = []
  let ageDeathCol3 = []
  let ageDeathCol4 = []
  ageDeathArray.forEach((a, i) => {
    if (i < ageDeathArray.length - 1) {
      let population = agePopArray[i].toLocaleString();
      let popPerc = (parseFloat((agePopArray[i] / ocpop) * 100).toFixed(1)) + '%';
      ageDeathCol2.push(`${population}<br>${popPerc}`)
      ageDeathCol3.push((parseFloat((a / allKnownAgeDeaths) * 100).toFixed(1)) + '%')
      ageDeathCol4.push((parseFloat((a / agePopArray[i]) * 100).toFixed(1)) + '%')
    }
  })

  return (
    <div>
      <FetchCaseDemo function={updateAgeCaseArray} />
      <FetchAgeCases function={updateCaseRateAge} time={time} />
      <FetchDeathDemo function={updateAgeDeathArray} />
      <FetchYouthCases function={updateYouthCaseArray} />
      <Page title="By Age">
        <div id="chartGridAge">
          
          <Chart
            key="4"
            id="age4"
            date={["0 to 3", "4 to 9", "10 to 12", "13 to 14", "15 to 18"]}
            data={[[age03, age49, age1012, age1314, age1518]]}
            fill={[...[youngColorAll]]}
            title={"Cases Among Youth"}
            label={["Cases"]}
            switches={["horizontalBar", "bar", "doughnut"]}></Chart>

          <Chart
            key="3"
            id="age3"
            date={[...ageLabels]}
            data={[fatalityArray]}
            fill={[...[ageColors]]}
            title={"Case Fatality per Age Group"}
            label={["Fatality Rate"]}
            switches={["horizontalBar", "bar"]}
          />
          <Chart
            key="1"
            id="ageCaseCombo"
            date={[...ageLabels]}
            data={[ageCaseArray]}
            fill={[...[ageColors]]}
            title={"Total Cases by Age Group"}
            label={["Cases"]}
            switches={["horizontalBar", "bar", "doughnut"]}>
            <BuildTable
              colName={[
                "Age",
                "Population)",
                "% of All Cases",
                "% Group Infected",
              ]}
              rows={ageTableRows}
              columns={[ageCol2, ageCol3, ageCol4]}
            />
          </Chart>

          <Chart
            key="2"
            id="ageDeathCombo"
            date={[...ageLabels]}
            data={[ageDeathArray]}
            fill={[...[ageColors]]}
            title={"Total Deaths by Age Group"}
            label={["Deaths"]}
            switches={["horizontalBar", "bar", "doughnut"]}>
            <BuildTable
              colName={[
                "Age",
                "Population",
                "% of All Deaths",
                "% Group Passed",
              ]}
              rows={ageTableRows}
              columns={[ageDeathCol2, ageDeathCol3, ageDeathCol4]}
            />
          </Chart>
        </div>
        <br />
        <Timeselect />
        <div id="fullPageChart">
          <CityCompareChart
            key="ageGroupCaseDate"
            id="ageGroupCaseDate"
            date={caseRateAge.map((row) => row.date)}
            data={[
              caseRateAge.map((a) => a.age0_3),
              caseRateAge.map((a) => a.age4_9),
              caseRateAge.map((a) => a.age10_12),
              caseRateAge.map((a) => a.age13_14),
              caseRateAge.map((a) => a.age15_17),
            ]}
            fill={[...youngColorAll]}
            title={"Case Rate Among Youth"}
            label={["0 to 3", "4 to 9", "10 to 12", "13 to 14", "15 to 18"]}
            switches={["line"]}
          />
        </div>
        <br />
        <div id="fullPageChart">
          <CityCompareChart
            key="ageGroupAllCaseDate"
            id="ageGroupAllCaseDate"
            date={caseRateAge.map((row) => row.date)}
            data={[
              caseRateAge.map((a) => a.age19_24),
              caseRateAge.map((a) => a.age25_34),
              caseRateAge.map((a) => a.age35_44),
              caseRateAge.map((a) => a.age45_54),
              caseRateAge.map((a) => a.age55_64),
              caseRateAge.map((a) => a.age65_74),
              caseRateAge.map((a) => a.age75_54),
              caseRateAge.map((a) => a.age85),
            ]}
            fill={[...ageColors]}
            title={"Case Rate Among Adults"}
            label={[
              "19 to 24",
              "25 to 34",
              "35 to 44",
              "45 to 54",
              "55 to 64",
              "65 to 74",
              "75 to 84",
              "85+",
            ]}
            switches={["line"]}
          />
        </div>
      </Page>
    </div>
  );
}

export default Age
