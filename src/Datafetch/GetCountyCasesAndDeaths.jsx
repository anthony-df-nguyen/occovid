import { CasesURL } from 'globalVars/Sources'
import TimeFilterForCounties from 'components/TimeFilterForCounties.js'
import { useEffect } from 'react'
import average7 from 'components/Average7'

const GetCountyCasesAndDeaths = props => {
    let thisDataArray = [];
    return <>
        {
            useEffect(() => {
                let mounted = true;
                let selectedCounty = props.county;
                //console.log('The county has changed to ', selectedCounty);
                let url = `https://data.ca.gov/api/3/action/datastore_search?resource_id=926fd08f-cc91-4828-af38-bd45de97f8c3&q=${selectedCounty}&limit=10000`
                thisDataArray = []
                const getData = async () => {
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
                        .then(() => TimeFilterForCounties(thisDataArray, props.time,props.mode))
                        .then(final => {
                            if (mounted) {
                                props.function(final)
                            }
                        })
                }
                if (mounted) {
                    try { getData() }
                    catch (err) {
                        console.log("Could not fetch county case/death data")
                        console.log(err)
                    }
                }
                return () => {
                    mounted = false;
                }

            }, [props.county, props.time,props.mode])
    }</>
}

export default GetCountyCasesAndDeaths