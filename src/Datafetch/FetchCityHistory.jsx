import React, { useEffect, useState } from 'react';
import filtertime from 'components/Timefilter.js';
import moment from 'moment'


const FetchCityHistory = (props) => {
    //let thisDataArray = [];
    //let fetchCity1 = `https://opendata.arcgis.com/datasets/772f5cdbb99c4f6689ed1460c26f4b05_0/FeatureServer/0/query?where=1%3D1&outFields=DateSpecCollect,${props.cities[0]},&returnGeometry=false&orderByFields=OBJECTID ASC&outSR=&f=json`;
    const [update1, update2, update3] = props.arrayUpdate
    const [city1, city2, city3] = props.cities;


    async function fetchArray(cityName, i) {
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
                props.arrayUpdate[i](final)
            })
    }

    useEffect( () => {
        if (city1) {
            fetchArray(city1, 0);
        }
        if (city2) {

            fetchArray(city2, 1);
        }
        if (city3) {

            fetchArray(city3, 2);
        }
    }, [props.time])

    useEffect( () => {
        fetchArray(city1, 0);
    }, [city1])
    useEffect( () => {
        fetchArray(city2, 1);
    }, [city2])
    useEffect( () => {
        fetchArray(city3, 2);
    }, [city3])

    return <></>
}

export default FetchCityHistory;
