
//import TimeContext from 'components/TimeContext'
//import filtertime from 'components/Timefilter.js'
import { CaseDemographics } from 'globalVars/Sources'
import { useEffect } from 'react'


let thisDataArray = [];

const FetchGender = (props) => {

    useEffect( async () => {
        thisDataArray = [];
        await fetch(CaseDemographics).then(response => response.json())
        .then(a => thisDataArray = a.features[0].attributes)
        .then(()=> {
            props.function(thisDataArray)
        })
    },[])

  return (<>

  </>);
}


export { FetchGender }
