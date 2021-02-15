import { HosURL } from 'globalVars/Sources'
import TimeContext from 'components/TimeContext'
import filtertime from 'components/Timefilter.js'
import { useContext, useState, useEffect, createContext } from 'react'
import average7 from 'components/Average7'


let fullCaseArray = [];
const FetchHospitals = (props) => {
  useEffect( async () => {
      fullCaseArray = [];
      
      await fetch(HosURL).then(response => response.json())
      .then(grab => grab.features)
      .then((a)=> {
        let temp = [...a]
        let hos7Avg = average7(temp.map(a => a.attributes.hospital));
        let icu7Avg = average7(temp.map(a => a.attributes.icu));
        let hosChangeArray = [];
        let icuChangeArray = [];
       
        // Manual Array Calculations
        temp.forEach((row,i) => {
            let changeHos
            let changeICU
            if (i >= 1 && row.attributes.hospital) {
                changeHos = row.attributes.hospital - temp[i - 1].attributes.hospital;
            } else {
                changeHos = null;
            }
            if (i >= 1 && row.attributes.icu) {
                changeICU = row.attributes.icu - temp[i - 1].attributes.icu;
            } else {
                changeICU = null;
            }
            hosChangeArray.push(changeHos);
            icuChangeArray.push(changeICU);
        })
        let dailyHosChangeAvg =  average7(hosChangeArray);
        let dailyICUChangeAvg =  average7(icuChangeArray);


        temp.forEach((row,i) => {   
        if (row.attributes.hospital) {
            fullCaseArray.push({
                date: new Date(row.attributes.date).toLocaleDateString(),
                hospital: row.attributes.hospital,
                icu: row.attributes.icu,
                hosChange: hosChangeArray[i],
                icuChange: icuChangeArray[i],
                hos7Avg: hos7Avg[i],
                dailyHosAvg: dailyHosChangeAvg[i],
                dailyICUAvg: dailyICUChangeAvg[i]
              })
        }
        })
      })
      .then(() => filtertime(fullCaseArray,props.time))
      .then(final => props.function(final))
  },[props.time])

  return (<>

  </>);
}


export {FetchHospitals}
