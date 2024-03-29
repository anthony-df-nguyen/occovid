import React from 'react'
import { HosTriggerURL } from 'globalVars/Sources'
import filtertime from 'components/Timefilter.js'
import { useEffect } from 'react'
import average7 from 'components/Average7'
import { getDefaultNormalizer } from '@testing-library/dom'

let thisDataArray = []
let lastHosRateChange, lastVentsAvailable, lastBedsAdj, lastBedsUnadj, lastTPP
const FetchHosTriggers = props => {


  return <>
    {
      useEffect(async () => {
        let mounted = true;
        const getData = async () => {
          thisDataArray = [];
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
                  hospitalChange: parseFloat(row.attributes.hosp_chnge_cdph),
                  bedsAvailAdj: parseFloat(row.attributes.icu_avail_adj),
                  bedAvailUnaAdj: parseFloat(row.attributes.icu_avail_unadj),
                  testPos: parseFloat(row.attributes.test_pos_cdph),
                  pos7Avg: pos7Avg[i],
                  ventsAvail: parseFloat(row.attributes.vent_avail_cdph)
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
            .then(final => {
              if (mounted) {
                props.function(final)
              }
            })
        }
        if (mounted) {
          try { getData() }
          catch (err) {
            console.log("Could not getch Hos triggers")
            console.log(err)
          }
        }
        return () => {
          mounted = false;
        }
      }, [props.time])
     }
  </>
}

export {
  FetchHosTriggers,
  lastHosRateChange,
  lastVentsAvailable,
  lastBedsAdj,
  lastBedsUnadj,
  lastTPP
}
