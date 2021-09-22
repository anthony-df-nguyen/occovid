import { HosVaxStatus } from "globalVars/Sources";
import filtertime from "components/Timefilter.js";
import { useEffect } from "react";

let thisDataArray = [];
const FetchHospitalVax = (props) => {
  return (
    <>
      {useEffect(() => {
        let mounted = true;
        const getData = async () => {
          thisDataArray = [];
          await fetch(HosVaxStatus)
            .then((response) => response.json())
            .then((grab) => grab.features)
            .then((a) => {
              let temp = [...a]

              temp.forEach((row, i) => {
              thisDataArray.push({
                date: new Date(row.attributes.Date).toLocaleDateString(),
                vax: row.attributes.Fully_Vaccinated,
                unvax: row.attributes.Unvaccinated,
              });
              });
            })
            .then(() => filtertime(thisDataArray, props.time))
            .then((final) => {
              if (mounted) {
                //console.log('Updating the state')

                props.function(final);
              }
            });
        };
        if (mounted) {
          try {
            getData();
          } catch (err) {
            console.log("Could not getch hospital by vax Data");
            console.log(err);
          }
        }
        return () => {
          // console.log('unmounting component')
          mounted = false;
        };
      }, [props.time])}
    </>
  );
};

export { FetchHospitalVax};
