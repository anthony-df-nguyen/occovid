import React, { createElement, useEffect, useState } from "react";
import Page from "components/Page";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import { CityDataWithGeo } from "globalVars/Sources";
import {
  ContextColors,
  band1,
  band2,
  band3,
  band4,
  band5,
} from "components/ContextColors";
import MapMetricSelect from "components/MapModeSelect";

const Maps = () => {
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

  let geoArray;
  let mounted = true;

  async function getGEO() {
    // console.log("Running");
    await fetch(CityDataWithGeo)
      .then((a) => a.json())
      .then((b) => b.features)
      .then((c) => {
        geoArray = c;
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
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                  maxZoom={19}
                />
                {geoArray.map((row, i) => {
                  //console.log(row.properties);
                  const {
                    CaseRate,
                    Cases_0_3,
                    Cases_0_17,
                    Cases_0_18,
                    Cases_4_9,
                    Cases_10_12,
                    Cases_13_14,
                    Cases_15_18,
                    City,
                    City_Match,
                    DeathRate,
                    OBJECTID,
                    OBJECTID_1,
                    OBJECTID_2,
                    OBJECTID_12_13,
                    ORIG_FID,
                    ObjectID_12,
                    PLACE_NM,
                    Pop0_17,
                    SNFCase,
                    SNFDth,
                    SUM_Acres,
                    SUM_Area,
                    SUM_Hectar,
                    SUM_Perime,
                    SUM_Shap_1,
                    SUM_Shap_2,
                    SUM_Shape1,
                    SUM_Shape_,
                    Shape_Le_1,
                    Shape_Le_2,
                    Shape_Leng,
                    Shape__Area,
                    Shape__Length,
                    Sup03Cases,
                    Sup018Cases,
                    Sup49Cases,
                    Sup1012Cases,
                    Sup1314Cases,
                    Sup1518Cases,
                    SupDthRte,
                    Sup_Cas017,
                    Sup_Dths,
                    Sup_TCaseRte,
                    Sup_TotCas,
                    Tot_Cases,
                    Tot_Deaths,
                    Total_Pop,
                  } = row.properties;
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
                        <div className="cityName"> {City} </div>
                        <div className="metricBlock">
                          <div className="metricName">Population</div>:
                          {parseInt(Total_Pop).toLocaleString()}
                        </div>
                        {/* List of Cases */}
                        <ul>
                          <li>
                            <div className="metricBlock">
                              <div className="metricName">Cases</div>:
                              {parseInt(Tot_Cases).toLocaleString()}
                            </div>
                          </li>
                          <li>
                            <div className="metricBlock">
                              <div className="metricName">Death:</div>
                              {parseInt(Tot_Deaths).toLocaleString()}
                            </div>
                          </li>
                          <li>
                            <div className="metricBlock">
                              <div className="metricName">Case Rate: </div>
                              {parseFloat(CaseRate).toFixed(1)}
                            </div>
                          </li>
                          <li>
                            <div className="metricBlock">
                              <div className="metricName">Death Rate:</div>
                              {parseFloat(DeathRate).toFixed(1)}
                            </div>
                          </li>
                        </ul>
                        {/* List of Ages */}
                        <ul>
                          <li>
                            <div className="metricBlock">
                              <div className="metricName">Cases 0-3</div>:
                              {parseInt(Cases_0_3).toLocaleString()}
                            </div>
                          </li>
                          <li>
                            <div className="metricBlock">
                              <div className="metricName">Cases 4-9</div>:{" "}
                              {parseInt(Cases_4_9).toLocaleString()}
                            </div>
                          </li>
                          <li>
                            <div className="metricBlock">
                              <div className="metricName">Cases 10-12</div>:{" "}
                              {parseInt(Cases_10_12).toLocaleString()}
                            </div>
                          </li>
                          <li>
                            <div className="metricBlock">
                              <div className="metricName">Cases 13-14</div>:{" "}
                              {parseInt(Cases_13_14).toLocaleString()}
                            </div>
                          </li>
                          <li>
                            <div className="metricBlock">
                              <div className="metricName">Cases 15-18</div>:{" "}
                              {parseInt(Cases_15_18).toLocaleString()}
                            </div>
                          </li>
                          <li>
                            <div className="metricBlock">
                              <div className="metricName">Under 18</div>:{" "}
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

  return (
    <div>
      <Page title="Map">
        <MapMetricSelect
          function={[updateMode, updateModeDisplay]}
          current={mode}
        />
        <div style={{ marginTop: "1rem" }} className="chartTitle">
          Current Mode: {modeDisplay}{" "}
        </div>
        <div id="mapLegend">
          <div>{`<`} {parseInt(band1)}</div>
          <div>{parseInt(band1)}-{parseInt(band2)}</div>
          <div>{parseInt(band2)}- {parseInt(band3)}</div>
          <div>{parseInt(band3)} - {parseInt(band4)} </div>
          <div>{parseInt(band4)} - {parseInt(band5)} </div>
          <div> {`>`} {parseInt(band5)} </div>
        </div>

        <div id="mapid">{leaflet}</div>
      </Page>
    </div>
  );
};

export default Maps;
