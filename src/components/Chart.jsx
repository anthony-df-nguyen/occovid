import React, {useState} from 'react';
import 'chartJSconfig';
import {Bar, Doughnut, Line} from 'react-chartjs-2';
import { barDefaults, lineDefaults, Oneobject, Twoobject7DayAverage, Threeobject7DayAverage } from 'chartJSconfig';
import Chartselect from "components/Chartselect"


const Chart = (props) => {

    //Set initial state to saved memory
    const [currentType,updateType] = useState(    () => {
        if (!localStorage.getItem(props.id)) {
            return 'bar'
        } else {
            return localStorage.getItem(props.id)
        }
    })

    let dataObject
    //Create Data Object
    switch (props.data.length) {
        case 1:
            dataObject = new Oneobject(props.date,props.label[0],props.data[0],props.fill[0])
            break;
        case 2:
            dataObject = new Twoobject7DayAverage(props.date,props.label[0],props.data[0],props.fill[0],props.label[1],props.data[1],props.fill[1])
            break;
        case 3:
            dataObject = new Threeobject7DayAverage(props.date,props.label[0],props.data[0],props.fill[0],props.label[1],props.data[1],props.fill[1],props.label[2],props.data[2],props.fill[2])
            break;
        default:
            dataObject = new Oneobject(props.date,props.label,props.data[0],props.fill[0])
            break;
    }
    //Render the Type of Chart Based on Type
    function renderChart(currentType) {
        switch (currentType) {
            case 'bar':
                return <Bar data={dataObject} options={barDefaults}/>
                break;
            case 'line':
                return <Line  data={dataObject} options={lineDefaults}/>
                break;
            
            default:
                return <Bar  data={dataObject} options={barDefaults}/>
                break;
        }
    }
    return(
    <div className="chartContainer">
        <div className="chartTitle">{props.title}</div>
        {renderChart(currentType)}
        <Chartselect type={['bar','line']} passdown={updateType} id={props.id}/>
    </div>)
}

export default Chart;
