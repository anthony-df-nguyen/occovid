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

  //Set State for the Mode (Total vs % Vaccinated)
  const [modeDisplay, updateModeDisplay] = useState();
  const [mode, updateMode] = useState(() => {
    if (!localStorage.getItem("vaxmapLastMode")) {
      updateModeDisplay("% Vaccinated");
      return "rate";
    } else {
      updateModeDisplay(localStorage.getItem("vaxmapLastModeText"));
      return localStorage.getItem("vaxmapLastMode");
    }
  });

  //Set state for which age group All vs over 65 vs under 65
  const [ageDisplay, updateAgeDisplay] = useState();
  const [age, updateAge] = useState(() => {
    if (!localStorage.getItem("vaxMapLastAge")) {
      updateAgeDisplay("Over 65");
      return "over65";
    } else {
      updateAgeDisplay(localStorage.getItem("vaxMapLastAgeText"));
      return localStorage.getItem("vaxMapLastAge");
    }
  });

  //Set state for which race is being used all vs specific
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

  //Set state for what the final querymode is. This is used to generate the legend range and figure out which vars to use later
  const createAgeRaceMode = () => {
    //All Ages
    if (age == "all") {
      if (mode == "total") {
        switch (race) {
          case "all":
            return "nv_Tot";
            break;
          case "asian":
            return "nv_AsiPI";
            break;
          case "black":
            return "nv_Black";
            break;
          case "hispanic":
            return "nv_Hisp";
            break;
          case "white":
            return "nv_White";
            break;
          case "other":
            return "nv_Oth";
          default:
            return "nv_Tot";
            break;
        }
      } else if (mode == "rate") {
        switch (race) {
          case "all":
            return "Total_VRate";
            break;
          case "asian":
            return "AsiPI_VRate";
            break;
          case "black":
            return "Black_VRate";
            break;
          case "hispanic":
            return "Hisp_VRate";
            break;
          case "white":
            return "White_VRate";
            break;
          case "other":
            return "Oth_VRate";
          default:
            return "Total_VRate";
            break;
        }
      }
    }
    //For Under 65
    if (age == "under65") {
      if (mode == "total") {
        switch (race) {
          case "all":
            return "nv_Totbel65";
            break;
          case "asian":
            return "nv_AsiPIbel65";
            break;
          case "black":
            return "nv_Blackbel65";
            break;
          case "hispanic":
            return "nv_Hispbel65";
            break;
          case "white":
            return "nv_Whitebel65";
            break;
          case "other":
            return "nv_Othbel65";
          default:
            return "nv_Totbel65";
            break;
        }
      } else if (mode == "rate") {
        switch (race) {
          case "all":
            return "Total_bel65VRate";
            break;
          case "asian":
            return "AsiPI_bel65pPop";
            break;
          case "black":
            return "Black_bel65VRate";
            break;
          case "hispanic":
            return "Hisp_bel65VRate";
            break;
          case "white":
            return "White_bel65VRate";
            break;
          case "other":
            return "Oth_bel65VRate";
          default:
            return "Total_bel65VRate";
            break;
        }
      }
    }
    //For Over 65
    if (age == "over65") {
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
    }
  };
  const [queryMode, updateQueryMode] = useState(createAgeRaceMode);

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

  //Fetch and build the GEOJSON components
  async function getGEO() {
    await fetch(zipVaxMap)
      .then((a) => a.json())
      .then((b) => b.features)
      .then((c) => {
        geoArray = c;
        //console.log(geoArray);
      })
      .then(() => {
        const valueArray = [];
        //Go through the array and find only values that match the mode to figure out the legend colors
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
        //console.log(`With a min of ${minValue} and a max of ${maxValue}`);
        if (mounted) {
          updateleafLet(() => {
            return (
              <MapContainer center={[33.68, -117.8]} zoom={10}>
                <TileLayer
                  url={tileURL}
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                  maxZoom={19}
                />

                {geoArray.map((row, i) => {
                  //Goes through array of data and returns the property of each zip code
                  let a = row.properties;
                  const CityOrZipName = a.ZIP_NUM;
                  let asianPop,
                    asianVax,
                    asianRate,
                    blackPop,
                    blackVax,
                    blackRate,
                    whitePop,
                    whiteVax,
                    whiteRate,
                    hisPop,
                    hisVax,
                    hisRate,
                    othPop,
                    othVax,
                    othRate,
                    totalPop,
                    totalVax,
                    totalRate;

                  //All Ages
                  if (age === "all") {
                    blackPop = a.Black_pop;
                    hisPop = a.Hisp_pop;
                    whitePop = a.White_Pop;
                    asianPop = a.AsiPI_Pop;
                    othPop = a.Oth_Pop;
                    totalPop = a.Total_Pop;
                    blackRate = parseFloat(((a.nv_Black / a.Black_pop)*100).toFixed(1));
                    hisRate = parseFloat(((a.nv_Hisp / a.Hisp_pop)*100).toFixed(1));
                    whiteRate = parseFloat(((a.nv_White / a.White_Pop)*100).toFixed(1));
                    asianRate = parseFloat(((a.nv_AsiPI / a.AsiPI_Pop)*100).toFixed(1));
                    othRate = parseFloat(((a.nv_Oth / a.Oth_Pop)*100).toFixed(1));
                    totalRate = parseFloat(((a.nv_Tot / a.Total_Pop)*100).toFixed(1));
                    blackVax = a.nv_Black;
                    hisVax = a.nv_Hisp;
                    whiteVax = a.nv_White;
                    asianVax = a.nv_AsiPI;
                    othVax = a.nv_Oth;
                    totalVax = a.nv_Tot;
                  }
                  //Ages < 65
                  if (age === "under65") {
                    blackPop = a.Black_bel65Pop;
                    hisPop = a.Hisp_bel65Pop;
                    whitePop = a.White_bel65Pop;
                    asianPop = a.AsiPI_bel65pPop;
                    othPop = a.Oth_bel65Pop;
                    totalPop = a.Total_bel65Pop;
                    blackRate = parseFloat(((a.nv_Blackbel65 / a.Black_bel65Pop)*100).toFixed(1));
                    hisRate = parseFloat(((a.nv_Hispbel65 / a.Hisp_bel65Pop)*100).toFixed(1));
                    whiteRate = parseFloat(((a.nv_Whitebel65 / a.White_bel65Pop)*100).toFixed(1));
                    asianRate = parseFloat(((a.nv_AsiPIbel65 / a.AsiPI_bel65pPop)*100).toFixed(1));
                    othRate = parseFloat(((a.nv_Othbel65 / a.Oth_bel65Pop)*100).toFixed(1));
                    totalRate = parseFloat(((a.nv_Totbel65 / a.Total_bel65Pop)*100).toFixed(1));
                    blackVax = a.nv_Blackbel65;
                    hisVax = a.nv_Hispbel65;
                    whiteVax = a.nv_Whitebel65;
                    asianVax = a.nv_AsiPIbel65;
                    othVax = a.nv_Othbel65;
                    totalVax = a.nv_Totbel65;
                  }

                  //Ages 65+ Only
                  if (age === "over65") {
                    blackPop = a.Black_65upPop;
                    hisPop = a.Hisp_65upPop;
                    whitePop = a.White_65upPop;
                    asianPop = a.AsiPI_65upPop;
                    othPop = a.Oth_65upPop;
                    totalPop = a.Total_65upPop;
                    totalRate = parseFloat(((a.nv_Tot65up / a.Total_65upPop)*100).toFixed(1));
                    asianRate = parseFloat(((a.nv_AsiPI65up / a.AsiPI_65upPop)*100).toFixed(1))
                    blackRate = parseFloat(((a.nv_Black65up / a.Black_65upPop)*100).toFixed(1))
                    hisRate = parseFloat(((a.nv_Hisp65up / a.Hisp_65upPop)*100).toFixed(1))
                    whiteRate = parseFloat(((a.nv_White65up / a.White_65upPop)*100).toFixed(1))
                    othRate = parseFloat(((a.nv_Oth65up / a.Oth_65upPop)*100).toFixed(1))
                    blackVax = a.nv_Black65up;
                    hisVax = a.nv_Hisp65up;
                    whiteVax = a.nv_White65up;
                    asianVax = a.nv_AsiPI65up;
                    othVax = a.nv_Oth65up;
                    totalVax = a.nv_Tot65up;
                  }

                  //Figure out which var to pass to the color legend component
                  const checkColorSwitch = () => {
                    if (mode == "total") {
                      switch (race) {
                        case "all":
                          return totalVax;
                          break;
                        case "asian":
                          return asianVax;
                          break;
                        case "black":
                          return blackVax;
                          break;
                        case "hispanic":
                          return hisVax;
                          break;
                        case "white":
                          return whiteVax;
                          break;
                        case "other":
                          return othVax;
                          break;
                        default:
                          return totalVax;
                          break;
                      }
                    } else if (mode == "rate") {
                      switch (race) {
                        case "all":
                          return totalRate;
                          break;
                        case "asian":
                          return asianRate;
                          break;
                        case "black":
                          return blackRate;
                          break;
                        case "hispanic":
                          return hisRate;
                          break;
                        case "white":
                          return whiteRate;
                          break;
                        case "other":
                          return othRate;
                          break;
                        default:
                          return totalRate;
                          break;
                      }
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
                        <h3>for {ageDisplay}</h3>
                        <br></br>
                        <div className="metricBlock">
                          <div className="metricName">Population:</div>
                          {parseInt(totalPop).toLocaleString()}
                          <br></br>
                          <div className="metricName">Total Vaccinations: </div>
                          {parseInt(totalVax).toLocaleString()}
                          <br></br>
                          <div className="metricName">Vaccination Rate: </div>
                          {parseFloat(totalRate).toFixed(1)}%
                        </div>
                        <div id="mapVaxRaceGrid">
                          <div>
                            <div className="metricName">Asian/PI</div>
                            <div>
                              Pop: {parseInt(asianPop).toLocaleString()}
                            </div>
                            <div>
                              {" "}
                              Vaccinated: {parseInt(asianVax).toLocaleString()}
                            </div>
                            <div>Rate: {parseFloat(asianRate).toFixed(1)}%</div>
                          </div>

                          <div>
                            <div className="metricName">Black</div>
                            <div>
                              Pop: {parseInt(blackPop).toLocaleString()}
                            </div>
                            <div>
                              {" "}
                              Vaccinated: {parseInt(blackVax).toLocaleString()}
                            </div>
                            <div>Rate: {parseFloat(blackRate).toFixed(1)}%</div>
                          </div>

                          <div>
                            <div className="metricName">Hispanic</div>
                            <div>Pop: {parseInt(hisPop).toLocaleString()}</div>
                            <div>
                              {" "}
                              Vaccinated: {parseInt(hisVax).toLocaleString()}
                            </div>
                            <div>Rate: {parseFloat(hisRate).toFixed(1)}%</div>
                          </div>

                          <div>
                            <div className="metricName">White</div>
                            <div>
                              Pop: {parseInt(whitePop).toLocaleString()}
                            </div>
                            <div>
                              {" "}
                              Vaccinated: {parseInt(whiteVax).toLocaleString()}
                            </div>
                            <div>Rate: {parseFloat(whiteRate).toFixed(1)}%</div>
                          </div>

                          <div>
                            <div className="metricName">Other</div>
                            <div>Pop: {parseInt(othPop).toLocaleString()}</div>
                            <div>
                              {" "}
                              Vaccinated: {parseInt(othVax).toLocaleString()}
                            </div>
                            <div>Rate: {parseFloat(othRate).toFixed(1)}%</div>
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
      updateQueryMode(createAgeRaceMode);
    }
    return () => {
      mounted = false;
    };
  }, [mode, race, age]);

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
      <Page title="Vaccination Map">

      <div  className="chartTitle">
            <div id='mapModeDisplayContainer'>
            
            <div className="mapModeDisplay"><b>Mode:</b> {modeDisplay}</div>
          <div className="mapModeDisplay"><b>Race:</b> {raceDisplay}   </div>
          <div className="mapModeDisplay"><b>Ages:</b> {ageDisplay}</div>
            </div>
            
        </div>
        <ExpandCollapse title="Change Map Mode" buttontext="Close">
        <ModeSelector
            text="Color the map using data for which race?"
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
            text="By age group"
            function={[updateAge, updateAgeDisplay]}
            current={age}
            options={[
              {
                display: "All Ages",
                value: "all",
              },
              {
                display: "Ages >= 65",
                value: "over65",
              },
              {
                display: "Ages < 65",
                value: "under65",
              },
            ]}
            storageKey={["vaxMapLastAge", "vaxMapLastAgeText"]}
          />

          <ModeSelector
            text="Choose a mode"
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


        {switchLegend()}

        <div id="mapid">{leaflet}</div>
      </Page>
    </div>
  );
};

export default VaccinationMap;
