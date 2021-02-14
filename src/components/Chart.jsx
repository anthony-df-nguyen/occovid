import React from 'react';
import 'chartJSconfig';
import {Bar, Doughnut, Line} from 'react-chartjs-2';
import { barDefaults, lineDefaults, Oneobject } from 'chartJSconfig';



const Chart = (props) => {
    let dataObject
    switch (props.data.length) {
        case 1:
            dataObject = new Oneobject(props.date,props.label,props.data[0],props.fill[0])
            break;
    
        default:
            dataObject = new Oneobject(props.date,props.label,props.data[0],props.fill[0])
            break;
    }
    
    function renderChart(type) {
        switch (type) {
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
        {renderChart(props.type)}
    </div>)
}

export default Chart;
