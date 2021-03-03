import { useEffect } from "react";
import cheerio from "cheerio";

let thisDataArray = [];
let vaccineDataTable;

const FetchVaccines = (props) => {
  return (
    <>
      {useEffect(() => {
        let mounted = true;
        const getUpdate = async () => {
          await fetch(
            "https://services2.arcgis.com/LORzk2hk9xzHouw9/ArcGIS/rest/services/vacc_totalsummary/FeatureServer/0"
          )
            .then((a) => a.text())
            .then((b) => {
              const $ = cheerio.load(b);
              let yolo = $(".restBody b");
              let lastUpdateDate = yolo[20].next.data;
              let shortdate = lastUpdateDate.substring(0, 10);
              if (mounted) {
                props.function[1](shortdate);
              }
            });
        };
        const getData = async () => {
          await fetch(
            "https://services2.arcgis.com/LORzk2hk9xzHouw9/ArcGIS/rest/services/vacc_totalsummary/FeatureServer/0/query?where=0%3D0&objectIds=&time=&resultType=none&outFields=category%2C+num_1st%2C+num_1st2nd%2C+num_atleast1%2C+num_totalvalid&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&sqlFormat=none&f=pjson&token="
          )
            .then((a) => a.json())
            .then((b) => {
              let results = b.features;
              //console.log("file: FetchVaccines.jsx ~ line 34 ~ .then ~ results", results)
              const findValue = (category, metric) => {
                try {
                  let resultArray = results.filter(
                    (a) => a.attributes.category == category
                  );
                  let finalValue;
                  Object.keys(resultArray[0].attributes).forEach((a, i) => {
                    if (a == metric) {
                      let value = Object.values(resultArray[0].attributes)[i];
                      finalValue = value;
                    }
                  });

                  return finalValue;
                } catch (err) {
                  console.log(err);
                  console.log("Could not find this value");
                  return 0;
                }
              };
              let peopleOneDose = findValue("TotalDoses", "num_1st");
              let peopleTwoDose = findValue("TotalDoses", "num_1st2nd");
              let totalPeople = findValue("TotalDoses", "num_atleast1");
              let adminOneDose = findValue("ValidDoses", "num_1st");
              let adminTwoDose = findValue("ValidDoses", "num_1st2nd");
              let totalAdmin = findValue("ValidDoses", "num_atleast1");
              let female = findValue("Female", "num_atleast1");
              let male = findValue("Male", "num_atleast1");
              let otherSex = findValue("Other Sex", "num_atleast1");
              let asianPI = findValue("Asian/PI", "num_atleast1");
              let black = findValue("Black", "num_atleast1");
              let hispanic = findValue("Hispanic", "num_atleast1");
              let white = findValue("White", "num_atleast1");
              let otherRace = findValue("Other Race", "num_atleast1");
              let age017 = findValue("0-17 yrs", "num_atleast1");
              let age1824 = findValue("18-24 yrs", "num_atleast1");
              let age2534 = findValue("25-34 yrs", "num_atleast1");
              let age3544 = findValue("35-44 yrs", "num_atleast1");
              let age4554 = findValue("45-54 yrs", "num_atleast1");
              let age5564 = findValue("55-64 yrs", "num_atleast1");
              let age6574yrs = findValue("65-74 yrs", "num_atleast1");
              let age7584 = findValue("75-84 yrs", "num_atleast1");
              let age85 = findValue("85+ yrs", "num_atleast1");
              let ageUnknown = null;
              let moderna = findValue("Moderna", "num_totalvalid");
              let pfizer = findValue("Pfizer", "num_totalvalid");
              let unknownTrade = findValue("Unknown Trade", "num_totalvalid");
              thisDataArray = [
                peopleOneDose,
                peopleTwoDose,
                totalPeople,
                adminOneDose,
                adminTwoDose,
                totalAdmin,
                female,
                male,
                otherSex,
                asianPI,
                black,
                hispanic,
                white,
                otherRace,
                age017,
                age1824,
                age2534,
                age3544,
                age4554,
                age5564,
                age6574yrs,
                age7584,
                age85,
                ageUnknown,
                moderna,
                pfizer,
                unknownTrade,
              ];
            })
            .then(() => {
              if (mounted) {
                props.function[0](thisDataArray);
              }
            });
        };

        if (mounted) {
          thisDataArray = [];
          try {
            getUpdate();
            getData();
          } catch (err) {
            console.log("Could not getch Vaccine data");
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

export { FetchVaccines };
