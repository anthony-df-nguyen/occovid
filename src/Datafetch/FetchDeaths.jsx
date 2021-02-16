import { DeathsURL } from 'globalVars/Sources'
import filtertime from 'components/Timefilter.js'
import { useEffect } from 'react'

let thisDataArray = []
let lastTotalDeaths, lastDailyReportedDeath, lastSNFDeath, lastALFDeath, lastHomelessDeath, lastJailDeath

const FetchDeaths = props => {
  useEffect(async () => {
    thisDataArray = []
    await fetch(DeathsURL)
      .then(response => response.json())
      .then(grab => grab.features)
      .then(a => {
        let temp = [...a]
        temp.forEach(row => {
          thisDataArray.push({
            date: new Date(row.attributes.date).toLocaleDateString(),
            alf_dth: parseInt(row.attributes.alf_dth),
            daily_death: parseInt(row.attributes.daily_dth),
            dth_date: parseInt(row.attributes.daily_death),
            homeless: parseInt(row.attributes.homeless_dth),
            snf: parseInt(row.attributes.snf_dth),
            jail: parseInt(row.attributes.jail_dth),
            new_daily_dth_date: parseInt(row.attributes.new_daily_dth_date),
            total_dth: parseInt(row.attributes.total_dth),
            total_dth_date: parseInt(row.attributes.total_dth_date)
          })
        })
      })
      .then(() => {
        thisDataArray.forEach(a => {
          if (a.total_dth) {
            lastTotalDeaths = a.total_dth.toLocaleString()
          }
          if (a.daily_death) {
            lastDailyReportedDeath = a.daily_death.toLocaleString()
          }
          if (a.snf) {
            lastSNFDeath = a.snf.toLocaleString()
          }
          if (a.alf_dth) {
            lastALFDeath = a.alf_dth.toLocaleString()
          }
          if (a.homeless) {
            lastHomelessDeath = a.homeless.toLocaleString()
          }
          if (a.jail) {
            lastJailDeath = a.jail.toLocaleString()
          }
        })
      })
      .then(() => filtertime(thisDataArray, props.time))
      .then(final => props.function(final))
  }, [props.time])

  return <></>
}

export {
  FetchDeaths,
  lastTotalDeaths,
  lastDailyReportedDeath,
  lastSNFDeath,
  lastALFDeath,
  lastHomelessDeath,
  lastJailDeath
}
