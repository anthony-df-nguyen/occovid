import React, { useState, useContext } from 'react';
import FetchCityHistory from 'Datafetch/FetchCityHistory'
import Timeselect from 'components/Timeselect';
import TimeContext from "components/context/TimeContext";
import color from 'globalVars/Colors'
import _ from "lodash";
import CityCompareChart from 'components/CityCompare/CityCompareChart';
import CitySelector from 'components/CityCompare/CitySelector';
import Page from 'components/Page'


const Cityhistory = (props) => {

    const { time, setTime } = useContext(TimeContext);
    const [city1Array, updateCity1Array] = useState([])
    const [city2Array, updateCity2Array] = useState([])
    const [city3Array, updateCity3Array] = useState([])

    const [city1, updateCity1] = useState(() => {
        if (localStorage.getItem('comparecity1')) {
            return localStorage.getItem('comparecity1')
        } else {
            localStorage.setItem('comparecity1','Anaheim')
            return 'Anaheim'
        }
    })
    const [city2, updateCity2] = useState(localStorage.getItem('comparecity2'))
    const [city3, updateCity3] = useState(localStorage.getItem('comparecity3'))

    const dateArray = city1Array.map((a => a.date))
    const city1Cases = city1Array.map((a) => a.cases)
    const city2Cases = city2Array.map((a) => a.cases)
    const city3Cases = city3Array.map((a) => a.cases)


    return (
        <div>
            <FetchCityHistory time={ time } cities={ [city1, city2, city3] } arrayUpdate={ [updateCity1Array, updateCity2Array, updateCity3Array]} />
            <Page title = 'City History'
            >
                    <div id="lastUpdateDate">
            <p>Last Updated {  dateArray.slice(-1) }</p>
        </div>
                  <Timeselect />
                <CitySelector updater={ [updateCity1, updateCity2, updateCity3] } cities={ [city1, city2, city3] } />
                <div id="fullPageChart">
                    <CityCompareChart
                        key='1'
                        id='comparecities'
                        date={ dateArray }
                        data={ [
                            city1Cases, city2Cases, city3Cases
                        ] }
                        fill={ [color.blue, color.red, color.green] }
                        title={ 'Daily Cases by Specimen Collection' }
                        label={ [city1, city2, city3] }
                        switches={ ['line'] }
                    />
                </div>
         
            </Page>
              
        </div>
    );
}

export default Cityhistory;
