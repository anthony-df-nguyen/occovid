import { TestsURL } from 'globalVars/Sources'
import filtertime from 'components/Timefilter.js'
import { useEffect } from 'react'


let thisDataArray = [];
const FetchTesting = (props) => {
  useEffect( async () => {
      thisDataArray = [];
      await fetch(TestsURL).then(response => response.json())
      .then(grab => grab.features)
      .then((a)=> {
        let temp = [...a]
        console.log(temp)
        temp.forEach(row => {
          thisDataArray.push({
            date: new Date(row.attributes.date).toLocaleDateString(),
            cdph_tpp: row.attributes.cdph_tpp,
            daily_7day_avg: row.attributes.daily_7day_avg,
            daily_neg_spec: row.attributes.daily_neg_spec,
            daily_pos_spec: row.attributes.daily_pos_spec,
            daily_spec: row.attributes.daily_spec,
            daily_test_repo: row.attributes.daily_test_repo,
            tot_pcr_pos: row.attributes.tot_pcr_pos,
            tot_spec: row.attributes.tot_spec,
            cumuTestbySpec: row.attributes.tot_test_repo,
          })
        })
      })
      .then(() => filtertime(thisDataArray,props.time))
      .then(final => props.function(final))
  },[props.time])

  return (<>

  </>);
}


export {FetchTesting}
