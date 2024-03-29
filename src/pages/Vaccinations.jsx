import React, { useState, useContext, useEffect } from "react";
import { TimeContext } from "components/context/TimeContext";
import color from "globalVars/Colors";
import Timeselect from "components/Timeselect";
import FindAVaccine from "components/FindAVaccine";
import ChartNonStacked from "components/ChartNonStacked";
import { FetchVaccines } from "Datafetch/FetchVaccines";
import VaccineHistory from "Datafetch/VaccineHistory.jsx";
import FetchVaccineDate from "Datafetch/FetchVaccineDate";
import Chart from "components/Chart";
import Widget from "components/Widget";
import MultiWidget from "components/MultiWidget";
import { ageLabels, ageColors } from "globalVars/chartJSconfig";
import {
  ocpop,
  age0_17_pop,
  age18_24_pop,
  age25_34_pop,
  age35_44_pop,
  age45_54_pop,
  age55_64_pop,
  age65_74_pop,
  age75_84_pop,
  age85_pop,
  asian_pop,
  black_pop,
  hispanic_pop,
  white_pop,
} from "globalVars/populations";
import BuildTable from "components/BuildTable";
import Page from "components/Page";
import FetchVaccineTier from "Datafetch/FetchVaccineTier";

const Vaccinations = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [time, setTime] = useContext(TimeContext);
  const [array, updateArray] = useState([]);
  const [vaccineHisArray, updateVaxArray] = useState([]);
  const [vaxTier, updateVaxTier] = useState();
  const [asof, updateDate] = useState("Getting last update date...");

  const [
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
  ] = array;

  //Total People Reports
  const totalPPL1Dose = parseInt(totalPeople);
  const totalPPL1Perc = parseFloat((totalPPL1Dose / ocpop) * 100).toFixed(1);

  const totalPPL = parseInt(fullVaccinated);
  const totallPPLPerc = parseFloat((totalPPL / ocpop) * 100).toFixed(1);

  const totalBoosterInt = parseInt(totalBoosters)

  //Age Vaccine Reports
  const customAgeLabels = [
    "0 - 4",
    "5 - 11",
    "12 - 17",
    "18 - 24",
    "25 - 34",
    "35 - 44",
    "45 - 54",
    "55 - 64",
    "65 - 74",
    "75 - 84",
    "85 +",
  ];
  const agePopArray = [
    age0_17_pop,
    age18_24_pop,
    age25_34_pop,
    age35_44_pop,
    age45_54_pop,
    age55_64_pop,
    age65_74_pop,
    age75_84_pop,
    age85_pop,
  ];

  const age1DoseVaxArray = [
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
  ];
  
  const ageFullVaxArray = [
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
  ];

  const ageBoosterArray = [
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
  ];

  const age1Dose12_plus = [
      age1217 +
      age1824 +
      age2534 +
      age3544 +
      age4554 +
      age5564 +
      age6574 +
      age7584 +
      age85
  ];

  const fullVax12_plus = [
    age1217full +
      age1824full +
      age2534full +
      age3544full +
      age4554full +
      age5564full +
      age6574full +
      age7584full +
      age85full
  ];

  const agePopulationPercArray = [
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
  ];


  const agePopulationEst = agePopulationPercArray.map(
    (row, i) => parseInt((row / 100) * ocpop).toLocaleString()
  );

  


  const agePercentFullyVaxed = ageFullVaxArray.map((a, i) => {

    return parseFloat(a / parseInt(agePopulationEst[i].replace(",", ""))*100).toFixed(1) + "%";
  });
  const agePercent1Dose = age1DoseVaxArray.map((row,i)=> {
    return (
      parseFloat(
        (row / parseInt(agePopulationEst[i].replace(",", ""))) * 100
      ).toFixed(1) + "%"
    );
  });

  const estAdultPop = ocpop - parseInt(agePopulationEst[0].replace(",", ""));

  const [ageVaxMode, updateAgeVaxMode] = useState(() =>
    localStorage.getItem("lastAgeVaxMode")
      ? localStorage.getItem("lastAgeVaxMode")
      : () => {
          localStorage.setItem("lastAgeVaxMode", "full");
          return "full";
        }
  );
  const [ageVaxArray, updateAgeVaxArray] = useState([]);

  useEffect(() => {
    const newAgeMode = localStorage.getItem("lastAgeVaxMode");
    newAgeMode === "full" && updateAgeVaxArray(ageFullVaxArray)
    newAgeMode === "1dose" && updateAgeVaxArray(age1DoseVaxArray);
    newAgeMode === "booster" && updateAgeVaxArray(ageBoosterArray);
  }, [array, ageVaxMode]);

  //Race Vaccine Reports
  const customRaceColors = [
    color.blue,
    color.red,
    color.green,
    color.purple,
    color.orange,
    color.gray,
  ];

  const racePopArray = [asian_pop, black_pop, hispanic_pop, white_pop];
  const raceOCPop = racePopArray.map((a) => a.toLocaleString());

  const racePercOfPop = racePopArray.map(
    (a) => parseFloat(((a / ocpop) * 100).toFixed(1)) + "%"
  );
  const raceVaxArray = [asianPI, black, hispanic, white, otherRace];
  const race1DoseVaxArray = [
    asianPI,
    black,
    hispanic,
    white,
    otherRace,
    unkRace,
  ];
  const raceFullVaxArray = [
    asianPIFull,
    blackFull,
    hispanicFull,
    whiteFull,
    otherRaceFull,
    unkRaceFull,
  ];

  const raceBoosterArray = [
    asianPIBooster,
    blackBooster,
    hispanicBooster,
    whiteBooster,
    otherRaceBooster,
    unkRaceBooster,
  ];

  const racePercent1Dose = raceVaxArray.map((a, i) => {
    return parseFloat((a / racePopArray[i]) * 100).toFixed(1) + "%";
  });
  const racePercentFullyVaxed = raceFullVaxArray.map((a, i) => {
    return parseFloat((a / racePopArray[i]) * 100).toFixed(1) + "%";
  });

  const [raceVaxMode, updateRaceVaxMode] = useState(() =>
    localStorage.getItem("lastRaceVaxMode")
      ? localStorage.getItem("lastRaceVaxMode")
      : () => {
          localStorage.setItem("lastRaceVaxMode", "full");
          return "full";
        }
  );

  const [raceVaxArrayState, updateRaceVaxArray] = useState([]);

  useEffect(() => {
    const newRaceMode = localStorage.getItem("lastRaceVaxMode");
    newRaceMode === "full" && updateRaceVaxArray(raceFullVaxArray)
    newRaceMode === "1dose" && updateRaceVaxArray(race1DoseVaxArray);
    newRaceMode === "booster" && updateRaceVaxArray(raceBoosterArray)
 
  }, [array, raceVaxMode]);



  const brand1Dose = [pfizerDose1, modernaDose1, "N/A"];
  const brand2Dose = [pfizer, moderna, janssen];

  //Gender
  const sex1DoseArray = [female, male, unkSex];
  const sexFullVaxArray = [femaleFull, maleFull, unkSexFull];
  const sexBooster = [
    femaleBooster,
    maleBooster,
    otherSexBooster,
    unkSexBooster,
  ];
  const [sexVaxMode, updateSexVaxMode] = useState(() =>
    localStorage.getItem("lastSexVaxMode")
      ? localStorage.getItem("lastSexVaxMode")
      : () => {
          localStorage.setItem("lastSexVaxMode", "full");
          return "full";
        }
  );

  const [sexVaxArrayState, updateSexVaxArray] = useState([]);

  useEffect(() => {
    const newSexMode = localStorage.getItem("lastSexVaxMode");
    newSexMode === "full" && updateSexVaxArray(sexFullVaxArray);
    newSexMode === "1dose" && updateSexVaxArray(sex1DoseArray);
    newSexMode === "booster" && updateSexVaxArray(sexBooster);
  }, [array, sexVaxMode]);

  return (
    <div>
      <FetchVaccineTier function={updateVaxTier} />
      <FetchVaccineDate function={updateDate} />
      <VaccineHistory function={updateVaxArray} time={time} />
      <FetchVaccines function={updateArray} time={time} />
      <Page title="Vaccinations">
        <div id="lastUpdateDate">
          <p>{asof}</p>
        </div>
        <FindAVaccine />
        <div className="widgetGrid">
          <MultiWidget
            title={"All Ages"}
            subtitle={[
              "Est. Population",
              "Fully Vaxed",
              "At Least 1 Dose",
              "Boosters",
            ]}
            stat={[
              `${ocpop.toLocaleString()}`,
              `${totalPPL.toLocaleString()} | ${totallPPLPerc}%`,
              `${totalPPL1Dose.toLocaleString()} | ${totalPPL1Perc}%`,
              `${totalBoosterInt.toLocaleString()}`,
            ]}
            color={[color.orange, color.blue, color.green, color.purple]}
          />
          <MultiWidget
            title={"Ages 5+"}
            subtitle={["Est. Population", "Fully Vaxed", "At Least 1 Dose"]}
            stat={[
              `${estAdultPop.toLocaleString()}`,
              `${fullVax12_plus.toLocaleString()} | ${parseFloat(
                (fullVax12_plus / estAdultPop) * 100
              ).toFixed(1)}%`,
              `${age1Dose12_plus.toLocaleString()} | ${parseFloat(
                (age1Dose12_plus / estAdultPop) * 100
              ).toFixed(1)}%`,
            ]}
            color={[color.orange, color.blue, color.green]}
          />
          <MultiWidget
            title={"Doses Administered"}
            subtitle={["Total Doses", "People w/ 1st Dose Only"]}
            stat={[
              `${parseInt(totalAdmin).toLocaleString()}`,
              `${parseInt(adminOneDose).toLocaleString()}`,
            ]}
            color={[color.blue, color.orange]}
          />
        </div>

        <Timeselect />
        <div id="chartVaccineGrid">
          <Chart
            key="5"
            id="vaccinehis"
            date={vaccineHisArray.map((a) => a.date)}
            data={[
              vaccineHisArray.map((a) => a.vax),
              vaccineHisArray.map((a) => a.vax7Avg),
            ]}
            fill={[color.blue, color.gold]}
            title={"Daily Doses Administered"}
            label={["Doses", "7 Day Avg"]}
            switches={["line", "bar"]}></Chart>

          <Chart
            key="6"
            id="vaccinecumuhis"
            date={vaccineHisArray.map((a) => a.date)}
            data={[vaccineHisArray.map((a) => a.cumuVax)]}
            fill={[color.blue, color.gold]}
            title={"Cumulative Doses Administered"}
            label={["Doses"]}
            switches={["line", "bar"]}>
            <p className="chartNote">
              Most recent cumulative may not match 'Total Administered' due to
              lags in county's data set
            </p>
          </Chart>

          <Chart
            function={[updateAgeVaxMode]}
            options={[
              {
                display: "Fully Vaxed",
                value: "full",
              },
              {
                display: "at Least 1 Dose",
                value: "1dose",
              },
              {
                display: "Boosters",
                value: "booster",
              },
            ]}
            current={ageVaxMode}
            storageKey={["lastAgeVaxMode"]}
            key="1"
            id="vaccine1"
            date={[...customAgeLabels]}
            data={[ageVaxArray]}
            fill={[[...ageColors]]}
            title={`By Age`}
            label={["People"]}
            switches={["horizontalBar", "bar", "doughnut"]}>
            <BuildTable
              colName={[
                "Age",
                "Pop",
                "% of Pop",
                "% Fully Vaxed",
                "% w/ 1 Dose",
              ]}
              rows={[...customAgeLabels]}
              columns={[
                agePopulationEst,
                agePopulationPercArray.map((row) => row + "%"),
                agePercentFullyVaxed,
                agePercent1Dose,
              ]}
            />
            <p className="chartNote">OC Population: {ocpop.toLocaleString()}</p>
          </Chart>

          <Chart
            function={[updateRaceVaxMode]}
            options={[
              {
                display: "Fully Vaxed",
                value: "full",
              },
              {
                display: "at Least 1 Dose",
                value: "1dose",
              },
              {
                display: "Boosters",
                value: "booster",
              },
            ]}
            current={raceVaxMode}
            storageKey={["lastRaceVaxMode"]}
            key="2"
            id="vaccine2"
            date={[
              "Asian/PI",
              "Black",
              "Hispanic",
              "White",
              "Other",
              "Unknown",
            ]}
            data={[raceVaxArrayState]}
            fill={[[...customRaceColors]]}
            title={"By Race"}
            label={["People"]}
            switches={["horizontalBar", "bar", "doughnut"]}>
            <BuildTable
              colName={[
                "Age",
                "Pop",
                "% of Pop",
                "% Fully Vaxed",
                "% w/ 1 Dose",
              ]}
              rows={["Asian/PI*", "Black*", "Hispanic/Latino", "White*"]}
              columns={[
                raceOCPop,
                racePercOfPop,
                racePercentFullyVaxed,
                racePercent1Dose,
              ]}
            />
            <p className="chartNote">
              *Population not of Hispanic/Latino ethnicity<br></br>
              <a
                className="blue"
                target="_new"
                href="http://www.ochealthiertogether.org/demographicdata?id=267&sectionId=941">
                Population source
              </a>
            </p>
          </Chart>

          <ChartNonStacked
            key="vaccinebyraceagesplit"
            id="vaccineRaceAgeSplit"
            labels={[
              "Asian/PI",
              "Black",
              "Hispanic",
              "White",
              "Other",
              "Unknown",
            ]}
            data={[
              [
                asianPI65up,
                black65up,
                hispanic65up,
                white65up,
                otherRace65up,
                unkRace65up,
              ],
              [
                asianPI65down,
                black65down,
                hispanic65down,
                white65down,
                otherRace65down,
                unkRace65down,
              ],
            ]}
            fill={customRaceColors}
            title={"People w/ at Least 1 Dose: by Race Split by Age Groups"}
            label={["Over 65", "Under 65"]}
            switches={["horizontalBar", "bar", "doughnut"]}></ChartNonStacked>

          <Chart
            key="3"
            id="vaccine3"
            date={["Moderna", "Pfizer", "J&J"]}
            data={[[moderna, pfizer, janssen]]}
            fill={[[color.green, color.blue, color.red]]}
            title={"Fully Vaccinated by Brand"}
            label={["People"]}
            switches={["horizontalBar", "bar", "doughnut"]}>
            <BuildTable
              rows={["Pfizer", "Moderna", "J&J"]}
              colName={[
                "Brand",
                "1st Doses",
                "Fully Vaccinated",
                "% of OC Pop",
              ]}
              columns={[
                brand1Dose.map((a) => a && a.toLocaleString()),
                brand2Dose.map((a) => a && a.toLocaleString()),
                brand2Dose.map(
                  (a) => a && parseFloat((a / ocpop) * 100).toFixed(1) + "%"
                ),
              ]}
            />
          </Chart>

          <Chart
            function={[updateSexVaxMode]}
            options={[
              {
                display: "Fully Vaxed",
                value: "full",
              },
              {
                display: "at Least 1 Dose",
                value: "1dose",
              },
              {
                display: "Boosters",
                value: "booster",
              },
            ]}
            current={sexVaxMode}
            storageKey={["lastSexVaxMode"]}
            key="4"
            id="vaccine4"
            date={["Female", "Male", "Unknown"]}
            data={[sexVaxArrayState]}
            fill={[[color.pink, color.blue, color.gray]]}
            title={"By Sex"}
            label={["People"]}
            switches={["horizontalBar", "bar", "doughnut"]}
          />

    
        </div>
      </Page>
    </div>
  );
};

export default Vaccinations;
