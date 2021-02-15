
//import TimeContext from 'components/TimeContext'
//import filtertime from 'components/Timefilter.js'
import { DeathDemographics } from 'globalVars/Sources'
import { useContext, useState, useEffect, createContext } from 'react'


let thisDataArray = [];

const FetchDeathDemo = (props) => {

    useEffect( async () => {
        thisDataArray = [];
        await fetch(DeathDemographics).then(response => response.json())
        .then(a => thisDataArray = a.features[0].attributes)
        .then(()=> {
            props.function(thisDataArray)
        })
    },[])

  return (<>

  </>);
}


export { FetchDeathDemo }
