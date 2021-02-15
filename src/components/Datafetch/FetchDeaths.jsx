import { DeathsURL } from 'globalVars/Sources'
import filtertime from 'components/Timefilter.js'
import { useEffect  } from 'react'


let thisDataArray = [];
const FetchDeaths = (props) => {
  useEffect( async () => {
      thisDataArray = [];
      await fetch(DeathsURL).then(response => response.json())
      .then(grab => grab.features)
      .then((a)=> {
        let temp = [...a]
        console.log(temp)
        temp.forEach(row => {
          thisDataArray.push({
            date: new Date(row.attributes.date).toLocaleDateString(),
            alf_dth: row.attributes.alf_dth,
            daily_death: row.attributes.daily_dth,
            dth_date: row.attributes.daily_death,
            homeless: row.attributes.homeless_dth,
            snf: row.attributes.snf_dth,
            jail: row.attributes.jail_dth,
            new_daily_dth_date: row.attributes.new_daily_dth_date,
            total_dth: row.attributes.total_dth,
            total_dth_date: row.attributes.total_dth_date
          })
        })
      })
      .then(() => filtertime(thisDataArray,props.time))
      .then(final => props.function(final))
  },[props.time])

  return (<>

  </>);
}


export {FetchDeaths}
