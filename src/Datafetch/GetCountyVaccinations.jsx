

import TimeFilterForCounties from 'components/TimeFilterForCounties.js'
import { useEffect } from 'react'
import average7 from 'components/Average7'

const GetCountyVax = props => {
    let thisDataArray = [];
    return <>
        {
            useEffect(() => {
                let mounted = true
                let selectedCounty = props.county;
                //console.log('The county has changed to ', selectedCounty);
                let url = `https://raw.githubusercontent.com/datadesk/california-coronavirus-data/master/cdph-vaccination-county-totals.csv`
                const getData = async () => {
                    thisDataArray = []
                    await fetch(url)
                        .then(response => response.text())
                        .then(grab => grab)
                        .then(a => {
                            let temp = [...a]
                            console.log(temp)
                          temp.forEach((row, i) => {
                                thisDataArray.push({
                                    date: new Date(row.todays_date).toLocaleDateString(),
                                    hospitalized: row.hospitalized_covid_confirmed_patients,
                                    icu: row.icu_covid_confirmed_patients,
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
                        console.log("Could not fetch county hospital data")
                        console.log(err)
                    }
                }
                return () => {
                    mounted = false;
                }

            }, [props.county, props.time,props.mode])
        }</>
}

export default GetCountyVax
