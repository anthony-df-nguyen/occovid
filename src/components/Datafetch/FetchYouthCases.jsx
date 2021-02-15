import React from 'react'
import { YouthCases } from 'globalVars/Sources'
import { useContext, useState, useEffect, createContext } from 'react'

let thisDataArray = []
const FetchYouthCases = props => {
  useEffect(async () => {
    thisDataArray = []
    await fetch(YouthCases)
      .then(response => response.json())
      .then(a => (thisDataArray = a.features.map(b => b.attributes)))
      .then(() => {
        const age03 = thisDataArray[3].Cumulative
        const age49 = thisDataArray[4].Cumulative
        const age1012 = thisDataArray[5].Cumulative
        const age1314 = thisDataArray[6].Cumulative
        const age1518 = thisDataArray[7].Cumulative
        let youthArray = [age03, age49, age1012, age1314, age1518]
        props.function(youthArray)
      })
  }, [])

  return <></>
}

export { FetchYouthCases }
