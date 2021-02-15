import { DeathsURL } from 'globalVars/Sources'
import TimeContext from 'components/TimeContext'
import filtertime from 'components/Timefilter.js'
import { useContext, useState, useEffect, createContext } from 'react'


let fullCaseArray = [];
const FetchDeaths = (props) => {
  useEffect( async () => {
      fullCaseArray = [];
      await fetch(DeathsURL).then(response => response.json())
      .then(grab => grab.features)
      .then((a)=> {
        let temp = [...a]
        console.log(temp)
        temp.forEach(row => {
          fullCaseArray.push({
            date: new Date(row.attributes.date).toLocaleDateString(),
            alf_dth: row.attributes.alf_dth,
            daily_death: row.attributes.daily_dth,
            dth_date: row.attributes.daily_death,
            homeless: row.attributes.homeless_dth,
            snf: row.attributes.snf_dth,
            jail: row.attributes.jail_dth,
            new_daily_dth_date: row.attributes.new_daily_dth_date,
            total_dth: row.attributes.total_dth,
            total_dth_date: row.attributes.total_dth_date
          })
        })
      })
      .then(() => filtertime(fullCaseArray,props.time))
      .then(final => props.function(final))
  },[props.time])

  return (<>

  </>);
}


export {FetchDeaths}
