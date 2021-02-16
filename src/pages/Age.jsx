import React, { useState, useContext } from 'react'
import color from 'globalVars/Colors'
import { FetchCaseDemo } from 'Datafetch/FetchCaseDemo'
import { FetchDeathDemo } from 'Datafetch/FetchDeathDemo'
import { FetchYouthCases } from 'Datafetch/FetchYouthCases'
import Chart from 'components/Chart'
import { ageLabels, ageColors } from 'globalVars/chartJSconfig'
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

const Age = props => {
  const [ageCase, updateAgeCaseArray] = useState([])
  const [ageDeath, updateAgeDeathArray] = useState([])
  const [youthCases, updateYouthCaseArray] = useState([])
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

  let allKnownAgesCases = ageCaseArray[0] + ageCaseArray[1] + ageCaseArray[2] + ageCaseArray[3] + ageCaseArray[4] + ageCaseArray[5] + ageCaseArray[6] + ageCaseArray[7] + ageCaseArray[8]

  let ageHeaders = ['Age', 'Pop (%)', '% of All Cases', '% Group Infected'];
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
      let popPerc = (parseFloat((a / agePopArray[i]) * 100).toFixed(1)) + '%';
      ageCol2.push(`${population}<br>${popPerc}`)
      ageCol3.push((parseFloat((a / allKnownAgesCases) * 100).toFixed(1)) + '%')
      ageCol4.push((parseFloat((a / agePopArray[i]) * 100).toFixed(1)) + '%')
    }
  })

  return (
    <div>
      <FetchCaseDemo function={ updateAgeCaseArray } />
      <FetchDeathDemo function={ updateAgeDeathArray } />
      <FetchYouthCases function={ updateYouthCaseArray } />
      <div className='page'>
        <h1 className='pageTitle'>{ props.title }</h1>

        <div id='chartGrid'>
          <Chart
            key='4'
            id='age4'
            date={ ['0 to 3', '4 to 9', '10 to 12', '13 to 14', '15 to 18'] }
            data={ [[age03, age49, age1012, age1314, age1518]] }
            fill={ [...[youngColorAll]] }
            title={ 'Cases Among Youth' }
            label={ ['Fatality Rate'] }
            switches={ ['horizontalBar', 'bar', 'doughnut'] }
          />
          <Chart
            key='1'
            id='age1'
            date={ [...ageLabels] }
            data={ [ageCaseArray] }
            fill={ [...[ageColors]] }
            title={ 'Total Cases by Age Group' }
            label={ ['Cases'] }
            switches={ ['horizontalBar', 'bar', 'doughnut'] }
          />
          <div className="chartContainer" style={ { padding: '0', backgroundColor: 'transparent', } }>
            <BuildTable colName={ ageHeaders } rows={ ageTableRows } columns={ [ageCol2, ageCol3, ageCol4] } />
          </div>
          <Chart
            key='2'
            id='age2'
            date={ [...ageLabels] }
            data={ [ageDeathArray] }
            fill={ [...[ageColors]] }
            title={ 'Total Deaths by Age Group' }
            label={ ['Deaths'] }
            switches={ ['horizontalBar', 'bar', 'doughnut'] }
          />
          <Chart
            key='3'
            id='age3'
            date={ [...ageLabels] }
            data={ [fatalityArray] }
            fill={ [...[ageColors]] }
            title={ 'Case Fatality per Age Group' }
            label={ ['Fatality Rate'] }
            switches={ ['horizontalBar', 'bar'] }
          />

        </div>

      </div>
    </div>
  )
}

export default Age
