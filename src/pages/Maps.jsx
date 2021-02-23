import React, { useEffect, useState, useContext } from "react";
import Page from "components/Page";
import { MapContainer, TileLayer, Popup, GeoJSON } from "react-leaflet";
import { CityDataWithGeo, ZipDataWithGeo } from "globalVars/Sources";
import {
  ContextColors,
  band1,
  band2,
  band3,
  band4,
  band5,
} from "components/ContextColors";
import ModeSelector from "components/ModeSelector";
import {ThemeContext} from "components/context/ThemeContext";
import ExpandCollapse from "components/ExpandCollapse";

const Maps = () => {
  const [theme, updateTheme] = useContext(ThemeContext);
  const [leaflet, updateleafLet] = useState();
  const [modeDisplay, updateModeDisplay] = useState();
  const [mode, updateMode] = useState(() => {
    if (!localStorage.getItem("mapLastMode")) {
      updateModeDisplay("Case Rate");
      return "CaseRate";
    } else {
      updateModeDisplay(localStorage.getItem("mapLastModeText"));
      return localStorage.getItem("mapLastMode");
    }
  });
  const [cityOrZip, updateCityOrZip] = useState(() => {
    if (!localStorage.getItem("mapCityorZip")) {
      return "city";
    } else {
      return localStorage.getItem("mapCityorZip");
    }
  });
  const [cityOrZipURL, updateCityOrZipURL] = useState(() => {
    if (cityOrZip === "city") {
      return CityDataWithGeo;
    } else if (cityOrZip === "zip") {
      return ZipDataWithGeo;
    } else {
      return CityDataWithGeo;
    }
  });

  //Set a starting state for theme or city/zip mode so later we only reload page if theme or city/zip mode changes
  const [startingTheme, updateStartingTheme] = useState(theme);
  const [startingCityOrZip, updateStartingCityOrZip] = useState(cityOrZip);

  let geoArray = [];
  let mounted = true;
  let tileURL;

  if (theme) {
    console.log("Going to dark mode map");
    tileURL = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
  } else {
    tileURL = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
  }
  async function getGEO() {
    await fetch(cityOrZipURL)
      .then((a) => a.json())
      .then((b) => b.features)
      .then((c) => {
        if (cityOrZip == "city") {
          geoArray = c;
        }
        //Transform Zip array property names to be consistent with cities
        else if (cityOrZip == "zip") {
          c.forEach((row) => {
            let d = row.properties;
            geoArray.push({
              geometry: { ...row.geometry },
              id: row.id,
              type: "Feature",
              properties: {
                //Using City as object key for Zip for consistency
                City: d.ZIP_NUM,
                Cases_0_3: d.Cases_0_3,
                Cases_0_18: d.Cases_0_18,
                Cases_4_9: d.Cases_4_9,
                Cases_10_12: d.Cases_10_12,
                Cases_13_14: d.Cases_13_14,
                Cases_15_18: d.Cases_15_18,
                Tot_Cases: d.tot_cas,
                Tot_Deaths: d.tot_dth,
                CaseRate: d.tot_casrate,
                DeathRate: d.tot_dthrate,
                Total_Pop: d.pop,
              },
            });
          });
        }
      })
      .then(() => {
        if (mounted) {
          const valueArray = [];
          geoArray.forEach((a, i) => {
            Object.keys(a.properties).forEach((b, index) => {
              if (b === mode && Object.values(a.properties)[index]) {
                valueArray.push(Object.values(a.properties)[index]);
              }
            });
          });
          // console.log('The minmax array is ',valueArray)
          const maxValue = Math.max(...valueArray);
          const minValue = Math.min(...valueArray);
          // console.log(`With a min of ${minValue} and a max of ${maxValue}`)
          updateleafLet(() => {
            return (
              <MapContainer center={[33.68, -117.8]} zoom={10}>
                <TileLayer
                  url={tileURL}
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                  maxZoom={19}
                />
                {geoArray.map((row, i) => {
                  let a = row.properties;
                  const CityOrZipName = a.City;
                  const Total_Pop = a.Total_Pop;
                  const CaseRate = a.CaseRate;
                  const Cases_0_3 = a.Cases_0_3;
                  const Cases_4_9 = a.Cases_4_9;
                  const Cases_10_12 = a.Cases_10_12;
                  const Cases_13_14 = a.Cases_13_14;
                  const Cases_15_18 = a.Cases_15_18;
                  const Cases_0_18 = a.Cases_0_18;
                  const DeathRate = a.DeathRate;
                  const Tot_Deaths = a.Tot_Deaths;
                  const Tot_Cases = a.Tot_Cases;
                  let color;
                  switch (mode) {
                    case "CaseRate":
                      color = ContextColors(
                        CaseRate,
                        "highisbad",
                        maxValue,
                        minValue
                      );
                      break;
                    case "DeathRate":
                      color = ContextColors(
                        DeathRate,
                        "highisbad",
                        maxValue,
                        minValue
                      );
                      break;
                    case "Tot_Cases":
                      color = ContextColors(
                        Tot_Cases,
                        "highisbad",
                        maxValue,
                        minValue
                      );
                      break;
                    case "Tot_Deaths":
                      color = ContextColors(
                        Tot_Deaths,
                        "highisbad",
                        maxValue,
                        minValue
                      );
                      break;
                    case "Cases_0_3":
                      color = ContextColors(
                        Cases_0_3,
                        "highisbad",
                        maxValue,
                        minValue
                      );
                      break;
                    case "Cases_4_9":
                      color = ContextColors(
                        Cases_4_9,
                        "highisbad",
                        maxValue,
                        minValue
                      );
                      break;
                    case "Cases_10_12":
                      color = ContextColors(
                        Cases_10_12,
                        "highisbad",
                        maxValue,
                        minValue
                      );
                      break;
                    case "Cases_13_14":
                      color = ContextColors(
                        Cases_13_14,
                        "highisbad",
                        maxValue,
                        minValue
                      );
                      break;
                    case "Cases_15_18":
                      color = ContextColors(
                        Cases_15_18,
                        "highisbad",
                        maxValue,
                        minValue
                      );
                      break;
                    case "Cases_0_18":
                      color = ContextColors(
                        Cases_0_18,
                        "highisbad",
                        maxValue,
                        minValue
                      );
                      break;
                    default:
                      color = ContextColors(
                        CaseRate,
                        "highisbad",
                        maxValue,
                        minValue
                      );
                      break;
                  }

                  return (
                    <GeoJSON
                      key={i}
                      data={row}
                      pathOptions={{
                        color: "#333",
                        weight: 0.2,
                        fillColor: color,
                        fillOpacity: ".3",
                      }}
                    >
                      <Popup key={i}>
                        <div className="cityName"> {CityOrZipName} </div>
                        <div className="metricBlock">
                          <div className="metricName">Population</div>:
                          {parseInt(Total_Pop).toLocaleString()}
                        </div>
                        {/* List of Cases */}
                        <ul>
                          <li>
                            <div className="metricBlock">
                              <div className="metricName orange">Cases: </div>
                              {parseInt(Tot_Cases).toLocaleString()}
                            </div>
                          </li>
                          <li>
                            <div className="metricBlock">
                              <div className="metricName red">Death: </div>
                              {parseInt(Tot_Deaths).toLocaleString()}
                            </div>
                          </li>
                          <li>
                            <div className="metricBlock">
                              <div className="metricName orange">
                                Case Rate:{" "}
                              </div>
                              {parseFloat(CaseRate).toFixed(1)}
                            </div>
                          </li>
                          <li>
                            <div className="metricBlock">
                              <div className="metricName red">Death Rate: </div>
                              {parseFloat(DeathRate).toFixed(1)}
                            </div>
                          </li>
                        </ul>
                        {/* List of Ages */}
                        <ul>
                          <li>
                            <div className="metricBlock">
                              <div className="metricName red">Cases 0-3: </div>
                              {parseInt(Cases_0_3).toLocaleString()}
                            </div>
                          </li>
                          <li>
                            <div className="metricBlock">
                              <div className="metricName yellow">
                                Cases 4-9:{" "}
                              </div>
                              {parseInt(Cases_4_9).toLocaleString()}
                            </div>
                          </li>
                          <li>
                            <div className="metricBlock">
                              <div className="metricName orange">
                                Cases 10-12:{" "}
                              </div>
                              {parseInt(Cases_10_12).toLocaleString()}
                            </div>
                          </li>
                          <li>
                            <div className="metricBlock">
                              <div className="metricName purple">
                                Cases 13-14:{" "}
                              </div>
                              {parseInt(Cases_13_14).toLocaleString()}
                            </div>
                          </li>
                          <li>
                            <div className="metricBlock">
                              <div className="metricName grayblue ">
                                Cases 15-18:{" "}
                              </div>
                              {parseInt(Cases_15_18).toLocaleString()}
                            </div>
                          </li>
                          <li>
                            <div className="metricBlock">
                              <div className="metricName pink">Under 18: </div>
                              {parseInt(Cases_0_18).toLocaleString()}
                            </div>
                          </li>
                        </ul>
                      </Popup>
                    </GeoJSON>
                  );
                })}
              </MapContainer>
            );
          });
        }
      });
  }

  useEffect(() => {
    if (mounted) {
      getGEO();
    }
    return () => {
      mounted = false;
    };
  }, [mode]);

  //Only reload the page if the starting theme is diffrent than the change
  useEffect(() => {
    if (mounted && theme != startingTheme) {
      console.log("The page should now reload because the theme has changed");
      window.location.reload();
    }
  }, [theme]);
  //Only reload the page if the starting cityOrZip is diffrent than the change
  useEffect(() => {
    if (mounted && cityOrZip != startingCityOrZip) {
      console.log(
        "The page should now reload because the city/zip mode has changed"
      );
      window.location.reload();
    }
    return () => {
      mounted = false;
    };
  }, [cityOrZip]);

  return (
    <div>
      <Page title="Map">
        <ExpandCollapse
          title="Change Map Mode"
          buttontext="Close"
        >
          <ModeSelector
            text="City or Zip"
            current={cityOrZip}
            function={[updateCityOrZip]}
            storageKey={["mapCityorZip"]}
            options={[
              {
                display: "City",
                value: "city",
              },
              {
                display: "Zip",
                value: "zip",
              },
            ]}
          />
          <ModeSelector
            text="Select a Metric"
            function={[updateMode, updateModeDisplay]}
            current={mode}
            options={[
              {
                display: "Case Rate",
                value: "CaseRate",
              },
              {
                display: "Death Rate",
                value: "DeathRate",
              },
              {
                display: "Cases",
                value: "Tot_Cases",
              },
              {
                display: "Deaths",
                value: "Tot_Deaths",
              },
              {
                display: "Cases 0-3",
                value: "Cases_0_3",
              },
              {
                display: "Cases 4-9",
                value: "Cases_4_9",
              },
              {
                display: "Cases 10-12",
                value: "Cases_10_12",
              },
              {
                display: "Cases 13-14",
                value: "Cases_13_14",
              },
              {
                display: "Cases 15-18",
                value: "Cases_15_18",
              },
              {
                display: "Cases 0-18",
                value: "Cases_0_18",
              },
            ]}
            storageKey={["mapLastMode", "mapLastModeText"]}
          />
        </ExpandCollapse>

        <div style={{ marginTop: "1rem" }} className="chartTitle">
          Current Mode: {modeDisplay}{" "}
        </div>
        <div id="mapLegend">
          <div>
            {`<`} {parseInt(band1)}
          </div>
          <div>
            {parseInt(band1)}-{parseInt(band2)}
          </div>
          <div>
            {parseInt(band2)}- {parseInt(band3)}
          </div>
          <div>
            {parseInt(band3)} - {parseInt(band4)}{" "}
          </div>
          <div>
            {parseInt(band4)} - {parseInt(band5)}{" "}
          </div>
          <div>
            {" "}
            {`>`} {parseInt(band5)}{" "}
          </div>
        </div>

        <div id="mapid">{leaflet}</div>
      </Page>
    </div>
  );
};

export default Maps;
