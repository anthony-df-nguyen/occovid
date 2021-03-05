import React, { useEffect, useState, useContext } from "react";
import Page from "components/Page";
import { MapContainer, TileLayer, Popup, GeoJSON } from "react-leaflet";
import { zipVaxMap } from "globalVars/Sources";
import { ContextColors, band1, band2, band3, band4, band5 } from "components/ContextColors";
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
  const [ageDisplay, updateAgeDisplay] = useState();
  const [age, updateAge] = useState(() => {
    if (!localStorage.getItem("vaxMapLastAge")) {
      updateAgeDisplay("All Ages");
      return "all";
    } else {
      updateAgeDisplay(localStorage.getItem("vaxMapLastAgeText"));
      return localStorage.getItem("vaxMapLastAge");
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

  console.log("THe querymode  is ", queryMode);
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

        console.log('The minmax array is ',valueArray)
        const maxValue = Math.max(...valueArray);
        const minValue = Math.min(...valueArray);
        //console.log(`With a min of ${minValue} and a max of ${maxValue}`)
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
                  //Goes through array of data and returns the property of each zip
                  let a = row.properties;
                  const CityOrZipName = a.ZIP_NUM;
                  let asianPop, asianVax, asianRate, blackPop, blackVax, blackRate, whitePop, whiteVax, whiteRate, hisPop, hisVax, hisRate, othPop, othVax, othRate, totalPop, totalVax, totalRate;

                  //All Ages
                  if (age === "all") {
                    blackPop = a.Black_pop;
                    hisPop = a.Hisp_pop;
                    whitePop = a.White_Pop;
                    asianPop = a.AsiPI_Pop;
                    othPop = a.Oth_Pop;
                    totalPop = a.Total_Pop;
                    blackRate = a.Black_VRate;
                    hisRate = a.Hisp_VRate;
                    whiteRate = a.White_VRate;
                    asianRate = a.AsiPI_VRate;
                    othRate = a.Oth_VRate;
                    totalRate = a.Total_VRate;
                    blackVax = a.nv_Black;
                    hisVax = a.nv_Hisp;
                    whiteVax = a.nv_White;
                    asianVax = a.nv_AsiPI;
                    othVax = a.nv_Oth;
                    totalVax = a.nv_Tot;
                  }
                  //Ages < 65
                  if (age == "under65") {
                    blackPop = a.Black_bel65Pop;
                    hisPop = a.Hisp_bel65Pop;
                    whitePop = a.White_bel65Pop;
                    asianPop = a.AsiPI_bel65pPop;
                    othPop = a.Oth_bel65Pop;
                    totalPop = a.Total_bel65Pop;
                    blackRate = a.Black_bel65VRate;
                    hisRate = a.Hisp_bel65VRate;
                    whiteRate = a.White_bel65VRate;
                    asianRate = a.AsiPI_bel65VRate;
                    othRate = a.Oth_bel65VRate;
                    totalRate = a.Total_bel65VRate;
                    blackVax = a.nv_Blackbel65;
                    hisVax = a.nv_Hispbel65;
                    whiteVax = a.nv_Whitebel65;
                    asianVax = a.nv_AsiPIbel65;
                    othVax = a.nv_Othbel65;
                    totalVax = a.nv_Totbel65;
                  }

                  //Ages 65+ Only
                  if (age == "over65") {
                    blackPop = a.Black_65upPop;
                    hisPop = a.Hisp_65upPop;
                    whitePop = a.White_65upPop;
                    asianPop = a.AsiPI_65upPop;
                    othPop = a.Oth_65upPop;
                    totalPop = a.Total_65upPop;
                    totalRate = a.Total_65upVRate;
                    asianRate = a.AsiPI_65upVRate;
                    blackRate = a.Black_65upVRate;
                    hisRate = a.Hisp_65upVRate;
                    whiteRate = a.White_65upVRate;
                    othRate = a.Oth_65upVRate;
                    blackVax = a.nv_Black65up;
                    hisVax = a.nv_Hisp65up;
                    whiteVax = a.nv_White65up;
                    asianVax = a.nv_AsiPI65up;
                    othVax = a.nv_Oth65up;
                    totalVax = a.nv_Tot65up;
                  }

                  //Figure out which metric is being used to generate a color for the legend
                  // const checkColorSwitch = () => {
                  //   switch (queryMode) {
                  //     case "Total_65upVRate":
                  //       return Total_65upVRate;
                  //       break;
                  //     case "AsiPI_65upVRate":
                  //       return AsiPI_65upVRate;
                  //       break;
                  //     case "Black_65upVRate":
                  //       return Black_65upVRate;
                  //       break;
                  //     case "Hisp_65upVRate":
                  //       return Hisp_65upVRate;
                  //       break;
                  //     case "White_65upVRate":
                  //       return White_65upVRate;
                  //       break;
                  //     case "Oth_65upVRate":
                  //       return Oth_65upVRate;
                  //       break;
                  //     case "nv_Tot65up":
                  //       return nv_Tot65up;
                  //       break;
                  //     case "nv_AsiPI65up":
                  //       return nv_AsiPI65up;
                  //       break;
                  //     case "nv_Black65up":
                  //       return nv_Black65up;
                  //       break;
                  //     case "nv_Hisp65up":
                  //       return nv_Hisp65up;
                  //       break;
                  //     case "nv_White65up":
                  //       return nv_White65up;
                  //       break;
                  //     case "nv_Oth65up":
                  //       return nv_Oth65up;
                  //       break;
                  //     default:
                  //       return Total_65upVRate;
                  //       break;
                  //   }
                  // };
                  let checkColor = queryMode;
                  let color;
                  if (mode == "total") {
                    color = ContextColors(checkColor, "highisgood", maxValue, minValue);
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
                          {parseFloat(totalVax).toFixed(1)}%
                        </div>
                        <div id="mapVaxRaceGrid">
                          <div>
                            <div className="metricName">Asian/PI</div>
                            <div>Pop: {parseInt(asianPop).toLocaleString()}</div>
                            <div> Vaccinated: {parseInt(asianVax).toLocaleString()}</div>
                            <div>Rate: {parseFloat(asianRate).toFixed(1)}%</div>
                          </div>

                          <div>
                            <div className="metricName">Black</div>
                            <div>Pop: {parseInt(blackPop).toLocaleString()}</div>
                            <div> Vaccinated: {parseInt(blackVax).toLocaleString()}</div>
                            <div>Rate: {parseFloat(blackRate).toFixed(1)}%</div>
                          </div>

                          <div>
                            <div className="metricName">Hispanic</div>
                            <div>Pop: {parseInt(hisPop).toLocaleString()}</div>
                            <div> Vaccinated: {parseInt(hisVax).toLocaleString()}</div>
                            <div>Rate: {parseFloat(hisRate).toFixed(1)}%</div>
                          </div>

                          <div>
                            <div className="metricName">White</div>
                            <div>Pop: {parseInt(whitePop).toLocaleString()}</div>
                            <div> Vaccinated: {parseInt(whiteVax).toLocaleString()}</div>
                            <div>Rate: {parseFloat(whiteRate).toFixed(1)}%</div>
                          </div>

                          <div>
                            <div className="metricName">Other</div>
                            <div>Pop: {parseInt(othPop).toLocaleString()}</div>
                            <div> Vaccinated: {parseInt(othVax).toLocaleString()}</div>
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
        <ExpandCollapse title="Change Map Mode" buttontext="Close">
          <ModeSelector
            text="Age Group"
            function={[updateAge, updateAgeDisplay]}
            current={age}
            options={[
              {
                display: "All Ages",
                value: "all",
              },
              {
                display: "Over 65",
                value: "over65",
              },
              {
                display: "Under 65",
                value: "under65",
              },
            ]}
            storageKey={["vaxMapLastAge", "vaxMapLastAgeText"]}
          />
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
          Ages: {ageDisplay} &nbsp;&nbsp;&nbsp; |&nbsp;&nbsp; &nbsp;Race/Eth: {raceDisplay} &nbsp;&nbsp;&nbsp; |&nbsp;&nbsp; &nbsp;Mode: {modeDisplay}
        </div>
        {switchLegend()}

        <div id="mapid">{leaflet}</div>
        <br></br>
        <p style={{ textAlign: "center" }}>Only data for ages 65+ is currently available. Data for those under &lt; 65 and totals expected to be available soon</p>
      </Page>
    </div>
  );
};

export default VaccinationMap;
