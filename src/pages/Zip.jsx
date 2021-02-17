import React, { useState, useContext, useEffect } from 'react'
import TimeContext from 'components/TimeContext'
import color from 'globalVars/Colors'
import CityZipMetricSelect from 'components/CityZipMetricSelect'
import CityZipSort from 'components/CityZipSort'
import { FetchZipData } from 'Datafetch/FetchZipData'
import Chart from 'components/Chart'
import BuildTable from 'components/BuildTable'
import Page from 'components/Page'

const Zip = props => {
  const { time, setTime } = useContext(TimeContext)
  const [array, updateArray] = useState([])
  const [whichMetric, updateWhichMetric] = useState('totalCases')
  const [metricName, updateMetricName] = useState('Total Cases')
  const [whichSort, updateWhichSort] = useState('high')

  let finalArraytoUse = []
  array.forEach(a => {
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

  return (
    <div>
      <FetchZipData function={updateArray} time={time} />
      <Page title = 'Zip Detail'
>
        <CityZipMetricSelect
          function={[updateWhichMetric, updateMetricName]}
          current={whichMetric}
        />
        <CityZipSort function={updateWhichSort} current={whichSort} />
        <div id='cityGrid'>
          <BuildTable
            colName={['Zip Code', metricName]}
            rows={finalArraytoUse.map(a => a.city)}
            columns={[finalArraytoUse.map(a => a.value)]}
          />
          <Chart
            key='1'
            id='city1'
            switches={['horizontalBar']}
            date={finalArraytoUse.map(a => a.city)}
            data={[finalArraytoUse.map(a => a.value)]}
            fill={[color.red]}
            title={'Total Cases by Specimen Collection'}
            label={['Cases', 'Estimated Recovered']}
          />
        </div>
      </Page>
    </div>
  )
}

export default Zip
