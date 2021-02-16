import { useEffect } from 'react'
import filtertime from 'components/Timefilter.js'
import moment from 'moment'
import vaccineArray from './vaccineArray.js'
import average7 from 'components/Average7';

const VaccineHistory = (props) => {
    useEffect(() => {
        let transVaxArray = [];
        let vax7Avg = average7(vaccineArray.map(a => a[1]));

        vaccineArray.forEach((row, i) => {
            let parseDate = moment(new Date(row[0])).format('l');
            transVaxArray.push({
                date: parseDate,
                vax: row[1],
                vax7Avg: vax7Avg[i],
            })
        });
        props.function(filtertime(transVaxArray, props.time))
    }, [props.time])

    return (<>

    </>);
}

export default VaccineHistory;
