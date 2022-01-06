import { useEffect } from "react";
import {vaccineVendor} from '../globalVars/Sources'

let thisDataArray = [];
let vaccineDataTable;

const FetchVaccines = (props) => {
  return (
    <>
      {useEffect(() => {
        let mounted = true;

        const getData = async () => {
          await fetch(vaccineVendor)
            .then((a) => a.json())
            .then((b) => {
              let results = b.features;

              const findValue = (category, metric) => {
                try {
                  let resultArray = results.filter(
                    (a) => a.attributes.category === category
                  );

                  let finalValue;
                  Object.keys(resultArray[0].attributes).forEach((a, i) => {
                    if (a === metric) {
                      let value = Object.values(resultArray[0].attributes)[i];
                      finalValue = value;
                    }
                  });

                  return finalValue;
                } catch (err) {
                  console.log(err);
                  console.log("Could not find this value", category, metric);
                  return 0;
                }
              };
              let peopleOneDose = findValue("TotalDoses", "num_atleast1");
              let peopleTwoDose = findValue("TotalDoses", "num_1st2nd");
              let totalPeople = findValue("TotalDoses", "num_atleast1");
              let adminOneDose = findValue("TotalDoses", "num_1st");
              let adminTwoDose = findValue("TotalDoses", "num_1st2nd");
              let totalAdmin = findValue("TotalDoses", "num_totalvalid");
              let female = findValue("Female", "num_atleast1");
              let male = findValue("Male", "num_atleast1");
              let otherSex = findValue("Other Sex", "num_atleast1");
              let unkSex = findValue("Unknown Sex", "num_atleast1");
              let femaleFull = findValue("Female", "num_1st2nd");
              let maleFull = findValue("Male", "num_1st2nd");
              let otherSexFull = findValue("Other Sex", "num_1st2nd");
              let unkSexFull = findValue("Unknown Sex", "num_1st2nd");
              let femaleBooster = findValue("Female", "num_boosters");
              let maleBooster = findValue("Male", "num_boosters");
              let otherSexBooster = findValue("Other Sex", "num_boosters");
              let unkSexBooster = findValue("Unknown Sex", "num_boosters");
              let asianPI = findValue("Asian/PI", "num_atleast1");
              let black = findValue("Black", "num_atleast1");
              let hispanic = findValue("Hispanic", "num_atleast1");
              let white = findValue("White", "num_atleast1");
              let otherRace = findValue("Other Race", "num_atleast1");
              let unkRace = findValue("Unknown Race", "num_atleast1");
              let asianPIFull = findValue("Asian/PI", "num_1st2nd");
              let blackFull = findValue("Black", "num_1st2nd");
              let hispanicFull = findValue("Hispanic", "num_1st2nd");
              let whiteFull = findValue("White", "num_1st2nd");
              let otherRaceFull = findValue("Other Race", "num_1st2nd");
              let unkRaceFull = findValue("Unknown Race", "num_1st2nd");
              let asianPIBooster = findValue("Asian/PI", "num_boosters");
              let blackBooster = findValue("Black", "num_boosters");
              let hispanicBooster = findValue("Hispanic", "num_boosters");
              let whiteBooster = findValue("White", "num_boosters");
              let otherRaceBooster = findValue("Other Race", "num_boosters");
              let unkRaceBooster = findValue("Unknown Race", "num_boosters");
              let age04 = findValue("0-4 yrs", "num_atleast1");
              let age511 = findValue("5-11 yrs", "num_atleast1");
              let age1217 = findValue("12-17 yrs", "num_atleast1");
              let age1824 = findValue("18-24 yrs", "num_atleast1");
              let age2534 = findValue("25-34 yrs", "num_atleast1");
              let age3544 = findValue("35-44 yrs", "num_atleast1");
              let age4554 = findValue("45-54 yrs", "num_atleast1");
              let age5564 = findValue("55-64 yrs", "num_atleast1");
              let age6574 = findValue("65-74 yrs", "num_atleast1");
              let age7584 = findValue("75-84 yrs", "num_atleast1");
              let age85 = findValue("85+ yrs", "num_atleast1");
              let ageUnknown = null;
              let age04full = findValue("0-4 yrs", "num_1st2nd");
              let age511full = findValue("5-11 yrs", "num_1st2nd");
              let age1217full = findValue("12-17 yrs", "num_1st2nd");
              let age1824full = findValue("18-24 yrs", "num_1st2nd");
              let age2534full = findValue("25-34 yrs", "num_1st2nd");
              let age3544full = findValue("35-44 yrs", "num_1st2nd");
              let age4554full = findValue("45-54 yrs", "num_1st2nd");
              let age5564full = findValue("55-64 yrs", "num_1st2nd");
              let age6574full = findValue("65-74 yrs", "num_1st2nd");
              let age7584full = findValue("75-84 yrs", "num_1st2nd");
              let age85full = findValue("85+ yrs", "num_1st2nd");
              let age04boosters = findValue("0-4 yrs", "num_boosters");
              let age511boosters = findValue("5-11 yrs", "num_boosters");
              let age1217boosters = findValue("12-17 yrs", "num_boosters");
              let age1824boosters = findValue("18-24 yrs", "num_boosters");
              let age2534boosters = findValue("25-34 yrs", "num_boosters");
              let age3544boosters = findValue("35-44 yrs", "num_boosters");
              let age4554boosters = findValue("45-54 yrs", "num_boosters");
              let age5564boosters = findValue("55-64 yrs", "num_boosters");
              let age6574boosters = findValue("65-74 yrs", "num_boosters");
              let age7584boosters = findValue("75-84 yrs", "num_boosters");
              let age85boosters = findValue("85+ yrs", "num_boosters");
              let moderna = findValue("Moderna", "num_1st2nd");
              let pfizer = findValue("Pfizer", "num_1st2nd");
              let unknownTrade = findValue("Unknown Trade", "num_totalvalid");
              let asianPI65up = findValue("Asian/PI 65+", "num_atleast1");
              let black65up = findValue("Black 65+", "num_atleast1");
              let hispanic65up = findValue("Hispanic  65+", "num_atleast1");
              let white65up = findValue("White 65+", "num_atleast1");
              let otherRace65up = findValue("Other Race 65+", "num_atleast1");
              let unkRace65up = findValue("Unknown Race 65+", "num_atleast1");
              let asianPI65down = findValue("Asian/PI <65", "num_atleast1");
              let black65down = findValue("Black <65", "num_atleast1");
              let hispanic65down = findValue("Hispanic <65", "num_atleast1");
              let white65down = findValue("White <65", "num_atleast1");
              let otherRace65down = findValue("Other Race <65", "num_atleast1");
              let unkRace65down = findValue("Unknown Race <65", "num_atleast1");
              let fullVaccinated = findValue("TotalDoses", "num_1st2nd");
              let janssen = findValue("Janssen", "num_1st2nd");
              let astra = findValue("AstraZeneca", "num_1st2nd");
              let modernaDose1 = findValue("Moderna", "num_1st");
              let pfizerDose1 = findValue("Pfizer", "num_1st");
              let astraDose1 = findValue("AstraZeneca", "num_1st");
              let age04PopPerc = findValue("0-4 yrs", "perc_pop");
              let age511PopPerc = findValue("5-11 yrs", "perc_pop");
              let age1217PopPerc = findValue("12-17 yrs", "perc_pop");
              let age1824PopPerc = findValue("18-24 yrs", "perc_pop");
              let age2534PopPerc = findValue("25-34 yrs", "perc_pop");
              let age3544PopPerc = findValue("35-44 yrs", "perc_pop");
              let age4554PopPerc = findValue("45-54 yrs", "perc_pop");
              let age5564PopPerc = findValue("55-64 yrs", "perc_pop");
              let age6574PopPerc = findValue("65-74 yrs", "perc_pop");
              let age7584PopPerc = findValue("75-84 yrs", "perc_pop");
              let age85PopPerc = findValue("85+ yrs", "perc_pop");
              let totalBoosters = findValue("Total Persons", "num_boosters");

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
                unkSex,
                femaleFull,
                maleFull,
                otherSexFull,
                unkSexFull,
                femaleBooster,
                maleBooster,
                otherSexBooster,
                unkSexBooster,
                asianPI,
                black,
                hispanic,
                white,
                otherRace,
                unkRace,
                asianPIFull,
                blackFull,
                hispanicFull,
                whiteFull,
                otherRaceFull,
                unkRaceFull,
                asianPIBooster,
                blackBooster,
                hispanicBooster,
                whiteBooster,
                otherRaceBooster,
                unkRaceBooster,
                age04,
                age511,
                age1217,
                age1824,
                age2534,
                age3544,
                age4554,
                age5564,
                age6574,
                age7584,
                age85,
                ageUnknown,
                age04full,
                age511full,
                age1217full,
                age1824full,
                age2534full,
                age3544full,
                age4554full,
                age5564full,
                age6574full,
                age7584full,
                age85full,
                age04boosters,
                age511boosters,
                age1217boosters,
                age1824boosters,
                age2534boosters,
                age3544boosters,
                age4554boosters,
                age5564boosters,
                age6574boosters,
                age7584boosters,
                age85boosters,
                moderna,
                pfizer,
                unknownTrade,
                asianPI65up,
                black65up,
                hispanic65up,
                white65up,
                otherRace65up,
                unkRace65up,
                asianPI65down,
                black65down,
                hispanic65down,
                white65down,
                otherRace65down,
                unkRace65down,
                fullVaccinated,
                janssen,
                astra,
                modernaDose1,
                pfizerDose1,
                astraDose1,
                age04PopPerc,
                age511PopPerc,
                age1217PopPerc,
                age1824PopPerc,
                age2534PopPerc,
                age3544PopPerc,
                age4554PopPerc,
                age5564PopPerc,
                age6574PopPerc,
                age7584PopPerc,
                age85PopPerc,
                totalBoosters,
              ];
            })
            .then(() => {
              if (mounted) {
                props.function(thisDataArray);
              }
            });
        };

        if (mounted) {
          thisDataArray = [];
          try {
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
