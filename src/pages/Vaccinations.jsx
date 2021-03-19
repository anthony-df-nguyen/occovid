import React, { useState, useContext } from "react";
import { TimeContext } from "components/context/TimeContext";
import color from "globalVars/Colors";
import Timeselect from "components/Timeselect";
import ChartNonStacked from "components/ChartNonStacked";
import {
  FetchVaccines,

} from "Datafetch/FetchVaccines";
import FetchVaccineVendor from "Datafetch/FetchVaccineVendor"
import VaccineHistory from "Datafetch/VaccineHistory.jsx";
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
  const [vaccinePhase, updateVaccinePhases] = useState([]);
  const [asof, updateDate] = useState("Last Updated...");

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
    // eslint-disable-next-line no-unused-vars
    ageUnknown,
    moderna,
    pfizer,
    unknownTrade,
    asianPI65up,
    black65up,
    hispanic65up,
    white65up,
    otherRace65up,
    asianPI65down,
    black65down,
    hispanic65down,
    white65down,
    otherRace65down,
    fullVaccinated,
    janssen,
    astra,
  ] = array;

  //Total People Reports
  const totalPPL1Dose = parseInt(totalPeople);
  const totalPPL1Perc = parseFloat((totalPPL1Dose / ocpop) * 100).toFixed(1);

  const totalPPL = parseInt(fullVaccinated);
  const totallPPLPerc = parseFloat((totalPPL / ocpop) * 100).toFixed(1);

  //Age Vaccine Reports
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
  const ageVaxArray = [
    age017,
    age1824,
    age2534,
    age3544,
    age4554,
    age5564,
    age6574yrs,
    age7584,
    age85,
  ];

  const agePercent1Dose = ageVaxArray.map((a, i) => {
    return parseFloat((a / agePopArray[i]) * 100).toFixed(1) + "%";
  });
  const ageOCPop = agePopArray.map((a) => a.toLocaleString());
  const agePercOfPop = agePopArray.map(
    (a) => parseFloat(((a / ocpop) * 100).toFixed(1)) + "%"
  );

  const customRaceColors = [
    color.blue,
    color.red,
    color.green,
    color.purple,
    color.orange,
  ];

  //Race Vaccine Reports
  const racePopArray = [asian_pop, black_pop, hispanic_pop, white_pop];
  const raceOCPop = racePopArray.map((a) => a.toLocaleString());
  const racePercOfPop = racePopArray.map(
    (a) => parseFloat(((a / ocpop) * 100).toFixed(1)) + "%"
  );
  const raceVaxArray = [asianPI, black, hispanic, white, otherRace];
  const raceVaxArrayAll = [asianPI, black, hispanic, white, otherRace];
  const racePercent1Dose = raceVaxArray.map((a, i) => {
    return parseFloat((a / racePopArray[i]) * 100).toFixed(1) + "%";
  });

 const vendorNames = vendorArray.map((a) => a.vendor);
 const vendorDoses = vendorArray.map((a) => (a.doses ? parseInt(a.doses).toLocaleString() : ''));
 const vendorPerc = vendorArray.map((a) => (parseFloat(a.doses / totalAdmin)*100).toFixed(1) + '%');
  return (
    <div>
      <VaccineHistory function={updateVaxArray} time={time} />
      <FetchVaccines function={[updateArray, updateDate]} time={time} />
      <FetchVaccineTier function={updateVaccinePhases} />
      <FetchVaccineVendor function={updateVendorArray} />
      <Page title="Vaccinations" subtitle="(CAIR2 Data)">
        <div id="lastUpdateDate">
          <p>Last Updated {asof}</p>
        </div>
        <div className="widgetGrid">
          <a href={`${vaccinePhase.url}`} target="_blank" rel="noreferrer">
            <Widget
              title={"Active Phase"}
              stat={vaccinePhase.phase + " w/ Medical Conditions"}
              color={color.red}
            />
          </a>

          <Widget
            title={"OC Population"}
            stat={ocpop.toLocaleString()}
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
          <Widget
            title={"Total Doses Administered"}
            stat={parseInt(totalAdmin).toLocaleString()}
            color={color.pink}
          />
          <Widget
            title={"1st Dose Administered"}
            stat={parseInt(adminOneDose).toLocaleString()}
            color={color.pink}
          />
          <Widget
            title={"2nd Dose Administered"}
            stat={parseInt(adminTwoDose).toLocaleString()}
            color={color.pink}
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
            switches={["line", "bar"]}
          ></Chart>

          <Chart
            key="6"
            id="vaccinecumuhis"
            date={vaccineHisArray.map((a) => a.date)}
            data={[vaccineHisArray.map((a) => a.cumuVax)]}
            fill={[color.blue, color.gold]}
            title={"Cumulative Doses Administered"}
            label={["Doses"]}
            switches={["line", "bar"]}
          >
            <p className="chartNote">
              Most recent cumulative may not match 'Total Administered' due to
              lags in county's data set
            </p>
          </Chart>

          <Chart
            key="1"
            id="vaccine1"
            date={[...ageLabels.slice(0, -1)]}
            data={[ageVaxArray]}
            fill={[[...ageColors]]}
            title={"People w/ at Least 1 Dose: by Age"}
            label={["People"]}
            switches={["horizontalBar", "bar", "doughnut"]}
          >
            <BuildTable
              colName={["Age", "Pop", "% of Pop", "% w/ at Least 1 Dose"]}
              rows={[...ageLabels.slice(0, -1)]}
              columns={[ageOCPop, agePercOfPop, agePercent1Dose]}
            />
            <p className="chartNote">OC Population: {ocpop.toLocaleString()}</p>
          </Chart>

          <Chart
            key="2"
            id="vaccine2"
            date={["Asian/PI", "Black", "Hispanic", "White", "Other"]}
            data={[raceVaxArrayAll]}
            fill={[[...customRaceColors]]}
            title={"People w/ at Least 1 Dose: by Race"}
            label={["People"]}
            switches={["horizontalBar", "bar", "doughnut"]}
          >
            <BuildTable
              colName={["Age", "Pop", "% of Pop", "% w/ at Least 1 Dose"]}
              rows={["Asian/PI*", "Black*", "Hispanic/Latino", "White*"]}
              columns={[raceOCPop, racePercOfPop, racePercent1Dose]}
            />
            <p className="chartNote">
              *Population not of Hispanic/Latino ethnicity<br></br>
              <a
                className="blue"
                target="_new"
                href="http://www.ochealthiertogether.org/demographicdata?id=267&sectionId=941"
              >
                Population source
              </a>
            </p>
          </Chart>

          <ChartNonStacked
            key="vaccinebyraceagesplit"
            id="vaccineRaceAgeSplit"
            labels={["Asian/PI", "Black", "Hispanic", "White", "Other"]}
            data={[
              [asianPI65up, black65up, hispanic65up, white65up, otherRace65up],
              [
                asianPI65down,
                black65down,
                hispanic65down,
                white65down,
                otherRace65down,
              ],
            ]}
            fill={customRaceColors}
            title={"People w/ at Least 1 Dose: by Race Split by Age Groups"}
            label={["Over 65", "Under 65"]}
            switches={["horizontalBar", "bar", "doughnut"]}
          ></ChartNonStacked>

          <Chart
            key="3"
            id="vaccine3"
            date={["Moderna", "Pfizer", "Janssen", "AstraZen"]}
            data={[[moderna, pfizer, janssen, astra]]}
            fill={[[color.green, color.blue, color.red]]}
            title={"Fully Vaccinated by Brand"}
            label={["People"]}
            switches={["horizontalBar", "bar", "doughnut"]}
          />

          <Chart
            key="4"
            id="vaccine4"
            date={["Female", "Male", "Other"]}
            data={[[female, male, otherSex]]}
            fill={[[color.pink, color.blue, color.orange]]}
            title={"People w/ at Least 1 Dose: by Sex"}
            label={["People"]}
            switches={["horizontalBar", "bar", "doughnut"]}
          />
          <div className="chartContainer">
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
          </div>
        </div>
      </Page>
    </div>
  );
};

export default Vaccinations;
