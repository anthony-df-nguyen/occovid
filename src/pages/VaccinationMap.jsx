/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import Page from "components/Page";
import { MapContainer, TileLayer, Popup, GeoJSON } from "react-leaflet";
import {
  zipVaxMapYouth,
  zipVaxMapSrs,
  zipMapAllAges,
} from "globalVars/Sources";
import FetchVaccineDate from "Datafetch/FetchVaccineDate";
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
  const [asof, updateDate] = useState("Getting last update date...");
  // eslint-disable-next-line no-unused-vars
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
    if (!localStorage.getItem("vaxMapLastAgev2")) {
      updateAgeDisplay("Ages < 65");
      return "under65";
    } else {
      updateAgeDisplay(localStorage.getItem("vaxMapLastAgev2Text"));
      return localStorage.getItem("vaxMapLastAgev2");
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
    if (mode === "total") {
      switch (race) {
        case "all":
          return "Tot_fullv";

        case "asian":
          return "AsiPI_fullv";

        case "black":
          return "Black_fullv";

        case "hispanic":
          return "Hisp_fullv";

        case "white":
          return "White_fullv";

        case "other":
          return "Oth_fullv";
        default:
          return "Tot_fullv";
      }
    } else if (mode === "rate") {
      switch (race) {
        case "all":
          return "perTot_fullv";

        case "asian":
          return "perAsiPI_fullv";

        case "black":
          return "perBlack_fullv";

        case "hispanic":
          return "perHisp_fullv";

        case "white":
          return "perWhite_fullv";

        case "other":
          return "perOth_fullv";
        default:
          return "perTot_fullv";
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
    let url;
    if (age === "under65") {
      url = zipVaxMapYouth;
    }
    if (age === "over65") {
      url = zipVaxMapSrs;
    }
    if (age === "all") {
      url = zipMapAllAges;
    }

    await fetch(url)
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
        ///console.log(`With a min of ${minValue} and a max of ${maxValue}`);
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

                  if (age) {
                    blackPop = a.Black_pop;
                    hisPop = a.Hisp_pop;
                    whitePop = a.White_Pop;
                    asianPop = a.AsiPI_Pop;
                    othPop = a.Oth_Pop;
                    totalPop = a.Tot_pop;
                    blackVax = a.Black_fullv;
                    hisVax = a.Hisp_fullv;
                    whiteVax = a.White_fullv;
                    asianVax = a.AsiPI_fullv;
                    othVax = a.Oth_fullv;
                    totalVax = a.Tot_fullv;
                    blackRate = parseFloat(
                      ((blackVax / blackPop) * 100).toFixed(1)
                    );
                    hisRate = parseFloat(((hisVax / hisPop) * 100).toFixed(1));
                    whiteRate = parseFloat(
                      ((whiteVax / whitePop) * 100).toFixed(1)
                    );
                    asianRate = parseFloat(
                      ((asianVax / asianPop) * 100).toFixed(1)
                    );
                    othRate = parseFloat(((othVax / othPop) * 100).toFixed(1));
                    totalRate = parseFloat(
                      ((totalVax / totalPop) * 100).toFixed(1)
                    );
                  }

                  //Figure out which var to pass to the color legend component
                  const checkColorSwitch = () => {
                    if (mode === "total") {
                      switch (race) {
                        case "all":
                          return totalVax;

                        case "asian":
                          return asianVax;

                        case "black":
                          return blackVax;

                        case "hispanic":
                          return hisVax;

                        case "white":
                          return whiteVax;

                        case "other":
                          return othVax;

                        default:
                          return totalVax;
                      }
                    } else if (mode === "rate") {
                      switch (race) {
                        case "all":
                          return totalRate;

                        case "asian":
                          return asianRate;

                        case "black":
                          return blackRate;

                        case "hispanic":
                          return hisRate;

                        case "white":
                          return whiteRate;

                        case "other":
                          return othRate;

                        default:
                          return totalRate;
                      }
                    }
                  };
                  let checkColor = checkColorSwitch();

                  let color;
                  if (mode === "total") {
                    color = ContextColors(
                      checkColor,
                      "highisgood",
                      maxValue,
                      minValue
                    );
                  } else if (mode === "rate") {
                    color = PercentColors(
                      checkColor,
                      "highisgood",
                      15,
                      30,
                      45,
                      60,
                      75
                    );
                  }

                  return (
                    <GeoJSON
                      key={i}
                      data={row.geometry}
                      pathOptions={{
                        color: "#333",
                        weight: 0.2,
                        fillColor: color,
                        fillOpacity: ".35",
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
      //console.log(`The mode is ${mode}, the race is ${race}, the age is ${age}`)
      updateQueryMode(createAgeRaceMode);
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
  }, [queryMode, age]);

  //Only reload the page if the starting theme is diffrent than the change
  useEffect(() => {
    if (mounted && theme !== startingTheme) {
      window.location.reload();
    }
  }, [theme]);
  //Only reload the page if the starting cityOrZip is diffrent than the change

  const switchLegend = () => {
    if (mode === "total") {
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
          <div className="percgood">&lt; 15%</div>
          <div className="percgood">15% - 30%</div>
          <div className="percgood">30% - 45%</div>
          <div className="percgood">45% - 60%</div>
          <div className="percgood">60% - 75%</div>
          <div className="percgood">&gt; 75% +</div>
        </div>
      );
    }
  };

  return (
    <div>
      <FetchVaccineDate function={updateDate} />
      <Page title="Vaccination Map">
        <div id="lastUpdateDate">
          <p>{asof}</p>
        </div>
        <div className="chartTitle">
          <div id="mapModeDisplayContainer">
            <div className="mapModeDisplay">
              <b>Mode:</b> {modeDisplay}
            </div>
            <div className="mapModeDisplay">
              <b>Race:</b> {raceDisplay}{" "}
            </div>
            <div className="mapModeDisplay">
              <b>Ages:</b> {ageDisplay}
            </div>
          </div>
        </div>
        {/* <div className="uiButtonSubText">
          'All Ages' and '&lt; 65' removed as it's unclear if county will
          continue to provide the data
        </div> */}
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
              // {
              //   display: "All Ages",
              //   value: "all",
              // },

              {
                display: "Ages < 65",
                value: "under65",
              },
              {
                display: "Ages >= 65",
                value: "over65",
              },
            ]}
            storageKey={["vaxMapLastAgev2", "vaxMapLastAgev2Text"]}
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
