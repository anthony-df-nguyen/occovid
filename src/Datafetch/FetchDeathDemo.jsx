
import { DeathDemographics } from 'globalVars/Sources'
import { useEffect } from 'react'


let thisDataArray = [];

const FetchDeathDemo = (props) => {

    useEffect( async () => {
        thisDataArray = [];
        await fetch(DeathDemographics).then(response => response.json())
        .then(a => thisDataArray = a.features[0].attributes)
        .then(()=> {
            props.function(thisDataArray)
        })
    },[])

  return (<>

  </>);
}


export { FetchDeathDemo }
