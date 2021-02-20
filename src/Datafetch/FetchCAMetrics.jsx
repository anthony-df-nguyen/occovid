import { CAMetrics } from 'globalVars/Sources'
import filtertime from 'components/Timefilter.js'
import { useEffect } from 'react'


let thisDataArray = [];
let lastCaseRate, lastPositiveRate, lastHealthEquity, lastTestRate
const FetchCAMetrics = (props) => {

  return (<>
    {
      useEffect(() => {
        let mounted = true;
        const getData = async () => {
          await fetch(CAMetrics).then(response => response.json())
            .then(grab => grab.features)
            .then((a) => {
              let temp = [...a]
              //console.log("file: FetchCAMetrics.jsx ~ line 14 ~ .then ~ temp", temp)
              temp.forEach(row => {
                thisDataArray.push({
                  date: new Date(row.attributes.date).toLocaleDateString(),
                  positiveRate: row.attributes.positive_rate,
                  dailyCaseRate: row.attributes.daily_case_rate,
                  healthEquity: row.attributes.new_var,
                  testsPer100k: row.attributes.avg_case,
                })
              })
            })
            .then(() => {
              thisDataArray.forEach(a => {
                if (a.dailyCaseRate) {
                  lastCaseRate = parseFloat(a.dailyCaseRate)
                }
                if (a.positiveRate) {
                  lastPositiveRate = parseFloat(a.positiveRate)
                }
                if (a.healthEquity) {
                  lastHealthEquity = parseFloat(a.healthEquity)
                }
                if (a.testsPer100k) {
                  lastTestRate = parseFloat(a.testsPer100k)
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
          try {
            getData()
          } catch (err) {
            console.log('Could not fetch CA Metrics')
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


export { FetchCAMetrics, lastCaseRate, lastPositiveRate, lastHealthEquity, lastTestRate }
