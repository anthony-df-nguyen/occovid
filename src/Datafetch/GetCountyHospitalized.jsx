import { CasesURL } from "globalVars/Sources";
import TimeFilterForCounties from "components/TimeFilterForCounties.js";
import { useEffect } from "react";
import average7 from "components/Average7";
import { getDefaultNormalizer } from "@testing-library/dom";

const GetCountyHospitalized = (props) => {
  let thisDataArray = [];
  return (
    <>
      {useEffect(() => {
        let mounted = true;
        let selectedCounty = props.county;
        //console.log('The county has changed to ', selectedCounty);
        let url = `https://data.chhs.ca.gov/api/3/action/datastore_search_sql?sql=SELECT "todays_date","hospitalized_covid_confirmed_patients","icu_covid_confirmed_patients" from "47af979d-8685-4981-bced-96a6b79d3ed5" WHERE "county" LIKE '${selectedCounty}'`;
        const getData = async () => {
          thisDataArray = [];
          await fetch(url)
            .then((response) => response.json())
            .then((grab) => grab.result.records)
            .then((a) => {
              let temp = [...a];
              temp.forEach((row, i) => {
                if (row.todays_date) {
                  thisDataArray.push({
                    date: new Date(
                      row.todays_date + "T00:00:00"
                    ).toLocaleDateString(),
                    hospitalized: row.hospitalized_covid_confirmed_patients,
                    icu: row.icu_covid_confirmed_patients,
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
            console.log("Could not fetch county hospital data");
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

export default GetCountyHospitalized;
