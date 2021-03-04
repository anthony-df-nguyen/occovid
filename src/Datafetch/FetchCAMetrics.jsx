import { CAMetrics } from "globalVars/Sources";
import filtertime from "components/Timefilter.js";
import { useEffect } from "react";
import average4 from "components/Average4";
import moment from "moment";

let lastCaseRate, lastPositiveRate, lastHealthEquity, lastTestRate;
const FetchCAMetrics = (props) => {
  return (
    <>
      {useEffect(() => {
        let thisDataArray = [];
        let tuesdayArray = [];
        let mounted = true;
        const getData = async () => {
          await fetch(CAMetrics)
            .then((response) => response.json())
            .then((grab) => grab.features)
            .then((a) => {
              let temp = [...a];
              //console.log("file: FetchCAMetrics.jsx ~ line 14 ~ .then ~ temp", temp)
              temp.forEach((row) => {
                thisDataArray.push({
                  date: new Date(row.attributes.date).toLocaleDateString(),
                  positiveRate: row.attributes.positive_rate,
                  dailyCaseRate: row.attributes.daily_case_rate,
                  healthEquity: row.attributes.new_var,
                  testsPer100k: row.attributes.avg_case,
                });
              });
            })
            .then(() => {
              thisDataArray.forEach((a) => {
                if (a.dailyCaseRate) {
                  lastCaseRate = parseFloat(a.dailyCaseRate);
                }
                if (a.positiveRate) {
                  lastPositiveRate = parseFloat(a.positiveRate);
                }
                if (a.healthEquity) {
                  lastHealthEquity = parseFloat(a.healthEquity);
                }
                if (a.testsPer100k) {
                  lastTestRate = parseFloat(a.testsPer100k);
                }
              });
            })
            .then(() => {
              //Only get Tuesdays
              let getTuesdays = thisDataArray.filter((row) => new Date(row.date).getDay() == 2 && row);
              let avg4WkCaseRate = average4(getTuesdays.map((a) => a.dailyCaseRate));
              let avg4WkPositiveRate = average4(getTuesdays.map((a) => a.positiveRate));
                let avg4WkHealthEquity = average4(getTuesdays.map((a) => a.healthEquity));
                //Remove first 6 weeks of empty date
                for (let i = 0; i < 10; i++) {
                    avg4WkHealthEquity[i] = null;
                }
              let avg4WkTestRate = average4(getTuesdays.map((a) => a.testsPer100k));

              getTuesdays.forEach((item, i) => {
                tuesdayArray.push({
                  date: item.date,
                  positiveRate: item.positiveRate,
                  dailyCaseRate: item.dailyCaseRate,
                  healthEquity: item.healthEquity,
                  testsPer100k: item.testsPer100k,
                  average4CaseRate: avg4WkCaseRate[i],
                  avg4WkPositiveRate: avg4WkPositiveRate[i],
                  avg4WkHealthEquity: avg4WkHealthEquity[i],
                  avg4WkTestRate: avg4WkTestRate[i],
                });
              });
            })
            .then(() => filtertime(tuesdayArray, props.time))
            .then((final) => {
              if (mounted) {
                props.function(final);
              }
            });
        };
        if (mounted) {
          thisDataArray = [];
          try {
            getData();
          } catch (err) {
            console.log("Could not fetch CA Metrics");
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

export { FetchCAMetrics, lastCaseRate, lastPositiveRate, lastHealthEquity, lastTestRate };
