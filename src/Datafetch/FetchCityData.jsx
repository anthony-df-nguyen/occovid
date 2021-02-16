import { CityDataWithGeo } from 'globalVars/Sources'
import filtertime from 'components/Timefilter.js'
import { useEffect } from 'react'

let thisDataArray = []
const FetchCityData = props => {
  useEffect(async () => {
    thisDataArray = []
    await fetch(CityDataWithGeo)
      .then(response => response.json())
      .then(a => {
        thisDataArray = a.features.map(a => a.properties)
      })
      .then(() => {
        let unifiedArray = []
        thisDataArray.forEach(row => {
          if (row.City) {
            unifiedArray.push({
              city: row.City,
              caseRate: row.CaseRate ? row.CaseRate.toFixed(1) : 0,
              deathRate: row.DeathRate ? row.DeathRate.toFixed(1) : 0,
              totalCases: row.Tot_Cases,
              totalDeaths: row.Tot_Deaths,
              population: row.Total_Pop,
              snfCases: row.SNFCase,
              snfDeaths: row.SNFDth,
              Cases_0_3: row.Cases_0_3,
              Cases_0_17: row.Cases_0_17,
              Cases_0_18: row.Cases_0_18,
              Cases_4_9: row.Cases_4_9,
              Cases_10_12: row.Cases_10_12,
              Cases_13_14: row.Cases_13_14,
              Cases_15_18: row.Cases_15_18,
            })
          }
        })
        props.function(unifiedArray)
      })
  }, [props.time])

  return <></>
}

export { FetchCityData }
