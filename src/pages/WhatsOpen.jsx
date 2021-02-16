import React, { useState, useContext, useEffect } from 'react';
import TimeContext from "components/TimeContext";
import color from 'globalVars/Colors'
import Timeselect from 'components/Timeselect';
import { FetchCAMetrics, lastCaseRate, lastPositiveRate, lastHealthEquity, lastTestRate } from 'Datafetch/FetchCAMetrics';
import Chart from 'components/Chart'
import Widget from "components/Widget"
import ReactSpeedometer from "react-d3-speedometer"

const WhatsOpen = (props) => {
    const { time, setTime } = useContext(TimeContext)
    const [array, updateArray] = useState([])
    const [maxCaseRate, updateCaseMax] = useState(10);
    const [maxPosRate, updatePosMax] = useState(10);
    const [maxEqRate, updateEqMax] = useState(10);

    useEffect(() => {
        let a = lastCaseRate > 10 ? lastCaseRate + 2 : 10;
        updateCaseMax(a);
    })
    useEffect(() => {
        let a = lastPositiveRate > 10 ? lastPositiveRate + 2 : 10;
        updatePosMax(a);
    })
    useEffect(() => {
        let a = lastHealthEquity > 10 ? lastHealthEquity + 2 : 10;
        updateEqMax(a);
    })

    console.log(lastCaseRate)
    //let maxCaseRate = lastCaseRate > 12 ? lastCaseRate + 1 : 12;
    return (
        <div>
            <FetchCAMetrics time={ time } function={ updateArray } />
            <div className='page'>
                <h1 className='pageTitle'>{ props.title }</h1>
                <div className='widgetGrid'>

                    <Widget title={ 'Daily Case Rate' } stat={ lastCaseRate } color={ color.yellow } />
                    <Widget title={ 'Test Positivity Rate' } stat={ lastPositiveRate } color={ color.red } />
                    <Widget title={ 'Health Equity Quartile %' } stat={ lastHealthEquity } color={ color.purple } />
                    <Widget title={ 'Tests per 100k' } stat={ lastTestRate } color={ color.blue } />
                </div>

                <div className='widgetGrid' style={ { marginTop: "-2rem", } }>
                    <div className="gaugeContainer">
                        <div className="chartTitle">Adj. Case Rate per 100k</div>
                        <ReactSpeedometer value={ lastCaseRate } minValue={ 0 } maxValue={ maxCaseRate } segments={ 4 } segmentColors={ [color.gold, color.orange, color.red, color.purple] } customSegmentStops={ [0, 1, 4, 7, maxCaseRate] } forceRender={ true } needleColor={ '#999' } />
                    </div>
                    <div className="gaugeContainer">
                        <div className="chartTitle">Tests per 100K</div>
                        <ReactSpeedometer value={ lastPositiveRate } minValue={ 0 } maxValue={ maxPosRate } segments={ 4 } segmentColors={ [color.gold, color.orange, color.red, color.purple] } customSegmentStops={ [0, 2, 5, 8, maxPosRate] } forceRender={ true } needleColor={ '#999' } />
                    </div>
                    <div className="gaugeContainer">
                        <div className="chartTitle">Healthy Equity Quart %</div>
                        <ReactSpeedometer value={ lastHealthEquity } minValue={ 0 } maxValue={ maxEqRate } segments={ 4 } segmentColors={ [color.gold, color.orange, color.red, color.purple] } customSegmentStops={ [0, 2.2, 5.3, 8, maxEqRate] } forceRender={ true } needleColor={ '#999' } />
                    </div>
                </div>


                <Timeselect />
                <div id='chartGrid'>
                    <Chart
                        key='1'
                        id='whatsOpen1'
                        date={ array.map(a => a.date) }
                        data={ [
                            array.map(b => b.dailyCaseRate),
                        ] }
                        fill={ [color.orange] }
                        title={ 'Daily Case Rate' }
                        label={ ['Case Rate 7 Day Avg with 7 Day Lag'] }
                        switches={ ['bar', 'line'] }
                    />
                    <Chart
                        key='2'
                        id='whatsOpen2'
                        date={ array.map(a => a.date) }
                        data={ [
                            array.map(b => b.positiveRate),
                        ] }
                        fill={ [color.red] }
                        title={ 'Positivity Test Rate' }
                        label={ ['Test Positive Rate 7 Day Avg with 7 Day Lag'] }
                        switches={ ['bar', 'line'] }
                    />
                    <Chart
                        key='3'
                        id='whatsOpen3'
                        date={ array.map(a => a.date) }
                        data={ [
                            array.map(b => b.healthEquity),
                        ] }
                        fill={ [color.purple] }
                        title={ 'Health Equity' }
                        label={ ['Health Equity Rate 7 Day Avg with 7 Day Lag'] }
                        switches={ ['bar', 'line'] }
                    />
                    <Chart
                        key='4'
                        id='whatsOpen4'
                        date={ array.map(a => a.date) }
                        data={ [
                            array.map(b => b.testsPer100k),
                        ] }
                        fill={ [color.green] }
                        title={ 'Test per 100k' }
                        label={ ['Tests per 100k 7 Day Avg with 7 Day Lag'] }
                        switches={ ['bar', 'line'] }
                    />
                </div>
            </div>
        </div>
    )
}

export default WhatsOpen;
