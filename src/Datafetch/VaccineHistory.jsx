import { useEffect } from "react";
import filtertime from "components/Timefilter.js";
import moment from "moment";
import average7 from "components/Average7";
import { dailyDoses } from "globalVars/Sources";

const VaccineHistory = (props) => {
  let cumuVax = 0;

  return (
    <>
      {useEffect(() => {
        let mounted = true;
        const getData = async () => {
          let transVaxArray = [];
          let vaccineArray = [];
          await fetch(dailyDoses)
            .then((a) => a.json())
            .then((b) => b.features)
            .then((c) => {
              c.forEach((row) => {
                let col = row.attributes;
                vaccineArray.push({
                  date: moment(new Date(col.vac_date)).format("l"),
                  vax: col.valid_admin,
                });
              });
            })
            .then(() => {
              let vax7Avg = average7(vaccineArray.map((a) => a.vax));
              vaccineArray.forEach((row, i) => {
                //let parseDate = moment(new Date(row[0])).format("l");
                cumuVax += row.vax;
                transVaxArray.push({
                  date: row.date,
                  vax: row.vax,
                  vax7Avg: vax7Avg[i],
                  cumuVax: cumuVax,
                });
              });
            })
            .then(() => {
              if (mounted) {
                props.function(filtertime(transVaxArray, props.time));
              }
            });
        };
        if (mounted) {
          try {
            getData();
          } catch (err) {
            console.log("Could not fetch vaccine history");
            console.log(err);
          }
        }
        return () => {
          mounted = false;
        };
      }, [props.time])}
    </>
  );
};

export default VaccineHistory;
