import React, { createElement, useEffect, useState } from "react";
import Page from "components/Page";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import { CityDataWithGeo } from "globalVars/Sources";

const Maps = () => {
  const [leaflet, updateleafLet] = useState();
  const [mode, updateMode] = useState('Case Rate');
  let geoArray;
  let mounted = true;
  

  async function getGEO() {
    console.log("Running");
    await fetch(CityDataWithGeo)
      .then((a) => a.json())
      .then((b) => b.features)
      .then((c) => {
        geoArray = c;
      })
      .then(() => {
        console.log(geoArray[0]);
        if (mounted) {
          updateleafLet(() => {
            return (
              <MapContainer center={[33.68, -117.8]} zoom={10.5}>
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                  maxZoom={19}
                />
                {geoArray.map((row, i) => {
                  // console.log(row);
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
                  const getColor = () => {
                     switch (mode) {
                        case 'Case Rate':
                          return 'red';
                          break;
                      
                        default:
                        return 'orange';
                          break;
                      }
                  }
                  return (
                    <GeoJSON key={i} data={row} pathOptions={{
                        color: '#666',
                        weight: 1,
                        fillColor: getColor(),
                        fillOpacity: '.2',
                    }}>
                      <Popup key={i}>
                        <div className="cityName"> {City} </div>
                         <div className="metricName">               
                          <span>Cases</span>: {parseInt(Tot_Cases).toLocaleString()}{" "}
                        </div>
                         <div className="metricName">                      
                          <span>Death:</span> {parseInt(Tot_Deaths).toLocaleString()}{" "}
                        </div>
                        <div className="metricName"> 
                          <span>Case Rate: </span>{parseFloat(CaseRate).toFixed(1)}{" "}
                        </div>
                        <div className="metricName">                  
                          <span>Death Rate:</span> {parseFloat(DeathRate).toFixed(1)}{" "}
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
      getGEO();
    }
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div>
      <Page title="Map">
        <div id="mapid">{leaflet}</div>
      </Page>
    </div>
  );
};

export default Maps;
