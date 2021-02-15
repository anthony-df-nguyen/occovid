import { CAMetrics } from 'globalVars/Sources'
import TimeContext from 'components/TimeContext'
import filtertime from 'components/Timefilter.js'
import { useContext, useState, useEffect, createContext } from 'react'


let thisDataArray = [];
const FetchCAMetrics = (props) => {
  useEffect( async () => {
      thisDataArray = [];
      await fetch(CAMetrics).then(response => response.json())
      .then(grab => grab.features)
      .then((a)=> {
        let temp = [...a]
        console.log(temp)
        temp.forEach(row => {
          thisDataArray.push({
            date: new Date(row.attributes.date).toLocaleDateString(),
            cdph_tpp: row.attributes.cdph_tpp,
            daily_7day_avg: row.attributes.daily_7day_avg,
            daily_neg_spec: row.attributes.daily_neg_spec,
            daily_pos_spec: row.attributes.daily_pos_spec,
            daily_spec: row.attributes.daily_spec,
            daily_test_repo: row.attributes.daily_test_repo,
            tot_pcr_pos: row.attributes.tot_pcr_pos,
            tot_spec: row.attributes.tot_spec,
            cumuTestbySpec: row.attributes.tot_test_repo,
          })
        })
      })
      .then(() => filtertime(thisDataArray,props.time))
      .then(final => props.function(final))
  },[props.time])

  return (<>

  </>);
}


export {FetchCAMetrics}
