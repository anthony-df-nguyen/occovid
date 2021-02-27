import TimeFilterForCounties from 'components/TimeFilterForCounties.js'
import { useEffect } from 'react'
import average7 from 'components/Average7'
import moment from "moment";

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
                        .then(grab => {
                            let split = grab.split('\n').slice(1)
                            //Remove the last empty row
                            split.pop();
                            split.forEach(row => {
                                let col = row.split(',')
                                const [date, county, , doses, newDoses] = col;
                                
                                const parseDate = moment(new Date(date+"T00:00:00")).format('L');
                                if (county == selectedCounty) {
                                    thisDataArray.push({
                                        date: parseDate,
                                        county: county,
                                        doses: parseInt(doses),
                                    })
                                }
                            })
                            //console.log(thisDataArray)
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
