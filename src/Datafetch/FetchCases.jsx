import { CasesURL } from 'globalVars/Sources'
import filtertime from 'components/Timefilter.js'
import { useEffect } from 'react'
import average7 from 'components/Average7'

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
        let dailyReportedAvg7 = average7(temp.map(a => a.attributes.daily_cases_repo))
        temp.forEach((row,i) => {
          thisDataArray.push({
            date: new Date(row.attributes.Date).toLocaleDateString(),
            daily7DayAvg: parseInt(row.attributes.daily_7day_avg),
            dailyCasesReported: parseInt(row.attributes.daily_cases_repo),
            dailyCasesReported7DayAvg: dailyReportedAvg7[i],
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
