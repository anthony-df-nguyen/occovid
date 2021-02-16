import React, { useState, useContext } from 'react'

import color from 'globalVars/Colors'
import { FetchCaseDemo } from 'components/Datafetch/FetchCaseDemo'
import { FetchDeathDemo } from 'components/Datafetch/FetchDeathDemo'
import Chart from 'components/Chart'
import { raceLabels, raceColors } from 'globalVars/chartJSconfig'
import { ocpop } from 'globalVars/populations'

const Race = props => {
  //const {time,setTime} =  useContext(TimeContext);
  const [raceCase, updateRaceCaseArray] = useState([])
  const [raceDeath, updateRaceDeathArray] = useState([])
  console.log(raceCase)
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

  const fatalityArray = raceDeathArray.map((a, i) => {
    return parseFloat((a / raceCaseArray[i]) * 100).toFixed(1)
  })

  return (
    <div>
      <FetchCaseDemo function={ updateRaceCaseArray } />
      <FetchDeathDemo function={ updateRaceDeathArray } />
      <div className='page'>
        <h1 className='pageTitle'>{ props.title }</h1>

        <div id='chartGrid'>
          <Chart
            key='1'
            id='race1'
            date={ [...raceLabels] }
            data={ [raceCaseArray] }
            fill={ [...[raceColors]] }
            title={ 'Total Cases by Race/Ethnicity' }
            label={ ['Cases'] }
            switches={ ['horizontalBar', 'bar', 'doughnut'] }
          />
          <Chart
            key='2'
            id='race2'
            date={ [...raceLabels] }
            data={ [raceDeathArray] }
            fill={ [...[raceColors]] }
            title={ 'Total Deaths by Race/Ethnicity' }
            label={ ['Deaths'] }
            switches={ ['horizontalBar', 'bar', 'doughnut'] }
          />
          <Chart
            key='3'
            id='race3'
            date={ [...raceLabels] }
            data={ [fatalityArray] }
            fill={ [...[raceColors]] }
            title={ 'Case Fatality per Race/Ethnicity' }
            label={ ['Fatality Rate'] }
            switches={ ['horizontalBar', 'bar'] }
          />
        </div>
      </div>
    </div>
  )
}

export default Race
