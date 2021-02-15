
//import TimeContext from 'components/TimeContext'
//import filtertime from 'components/Timefilter.js'
import { useContext, useState, useEffect, createContext } from 'react'


let fullCaseArray = [];
let vaccineDataTable;

const FetchVaccines = (props) => {
    let vaccineData 
  
    useEffect( async () => {
        fullCaseArray = [];
        await fetch('/manualdatasources/vaccine.csv').then(response => response.text())
        .then(grab => vaccineData = grab)
        .then(()=> {
        vaccineDataTable = vaccineData.split("\n").slice(1);
        })
        .then(()=> {
        vaccineDataTable.forEach((a) => {
            let col = a.split(",");
            fullCaseArray = [...col];
        });
        })
        .then(() => {
            props.function(fullCaseArray);
        })
    },[props.time])

  return (<>

  </>);
}


export { FetchVaccines }
