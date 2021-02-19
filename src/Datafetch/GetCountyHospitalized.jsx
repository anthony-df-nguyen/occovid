import { CasesURL } from 'globalVars/Sources'
import filtertime from 'components/Timefilter.js'
import { useEffect } from 'react'
import average7 from 'components/Average7'

const GetCountyHospitalized = props => {
    let thisDataArray = [];
    useEffect(async () => {
        let selectedCounty = props.county;
        //console.log('The county has changed to ', selectedCounty);
        let url = `https://data.ca.gov/api/3/action/datastore_search?resource_id=42d33765-20fd-44b8-a978-b083b7542225&q=${selectedCounty}&limit=10000`
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
                props.function(final)
            })
    }, [props.county, props.time])

    return <></>
}

export default GetCountyHospitalized
