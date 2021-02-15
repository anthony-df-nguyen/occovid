import { CasesURL } from 'globalVars/Sources'
import TimeContext from 'components/TimeContext'
import filtertime from 'components/Timefilter.js'
import { useContext, useState, useEffect, createContext } from 'react'


let fullCaseArray = [];
const FetchCases = (props) => {
  useEffect( async () => {
      fullCaseArray = [];
      await fetch(CasesURL).then(response => response.json())
      .then(grab => grab.features)
      .then((a)=> {
        let temp = [...a]
        temp.forEach(row => {
          fullCaseArray.push({
            date: new Date(row.attributes.Date).toLocaleDateString(),
            daily7DayAvg: row.attributes.daily_7day_avg,
            dailyCasesReported: row.attributes.daily_cases_repo,
            dailyCasesbySpecimen: row.attributes.daily_cases_spec,
            homelessCases: row.attributes.homeless_cases,
            jailCases: row.attributes.jail_cases,
            newDailyCasesbySpecimen: row.attributes.new_daily_cases_spec,
            recovered: row.attributes.recovered,
            snfCases: row.attributes.snf_cases,
            totalCasesReported: row.attributes.total_cases_repo,
            totalCasesbySpecimen: row.attributes.total_cases_spec,
            totalDeaths: row.attributes.total_dth
          })
        })
      })
      .then(() => filtertime(fullCaseArray,props.time))
      .then(final => props.function(final))
  },[props.time])

  return (<>

  </>);
}


export { FetchCases }
