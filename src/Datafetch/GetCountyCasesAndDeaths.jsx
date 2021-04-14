import { CasesURL } from "globalVars/Sources";
import TimeFilterForCounties from "components/TimeFilterForCounties.js";
import { useEffect } from "react";
import average7 from "components/Average7";

const GetCountyCasesAndDeaths = (props) => {
  let thisDataArray = [];
  return (
    <>
      {useEffect(() => {
        let mounted = true;
        let selectedCounty = props.county;
        //console.log('The county has changed to ', selectedCounty);
        let url = `https://data.chhs.ca.gov/api/3/action/datastore_search_sql?sql=SELECT "date","reported_cases","reported_deaths" from "046cdd2b-31e5-4d34-9ed3-b48cdbc4be7a" WHERE "area" LIKE '${selectedCounty}'`;
        thisDataArray = [];
        const getData = async () => {
          await fetch(url)
            .then((response) => response.json())
            .then((grab) => {
              return grab.result.records;
            })
            .then((a) => {
              let temp = [...a];
              //console.log(temp);
              //let dailyReportedAvg7 = average7(temp.map(a => a.attributes.daily_cases_repo))
              temp.forEach((row, i) => {
                if (row.date) {
                  thisDataArray.push({
                    date: new Date(row.date + "T00:00:00").toLocaleDateString(),
                    newDeaths: row.reported_deaths,
                    newCases: row.reported_cases,
                    totalCases: row.cumulative_cases,
                    totalDeaths: row.cumulative_deaths,
                  });
                }
              });
            })
            .then(() =>
              TimeFilterForCounties(thisDataArray, props.time, props.mode)
            )
            .then((final) => {
              if (mounted) {
                props.function(final);
              }
            });
        };
        if (mounted) {
          try {
            getData();
          } catch (err) {
            console.log("Could not fetch county case/death data");
            console.log(err);
          }
        }
        return () => {
          mounted = false;
        };
      }, [props.county, props.time, props.mode])}
    </>
  );
};

export default GetCountyCasesAndDeaths;
