import React, { useState, useContext } from 'react'
import TimeContext from 'components/TimeContext'
import color from 'globalVars/Colors'
import Timeselect from 'components/Timeselect'
import { FetchCases } from 'components/Datafetch/FetchCases'
import Chart from 'components/Chart'
import Widget from 'components/Widget'

const Cases = props => {
  const { time, setTime } = useContext(TimeContext)
  const [array, updateArray] = useState([])

  let dailyReported = []
  array.filter(a => {
    if (a.dailyCasesReported) {
      dailyReported.push(a.dailyCasesReported)
    }
  })
  let lastdailyReported = dailyReported.slice(-1)

  return (
    <div>
      <FetchCases function={updateArray} time={time} />
      <div className='page'>
        <h1 className='pageTitle'>{props.title}</h1>
        <div className='widgetGrid'>
          <Widget
            title={'Total Cases'}
            stat={Math.max(
              ...array.map(a => a.totalCasesReported)
            ).toLocaleString()}
            color={color.gold}
          />
          <Widget
            title={'Daily Reported'}
            stat={parseInt(lastdailyReported).toLocaleString()}
            color={color.red}
          />
          <Widget
            title={'Recovered'}
            stat={Math.max(...array.map(a => a.recovered)).toLocaleString()}
            color={color.blue}
          />
          <Widget
            title={'Homeless Cases'}
            stat={Math.max(...array.map(a => a.homelessCases)).toLocaleString()}
            color={color.purple}
          />
          <Widget
            title={'Jail Cases'}
            stat={Math.max(...array.map(a => a.jailCases)).toLocaleString()}
            color={color.yellow}
          />
          <Widget
            title={'SNF Cases'}
            stat={Math.max(...array.map(a => a.snfCases)).toLocaleString()}
            color={color.pink}
          />
        </div>
        <Timeselect />
        <div id='chartGrid'>
          <Chart
            key='2'
            id='case2'
            switches={['bar', 'line']}
            date={array.map(a => a.date)}
            data={[
              array.map(b => b.totalCasesbySpecimen),
              array.map(b => b.recovered)
            ]}
            fill={[color.gold, color.blue]}
            title={'Total Cases by Specimen Collection'}
            label={['Cases', 'Estimated Recovered']}
          />
          <Chart
            key='3'
            id='case3'
            switches={['bar', 'line']}
            date={array.map(a => a.date)}
            data={[
              array.map(b => b.dailyCasesbySpecimen),
              array.map(b => b.daily7DayAvg)
            ]}
            fill={[color.orange, color.blue]}
            title={'Daily Cases by Specimen Collection Date'}
            label={['Cases', '7 Day Avg']}
          />
          <Chart
            key='1'
            id='case1'
            switches={['bar', 'line']}
            date={array.map(a => a.date)}
            data={[array.map(b => b.dailyCasesReported)]}
            fill={[color.red]}
            title={'Daily Cases Reported'}
            label={['Daily Cases Reported']}
          />
          <Chart
            key='4'
            id='case4'
            switches={['bar', 'line']}
            date={array.map(a => a.date)}
            data={[array.map(b => b.homelessCases)]}
            fill={[color.purple]}
            title={'Homeless Cases'}
            label={['Cases']}
          />
          <Chart
            key='5'
            id='case5'
            switches={['bar', 'line']}
            date={array.map(a => a.date)}
            data={[array.map(b => b.snfCases)]}
            fill={[color.pink]}
            title={'SNF Cases'}
            label={['Cases']}
          />
          <Chart
            key='6'
            id='case6'
            switches={['bar', 'line']}
            date={array.map(a => a.date)}
            data={[array.map(b => b.jailCases)]}
            fill={[color.yellow]}
            title={'Jail Cases'}
            label={['Cases']}
          />
        </div>
      </div>
    </div>
  )
}

export default Cases
