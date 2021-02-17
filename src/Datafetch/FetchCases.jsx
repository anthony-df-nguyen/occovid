import { CasesURL } from 'globalVars/Sources'
import filtertime from 'components/Timefilter.js'
import { useEffect } from 'react'

let thisDataArray = []
let lastTotalCases,
  lastDailyReported,
  lastRecovered,
  lastHomeless,
  lastJail,
  lastSNF

const FetchCases = props => {
  useEffect(async () => {
    thisDataArray = []
    await fetch(CasesURL)
      .then(response => response.json())
      .then(grab => grab.features)
      .then(a => {
        let temp = [...a]
        temp.forEach(row => {
          thisDataArray.push({
            date: new Date(row.attributes.Date).toLocaleDateString(),
            daily7DayAvg: parseInt(row.attributes.daily_7day_avg),
            dailyCasesReported: parseInt(row.attributes.daily_cases_repo),
            dailyCasesbySpecimen: parseInt(row.attributes.daily_cases_spec),
            homelessCases: parseInt(row.attributes.homeless_cases),
            jailCases: parseInt(row.attributes.jail_cases),
            newDailyCasesbySpecimen: parseInt(
              row.attributes.new_daily_cases_spec
            ),
            recovered: parseInt(row.attributes.recovered),
            snfCases: parseInt(row.attributes.snf_cases),
            totalCasesReported: parseInt(row.attributes.total_cases_repo),
            totalCasesbySpecimen: parseInt(row.attributes.total_cases_spec),
            totalDeaths: parseInt(row.attributes.total_dth)
          })
        })
      })
      .then(() => {
        thisDataArray.forEach(a => {
          if (a.totalCasesReported) {
            lastTotalCases = a.totalCasesReported.toLocaleString()
          }
          if (a.dailyCasesReported) {
            lastDailyReported = a.dailyCasesReported.toLocaleString()
          }
          if (a.recovered) {
            lastRecovered = a.recovered.toLocaleString()
          }
          if (a.homelessCases) {
            lastHomeless = a.homelessCases.toLocaleString()
          }
          if (a.jailCases) {
            lastJail = a.jailCases.toLocaleString()
          }
          if (a.snfCases) {
            lastSNF = a.snfCases.toLocaleString()
          }
        })
      })
      .then(() => filtertime(thisDataArray, props.time))
      .then(final => {
        //console.log(final)
        props.function(final)
      })
  }, [props.time])

  return <></>
}

export {
  FetchCases,
  lastTotalCases,
  lastDailyReported,
  lastRecovered,
  lastHomeless,
  lastJail,
  lastSNF
}
