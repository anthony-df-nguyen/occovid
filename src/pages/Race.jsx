import React, { useState, useContext } from 'react'

import color from 'globalVars/Colors'
import { FetchCaseDemo } from 'Datafetch/FetchCaseDemo'
import { FetchDeathDemo } from 'Datafetch/FetchDeathDemo'
import Chart from 'components/Chart'
import { raceLabels, raceColors } from 'globalVars/chartJSconfig'
import BuildTable from 'components/BuildTable'
import {
  ocpop,
  asian_pop,
  black_pop,
  hispanic_pop,
  white_pop,
  native_pop,
  pi_pop
} from 'globalVars/populations'
import Page from 'components/Page'

const Race = props => {
  //const {time,setTime} =  useContext(TimeContext);
  const [raceCase, updateRaceCaseArray] = useState([])
  const [raceDeath, updateRaceDeathArray] = useState([])

  const raceCaseArray = [
    raceCase.case_ai,
    raceCase.case_asian,
    raceCase.case_aa,
    raceCase.case_latinx,
    raceCase.case_mult_race,
    raceCase.case_pi,
    raceCase.case_oth_race,
    raceCase.case_unk,
    raceCase.case_white
  ]
  const raceDeathArray = [
    raceDeath.dth_ai,
    raceDeath.dth_asian,
    raceDeath.dth_aa,
    raceDeath.dth_latinx,
    raceDeath.dth_mult_race,
    raceDeath.dth_pi,
    raceDeath.dth_oth_race,
    raceDeath.dth_unk,
    raceDeath.dth_white
  ]

  const knownCases =
    raceCase.case_ai +
    raceCase.case_asian +
    raceCase.case_aa +
    raceCase.case_latinx +
    raceCase.case_mult_race +
    raceCase.case_pi +
    raceCase.case_oth_race +
    raceCase.case_white

  const knownDeaths =
    raceDeath.dth_ai +
    raceDeath.dth_asian +
    raceDeath.dth_aa +
    raceDeath.dth_latinx +
    raceDeath.dth_mult_race +
    raceDeath.dth_pi +
    raceDeath.dth_oth_race +
    raceDeath.dth_white

  const subRaceCaseArray = [
    raceCase.case_asian,
    raceCase.case_aa,
    raceCase.case_latinx,
    raceCase.case_white,
    raceCase.case_ai,
    raceCase.case_pi
  ]
  const subRaceDeathArray = [
    raceDeath.dth_asian,
    raceDeath.dth_aa,
    raceDeath.dth_latinx,
    raceDeath.dth_white,
    raceDeath.dth_ai,
    raceDeath.dth_pi
  ]

  const populationArray = [
    asian_pop,
    black_pop,
    hispanic_pop,
    white_pop,
    native_pop,
    pi_pop
  ]
  const percOfOC = populationArray.map(a =>
    parseFloat((a / ocpop) * 100).toFixed(1)
  )
  const displayedPopCol = populationArray.map((a, i) => {
    let pop = a.toLocaleString()
    let perc = percOfOC[i]
    let parse = `${pop}<br>${perc}%`
    return parse
  })

  const percKnownCases = subRaceCaseArray.map(a => {
    return parseFloat(((a / knownCases) * 100).toFixed(1)) + '%'
  })
  const percKnownDeaths = subRaceDeathArray.map(a => {
    return parseFloat(((a / knownDeaths) * 100).toFixed(1)) + '%'
  })

  const percRaceInfected = subRaceCaseArray.map((a, i) => {
    return parseFloat(((a / populationArray[i]) * 100).toFixed(1)) + '%'
  })

  const percRaceDied = subRaceDeathArray.map((a, i) => {
    return parseFloat(((a / populationArray[i]) * 100).toFixed(1)) + '%'
  })

  const fatalityArray = raceDeathArray.map((a, i) => {
    return parseFloat((a / raceCaseArray[i]) * 100).toFixed(1)
  })

  let tableRaceNames = [
    'Asian',
    'Black',
    'Hispanic/Latino',
    'White',
    'Native',
    'Pac. Is/HI'
  ]

  return (
    <div >
      <FetchCaseDemo function={updateRaceCaseArray} />
      <FetchDeathDemo function={updateRaceDeathArray} />
      <Page title = 'By Race'
>
        <div id='chartGridRace'>
          <Chart
            key='1'
            id='race1'
            date={[...raceLabels]}
            data={[raceCaseArray]}
            fill={[...[raceColors]]}
            title={'Total Cases by Race/Ethnicity'}
            label={['Cases']}
            switches={['horizontalBar', 'bar', 'doughnut']}
          >
            <BuildTable
              colName={[
                'Race/Ethnic.',
                'Population',
                '% of Known Cases',
                '% Group Infected'
              ]}
              rows={[...tableRaceNames]}
              columns={[displayedPopCol, percKnownCases, percRaceInfected]}
            />
          </Chart>

          <Chart
            key='2'
            id='race2'
            date={[...raceLabels]}
            data={[raceDeathArray]}
            fill={[...[raceColors]]}
            title={'Total Deaths by Race/Ethnicity'}
            label={['Deaths']}
            switches={['horizontalBar', 'bar', 'doughnut']}
          >
            <BuildTable
              colName={[
                'Race/Ethnic.',
                'Population',
                '% of Known Cases',
                '% Group Passed'
              ]}
              rows={[...tableRaceNames]}
              columns={[displayedPopCol, percKnownDeaths, percRaceDied]}
            />
          </Chart>

          <Chart
            key='3'
            id='race3'
            date={[...raceLabels]}
            data={[fatalityArray]}
            fill={[...[raceColors]]}
            title={'Case Fatality per Race/Ethnicity'}
            label={['Fatality Rate']}
            switches={['horizontalBar', 'bar']}
          />
        </div>
      </Page>
    </div>
  )
}

export default Race
