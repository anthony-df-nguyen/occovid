import React, { useEffect, useState, useContext } from "react";
import Page from "components/Page";
import { MapContainer, TileLayer, Popup, GeoJSON } from "react-leaflet";
import { zipVaxMap } from "globalVars/Sources";
import {
  ContextColors,
  band1,
  band2,
  band3,
  band4,
  band5,
} from "components/ContextColors";
import PercentColors from "components/PercentColors";
import ModeSelector from "components/ModeSelector";
import { ThemeContext } from "components/context/ThemeContext";
import ExpandCollapse from "components/ExpandCollapse";

const VaccinationMap = () => {
  const [theme, updateTheme] = useContext(ThemeContext);
  const [leaflet, updateleafLet] = useState();
  const [modeDisplay, updateModeDisplay] = useState();
  const [mode, updateMode] = useState(() => {
    if (!localStorage.getItem("vaxmapLastMode")) {
      updateModeDisplay("Total Vax Rate Age 65+");
      return "rate";
    } else {
      updateModeDisplay(localStorage.getItem("vaxmapLastModeText"));
      return localStorage.getItem("vaxmapLastMode");
    }
  });

  const [raceDisplay, updateRaceDisplay] = useState();
  const [race, updateRace] = useState(() => {
    if (!localStorage.getItem("vaxmapLastRace")) {
      updateRaceDisplay("All Races");
      return "all";
    } else {
      updateRaceDisplay(localStorage.getItem("vaxmapLastRaceText"));
      return localStorage.getItem("vaxmapLastRace");
    }
  });

  const combineModeandRace = () => {
    if (mode == "total") {
      switch (race) {
        case "all":
          return "nv_Tot65up";
          break;
        case "asian":
          return "nv_AsiPI65up";
          break;
        case "black":
          return "nv_Black65up";
          break;
        case "hispanic":
          return "nv_Hisp65up";
          break;
        case "white":
          return "nv_White65up";
          break;
        case "other":
          return "nv_Oth65up";
        default:
          return "nv_Tot65up";
          break;
      }
    } else if (mode == "rate") {
      switch (race) {
        case "all":
          return "Total_65upVRate";
          break;
        case "asian":
          return "AsiPI_65upVRate";
          break;
        case "black":
          return "Black_65upVRate";
          break;
        case "hispanic":
          return "Hisp_65upVRate";
          break;
        case "white":
          return "White_65upVRate";
          break;
        case "other":
          return "Oth_65upVRate";
        default:
          return "Total_65upVRate";
          break;
      }
    }
  };

  const [queryMode, updateQueryMode] = useState(combineModeandRace);

  //console.log("THe querymode  is ", queryMode);
  //Set a starting state for theme or city/zip mode so later we only reload page if theme or city/zip mode changes
  const [startingTheme, updateStartingTheme] = useState(theme);

  let geoArray = [];
  let mounted = true;
  let tileURL;

  if (theme) {
    tileURL = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
  } else {
    tileURL = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
  }
  async function getGEO() {
    await fetch(zipVaxMap)
      .then((a) => a.json())
      .then((b) => b.features)
      .then((c) => {
        geoArray = c;
        //console.log(geoArray)
      })
      .then(() => {
        if (mounted) {
          const valueArray = [];
          geoArray.forEach((a, i) => {
            Object.keys(a.properties).forEach((b, index) => {
              if (b === queryMode && Object.values(a.properties)[index]) {
                valueArray.push(Object.values(a.properties)[index]);
              }
            });
          });

          //console.log('The minmax array is ',valueArray)
          const maxValue = Math.max(...valueArray);
          const minValue = Math.min(...valueArray);
          //console.log(`With a min of ${minValue} and a max of ${maxValue}`)
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
                  const CityOrZipName = a.ZIP_NUM;
                  const Total_65upVRate = a.Total_65upVRate;
                  const AsiPI_65upVRate = a.AsiPI_65upVRate;
                  const Black_65upVRate = a.Black_65upVRate;
                  const Hisp_65upVRate = a.Hisp_65upVRate;
                  const White_65upVRate = a.White_65upVRate;
                  const Oth_65upVRate = a.Oth_65upVRate;
                  const nv_Black65up = a.nv_Black65up;
                  const nv_Hisp65up = a.nv_Hisp65up;
                  const nv_White65up = a.nv_White65up;
                  const nv_AsiPI65up = a.nv_AsiPI65up;
                  const nv_Oth65up = a.nv_Oth65up;
                  const nv_Unk65up = a.nv_Unk65up;
                  const nv_Tot65up = a.nv_Tot65up;
                  const Black_65upPop = a.Black_65upPop;
                  const Hisp_65upPop = a.Hisp_65upPop;
                  const White_65upPop = a.White_65upPop;
                  const AsiPI_65upPop = a.AsiPI_65upPop;
                  const Oth_65upPop = a.Oth_65upPop;
                  const Total_65upPop = a.Total_65upPop;

                  const checkColorSwitch = () => {
                    switch (queryMode) {
                      case "Total_65upVRate":
                        return Total_65upVRate;
                        break;
                      case "AsiPI_65upVRate":
                        return AsiPI_65upVRate;
                        break;
                      case "Black_65upVRate":
                        return Black_65upVRate;
                        break;
                      case "Hisp_65upVRate":
                        return Hisp_65upVRate;
                        break;
                      case "White_65upVRate":
                        return White_65upVRate;
                        break;
                      case "Oth_65upVRate":
                        return Oth_65upVRate;
                        break;
                      case "nv_Tot65up":
                        return nv_Tot65up;
                        break;
                      case "nv_AsiPI65up":
                        return nv_AsiPI65up;
                        break;
                      case "nv_Black65up":
                        return nv_Black65up;
                        break;
                      case "nv_Hisp65up":
                        return nv_Hisp65up;
                        break;
                      case "nv_White65up":
                        return nv_White65up;
                        break;
                      case "nv_Oth65up":
                        return nv_Oth65up;
                        break;
                      default:
                        return Total_65upVRate;
                        break;
                    }
                  };
                  let checkColor = checkColorSwitch();

                  let color;
                  if (mode == "total") {
                    color = ContextColors(
                      checkColor,
                      "highisgood",
                      maxValue,
                      minValue
                    );
                  } else if (mode == "rate") {
                    color = PercentColors(checkColor, "highisgood");
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
                      }}>
                      <Popup key={i}>
                        <div className="cityName"> {CityOrZipName} </div>
                        <h3>for Ages 65+</h3>
                        <br></br>
                        <div className="metricBlock">
                          <div className="metricName">Population:</div>
                          {parseInt(Total_65upPop).toLocaleString()}
                          <br></br>
                          <div className="metricName">Total Vaccinations: </div>
                          {parseInt(nv_Tot65up).toLocaleString()}
                          <br></br>
                          <div className="metricName">Vaccination Rate: </div>
                          {parseFloat(Total_65upVRate).toFixed(1)}%
                        </div>
                        <div id="mapVaxRaceGrid">
                          <div>
                            <div className="metricName">Asian/PI</div>
                            <div>
                              Pop: {parseInt(AsiPI_65upPop).toLocaleString()}
                            </div>
                            <div>
                              {" "}
                              Vaccinated:{" "}
                              {parseInt(nv_AsiPI65up).toLocaleString()}
                            </div>
                            <div>
                              Rate: {parseFloat(AsiPI_65upVRate).toFixed(1)}%
                            </div>
                          </div>

                          <div>
                            <div className="metricName">Black</div>
                            <div>
                              Pop: {parseInt(Black_65upPop).toLocaleString()}
                            </div>
                            <div>
                              {" "}
                              Vaccinated:{" "}
                              {parseInt(nv_Black65up).toLocaleString()}
                            </div>
                            <div>
                              Rate: {parseFloat(Black_65upVRate).toFixed(1)}%
                            </div>
                          </div>

                          <div>
                            <div className="metricName">Hispanic</div>
                            <div>
                              Pop: {parseInt(Hisp_65upPop).toLocaleString()}
                            </div>
                            <div>
                              {" "}
                              Vaccinated:{" "}
                              {parseInt(nv_Hisp65up).toLocaleString()}
                            </div>
                            <div>
                              Rate: {parseFloat(Hisp_65upVRate).toFixed(1)}%
                            </div>
                          </div>

                          <div>
                            <div className="metricName">White</div>
                            <div>
                              Pop: {parseInt(White_65upPop).toLocaleString()}
                            </div>
                            <div>
                              {" "}
                              Vaccinated:{" "}
                              {parseInt(nv_White65up).toLocaleString()}
                            </div>
                            <div>
                              Rate: {parseFloat(White_65upVRate).toFixed(1)}%
                            </div>
                          </div>

                          <div>
                            <div className="metricName">Other</div>
                            <div>
                              Pop: {parseInt(Oth_65upPop).toLocaleString()}
                            </div>
                            <div>
                              {" "}
                              Vaccinated:{" "}
                              {parseInt(nv_Oth65up).toLocaleString()}
                            </div>
                            <div>
                              Rate: {parseFloat(Oth_65upVRate).toFixed(1)}%
                            </div>
                          </div>
                        </div>
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
      updateQueryMode(combineModeandRace);
    }
    return () => {
      mounted = false;
    };
  }, [mode, race]);

  useEffect(() => {
    if (mounted) {
      getGEO();
    }
    return () => {
      mounted = false;
    };
  }, [queryMode]);

  //Only reload the page if the starting theme is diffrent than the change
  useEffect(() => {
    if (mounted && theme != startingTheme) {
      window.location.reload();
    }
  }, [theme]);
  //Only reload the page if the starting cityOrZip is diffrent than the change

  const switchLegend = () => {
    if (mode == "total") {
      return (
        <div id="mapLegend">
          <div className="highisgood">
            {`<`} {parseInt(band1)}
          </div>
          <div className="highisgood">
            {parseInt(band1)}-{parseInt(band2)}
          </div>
          <div className="highisgood">
            {parseInt(band2)}- {parseInt(band3)}
          </div>
          <div className="highisgood">
            {parseInt(band3)} - {parseInt(band4)}{" "}
          </div>
          <div className="highisgood">
            {parseInt(band4)} - {parseInt(band5)}{" "}
          </div>
          <div className="highisgood">
            {" "}
            {`>`} {parseInt(band5)}{" "}
          </div>
        </div>
      );
    } else {
      return (
        <div id="mapLegend">
          <div className="percgood">&lt; 20%</div>
          <div className="percgood">20% - 40%</div>
          <div className="percgood">40% - 60%</div>
          <div className="percgood">60% - 80%</div>
          <div className="percgood">&gt; 80%</div>
        </div>
      );
    }
  };

  return (
    <div>
      <Page title="Vaccination Map: Ages 65+">
        <ExpandCollapse title="Change Map Mode" buttontext="Close">
          <ModeSelector
            text="Select Race/Ethnicity"
            function={[updateRace, updateRaceDisplay]}
            current={race}
            options={[
              {
                display: "All Races",
                value: "all",
              },
              {
                display: "Asian/PI",
                value: "asian",
              },
              {
                display: "Black",
                value: "black",
              },
              {
                display: "Hispanic",
                value: "hispanic",
              },
              {
                display: "White",
                value: "white",
              },
              {
                display: "Other",
                value: "other",
              },
            ]}
            storageKey={["vaxmapLastRace", "vaxmapLastRaceText"]}
          />
          <ModeSelector
            text="Select Metric"
            function={[updateMode, updateModeDisplay]}
            current={mode}
            options={[
              {
                display: "% Vaccinated",
                value: "rate",
              },
              {
                display: "Total Vaccinated",
                value: "total",
              },
            ]}
            storageKey={["vaxmapLastMode", "vaxmapLastModeText"]}
          />
        </ExpandCollapse>

        <div style={{ marginTop: "1rem" }} className="chartTitle">
          Race/Eth: {raceDisplay} &nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;  &nbsp;Mode: {modeDisplay} 
        </div>
        {switchLegend()}

              <div id="mapid">{ leaflet }</div>
              <br></br>
              <p style={{textAlign:'center'}}>Only data for ages 65+ is currently available. Data for those under &lt; 65  and totals expected to be available soon</p>
      </Page>
    </div>
  );
};

export default VaccinationMap;
