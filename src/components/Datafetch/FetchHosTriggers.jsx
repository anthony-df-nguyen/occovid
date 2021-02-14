import React from 'react';
import { HosTriggerURL } from 'Sources'
import TimeContext from 'components/TimeContext'
import filtertime from 'components/Timefilter.js'
import { useContext, useState, useEffect, createContext } from 'react'
import average7 from 'components/Average7'

    let fullCaseArray = [];
    const FetchHosTriggers = (props) => {
      useEffect( async () => {
          fullCaseArray = [];    
          await fetch(HosTriggerURL).then(response => response.json())
          .then(grab => grab.features)
          .then((a)=> {
            let temp = [...a]
            console.log("file: FetchHosTriggers.jsx ~ line 16 ~ .then ~ temp", temp)
            temp.forEach((row,i) => {       
                fullCaseArray.push({
                    date: new Date(row.attributes.date).toLocaleDateString(),
                    hospitalChange: row.attributes.hosp_chnge_cdph,
                    bedsAvailAdj: row.attributes.icu_avail_adj,
                    bedAvailUnaAdj: row.attributes.icu_avail_unadj,
                    testPos: row.attributes.test_pos_cdph,
                    ventsAvail: row.attributes.vent_avail_cdph,
                })
            })
            //console.log(fullCaseArray)
          })
          .then(() => filtertime(fullCaseArray,props.time))
          .then(final => props.function(final))
      },[props.time])
    
      return (<>
    
      </>);
    }
    
    
    export {FetchHosTriggers}