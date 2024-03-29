import { variantWeek } from "globalVars/Sources";
import filtertime from "components/Timefilter.js";
import { useEffect } from "react";


let thisDataArray = [];

const FetchVariantWeekly = (props) => {
  return (
    <>
      {useEffect(() => {
        console.log('running the variant weekly fetcher')
        let mounted = true;
        const grabData = async () => {
          thisDataArray = [];
          await fetch(variantWeek)
            .then((response) => response.json())
            .then((grab) => grab.features)
            .then(data => {
              console.log("data: ", data)
                data.forEach(row => {
                    
                    thisDataArray.push({
                      date: row.attributes.diseaseweek.split("-")[0],
                      alpha: row.attributes.Alpha,
                      beta: row.attributes.Beta,
                      delta: row.attributes.Delta,
                      epsilon: row.attributes.Epsilon,
                      gamma: row.attributes.Gamma,
                      iota: row.attributes.Iota,
                      lambda: row.attributes.Lambda,
                      mu: row.attributes.Mu,
                      omicron_BA1: row.attributes.Omicron_BA1,
                      omicron_BA2: row.attributes.Omicron_BA2,
                      theta: row.attributes.Theta,
                    });
                })
            })
            .then(() => filtertime(thisDataArray, props.time))
            .then((final) => {
              if (mounted) {
                props.function(final);
              }
            });
        };
        if (mounted) {
          try {
            grabData();
          } catch (err) {
            console.log("could not fetch weekly variant data");
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
  FetchVariantWeekly,
};
