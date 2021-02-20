import { DeathsURL } from 'globalVars/Sources'
import filtertime from 'components/Timefilter.js'
import { useEffect } from 'react'
import average7 from 'components/Average7'

let thisDataArray = []
let lastTotalDeaths, lastDailyReportedDeath, lastSNFDeath, lastALFDeath, lastHomelessDeath, lastJailDeath

const FetchDeaths = props => {
  return <>
    {
      useEffect(() => {
        //console.log('running the death fetcher')
        let mounted = true;
        const getData = async () => await fetch(DeathsURL)
          .then(response => response.json())
          .then(grab => grab.features)
          .then(a => {
            let temp = [...a]
            let deathsReported7DayAvg = average7(temp.map(a => a.attributes.daily_dth))
            //Average 7 Day Deaths by Date of Death but remove last 14 days because of reporting lag
            let deathsByDate7Avg = average7(temp.map(a => a.attributes.dth_date))
            for (let i = 1; i < 14; i++) {
              deathsByDate7Avg.pop();
            }
            temp.forEach((row, i) => {
              thisDataArray.push({
                date: new Date(row.attributes.date).toLocaleDateString(),
                alf_dth: parseInt(row.attributes.alf_dth),
                daily_death_repo: parseInt(row.attributes.daily_dth),
                dailyDeath7DayAvg: deathsReported7DayAvg[i],
                dth_date: parseInt(row.attributes.daily_death),
                dailyDeathbyDate: parseInt(row.attributes.dth_date),
                deathsByDate7Avg: deathsByDate7Avg[i],
                homeless: parseInt(row.attributes.homeless_dth),
                snf: parseInt(row.attributes.snf_dth),
                jail: parseInt(row.attributes.jail_dth),
                new_daily_dth_date: parseInt(row.attributes.new_daily_dth_date),
                total_dth_repo: parseInt(row.attributes.total_dth),
                total_dth_date: parseInt(row.attributes.total_dth_date)
              })
            })
          })
          .then(() => {
            //console.log(thisDataArray)
            thisDataArray.forEach(a => {
              if (a.total_dth_repo) {
                lastTotalDeaths = a.total_dth_repo.toLocaleString()
              }
              if (a.daily_death_repo) {
                lastDailyReportedDeath = a.daily_death_repo.toLocaleString()
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
          .then(final => {
            if (mounted) {
              //console.log('still mounted')
              props.function(final)
            }

          })
        if (mounted) {
          thisDataArray = []
         
          try {
            getData();
          } catch (err) {
            console.log("Could not fetch deaths")
            console.log(err)
          }


        }
        return () => {
          //console.log('Cleaning up deaths')
          mounted = false
        }
      }, [props.time]) }
  </>
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
