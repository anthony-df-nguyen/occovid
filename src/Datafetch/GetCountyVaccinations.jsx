import TimeFilterForCounties from 'components/TimeFilterForCounties.js'
import { useEffect } from 'react'
import moment from "moment";

const GetCountyVax = props => {
    let thisDataArray = [];
    return <>
        {
            useEffect(() => {
                let mounted = true
                let selectedCounty = props.county;
                //console.log('The county has changed to ', selectedCounty);
                let url = `https://data.chhs.ca.gov/api/3/action/datastore_search?resource_id=130d7ba2-b6eb-438d-a412-741bde207e1c&q=${selectedCounty}&fields=cumulative_total_doses,administered_date,county&limit=10000`;
                const getData = async () => {
                    thisDataArray = []
                    await fetch(url)
                      .then((response) => response.json())
                      .then((grab) => {
                        const array = grab.result.records                       
                        array.forEach((row) => {
                          const county = row.county
                          const doses = row.cumulative_total_doses
                          const date = row.administered_date;

                          const parseDate = moment(
                            new Date(date + "T00:00:00")
                          ).format("L");
                          if (county === selectedCounty) {
                            thisDataArray.push({
                              date: parseDate,
                              county: county,
                              doses: parseInt(doses),
                            });
                          }
                        });
                      })
                      .then(() =>
                        TimeFilterForCounties(
                          thisDataArray,
                          props.time,
                          props.mode
                        )
                      )
                      .then((final) => {
                        if (mounted) {
                          props.function(final);
                        }
                      });
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
