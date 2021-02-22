import { useEffect } from 'react'
import filtertime from 'components/Timefilter.js'
import moment from 'moment'
import vaccineArray from './vaccineArray.js'
import average7 from 'components/Average7';

const VaccineHistory = (props) => {
    let cumuVax = 0;

    return (<>
        {
            useEffect(() => {
                let mounted = true;
                const getData = async () => {
                    let transVaxArray = [];
                    let vax7Avg = average7(vaccineArray.map(a => a[1]));
                    vaccineArray.forEach((row, i) => {
                        let parseDate = moment(new Date(row[0])).format('l');
                        cumuVax +=row[1]
                        transVaxArray.push({
                            date: parseDate,
                            vax: row[1],
                            vax7Avg: vax7Avg[i],
                            cumuVax: cumuVax,
                        })
                    });
                    if (mounted) {
                        props.function(filtertime(transVaxArray, props.time))
                    }
                }
                if (mounted) {
                    try { getData() }
                    catch (err) {
                        console.log("Could not fetch vaccine history")
                        console.log(err)
                    }
                }
                return () => {
                    mounted = false
                }
            }, [props.time])
        }
    </>);
}

export default VaccineHistory;
