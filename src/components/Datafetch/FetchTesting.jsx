import { TestsURL } from 'globalVars/Sources'
import filtertime from 'components/Timefilter.js'
import { useEffect } from 'react'


let thisDataArray = [];
let lastTotalPCR, lastDailyTests, lastTPP
const FetchTesting = (props) => {
  useEffect(async () => {
    thisDataArray = [];
    await fetch(TestsURL).then(response => response.json())
      .then(grab => grab.features)
      .then((a) => {
        let temp = [...a]
        console.log(temp)
        temp.forEach(row => {
          thisDataArray.push({
            date: new Date(row.attributes.date).toLocaleDateString(),
            cdph_tpp: parseInt(row.attributes.cdph_tpp),
            daily_7day_avg: parseInt(row.attributes.daily_7day_avg),
            daily_neg_spec: parseInt(row.attributes.daily_neg_spec),
            daily_pos_spec: parseInt(row.attributes.daily_pos_spec),
            daily_spec: parseInt(row.attributes.daily_spec),
            daily_test_repo: parseInt(row.attributes.daily_test_repo),
            tot_pcr_pos: parseInt(row.attributes.tot_pcr_pos),
            tot_spec: parseInt(row.attributes.tot_spec),
            cumuTestbySpec: parseInt(row.attributes.tot_test_repo)
          })
        })
      })
      .then(() => {
        thisDataArray.forEach(a => {
          if (a.tot_pcr_pos) {
            lastTotalPCR = a.tot_pcr_pos.toLocaleString()
          }
          if (a.daily_test_repo) {
            lastDailyTests = a.daily_test_repo.toLocaleString()
          }
        })
      })
      .then(() => filtertime(thisDataArray, props.time))
      .then(final => props.function(final))
  }, [props.time])

  return (<>

  </>);
}


export { FetchTesting, lastTotalPCR, lastDailyTests }
