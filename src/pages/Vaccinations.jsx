import React, { useState, useContext, useEffect } from "react";
import { TimeContext } from "components/context/TimeContext";
import color from "globalVars/Colors";
import Timeselect from "components/Timeselect";
import FindAVaccine from "components/FindAVaccine";
import ChartNonStacked from "components/ChartNonStacked";
import { FetchVaccines } from "Datafetch/FetchVaccines";
import FetchVaccineVendor from "Datafetch/FetchVaccineVendor";
import VaccineHistory from "Datafetch/VaccineHistory.jsx";
import FetchVaccineDate from "Datafetch/FetchVaccineDate";
import Chart from "components/Chart";
import Widget from "components/Widget";
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
  const [vendorArray, updateVendorArray] = useState([]);
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
    age011,
    age1215,
    age1624,
    age2534,
    age3544,
    age4554,
    age5564,
    age6574,
    age7584,
    age85,
    ageUnknown,
    age011full,
    age1215full,
    age1624full,
    age2534full,
    age3544full,
    age4554full,
    age5564full,
    age6574full,
    age7584full,
    age85full,
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
    age011PopPerc,
    age1215PopPerc,
    age1624PopPerc,
    age2534PopPerc,
    age3544PopPerc,
    age4554PopPerc,
    age5564PopPerc,
    age6574PopPerc,
    age7584PopPerc,
    age85PopPerc,
  ] = array;

  //Total People Reports
  const totalPPL1Dose = parseInt(totalPeople);
  const totalPPL1Perc = parseFloat((totalPPL1Dose / ocpop) * 100).toFixed(1);

  const totalPPL = parseInt(fullVaccinated);
  const totallPPLPerc = parseFloat((totalPPL / ocpop) * 100).toFixed(1);

  //Age Vaccine Reports
  const customAgeLabels = [
    "0 - 11",
    "12 - 15",
    "16 - 24",
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
    age011,
    age1215,
    age1624,
    age2534,
    age3544,
    age4554,
    age5564,
    age6574,
    age7584,
    age85,
  ];
  
  const ageFullVaxArray = [
    age011full,
    age1215full,
    age1624full,
    age2534full,
    age3544full,
    age4554full,
    age5564full,
    age6574full,
    age7584full,
    age85full,
  ];

  const agePopulationPercArray = [age011PopPerc,age1215PopPerc,age1624PopPerc,age2534PopPerc,age3544PopPerc,age4554PopPerc,age5564PopPerc,age6574PopPerc,age7584PopPerc,age85PopPerc]

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
  const ageOCPop = agePopArray.map((a) => a.toLocaleString());
  const agePercOfPop = agePopArray.map(
    (a) => parseFloat(((a / ocpop) * 100).toFixed(1)) + "%"
  );

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
    newAgeMode === "full"
      ? updateAgeVaxArray(ageFullVaxArray)
      : updateAgeVaxArray(age1DoseVaxArray);
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
    newRaceMode === "full"
      ? updateRaceVaxArray(raceFullVaxArray)
      : updateRaceVaxArray(race1DoseVaxArray);
  }, [array, raceVaxMode]);

  const vendorNames = vendorArray.map((a) => a.vendor);
  const vendorDoses = vendorArray.map((a) =>
    a.doses ? parseInt(a.doses).toLocaleString() : ""
  );
  const vendorPerc = vendorArray.map(
    (a) => (parseFloat(a.doses / totalAdmin) * 100).toFixed(1) + "%"
  );

  const brand1Dose = [pfizerDose1, modernaDose1, "N/A"];
  const brand2Dose = [pfizer, moderna, janssen];

  //Gender
  const sex1DoseArray = [female, male, unkSex];
  const sexFullVaxArray = [femaleFull, maleFull, unkSexFull];
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
    newSexMode === "full"
      ? updateSexVaxArray(sexFullVaxArray)
      : updateSexVaxArray(sex1DoseArray);
  }, [array, sexVaxMode]);

  return (
    <div>
      <FetchVaccineTier function={updateVaxTier} />
      <FetchVaccineDate function={updateDate} />
      <VaccineHistory function={updateVaxArray} time={time} />
      <FetchVaccines function={updateArray} time={time} />

      <FetchVaccineVendor function={updateVendorArray} />
      <Page title="Vaccinations">
        <div id="lastUpdateDate">
          <p style={{ fontWeight: "500" }}>New data on Thursdays</p>
          <p>{asof}</p>
        </div>
        <FindAVaccine />
        <div className="widgetGrid">
          <Widget
            title={"Vaccine Eligibility"}
            stat={vaxTier}
            color={color.purple}
          />
          <Widget
            title={"OC Population"}
            stat={`${ocpop.toLocaleString()}`}
            color={color.green}
          />
          <Widget
            title={"Fully Vaccinated (All Brands)"}
            stat={`${totalPPL.toLocaleString()} | ${totallPPLPerc}%`}
            color={color.blue}
          />
          <Widget
            title={"People w/ at Least 1 Dose (All Brands)"}
            stat={`${totalPPL1Dose.toLocaleString()} | ${totalPPL1Perc}%`}
            color={color.blue}
          />
          {/* <Widget
            title={"Adults (18+)  Fully Vaccinated (All Brands)"}
            stat={`${adultsFullyVax.toLocaleString()} | ${parseFloat(
              (adultsFullyVax / adultPop) * 100
            ).toFixed(1)}% `}
            color={color.green}
          />
          <Widget
            title={"Adults (18+)  w/ at Least 1 Dose (All Brands)"}
            stat={`${adultsWith1Dose.toLocaleString()} | ${parseFloat(
              (adultsWith1Dose / adultPop) * 100
            ).toFixed(1)}% `}
            color={color.green}
          /> */}
          <Widget
            title={"Total Doses Administered"}
            stat={parseInt(totalAdmin).toLocaleString()}
            color={color.pink}
          />
          <Widget
            title={"People w/ 1st Dose (2-Dose Brands)"}
            stat={parseInt(adminOneDose).toLocaleString()}
            color={color.pink}
          />
          {/* <Widget
            title={"1st+2nd Dose Administered"}
            stat={parseInt(adminTwoDose).toLocaleString()}
            color={color.pink}
          /> */}
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
              colName={["Age", "Pop", "% of Pop","% Fully Vaxed","% w/ 1 Dose"]}
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
          {/* <div className="chartContainer">
            <div className="chartTitle">Top 25 Dose Providers</div>
            <BuildTable
              rows={vendorNames}
              colName={[
                "Vendor",
                "Doses Administered",
                "% of All Doses Administered",
              ]}
              columns={[vendorDoses, vendorPerc]}
            />
          </div> */}
          <div className="chartContainer vaxEffectiveness">
            <div className="chartTitle">Vaccine Info</div>
            <BuildTable
              rows={[
                "Doses",
                "Protection Against Any Symptoms",
                "Protection Against Severe Symptoms",
                "Protection Against Death or Hospitalization",
                "Efficacy by Age",
              ]}
              colName={[
                "Info",
                "Pfizer/BioNTech",
                "Moderna",
                "Johnson & Johnson",
              ]}
              columns={[
                [
                  2,
                  "95%",
                  "89%",
                  "100%",
                  '<span class="bold">Age 16-55</span>: 96%<br><span class="bold">Over 55</span>: 94%',
                ],
                [
                  2,
                  "94.1%",
                  "100%",
                  "100%",
                  '<span class="bold">Age 16-55</span>: 96%<br><span class="bold">Over 55</span>: 86%',
                ],
                [
                  1,
                  "66% | 72% (US)",
                  "85%",
                  "100%",
                  '<span class="bold">Age 18-64</span>: 66.1%<br><span class="bold">Over 65</span>: 66.2%',
                ],
              ]}
            />
            <p className="chartNote">
              <a
                className="blue"
                href="https://coronavirus.egovoc.com/vaccine-effectiveness"
                target="_blank">
                More vaccine information here
              </a>
            </p>
          </div>
        </div>
      </Page>
    </div>
  );
};

export default Vaccinations;
