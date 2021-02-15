import React, { useState, useContext, useEffect } from 'react'
import TimeContext from 'components/TimeContext'
import color from 'globalVars/Colors'
import CityZipMetricSelect from 'components/CityZipMetricSelect'
import CityZipSort from 'components/CityZipSort'
import { FetchCityData } from 'components/Datafetch/FetchCityData'
import Chart from 'components/Chart'
import Widget from 'components/Widget'

const City = props => {
  const { time, setTime } = useContext(TimeContext)
  const [array, updateArray] = useState([])
  //console.log('file: City.jsx ~ line 12 ~ array', array)

  let unifiedArray = []
  array.forEach(row => {
    unifiedArray.push({
      city: row.City,
      caseRate: row.CaseRate,
      deathRate: row.DeathRate,
      totalCases: row.Tot_Cases,
      totalDeaths: row.Tot_Deaths,
      population: row.Total_Pop,
      snfCases: row.SNFCase,
      snfDeaths: row.SNFDth,
      Cases_0_3: row.Cases_0_3,
      Cases_0_17: row.Cases_0_17,
      Cases_0_18: row.Cases_0_18,
      Cases_4_9: row.Cases_4_9,
      Cases_10_12: row.Cases_10_12,
      Cases_13_14: row.Cases_13_14,
      Cases_15_18: row.Cases_15_18
    })
  })

  const [whichMetric, updateWhichMetric] = useState('totalCases')
  const [whichSort, updateWhichSort] = useState('high')

  let finalArraytoUse = []
  unifiedArray.forEach(a => {
    //Figure out which index to get in each
    Object.keys(a).forEach((b, i) => {
      if (b === whichMetric) {
        finalArraytoUse.push({
          city: Object.values(a)[0],
          value: Object.values(a)[i]
        })
      }
    })
  })

  //Sort the Array
  switch (whichSort) {
    case 'high':
      finalArraytoUse.sort((a, b) => b.value - a.value)
      break
    case 'low':
      finalArraytoUse.sort((a, b) => a.value - b.value)
      break
    case 'name':
      finalArraytoUse.sort((a, b) => {
        return a.city < b.city ? -1 : a.city > b.city ? 1 : 0
      })
      break

    default:
      finalArraytoUse.sort((a, b) => b.value - a.value)
      break
  }

  let screenWidth = window.innerWidth
  //const [theType, updateTheType] = useState()

  let theType
  if (screenWidth >= 768) {
    theType = 'bar'
  } else {
    theType = 'horizontalBar'
  }

  return (
    <div>
      <FetchCityData function={updateArray} time={time} />
      <div className='page'>
        <h1 className='pageTitle'>{props.title}</h1>
        <CityZipMetricSelect
          function={updateWhichMetric}
          current={whichMetric}
        />
        <CityZipSort function={updateWhichSort} current={whichSort} />
        <div id='chartGridWide'>
          <Chart
            key='1'
            id='city1'
            switches={[theType]}
            date={finalArraytoUse.map(a => a.city)}
            data={[finalArraytoUse.map(a => a.value)]}
            fill={[color.red]}
            title={'Total Cases by Specimen Collection'}
            label={['Cases', 'Estimated Recovered']}
          />
        </div>
      </div>
    </div>
  )
}

export default City
