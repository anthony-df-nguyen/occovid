import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import color from 'globalVars/Colors'
import Chartselect from 'components/Chartselect'
import Timeselect from 'components/Timeselect'
import TimeContext from 'components/TimeContext'
import Widget from 'components/Widget'
import { ocpop } from 'globalVars/populations';
import {
  FetchCases,
  lastTotalCases,
  lastDailyReported,
  lastRecovered,
  lastHomeless,
  lastJail,
  lastSNF
} from 'components/Datafetch/FetchCases'
import {
  FetchDeaths,
  lastTotalDeaths,
  lastDailyReportedDeath,
  lastSNFDeath,
  lastALFDeath,
  lastHomelessDeath,
  lastJailDeath
} from 'components/Datafetch/FetchDeaths'
import {
  FetchHospitals,
  lastHos,
  lastICU
} from 'components/Datafetch/FetchHospitals'
import {
  FetchHosTriggers,
  lastHosRateChange,
  lastVentsAvailable,
  lastBedsAdj,
  lastBedsUnadj
} from 'components/Datafetch/FetchHosTriggers'
import { FetchVaccines } from 'components/Datafetch/FetchVaccines';
import { FetchTesting, lastTotalPCR, lastDailyTests } from 'components/Datafetch/FetchTesting'


const Home = props => {
  const { time, setTime } = useContext(TimeContext)
  const [array, updateArray] = useState([])
  const [array2, update2Array] = useState([])
  const [array3, update3Array] = useState([])
  const [array4, update4Array] = useState([])
  const [array5, update5Array] = useState([])
  const [array6, update6Array] = useState([])
  const [asof, peopleOneDose, peopleTwoDose, totalPeople, adminOneDose, adminTwoDose, totalAdmin, female, male, otherSex, asianPI, black, hispanic, white, otherRace, age017, age1824, age2534, age3544, age4554, age5564, age6574yrs, age7584, age85, ageUnknown, moderna, pfizer, unknownTrade] = array5;

  const totalPPL = parseInt(totalPeople);
  const totallPPLPerc = parseFloat((totalPPL / ocpop) * 100).toFixed(1)
  return (
    <div className='page'>
      <FetchCases function={ updateArray } time={ time } />
      <FetchDeaths function={ update2Array } time={ time } />
      <FetchHosTriggers function={ update3Array } time={ time } />
      <FetchHospitals function={ update4Array } time={ time } />
      <FetchVaccines function={ update5Array } time={ time } />
      <FetchTesting function={ update6Array } time={ time } />
      <div className='homeWidgetGrid'>
        <Link to='/cases' >  <div id="item1">
          <div className="innerDiv">
            <div className="widgetTitle t1">Cases</div>
            <div className="subFlex">
              <Widget
                title={ 'Total Cases' }
                stat={ lastTotalCases }
                color={ color.gold }
              />
              <Widget
                title={ 'Daily Reported' }
                stat={ lastDailyReported }
                color={ color.red }
              />
              <Widget title={ 'Recovered' } stat={ lastRecovered } color={ color.blue } />
              <Widget
                title={ 'Homeless Cases' }
                stat={ lastHomeless }
                color={ color.purple }
              />
              <Widget title={ 'Jail Cases' } stat={ lastJail } color={ color.yellow } />
              <Widget title={ 'SNF Cases' } stat={ lastSNF } color={ color.pink } />
            </div>
          </div>
        </div></Link>
        <Link to='/deaths'>
          <div id="item2">
            <div className="innerDiv">
              <div className="widgetTitle t2">Deaths</div>
              <div className="subFlex">
                <Widget
                  title={ 'Total Deaths' }
                  stat={ lastTotalDeaths }
                  color={ color.red }
                />
                <Widget
                  title={ 'Daily Reported' }
                  stat={ lastDailyReportedDeath }
                  color={ color.red }
                />
                <Widget title={ 'SNF' } stat={ lastSNFDeath } color={ color.yellow } />
                <Widget title={ 'ALF' } stat={ lastALFDeath } color={ color.orange } />
                <Widget title={ 'Homeless' } stat={ lastHomelessDeath } color={ color.purple } />
                <Widget title={ 'Jail' } stat={ lastJailDeath } color={ color.orange } />
              </div>
            </div>
          </div>
        </Link>
        <Link to='/hospitalizations'>
          <div id="item3">
            <div className="innerDiv">
              <div id="hosWidget">
                <div className="widgetTitle t3">Hospitalized</div>
                <div className="subFlex">
                  <Widget title={ 'Hospitalized' } stat={ lastHos } color={ color.yellow } />
                  <Widget title={ 'ICU' } stat={ lastICU } color={ color.red } />
                  <Widget
                    title={ 'Change in 3 Day Avg' }
                    stat={ lastHosRateChange }
                    color={ color.purple }
                  />
                  <Widget
                    title={ 'Vents Available' }
                    stat={ lastVentsAvailable + '%' }
                    color={ color.blue }
                  />
                  <Widget
                    title={ 'Bed Avail. Adjusted' }
                    stat={ lastBedsAdj }
                    color={ color.red }
                  />
                  <Widget
                    title={ 'Beds Avail. Unadjusted' }
                    stat={ lastBedsUnadj }
                    color={ color.red }
                  />
                </div>
              </div>
            </div>

          </div>
        </Link>
        <Link to='/vaccinations'>
          <div id="item4">
            <div className="innerDiv">
              <div id="hosWidget">
                <div className="widgetTitle t4">Vaccinated</div>
                <div className="subFlex">
                  <Widget title={ "OC Population" } stat={ ocpop.toLocaleString() }
                    color={ color.blue } />
                  <Widget title={ "Total People Vaccinated" } stat={ `${totalPPL.toLocaleString()} | ${totallPPLPerc}%` }
                    color={ color.green } />
                  <Widget title={ "People: 1st Dose Only" } stat={ parseInt(peopleOneDose).toLocaleString() }
                    color={ color.green } />
                  <Widget title={ "People: 1st & 2nd Dose" } stat={ parseInt(peopleTwoDose).toLocaleString() }
                    color={ color.green } />
                  <Widget title={ "Total Administered" } stat={ parseInt(totalAdmin).toLocaleString() }
                    color={ color.purple } />
                  <Widget title={ "1st Dose Administered" } stat={ parseInt(adminOneDose).toLocaleString() }
                    color={ color.purple } />
                  <Widget title={ "2nd Dose Administered" } stat={ parseInt(adminTwoDose).toLocaleString() }
                    color={ color.purple } />
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
                  <Widget title={ "Total PCR Tests" } stat={ lastTotalPCR }
                    color={ color.blue } />
                  <Widget title={ "Daily Tests Received" } stat={ lastDailyTests }
                    color={ color.green } />
                </div>
              </div>
            </div>

          </div>
        </Link>



      </div>


    </div>
  )
}

export default Home
