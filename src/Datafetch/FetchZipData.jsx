import { ZipDataWithGeo } from 'globalVars/Sources'
import filtertime from 'components/Timefilter.js'
import { useEffect } from 'react'

let thisDataArray = []
const FetchZipData = props => {
    useEffect(async () => {
        thisDataArray = []
        await fetch(ZipDataWithGeo)
            .then(response => response.json())
            .then(a => {
                thisDataArray = a.features.map(a => a.properties)
            })
            .then(() => {
                let unifiedArray = []
                thisDataArray.forEach(row => {
                    if (row.ZIP) {
                        unifiedArray.push({
                            city: row.ZIP,
                            caseRate: row.tot_casrate ? row.tot_casrate.toFixed(1) : 0,
                            deathRate: row.tot_dthrate ? row.tot_dthrate.toFixed(1) : 0,
                            totalCases: row.tot_cas,
                            totalDeaths: row.tot_dth,
                            population: row.pop,
                            snfCases: row.SNF_Cases,
                            snfDeaths: row.SNF_Death,
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
                props.function(unifiedArray);
            })
    }, [props.time])

    return <></>
}

export { FetchZipData }
