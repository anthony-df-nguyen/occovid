import { casebyVaxStatus } from "globalVars/Sources";
import filtertime from "components/Timefilter.js";
import { useEffect } from "react";
import average7 from "components/Average7";

let thisDataArray = [];
let lastTotalCases,
  lastDailyReported,
  lastRecovered,
  lastHomeless,
  lastJail,
  lastSNF;

const FetchCasesByVax = (props) => {
  return (
    <>
      {useEffect(() => {
        // console.log("running the case by vax fetcher");
        let mounted = true;
        const grabData = async () => {
          thisDataArray = [];
          await fetch(casebyVaxStatus)
            .then((response) => response.json())
            .then((grab) => {
              console.log(grab)
              return grab.features;
            })
            .then((a) => {
              a.forEach((row) => {
                thisDataArray.push({
                  date: new Date(row.attributes.Date).toLocaleDateString(),
                  vaccinated_nobooster: row.attributes.Fully_Vx__No_Booster_Inc,
                  vaccinated_boosted: row.attributes.Boosted_Inc,
                  unvaccinated: row.attributes.UnvxInc,
                });
              });
            })
            .then(() => filtertime(thisDataArray, props.time))
            .then((final) => {
            //console.log(final)
              if (mounted) {
                props.function(final);
              }
            });
        };
        if (mounted) {
          try {
            grabData();
          } catch (err) {
            console.log("could not getch cases");
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
  FetchCasesByVax,
  lastTotalCases,
  lastDailyReported,
  lastRecovered,
  lastHomeless,
  lastJail,
  lastSNF,
};
