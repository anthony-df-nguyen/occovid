/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react'
import {TimeContext}  from 'components/context/TimeContext'
import color from 'globalVars/Colors'
import Timeselect from 'components/Timeselect'
import {
  FetchDeaths,
  lastTotalDeaths,
  lastDailyReportedDeath,
  lastSNFDeath,
  lastALFDeath,
  lastHomelessDeath,
  lastJailDeath
} from 'Datafetch/FetchDeaths'
import Chart from 'components/Chart'
import Widget from 'components/Widget'
import Page from 'components/Page'

const Deaths = props => {
  const [ time, setTime ] = useContext(TimeContext)
  const [array, updateArray] = useState([])
  
  return (
    <div>
      {<FetchDeaths function={ updateArray } time={ time } /> }
      <Page title='Death Detail'>
        <div className='widgetGrid'>
          <Widget
            title={'Total Deaths'}
            stat={lastTotalDeaths}
            color={color.red}
          />
          <Widget
            title={'Daily Reported'}
            stat={lastDailyReportedDeath}
            color={color.red}
          />
          <Widget title={'SNF'} stat={lastSNFDeath} color={color.yellow} />
          <Widget title={'ALF'} stat={lastALFDeath} color={color.orange} />
          <Widget
            title={'Homeless'}
            stat={lastHomelessDeath}
            color={color.purple}
          />
          <Widget title={'Jail'} stat={lastJailDeath} color={color.orange} />
        </div>
        <Timeselect />
        <div id='chartGrid'>
          <Chart
            key='1'
            id='death1'
            date={array.map(a => a.date)}
            data={[array.map(b => b.total_dth_date)]}
            fill={[color.red]}
            title={'Total Deaths by Death Date'}
            label={['Deaths']}
            switches={['bar', 'line']}
          />
          <Chart
            key='8'
            id='death8'
            date={array.map(a => a.date)}
            data={[array.map(b => b.dailyDeathbyDate),array.map(b=>b.deathsByDate7Avg)]}
            fill={[color.red,color.blue]}
            title={'Daily Deaths by Date of Death'}
            label={['Deaths','7 Day Avg (Assuming 2 Week Data Lag)']}
            switches={['bar', 'line']}
          />
          <Chart
            key='2'
            id='death2'
            date={ array.map(a => a.date) }
            data={ [array.map(b => b.total_dth_repo)] }
            fill={ [color.yellow]}
            title={'Total Deaths by Reported'}
            label={['Deaths']}
            switches={['bar', 'line']}
          />


          <Chart
            key='3'
            id='death3'
            date={array.map(a => a.date)}
            data={[array.map(b => b.daily_death_repo)]}
            fill={[color.yellow]}
            title={'Daily Deaths Reported'}
            label={['Deaths']}
            switches={['bar', 'line']}
          />



          <Chart
            key='4'
            id='death4'
            date={array.map(a => a.date)}
            data={[array.map(b => b.snf)]}
            fill={[color.pink]}
            title={'Skilled Nursing Facility Deaths'}
            label={['Deaths']}
            switches={['bar', 'line']}
          />
          <Chart
            key='5'
            id='death5'
            date={array.map(a => a.date)}
            data={[array.map(b => b.alf_dth)]}
            fill={[color.orange]}
            title={'Assisted Living Facility Deaths'}
            label={['Deaths']}
            switches={['bar', 'line']}
          />
          <Chart
            key='6'
            id='death6'
            date={array.map(a => a.date)}
            data={[array.map(b => b.homeless)]}
            fill={[color.purple]}
            title={'Homeless Deaths'}
            label={['Deaths']}
            switches={['bar', 'line']}
          />
        </div>
      </Page>
    </div>
  )
}

export default Deaths
