import { CasesURL } from 'globalVars/Sources'
import filtertime from 'components/Timefilter.js'
import { useEffect } from 'react'
import average7 from 'components/Average7'

const GetCountyCasesAndDeaths = props => {
    let thisDataArray = [];
    useEffect(async () => {
        let selectedCounty = props.county;
        //console.log('The county has changed to ', selectedCounty);
        let url = `https://data.ca.gov/api/3/action/datastore_search?resource_id=926fd08f-cc91-4828-af38-bd45de97f8c3&q=${selectedCounty}&limit=10000`
        thisDataArray = []
        await fetch(url)
            .then(response => response.json())
            .then(grab => grab.result.records)
            .then(a => {
                let temp = [...a]
                //let dailyReportedAvg7 = average7(temp.map(a => a.attributes.daily_cases_repo))
                temp.forEach((row, i) => {
                    thisDataArray.push({
                        date: new Date(row.date).toLocaleDateString(),
                        newDeaths: row.newcountdeaths,
                        newCases: row.newcountconfirmed,
                        totalCases: row.totalcountconfirmed,
                        totalDeaths: row.totalcountdeaths
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

export default GetCountyCasesAndDeaths
