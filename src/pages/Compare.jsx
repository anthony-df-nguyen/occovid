/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { TimeContext } from "components/context/TimeContext";
import color from "globalVars/Colors";
import Timeselect from "components/Timeselect";
import { FetchCases } from "Datafetch/FetchCases";
import { FetchDeaths } from "Datafetch/FetchDeaths";
import { FetchHospitals } from "Datafetch/FetchHospitals";
import VaccineHistory from "Datafetch/VaccineHistory";
import CityCompareChart from "components/CityCompare/CityCompareChart";
import GetCountyCasesAndDeaths from "Datafetch/GetCountyCasesAndDeaths";
import GetCountyHospitalized from "Datafetch/GetCountyHospitalized";
import GetCountyVax from "Datafetch/GetCountyVaccinations";
import Page from "components/Page";
import ModeSelector from "components/ModeSelector";
import { countyPopulation, ocpop } from "globalVars/populations.js";
import ExpandCollapse from "components/ExpandCollapse";

const Compare = (props) => {
  const [time, setTime] = useContext(TimeContext);
  const [ocArray, updateOCArray] = useState([]);
  const [compareArray, updateCompareArray] = useState([]);
  //console.log('compareArray: ', compareArray);
  const [comparisonCounty, updateComparisonCounty] = useState(() => {
    if (!localStorage.getItem("countyCompareLastCounty")) {
      return "Los Angeles";
    } else {
      return localStorage.getItem("countyCompareLastCounty");
    }
  });
  const [ocFinalArray, updateOCFinalArray] = useState([]);
  const [compareFinalArray, updateCompareFinalArray] = useState([]);
  const [comparisonCountyPop, updateComparisonPop] = useState(0);
  // Cases, Case per 100k, Deaths, Deaths per 100k, Hositalized, Hospitalize per 100k
  const [currentMode, updateMode] = useState(() => {
    if (!localStorage.getItem("countyCompareLastMode")) {
      return "Cases";
    } else {
      return localStorage.getItem("countyCompareLastMode");
    }
  });
  //console.log(compareArray);

  //Determine Which Arrays to Map
  function calculateAlltheArrays() {
    switch (currentMode) {
      case "Cases per 100K":
        updateOCFinalArray(() => {
          return getper100ks(ocArray, "dailyCasesReported", "oc");
        });
        updateCompareFinalArray(() => {
          return getper100ks(compareArray, "newCases");
        });
        break;
      case "Deaths per 100k":
        updateOCFinalArray(() => {
          return getper100ks(ocArray, "daily_death_repo", "oc");
        });
        updateCompareFinalArray(() => {
          return getper100ks(compareArray, "newDeaths");
        });
        break;
      case "Hospitalized per 100k":
        //console.log("calculating for hospitalized per 100k")
        updateOCFinalArray(() => {
          return getper100ks(ocArray, "hospital", "oc");
        });
        updateCompareFinalArray(() => {
          return getper100ks(compareArray, "hospitalized");
        });
        break;
      case "Hospitalized":
        //console.log("calculating for hospitalized")
        updateOCFinalArray(() => {
          return ocArray.map((a) => a.hospital);
        });
        updateCompareFinalArray(() => {
          return compareArray.map((a) => a.hospitalized);
        });
        break;
      case "Vaccine Doses Administered":
        updateOCFinalArray(() => {
          return ocArray.map((a) => a.cumuVax);
        });
        updateCompareFinalArray(() => {
          return compareArray.map((a) => a.doses);
        });
        break;
      case "Deaths":
        updateOCFinalArray(() => {
          return ocArray.map((a) => a.daily_death_repo);
        });
        updateCompareFinalArray(() => {
          return compareArray.map((a) => a.newDeaths);
        });
        break;
      case "Cases":
        //console.log("calculating for hospitalized")
        updateOCFinalArray(() => {
          return ocArray.map((a) => a.dailyCasesReported);
        });
        updateCompareFinalArray(() => {
          return compareArray.map((a) => a.newCases);
        });
        break;
      case "Vaccine Doses Administered per 100k":
        updateOCFinalArray(() => {
          return getper100ks(ocArray, "cumuVax", "oc");
        });
        updateCompareFinalArray(() => {
          return getper100ks(compareArray, "doses");
        });
        //console.log(compareArray)
        break;
      default:
        console.log("Default is running");
        updateOCFinalArray(() => {
          return getper100ks(ocArray, "totalCasesbySpecimen", "oc");
        });
        updateCompareFinalArray(() => {
          return getper100ks(compareArray, "totalCases");
        });
        break;
    }
  }

  //Find the Population of the County Comparison
  function findMatchingCountyPopulation() {
    let findPop = countyPopulation.filter((row) =>
      row.a === comparisonCounty ? row.b : null
    );
    let comparisonCountyPopulation = findPop[0].b;
    updateComparisonPop(comparisonCountyPopulation);
    return comparisonCountyPopulation;
  }

  //Get the per 100k of the Arrays
  function getper100ks(array, whichValue, oc) {
    //for non-OC counties
    if (!oc) {
      let pop = findMatchingCountyPopulation();
      //console.log(pop)
      let tempArray = [];
      array.forEach((a) => {
        Object.keys(a).forEach((b, i) => {
          if (b === whichValue) {
            //console.log(`There is a match for ${whichValue} at position ${i} for array position ${a}`)
            tempArray.push(Object.values(a)[i]);
          }
        });
      });
      return tempArray.map((row) => {
        if (!row) {
          return null;
        } else {
          return parseFloat((row / pop) * 100000).toFixed(1);
        }
      });
    } else if (oc) {
      let tempArray = [];
      array.forEach((a) => {
        Object.keys(a).forEach((b, i) => {
          //console.log(b)
          if (b === whichValue) {
            tempArray.push(Object.values(a)[i]);
          }
        });
      });
      return tempArray.map((row) =>
        parseFloat((row / ocpop) * 100000).toFixed(1)
      );
    }
  }

  const returnFetchComponents = () => {
    switch (currentMode) {
      case "Cases per 100K":
        //console.log('Fetching cases per 100k')
        return (
          <>
            <FetchCases function={updateOCArray} time={time} />
            <GetCountyCasesAndDeaths
              function={updateCompareArray}
              county={comparisonCounty}
              time={time}
              mode={currentMode}
            />
          </>
        );
        
      case "Deaths per 100k":
        //console.log('Fetching deaths per 100k')
        return (
          <>
            <FetchDeaths function={updateOCArray} time={time} />
            <GetCountyCasesAndDeaths
              function={updateCompareArray}
              county={comparisonCounty}
              time={time}
              mode={currentMode}
            />
          </>
        );
        
      case "Hospitalized per 100k":
        //console.log('Fetching Hospitalized per 100k')
        return (
          <>
            <FetchHospitals function={updateOCArray} time={time} />
            <GetCountyHospitalized
              function={updateCompareArray}
              county={comparisonCounty}
              time={time}
              mode={currentMode}
            />
          </>
        );
       
      case "Cases":
        //console.log('Fetching cases')
        return (
          <>
            <FetchCases function={updateOCArray} time={time} />
            <GetCountyCasesAndDeaths
              function={updateCompareArray}
              county={comparisonCounty}
              time={time}
              mode={currentMode}
            />
          </>
        );
        
      case "Deaths":
        //console.log('Fetching deaths')
        return (
          <>
            <FetchDeaths function={updateOCArray} time={time} />
            <GetCountyCasesAndDeaths
              function={updateCompareArray}
              county={comparisonCounty}
              time={time}
              mode={currentMode}
            />
          </>
        );
        
      case "Hospitalized":
        //console.log('Hospitalized')
        return (
          <>
            <FetchHospitals function={updateOCArray} time={time} />
            <GetCountyHospitalized
              function={updateCompareArray}
              county={comparisonCounty}
              time={time}
              mode={currentMode}
            />
          </>
        );
      case "Vaccine Doses Administered":
        return (
          <>
            <VaccineHistory function={updateOCArray} time={time} />
            <GetCountyVax
              function={updateCompareArray}
              county={comparisonCounty}
              time={time}
              mode={currentMode}
            />
          </>
        );
       
      case "Vaccine Doses Administered per 100k":
        return (
          <>
            <VaccineHistory function={updateOCArray} time={time} />
            <GetCountyVax
              function={updateCompareArray}
              county={comparisonCounty}
              time={time}
              mode={currentMode}
            />
          </>
        );
        
      default:
        //console.log('defualt')
        return (
          <>
            <FetchCases function={updateOCArray} time={time} />
            <GetCountyCasesAndDeaths
              function={updateCompareArray}
              county={comparisonCounty}
              time={time}
              mode={currentMode}
            />
          </>
        );
        
    }
  };

  //Updates ocArray when Data is Done Fetching
  useEffect(() => {
    calculateAlltheArrays();
  }, [ocArray]);
  //Updates compareArray when Data is Done Fetching
  useEffect(() => {
    calculateAlltheArrays();
  }, [compareArray]);

  //Recalculate when the county Changes
  useEffect(() => {
    returnFetchComponents();
  }, [comparisonCounty]);

  //   //Recalculate when the Mode Changes
  useEffect(() => {
    returnFetchComponents();
    calculateAlltheArrays();
  }, [currentMode]);


  return (
    <div>
      {returnFetchComponents()}

      <Page title="Compare ">
        <Timeselect />
        <ExpandCollapse title="Select County and Metric" buttontext={"Close"}>
          <div id="countySelect">
            <p className="expandContentInstruction"> County: </p>
            <select
              defaultValue={comparisonCounty}
              onChange={(e) => {
                localStorage.setItem("countyCompareLastCounty", e.target.value);
                updateComparisonCounty(e.target.value);
              }}>
              <option value="Alameda">Alameda</option>
              <option value="Alpine">Alpine</option>
              <option value="Amador">Amador</option>
              <option value="Butte">Butte</option>
              <option value="Calaveras">Calaveras</option>
              <option value="Colusa">Colusa</option>
              <option value="Contra Costa">Contra Costa</option>
              <option value="Del Norte">Del Norte</option>
              <option value="El Dorado">El Dorado</option>
              <option value="Fresno">Fresno</option>
              <option value="Glenn">Glenn</option>
              <option value="Humboldt">Humboldt</option>
              <option value="Imperial">Imperial</option>
              <option value="Inyo">Inyo</option>
              <option value="Kern">Kern</option>
              <option value="Kings">Kings</option>
              <option value="Lake">Lake</option>
              <option value="Lassen">Lassen</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Madera">Madera</option>
              <option value="Marin">Marin</option>
              <option value="Mariposa">Mariposa</option>
              <option value="Mendocino">Mendocino</option>
              <option value="Merced">Merced</option>
              <option value="Modoc">Modoc</option>
              <option value="Mono">Mono</option>
              <option value="Monterey">Monterey</option>
              <option value="Napa">Napa</option>
              <option value="Nevada">Nevada</option>
              <option value="Placer">Placer</option>
              <option value="Plumas">Plumas</option>
              <option value="Riverside">Riverside</option>
              <option value="Sacramento">Sacramento</option>
              <option value="San Benito">San Benito</option>
              <option value="San Bernardino">San Bernardino</option>
              <option value="San Diego">San Diego</option>
              <option value="San Francisco">San Francisco</option>
              <option value="San Joaquin">San Joaquin</option>
              <option value="San Luis Obispo">San Luis Obispo</option>
              <option value="San Mateo">San Mateo</option>
              <option value="Santa Barbara">Santa Barbara</option>
              <option value="Santa Clara">Santa Clara</option>
              <option value="Santa Cruz">Santa Cruz</option>
              <option value="Shasta">Shasta</option>
              <option value="Sierra">Sierra</option>
              <option value="Siskiyou">Siskiyou</option>
              <option value="Solano">Solano</option>
              <option value="Sonoma">Sonoma</option>
              <option value="Stanislaus">Stanislaus</option>
              <option value="Sutter">Sutter</option>
              <option value="Tehama">Tehama</option>
              <option value="Trinity">Trinity</option>
              <option value="Tulare">Tulare</option>
              <option value="Tuolumne">Tuolumne</option>
              <option value="Ventura">Ventura</option>
              <option value="Yolo">Yolo</option>
              <option value="Yuba">Yuba</option>
            </select>
          </div>
          <ModeSelector
            text="Select a Metric"
            function={[updateMode]}
            current={currentMode}
            storageKey={["countyCompareLastMode"]}
            options={[
              {
                display: "Cases per 100K",
                value: "Cases per 100K",
              },
              {
                display: "Deaths per 100k",
                value: "Deaths per 100k",
              },
              {
                display: "Hospitalized per 100k",
                value: "Hospitalized per 100k",
              },
              {
                display: "Vaccine Doses per 100k",
                value: "Vaccine Doses Administered per 100k",
              },
              {
                display: "Cases",
                value: "Cases",
              },
              {
                display: "Deaths",
                value: "Deaths",
              },
              {
                display: "Hospitalized",
                value: "Hospitalized",
              },
              {
                display: "Vaccine Doses",
                value: "Vaccine Doses Administered",
              },
            ]}
          />
        </ExpandCollapse>
        <div id="fullPageChart">
          <CityCompareChart
            key="1"
            id="comparecounties"
            date={ocArray.map((a) => a.date)}
            data={[compareFinalArray, ocFinalArray]}
            fill={[color.blue, color.red]}
            title={`Comparing ${currentMode} for OC and ${comparisonCounty}`}
            label={[comparisonCounty, "Orange County"]}
            switches={["line"]}>
            <p className="chartNote">
              {comparisonCounty} Pop: {comparisonCountyPop.toLocaleString()} |
              OC Pop: {ocpop.toLocaleString()} <br></br>
              <br></br>
              OC Data:
              <br></br>
              Cases using 'by Report Date' Data <br></br>
              Deaths using 'by Report Date' Data <br></br>
              Vax Doses Admin. using 'Cumulative Doses administered'
            </p>
          </CityCompareChart>
        </div>
      </Page>
    </div>
  );
};

export default Compare;
