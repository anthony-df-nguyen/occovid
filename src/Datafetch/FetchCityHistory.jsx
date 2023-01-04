import React, { useEffect, useState } from "react";
import filtertime from "components/Timefilter.js";
import moment from "moment";

const FetchCityHistory = (props) => {
  //const [update1, update2, update3] = props.arrayUpdate
  const [city1, city2, city3] = props.cities;

  return (
    <>
      {useEffect(() => {
        let mounted = true;
        const getData = async (cityName, i) => {
          let cityData = [];
          let fetchURL = `https://services2.arcgis.com/LORzk2hk9xzHouw9/arcgis/rest/services/Public_OC_COVID_Cases_by_City_by_Day/FeatureServer/0/query?where=0%3D0&objectIds=&time=&resultType=none&outFields=DateSpecCollect%2C${cityName}&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&sqlFormat=none&f=pjson&token=`;
          console.log(fetchURL);
          await fetch(fetchURL)
            .then((a) => a.json())
            .then((b) => b.features.map((c) => c.attributes))
            .then((d) => {
              //console.log(d)
              d.forEach((d) => {
                //console.log(d)
                let date;
                //Manually Parsing Date String since the data is not parseable by firefox
                if (Object.values(d)[0] !== "Total") {
                 
                  let preDate = Object.values(d)[0];
                  let dateYear = preDate.slice(0, 4);
                  let dateMonth = preDate.slice(0, -3).slice(5) - 1;
                  let dateMonthParse = moment().month(dateMonth).format("M");
                  let dateDay = preDate.slice(-2);
                  date = new Date(`${dateMonthParse}/${dateDay}/${dateYear}`);
                  //console.log('date: ', date);
                } else {
                  date = null;
                }
                let shortDate = moment(date).format("l");
                //console.log('shortDate: ', shortDate);
                if (date) {
                  cityData.push({
                    date: shortDate,
                    cases: Object.values(d)[1],
                  });
                }
              });
            })
            .then(() => {
              cityData.sort((a, b) =>
                new Date(a.date) > new Date(b.date) ? 1 : -1
              );
              return filtertime(cityData, props.time);
            })
            .then((final) => {
              if (mounted) {
                props.arrayUpdate[i](final);
              }
            });
        };
        if (mounted) {
          try {
            if (city1) {
              getData(city1, 0);
            }
            if (city2) {
              getData(city2, 1);
            }
            if (city3) {
              getData(city3, 2);
            }
          } catch (err) {
            console.log("Could not fetch data for city");
            console.log(err);
          }
        }
        return () => {
          mounted = false;
        };
      }, [props.time, city1, city2, city3])}
    </>
  );
};

export default FetchCityHistory;
