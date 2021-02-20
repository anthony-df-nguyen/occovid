
//import TimeContext from 'components/TimeContext'
//import filtertime from 'components/Timefilter.js'
import { CaseDemographics } from 'globalVars/Sources'
import { useEffect } from 'react'


let thisDataArray = [];

const FetchGender = (props) => {
  return (<>
      {
          useEffect(() => {
              let mounted = true;
              const getData = async () => {
                  await fetch(CaseDemographics).then(response => response.json())
                      .then(a => thisDataArray = a.features[0].attributes)
                      .then(() => {
                          if (mounted) {
                              props.function(thisDataArray)
                          }

                      })
              }
              if (mounted) {
                  thisDataArray = [];
               
                  try { getData }
                  catch (err) {
                      console.log("Could not fetch gender data")
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


export { FetchGender }
