import { SeroTestURL } from 'globalVars/Sources'
import filtertime from 'components/Timefilter.js'
import { useEffect } from 'react'


let thisDataArray = [];
let lastTotalSero, lastDailySero, lastPosSero
const FetchSerology = (props) => {
    return (<>
        {
            useEffect(() => {
                let mounted = true;
                const getData = async () => {
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
                            if (mounted) {
                                props.function(final)
                            }
                        })
                }
                if (mounted) {
                    thisDataArray = [];
                    try { getData() }
                    catch (err) {
                        console.log("Could not getch Serology data")
                        console.log(err)
                    }
                }
                return () => {
                    mounted = false;
                }
            }, [props.time])
     }
    </>);
}


export { FetchSerology, lastTotalSero, lastDailySero, lastPosSero }
