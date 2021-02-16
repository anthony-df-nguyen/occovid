import React from 'react'
import { HosTriggerURL } from 'globalVars/Sources'
import filtertime from 'components/Timefilter.js'
import { useEffect } from 'react'
import average7 from 'components/Average7'

let thisDataArray = []
let lastHosRateChange, lastVentsAvailable, lastBedsAdj, lastBedsUnadj, lastTPP
const FetchHosTriggers = props => {
  useEffect(async () => {
    thisDataArray = []
    await fetch(HosTriggerURL)
      .then(response => response.json())
      .then(grab => grab.features)
      .then(a => {
        let temp = [...a]
        let pos7Avg = average7(temp.map(a => a.attributes.test_pos_cdph))
        //console.log("file: FetchHosTriggers.jsx ~ line 16 ~ .then ~ temp", temp)
        temp.forEach((row, i) => {
          thisDataArray.push({
            date: new Date(row.attributes.date).toLocaleDateString(),
            hospitalChange: parseInt(row.attributes.hosp_chnge_cdph),
            bedsAvailAdj: parseInt(row.attributes.icu_avail_adj),
            bedAvailUnaAdj: parseInt(row.attributes.icu_avail_unadj),
            testPos: parseInt(row.attributes.test_pos_cdph),
            pos7Avg: pos7Avg[i],
            ventsAvail: parseInt(row.attributes.vent_avail_cdph)
          })
        })
      })
      .then(() => {
        thisDataArray.forEach(a => {
          if (a.hospitalChange) {
            lastHosRateChange = a.hospitalChange.toLocaleString()
          }
          if (a.ventsAvail) {
            lastVentsAvailable = a.ventsAvail.toLocaleString()
          }
          if (a.bedsAvailAdj) {
            lastBedsAdj = a.bedsAvailAdj.toLocaleString()
          }
          if (a.bedAvailUnaAdj) {
            lastBedsUnadj = a.bedAvailUnaAdj.toLocaleString()
          }
          if (a.testPos) {
            lastTPP = a.testPos.toLocaleString()
          }
        })
      })
      .then(() => filtertime(thisDataArray, props.time))
      .then(final => props.function(final))
  }, [props.time])

  return <></>
}

export {
  FetchHosTriggers,
  lastHosRateChange,
  lastVentsAvailable,
  lastBedsAdj,
  lastBedsUnadj,
  lastTPP
}
