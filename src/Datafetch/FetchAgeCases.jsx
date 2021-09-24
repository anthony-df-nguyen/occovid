import { CaseRateAgeURL } from "globalVars/Sources";
import filtertime from "components/Timefilter.js";
import { useEffect } from "react";


let thisDataArray = [];


const FetchAgeCases = (props) => {
  return (
    <>
      {useEffect(() => {
        //console.log('running the case age fetcher')
        let mounted = true;
        const grabData = async () => {
          thisDataArray = [];
          await fetch(CaseRateAgeURL)
            .then((res) => res.json())
            .then(a => a.features)
            .then((b)=> {         
                b.forEach(row => {
                    thisDataArray.push({
                      date: new Date(
                        row.attributes.Episode_Date
                      ).toLocaleDateString(),
                      age0_3: row.attributes.F0_3_yrs,
                      age4_9: row.attributes.F4_9_yrs,
                      age5_10: row.attributes.F10_12_yrs,
                      age13_14: row.attributes.F13_14_yrs,
                      age15_18: row.attributes.F15_18_yrs,
                      age19_24: row.attributes.F19_24_yrs,
                      age25_34: row.attributes.F25___34_yrs,
                      age34_44: row.attributes.F35_44_yrs,
                      age45_54: row.attributes.F45_54_yrs,
                      age55_64: row.attributes.F55_64_yrs,
                      age65_74: row.attributes.F65_74_yrs,
                      age75_84: row.attributes.F75_84_yrs,
                      age85: row.attributes.F85__yrs,
                    });
                })
            })
            .then(()=> {
                thisDataArray.sort((a, b) =>
                  new Date(a.date) - new Date(b.date) > 1 ? 1 : -1
                );
            })
            .then(() => filtertime(thisDataArray, props.time))
            .then((final) => {
                //console.log('Final returned array ', final)
              if (mounted) {
                props.function(final);
              }
            });
        };
        if (mounted) {
          try {
            grabData();
          } catch (err) {
            console.log("could not get Case rate by ages");
            console.log(err);
          }
        }
        return () => {
          //console.log('cleaning up Fetch Cases')
          mounted = false;
        };
      }, [props.time])}
    </>
  );
};

export {
  FetchAgeCases
}
