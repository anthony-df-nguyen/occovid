import { CasesURL } from 'globalVars/Sources'
import filtertime from 'components/Timefilter.js'
import { useEffect } from 'react'
import average7 from 'components/Average7'
import { getDefaultNormalizer } from '@testing-library/dom'

const GetCountyHospitalized = props => {
    let thisDataArray = [];
    return <>
        {
            useEffect(() => {
                let mounted = true
                let selectedCounty = props.county;
                //console.log('The county has changed to ', selectedCounty);
                let url = `https://data.ca.gov/api/3/action/datastore_search?resource_id=42d33765-20fd-44b8-a978-b083b7542225&q=${selectedCounty}&limit=10000`
                const getData = async () => {
                    thisDataArray = []
                    await fetch(url)
                        .then(response => response.json())
                        .then(grab => grab.result.records)
                        .then(a => {
                            let temp = [...a]
                            temp.forEach((row, i) => {
                                thisDataArray.push({
                                    date: new Date(row.todays_date).toLocaleDateString(),
                                    hospitalized: row.hospitalized_covid_confirmed_patients,
                                    icu: row.icu_covid_confirmed_patients,
                                })
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
                        console.log("Could not fetch county hospital data")
                        console.log(err)
                    }
                }
                return () => {
                    mounted = false;
                }

            }, [props.county, props.time])
        }</>
}

export default GetCountyHospitalized
