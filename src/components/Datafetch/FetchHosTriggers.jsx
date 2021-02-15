import React from 'react';
import { HosTriggerURL } from 'globalVars/Sources'
import TimeContext from 'components/TimeContext'
import filtertime from 'components/Timefilter.js'
import { useContext, useState, useEffect, createContext } from 'react'
import average7 from 'components/Average7'

    let thisDataArray = [];
    const FetchHosTriggers = (props) => {
      useEffect( async () => {
          thisDataArray = [];    
          await fetch(HosTriggerURL).then(response => response.json())
          .then(grab => grab.features)
          .then((a)=> {
            let temp = [...a]
            let pos7Avg = average7(temp.map(a => a.attributes.test_pos_cdph));
            //console.log("file: FetchHosTriggers.jsx ~ line 16 ~ .then ~ temp", temp)
            temp.forEach((row,i) => {       
                thisDataArray.push({
                    date: new Date(row.attributes.date).toLocaleDateString(),
                    hospitalChange: row.attributes.hosp_chnge_cdph,
                    bedsAvailAdj: row.attributes.icu_avail_adj,
                    bedAvailUnaAdj: row.attributes.icu_avail_unadj,
                    testPos: row.attributes.test_pos_cdph,
                    pos7Avg: pos7Avg[i],
                    ventsAvail: row.attributes.vent_avail_cdph,

                })
            })
            //console.log(thisDataArray)
          })
          .then(() => filtertime(thisDataArray,props.time))
          .then(final => props.function(final))
      },[props.time])
    
      return (<>
    
      </>);
    }
    
    
    export {FetchHosTriggers}