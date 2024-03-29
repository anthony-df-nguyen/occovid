
import { DeathDemographics } from 'globalVars/Sources'
import { useEffect } from 'react'


let thisDataArray = [];

const FetchDeathDemo = (props) => {
    return (<>
        {
            useEffect(() => {
                let mounted = true;
                const getData = async () => {
                    await fetch(DeathDemographics).then(response => response.json())
                        .then(a => thisDataArray = a.features[0].attributes)
                        .then(() => {
                            if (mounted) {
                                props.function(thisDataArray)
                            }
                        })
                }
                if (mounted) {
                    thisDataArray = [];
                    try {
                        getData();
                    } catch (err) {
                        console.log('Could not fetch Death demographics')
                        console.log(err)
                    }
                }
                return () => {
                    mounted = false;
                }
            }, [])
     }
    </>);
}


export { FetchDeathDemo }
