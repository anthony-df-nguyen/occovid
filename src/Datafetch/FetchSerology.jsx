import { SeroTestURL } from 'globalVars/Sources'
import filtertime from 'components/Timefilter.js'
import { useEffect } from 'react'


let thisDataArray = [];
let lastTotalSero, lastDailySero, lastPosSero
const FetchSerology = (props) => {
    useEffect(async () => {
        thisDataArray = [];
        await fetch(SeroTestURL).then(response => response.json())
            .then(grab => grab.features)
            .then((a) => {
                let temp = [...a]
                //console.log("file: FetchSerology.jsx ~ line 15 ~ .then ~ temp", temp)
                temp.forEach(row => {
                    thisDataArray.push({
                        date: new Date(row.attributes.date).toLocaleDateString(),
                        totalSeroTest: parseInt(row.attributes.sero_total),
                        dailySeroSpec: parseInt(row.attributes.sero_daily),
                        seroPosPerc: parseFloat(row.attributes.sero_pos_perc_total).toFixed(1),
                    })
                })
            })
            .then(() => {
                thisDataArray.forEach(a => {
                    if (a.totalSeroTest) {
                        lastTotalSero = a.totalSeroTest.toLocaleString()
                    }
                    if (a.dailySeroSpec) {
                        lastDailySero = a.dailySeroSpec.toLocaleString()
                    }
                    if (a.seroPosPerc !== "NaN" && a.seroPosPerc) {
                        lastPosSero = a.seroPosPerc;
                    }
                })
            })
            .then(() => filtertime(thisDataArray, props.time))
            .then(final => {
                props.function(final)
            })
    }, [props.time])

    return (<>

    </>);
}


export { FetchSerology, lastTotalSero, lastDailySero, lastPosSero}
