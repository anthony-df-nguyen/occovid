
import { CaseDemographics } from 'globalVars/Sources'
import { useEffect } from 'react'


let thisDataArray = [];

const FetchCaseDemo = (props) => {

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


export { FetchCaseDemo }
