import React, { useEffect, useState } from 'react';
import filtertime from 'components/Timefilter.js';
import moment from 'moment'


const FetchCityHistory = (props) => {
    //const [update1, update2, update3] = props.arrayUpdate
    const [city1, city2, city3] = props.cities;

    return <>
        {
            useEffect(() => {
                let mounted = true;
                const getData = async (cityName, i) => {
                    let cityData = [];
                    let fetchURL = `https://opendata.arcgis.com/datasets/772f5cdbb99c4f6689ed1460c26f4b05_0/FeatureServer/0/query?where=1%3D1&outFields=DateSpecCollect,${cityName},&returnGeometry=false&orderByFields=OBJECTID ASC&outSR=&f=json`;
                    await fetch(fetchURL)
                        .then(a => a.json())
                        .then(b => b.features.map(c => c.attributes))
                        .then(d => {
                            d.forEach(d => {
                                let date = new Date((Object.values(d)[0]));
                                let shortDate = moment(date).format('l')
                                if (shortDate !== 'Invalid date') {
                                    cityData.push({
                                        date: shortDate,
                                        cases: Object.values(d)[1]
                                    })
                                }
                            })
                        })
                        .then(() => {
                            return filtertime(cityData, props.time);
                        }).then((final) => {
                            if (mounted) {
                                props.arrayUpdate[i](final)
                            }
                        })
                }
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
                        console.log("Could not fetch data for city")
                        console.log(err)
                    }
                }
                return () => {
                    mounted = false;
                }
            }, [props.time, city1, city2, city3])
        }

    </>
}

export default FetchCityHistory;
